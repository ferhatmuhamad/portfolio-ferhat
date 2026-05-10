#!/usr/bin/env python3
"""Scan whole device for SQLite leaf pages whose content looks like a project row.

Heuristic: page contains the literal text 'projects/covers/' (cover_url path).
For each such page, extract printable text runs and write to JSON for manual
reconstruction.
"""
import json
import os
import re
import sys

DEVICE = "/dev/sda1"
PAGE_SIZE = 4096
CHUNK = 64 * 1024 * 1024
NEEDLE = b"projects/covers/"
TEXT_RE = re.compile(rb"[\x20-\x7e\xc2-\xf4](?:[\x20-\x7e]|[\x80-\xbf]|\xc2|\xe2){10,}")


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else "/home/precizie/sqlite_recovery/projects_text.json"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    seen_signatures = set()
    rows = []
    pos = 0
    page_off = 0
    with open(DEVICE, "rb") as f:
        prev_tail = b""
        while True:
            f.seek(pos)
            buf = f.read(CHUNK)
            if not buf:
                break
            search = prev_tail + buf
            start = 0
            while True:
                idx = search.find(NEEDLE, start)
                if idx < 0:
                    break
                abs_off = pos - len(prev_tail) + idx
                page_off = (abs_off // PAGE_SIZE) * PAGE_SIZE
                # read the page (and the next one in case row spans)
                f.seek(page_off)
                two_pages = f.read(PAGE_SIZE * 2)
                # extract text runs
                runs = TEXT_RE.findall(two_pages)
                texts = []
                for r in runs:
                    try:
                        texts.append(r.decode("utf-8"))
                    except UnicodeDecodeError:
                        texts.append(r.decode("utf-8", "replace"))
                # signature: first 200 chars of joined text (to dedupe redundant copies)
                sig = "".join(texts)[:300]
                if sig in seen_signatures:
                    start = idx + 1
                    continue
                seen_signatures.add(sig)
                rows.append({
                    "page_off": f"0x{page_off:x}",
                    "texts": texts,
                })
                print(
                    f"hit @ 0x{abs_off:x} (page 0x{page_off:x}) — runs={len(runs)} unique_so_far={len(rows)}",
                    flush=True,
                )
                start = idx + 1
            prev_tail = buf[-PAGE_SIZE:]
            pos += len(buf)
            if pos % (1024 * 1024 * 1024) == 0:
                print(f"  ... scanned {pos // (1024*1024*1024)} GiB, unique={len(rows)}", flush=True)
    rows.sort(key=lambda r: r["page_off"])
    with open(out_path, "w") as o:
        json.dump(rows, o, indent=2, ensure_ascii=False)
    print(f"\nDone. Unique row regions: {len(rows)}")
    print(f"Written to {out_path}")


if __name__ == "__main__":
    main()
