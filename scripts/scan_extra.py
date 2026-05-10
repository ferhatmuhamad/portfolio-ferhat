"""Scan disk for additional project title fragments. Each project's title is unique
and won't appear in scripts, logs, or PHP source. We use specific phrases."""
import json, os, re, sys

DEVICE = "/dev/sda1"
PAGE_SIZE = 4096
CHUNK = 64 * 1024 * 1024
NEEDLES = [
    b"Kembar Teknika",
    b"TVILING",
    b"Ayem Tentrem",
    b"Solusi3M",
    b"SIAKAD UM OKU",
    b"Aquaculture",
    b"Ornamental",
    b"Industrial Machinery",
    b"Technical Supply",
    b"Cooperative Company",
    b"OKU Timur",
]
TEXT_RE = re.compile(rb"[\x20-\x7e\xc2-\xf4](?:[\x20-\x7e]|[\x80-\xbf]|\xc2|\xe2){10,}")
SCRIPT_MARKERS = ['import ', 'def ', 'TEXT_RE', 'NEEDLES', 'PAGE_SIZE', 'struct.unpack', '"""', '#!/usr/bin', '/usr/lib/python']

def is_script(joined):
    return sum(1 for m in SCRIPT_MARKERS if m in joined) >= 2

def is_log(joined):
    return joined.count('HTTP/') > 2

def main():
    out_path = "/home/precizie/sqlite_recovery/extra_projects.json"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    seen = set()
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
                    if page_off in seen:
                        start = idx + 1
                        continue
                    seen.add(page_off)
                    f.seek(max(0, page_off - PAGE_SIZE))
                    chunk = f.read(PAGE_SIZE * 4)
                    runs = TEXT_RE.findall(chunk)
                    texts = [r.decode('utf-8', 'replace') for r in runs]
                    joined = " ".join(texts)
                    if is_script(joined) or is_log(joined):
                        start = idx + 1
                        continue
                    # Filter to only runs containing the needle or being long
                    keep = [t for t in texts if needle.decode('latin-1') in t or len(t) > 200]
                    results.append({
                        "needle": needle.decode("latin-1"),
                        "page_off": f"0x{page_off:x}",
                        "abs_off": f"0x{abs_off:x}",
                        "texts": keep,
                    })
                    print(f"[{needle.decode('latin-1')[:20]:20}] DATA @ 0x{abs_off:x} keep={len(keep)}/{len(runs)}", flush=True)
                    start = idx + 1
            prev_tail = buf[-PAGE_SIZE:]
            pos += len(buf)
            if pos % (8 * 1024 * 1024 * 1024) == 0:
                print(f"  ... scanned {pos // (1024*1024*1024)} GiB", flush=True)
    with open(out_path, "w") as o:
        json.dump(results, o, indent=2, ensure_ascii=False)
    print(f"\nDone. {len(results)} hits → {out_path}")

if __name__ == "__main__":
    main()
