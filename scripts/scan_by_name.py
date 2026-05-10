#!/usr/bin/env python3
"""Re-scan disk for project name needles, then dump text runs around each hit."""
import json, os, re, sys

DEVICE = "/dev/sda1"
PAGE_SIZE = 4096
CHUNK = 64 * 1024 * 1024
NEEDLES = [
    b"SIAKAD UM OKU Timur",
    b"Futake Indonesia",
    b"Kembar Teknika",
    b"TVILING",
    b"Ayem Tentrem",
    b"Solusi3M",
    b"Lovary Corpora",
    b"Signals99",
    # Generic: Indonesian project description words
    b"Mengembangkan website",
    b"Membangun website",
]
TEXT_RE = re.compile(rb"[\x20-\x7e\xc2-\xf4](?:[\x20-\x7e]|[\x80-\xbf]|\xc2|\xe2){10,}")

def looks_like_log(joined):
    return joined.count("HTTP/") > 2 or joined.count("AppleWebKit") > 2

def looks_like_php(joined):
    # Source code from seeder etc
    return "Project::create" in joined or "<?php" in joined or "namespace Database" in joined

def main():
    out_path = "/home/precizie/sqlite_recovery/projects_by_name.json"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    seen_pages = set()
    results = []
    pos = 0
    with open(DEVICE, "rb") as f:
        prev_tail = b""
        while True:
            f.seek(pos)
            buf = f.read(CHUNK)
            if not buf:
                break
            search = prev_tail + buf
            for needle in NEEDLES:
                start = 0
                while True:
                    idx = search.find(needle, start)
                    if idx < 0:
                        break
                    abs_off = pos - len(prev_tail) + idx
                    page_off = (abs_off // PAGE_SIZE) * PAGE_SIZE
                    if page_off in seen_pages:
                        start = idx + 1
                        continue
                    seen_pages.add(page_off)
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
                    if looks_like_log(joined):
                        kind = "log"
                    elif looks_like_php(joined):
                        kind = "php"
                    else:
                        kind = "data"
                    results.append({
                        "needle": needle.decode("latin-1"),
                        "page_off": f"0x{page_off:x}",
                        "abs_off": f"0x{abs_off:x}",
                        "kind": kind,
                        "texts": texts if kind == "data" else [],
                    })
                    print(f"[{needle.decode('latin-1')[:20]:20}] {kind:4} @ 0x{abs_off:x} (page 0x{page_off:x}) runs={len(runs)}", flush=True)
                    start = idx + 1
            prev_tail = buf[-PAGE_SIZE:]
            pos += len(buf)
            if pos % (8 * 1024 * 1024 * 1024) == 0:
                print(f"  ... scanned {pos // (1024*1024*1024)} GiB", flush=True)
    with open(out_path, "w") as o:
        json.dump(results, o, indent=2, ensure_ascii=False)
    print(f"\nDone. {len(results)} hits → {out_path}")
    by_kind = {}
    for r in results:
        by_kind.setdefault(r["kind"], 0)
        by_kind[r["kind"]] += 1
    print(f"Breakdown: {by_kind}")

if __name__ == "__main__":
    main()
