#!/usr/bin/env python3
"""Extract project rows from raw SQLite leaf pages by parsing cells.

For each needle offset, locate the enclosing 4096-byte page and parse SQLite
table B-tree leaf cells. Decode columns and emit JSON of recovered rows.
"""
import json
import os
import struct
import sys

PAGE_SIZE = 4096

# Column order from migration 2026_05_01_000001_create_portfolio_tables.php
# (will validate against any sane structure)
PROJECT_COLUMNS = [
    "id",                # integer (alias rowid)
    "title",             # string
    "slug",              # string
    "category",          # string nullable
    "summary",           # text nullable
    "summary_id",        # text nullable
    "description",       # longText nullable (may be added later)
    "cover_url",         # string nullable
    "tech_stack",        # json nullable (string in db)
    "live_url",          # string nullable
    "repo_url",          # string nullable
    "is_featured",       # boolean
    "is_active",         # boolean
    "sort_order",        # integer
    "created_at",        # timestamp
    "updated_at",        # timestamp
]


def read_varint(data: bytes, off: int):
    """Read SQLite varint, return (value, bytes_consumed)."""
    val = 0
    for i in range(8):
        b = data[off + i]
        val = (val << 7) | (b & 0x7F)
        if not (b & 0x80):
            return val, i + 1
    val = (val << 8) | data[off + 8]
    return val, 9


def serial_type_size(t: int) -> int:
    if t == 0:
        return 0
    if t == 1:
        return 1
    if t == 2:
        return 2
    if t == 3:
        return 3
    if t == 4:
        return 4
    if t == 5:
        return 6
    if t == 6:
        return 8
    if t == 7:
        return 8
    if t == 8 or t == 9:
        return 0
    if t >= 12 and t % 2 == 0:
        return (t - 12) // 2  # BLOB
    if t >= 13 and t % 2 == 1:
        return (t - 13) // 2  # TEXT
    return -1


def decode_value(t: int, blob: bytes):
    if t == 0:
        return None
    if t == 1:
        return struct.unpack(">b", blob)[0]
    if t == 2:
        return struct.unpack(">h", blob)[0]
    if t == 3:
        return struct.unpack(">i", b"\x00" + blob)[0] if len(blob) == 3 else None
    if t == 4:
        return struct.unpack(">i", blob)[0]
    if t == 5:
        return int.from_bytes(blob, "big", signed=True)
    if t == 6:
        return struct.unpack(">q", blob)[0]
    if t == 7:
        return struct.unpack(">d", blob)[0]
    if t == 8:
        return 0
    if t == 9:
        return 1
    if t >= 13 and t % 2 == 1:
        try:
            return blob.decode("utf-8")
        except UnicodeDecodeError:
            return blob.decode("utf-8", "replace")
    if t >= 12 and t % 2 == 0:
        return blob.hex()
    return None


def parse_cell(data: bytes, off: int, page_type: int):
    """Parse one cell starting at `off` in page data. Return (row, next_off) or (None, None)."""
    try:
        if page_type == 0x0D:  # table B-tree leaf
            payload_size, n1 = read_varint(data, off)
            rowid, n2 = read_varint(data, off + n1)
            payload_start = off + n1 + n2
            # We assume payload fits on the page (no overflow)
            payload = data[payload_start:payload_start + payload_size]
            if len(payload) < payload_size:
                return None, None
            # Parse record header
            hdr_size, h1 = read_varint(payload, 0)
            types = []
            cur = h1
            while cur < hdr_size:
                t, n = read_varint(payload, cur)
                types.append(t)
                cur += n
            # Read column values
            values = [rowid]  # rowid first (id alias)
            body_off = hdr_size
            for t in types:
                sz = serial_type_size(t)
                if sz < 0:
                    return None, None
                blob = payload[body_off:body_off + sz]
                values.append(decode_value(t, blob))
                body_off += sz
            return (rowid, types, values), payload_start + payload_size
    except Exception:
        return None, None
    return None, None


def parse_page(data: bytes, page_off: int):
    """Parse a leaf page and return list of cell tuples (rowid, types, values)."""
    # Page header starts at offset 0 (or 100 for page 1, but here we have raw page data)
    page_type = data[0]
    if page_type not in (0x0D, 0x05):  # 0x05 = interior table
        return []
    if page_type != 0x0D:
        return []
    cell_count = struct.unpack(">H", data[3:5])[0]
    if cell_count == 0 or cell_count > 1000:
        return []
    cell_ptr_array_off = 8  # for leaf pages
    cells = []
    for i in range(cell_count):
        ptr = struct.unpack(
            ">H",
            data[cell_ptr_array_off + i * 2:cell_ptr_array_off + i * 2 + 2],
        )[0]
        if ptr < 0 or ptr >= len(data):
            continue
        cell, _ = parse_cell(data, ptr, page_type)
        if cell:
            cells.append(cell)
    return cells


NEEDLE_FRAGMENTS = [
    "SIAKAD",
    "Futake",
    "Futago",
    "Kembar Teknika",
    "TVILING",
    "Ayem Tentrem",
    "Solusi3M",
]


def looks_like_project(values: list) -> bool:
    # values[0] is rowid, values[1..] are columns
    # project rows have many columns (>=12 with the migration we have)
    if len(values) < 8:
        return False
    if not isinstance(values[0], int):
        return False
    title = values[1] if len(values) > 1 else None
    slug = values[2] if len(values) > 2 else None
    if not isinstance(title, str) or not title:
        return False
    if not isinstance(slug, str) or not slug:
        return False
    if len(title) > 250:
        return False
    # exclude sqlite_master rows (type column is "table"/"index"/"trigger"/"view")
    if title in ("table", "index", "trigger", "view"):
        return False
    # heuristic: title contains a needle fragment OR slug looks slug-y AND
    # values include URLs / category text
    txt_blob = " ".join(str(v) for v in values if isinstance(v, str))
    if any(n in txt_blob for n in NEEDLE_FRAGMENTS):
        return True
    # generic project shape fallback (won't be triggered but kept)
    return False


def main():
    if len(sys.argv) < 3:
        print("usage: extract_pages.py <device> <out.json> [hit_offsets...]")
        sys.exit(1)
    device = sys.argv[1]
    out_path = sys.argv[2]
    offsets = [int(x, 16) for x in sys.argv[3:]] if len(sys.argv) > 3 else []
    if not offsets:
        # default: cluster offsets from previous scan
        offsets = [
            0x788049000, 0x788050000,  # cluster 3
            0x970501000, 0x970508000,  # cluster 4
            0xa30087000, 0xa300b0000,  # cluster 7
            0x228ec9000,               # cluster 2
            0x988aff000,               # cluster 5 (longshot)
        ]

    rows = []
    seen_ids = set()
    with open(device, "rb") as f:
        # Scan a wide range around each anchor
        for anchor in offsets:
            # Scan 2 MB before and after, page-aligned
            start = (anchor - 1024 * 1024) // PAGE_SIZE * PAGE_SIZE
            end = anchor + 1024 * 1024
            for page_off in range(start, end, PAGE_SIZE):
                f.seek(page_off)
                page = f.read(PAGE_SIZE)
                if len(page) != PAGE_SIZE:
                    continue
                if page[0] != 0x0D:
                    continue
                cells = parse_page(page, page_off)
                for rowid, types, values in cells:
                    if not looks_like_project(values):
                        continue
                    key = (rowid, values[1] if len(values) > 1 else None)
                    if key in seen_ids:
                        continue
                    seen_ids.add(key)
                    rows.append({
                        "page_off": f"0x{page_off:x}",
                        "rowid": rowid,
                        "types": types,
                        "values": values,
                    })
    rows.sort(key=lambda r: r["rowid"])
    with open(out_path, "w") as o:
        json.dump(rows, o, indent=2, ensure_ascii=False, default=str)
    print(f"recovered candidate project rows: {len(rows)}")
    print(f"written to {out_path}")
    # quick preview
    for r in rows:
        v = r["values"]
        title = v[1] if len(v) > 1 else None
        slug = v[2] if len(v) > 2 else None
        cat = v[3] if len(v) > 3 else None
        print(f"  rowid={r['rowid']}  title={title!r}  slug={slug!r}  cat={cat!r}")


if __name__ == "__main__":
    main()
