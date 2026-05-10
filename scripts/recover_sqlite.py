#!/usr/bin/env python3
"""Two-stage SQLite recovery:
  Stage 1: scan raw device for unique project title strings; record matches.
  Stage 2: for each match cluster, carve a window and try to extract pages.
"""
import os
import sys
import struct
import argparse

# Unique project title fragments (taken from admin screenshot)
NEEDLES = [
    b"SIAKAD UM OKU Timur",
    b"Futake Indonesia",
    b"Futago Karya",
    b"Kembar Teknika",
    b"TVILING",
    b"Ayem Tentrem",
    b"Solusi3M",
]

CHUNK = 64 * 1024 * 1024
OVERLAP = 4096
SQLITE_MAGIC = b"SQLite format 3\x00"


def find_needles(device: str) -> list:
    hits = []
    pos = 0
    prev_tail = b""
    with open(device, "rb") as f:
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
                    hits.append((abs_off, needle.decode("utf-8", "replace")))
                    start = idx + len(needle)
            prev_tail = buf[-OVERLAP:]
            pos += len(buf)
            if pos % (1024 * 1024 * 1024) == 0:
                print(f"  ... {pos // (1024*1024*1024)} GiB, hits so far={len(hits)}", flush=True)
    return hits


def carve_window(device: str, center_off: int, outdir: str, window_mb: int) -> str:
    """Carve a window around center_off, looking backward for SQLite header."""
    os.makedirs(outdir, exist_ok=True)
    half = window_mb * 1024 * 1024 // 2
    start = max(0, center_off - half)
    end = center_off + half
    with open(device, "rb") as f:
        f.seek(start)
        data = f.read(end - start)
    # Look for SQLite headers in this window — pick the closest before center
    best_hdr = -1
    pos = 0
    while True:
        idx = data.find(SQLITE_MAGIC, pos)
        if idx < 0:
            break
        # validate header
        if idx + 100 <= len(data):
            page_size = struct.unpack(">H", data[idx + 16:idx + 18])[0]
            if page_size == 1:
                page_size = 65536
            page_count = struct.unpack(">I", data[idx + 28:idx + 32])[0]
            if 512 <= page_size <= 65536 and (page_size & (page_size - 1)) == 0:
                if 1 <= page_count <= 1_000_000:
                    abs_idx = start + idx
                    if abs_idx <= center_off:
                        best_hdr = (idx, page_size, page_count)
        pos = idx + 1
    if not best_hdr or best_hdr == -1:
        return ""
    idx, page_size, page_count = best_hdr
    size = page_size * page_count
    abs_off = start + idx
    # carve from device fresh
    out_path = os.path.join(outdir, f"db_{abs_off:016x}_p{page_size}_n{page_count}.sqlite")
    with open(device, "rb") as f:
        f.seek(abs_off)
        with open(out_path, "wb") as o:
            o.write(f.read(size))
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("device")
    ap.add_argument("outdir")
    ap.add_argument("--window-mb", type=int, default=8)
    args = ap.parse_args()

    print(f"Stage 1: scanning {args.device} for project title strings...", flush=True)
    hits = find_needles(args.device)
    print(f"Total raw needle hits: {len(hits)}", flush=True)
    # cluster nearby hits (within 8MB)
    hits.sort()
    clusters = []
    cur = []
    last = -1
    for off, n in hits:
        if last < 0 or off - last < args.window_mb * 1024 * 1024:
            cur.append((off, n))
        else:
            clusters.append(cur)
            cur = [(off, n)]
        last = off
    if cur:
        clusters.append(cur)
    print(f"Clusters: {len(clusters)}", flush=True)
    for i, cl in enumerate(clusters):
        print(f"  cluster {i}: {len(cl)} hits, range 0x{cl[0][0]:x}..0x{cl[-1][0]:x}")
        names = sorted(set(n for _, n in cl))
        print(f"    names: {names}")
        # carve a DB around the centroid
        center = (cl[0][0] + cl[-1][0]) // 2
        out = carve_window(args.device, center, args.outdir, args.window_mb * 2)
        if out:
            print(f"    carved: {out}  ({os.path.getsize(out):,} bytes)")
        else:
            print("    no SQLite header found near cluster")


if __name__ == "__main__":
    main()
