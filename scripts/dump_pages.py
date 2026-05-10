#!/usr/bin/env python3
"""Debug: dump pages around needle offsets to see actual page layout."""
import struct
import sys

PAGE_SIZE = 4096
DEVICE = "/dev/sda1"

# Anchor offsets where we know project title text resides
ANCHORS = [
    0x78804f787,   # "Futago Karya" cluster 3
    0x970507787,   # "Futago Karya" cluster 4
    0xa30078787,   # "Futago Karya" cluster 7
    0xa30095000,   # cluster 7 area
    0x228eeaaae,   # "Futake Indonesia" cluster 2
]


def read_varint(data, off):
    val = 0
    for i in range(8):
        b = data[off + i]
        val = (val << 7) | (b & 0x7F)
        if not (b & 0x80):
            return val, i + 1
    val = (val << 8) | data[off + 8]
    return val, 9


def main():
    with open(DEVICE, "rb") as f:
        for anchor in ANCHORS:
            print(f"\n===== anchor 0x{anchor:x} =====")
            # Try 4096-aligned page boundaries within ±8KB
            for delta in range(-2, 3):
                page_off = (anchor // PAGE_SIZE + delta) * PAGE_SIZE
                f.seek(page_off)
                page = f.read(PAGE_SIZE)
                if len(page) != PAGE_SIZE:
                    continue
                ptype = page[0]
                first_free = struct.unpack(">H", page[1:3])[0]
                ncells = struct.unpack(">H", page[3:5])[0]
                cell_start = struct.unpack(">H", page[5:7])[0]
                marker = "  <-- contains anchor" if page_off <= anchor < page_off + PAGE_SIZE else ""
                print(
                    f"  page @ 0x{page_off:x}  type=0x{ptype:02x}  ncells={ncells}  "
                    f"cell_content_start=0x{cell_start:04x}  first_free=0x{first_free:04x}{marker}"
                )
                # If this is anchor's page, parse cell pointers
                if page_off <= anchor < page_off + PAGE_SIZE and ptype in (0x0D, 0x0A, 0x05, 0x02):
                    if 0 < ncells < 1000:
                        ptr_array = 8 if ptype in (0x0D, 0x0A) else 12
                        ptrs = []
                        for i in range(min(ncells, 50)):
                            p = struct.unpack(
                                ">H",
                                page[ptr_array + i * 2:ptr_array + i * 2 + 2],
                            )[0]
                            ptrs.append(p)
                        print(f"    cell ptrs: {[f'0x{p:x}' for p in ptrs[:20]]}")
                        # parse each cell as table leaf
                        if ptype == 0x0D:
                            for i, p in enumerate(ptrs):
                                if not (0 < p < PAGE_SIZE):
                                    continue
                                try:
                                    psz, n1 = read_varint(page, p)
                                    rid, n2 = read_varint(page, p + n1)
                                    payload_start = p + n1 + n2
                                    payload_end = min(payload_start + psz, PAGE_SIZE)
                                    payload = page[payload_start:payload_end]
                                    hdr_size, h1 = read_varint(payload, 0)
                                    types = []
                                    cur = h1
                                    while cur < hdr_size and cur < len(payload):
                                        t, n = read_varint(payload, cur)
                                        types.append(t)
                                        cur += n
                                    # Decode text columns only for preview
                                    body = hdr_size
                                    cols_text = []
                                    for t in types:
                                        if t == 0:
                                            sz = 0
                                        elif t == 1:
                                            sz = 1
                                        elif t == 2:
                                            sz = 2
                                        elif t == 3:
                                            sz = 3
                                        elif t == 4:
                                            sz = 4
                                        elif t == 5:
                                            sz = 6
                                        elif t == 6:
                                            sz = 8
                                        elif t == 7:
                                            sz = 8
                                        elif t == 8 or t == 9:
                                            sz = 0
                                        elif t >= 12 and t % 2 == 0:
                                            sz = (t - 12) // 2
                                        elif t >= 13 and t % 2 == 1:
                                            sz = (t - 13) // 2
                                        else:
                                            sz = -1
                                        if sz < 0:
                                            cols_text.append("?")
                                            continue
                                        if t >= 13 and t % 2 == 1:
                                            try:
                                                cols_text.append(payload[body:body + sz].decode("utf-8")[:60])
                                            except UnicodeDecodeError:
                                                cols_text.append(repr(payload[body:body + sz][:30]))
                                        elif t >= 12 and t % 2 == 0:
                                            cols_text.append(f"<blob {sz}>")
                                        elif t == 8:
                                            cols_text.append("0")
                                        elif t == 9:
                                            cols_text.append("1")
                                        elif t == 0:
                                            cols_text.append("NULL")
                                        else:
                                            try:
                                                if sz == 1:
                                                    cols_text.append(str(struct.unpack(">b", payload[body:body+1])[0]))
                                                elif sz == 2:
                                                    cols_text.append(str(struct.unpack(">h", payload[body:body+2])[0]))
                                                elif sz == 4:
                                                    cols_text.append(str(struct.unpack(">i", payload[body:body+4])[0]))
                                                elif sz == 8 and t == 6:
                                                    cols_text.append(str(struct.unpack(">q", payload[body:body+8])[0]))
                                                else:
                                                    cols_text.append("?")
                                            except Exception:
                                                cols_text.append("?")
                                        body += sz
                                    print(
                                        f"    cell[{i}] @0x{p:x} payload_size={psz} rowid={rid} cols={len(types)}"
                                    )
                                    print(f"      types={types}")
                                    print(f"      vals={cols_text}")
                                except Exception as e:
                                    print(f"    cell[{i}] @0x{p:x} parse error: {e}")


if __name__ == "__main__":
    main()
