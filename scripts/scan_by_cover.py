#!/usr/bin/env python3
"""Scan device for each known cover filename. The cover filename is stored
inline in the project row's cover_url column, so any disk page containing it
that is NOT an nginx access log line is likely a project row.
"""
import json
import os
import re
import sys

DEVICE = "/dev/sda1"
PAGE_SIZE = 4096
CHUNK = 64 * 1024 * 1024

# Each project has a unique 40-char cover filename suffix
COVERS = [
    "42XxxmZsZAfteBfIRIhbStXz5b9fQKFxHHmvJkUQ",
    "80J0zUkaUkfMdCTOkYklkhZbFn36PahZk1Z0qlbP",
    "A6B6hSGaLmPzLteK3TQxMP0oUuqyJgzasPVzzyL2",
    "DEQ40Dqzk2Zzr56h90XB7B5MR4qut8rx0f0niMuR",
    "KMEZ7KvddRZ9KlQTfbJGsNNwJtmVyBadYcwuyKqi",
    "LFqOIGbZfPWdlw8riFXtmXpVJAPHun7SOleLGqDN",
    "LYfHi8yURdRqcXChvlQ3JWhgV2bMilulvF96PfpN",
    "SWamZAFAZ9mcRV7ElVES1DnoE6EqF7lwWTgeyON5",
    "T4ZgtxRisJdZd7zi96J2037Lh9amCeBlc2KvIBKp",
    "V2ZGJZ8vbYcl9HxiLdaLlEXmuwA2yMvme0UkzwnS",
    "VXKrlI4fZD60IwGFtxMGfN46FgVPmNVSiBHVJzDY",
    "WGRbKBW6dMYjyKdBMvVQLpHnGDiXF4HxFw8pAjK6",
    "XU30FDro3WAtklJ2M4OrGJsI1QH5KJZkgQfPzhLA",
    "eD0qv5nRxKvXw7NYss5jXgdeq56snH1OoPy6eTce",
    "iMIYcGrBkmNtIh5cObS1QlodaDb3BIPrxsYjpJKY",
    "lL183m5F20xXNx7FlZtgezV1lAnbvGwghaHTHMHJ",
    "nSbPoPsbtXoTlAbvZAOrZ8FiB7KoLWWFZY2Pmv9y",
    "s0q8KRER4UdVxYzi3ABwHcLMiNbZfkT1522YhSym",
    "wsjukKbKXvuSg1B7BCerSacKXXlMZnlJCxNZVfvn",
]
NEEDLES = [c.encode() for c in COVERS]

TEXT_RE = re.compile(rb"[\x20-\x7e\xc2-\xf4](?:[\x20-\x7e]|[\x80-\xbf]|\xc2|\xe2){10,}")

def is_access_log_text(joined):
    """Return True if the page content is dominated by nginx access log lines."""
    return joined.count("HTTP/2.0") > 2 or joined.count("AppleWebKit") > 2


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else "/home/precizie/sqlite_recovery/projects_by_cover.json"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    found = {c: [] for c in COVERS}
    seen_pages = {}  # page_off -> list of cover names that hit there
    pos = 0
    with open(DEVICE, "rb") as f:
        prev_tail = b""
        while True:
            f.seek(pos)
            buf = f.read(CHUNK)
            if not buf:
                break
            search = prev_tail + buf
            for cover_idx, needle in enumerate(NEEDLES):
                start = 0
                while True:
                    idx = search.find(needle, start)
                    if idx < 0:
                        break
                    abs_off = pos - len(prev_tail) + idx
                    page_off = (abs_off // PAGE_SIZE) * PAGE_SIZE
                    cover_name = COVERS[cover_idx]
                    key = (page_off, cover_name)
                    if key not in seen_pages:
                        # Read 8KB around the page to capture multi-page rows
                        f.seek(max(0, page_off - PAGE_SIZE))
                        chunk = f.read(PAGE_SIZE * 4)
                        runs = TEXT_RE.findall(chunk)
                        texts = []
                        for r in runs:
                            try:
                                texts.append(r.decode("utf-8"))
                            except UnicodeDecodeError:
                                texts.append(r.decode("utf-8", "replace"))
                        joined = " ".join(texts)
                        if is_access_log_text(joined):
                            seen_pages[key] = "log"
                            start = idx + 1
                            continue
                        seen_pages[key] = "data"
                        found[cover_name].append({
                            "page_off": f"0x{page_off:x}",
                            "abs_off": f"0x{abs_off:x}",
                            "texts": texts,
                        })
                        print(
                            f"[{cover_name[:12]}...] DATA hit @ 0x{abs_off:x} runs={len(runs)}",
                            flush=True,
                        )
                    start = idx + 1
            prev_tail = buf[-PAGE_SIZE:]
            pos += len(buf)
            if pos % (4 * 1024 * 1024 * 1024) == 0:
                got = sum(1 for k, v in found.items() if v)
                print(f"  ... scanned {pos // (1024*1024*1024)} GiB | covers with data hits: {got}/{len(COVERS)}", flush=True)
    with open(out_path, "w") as o:
        json.dump(found, o, indent=2, ensure_ascii=False)
    print()
    print(f"Done. Output: {out_path}")
    for c in COVERS:
        print(f"  {c[:16]}...: {len(found[c])} data hits")


if __name__ == "__main__":
    main()
