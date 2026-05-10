#!/usr/bin/env python3
"""Scan a raw block device for SQLite databases and carve candidates.

Usage: sudo carve_sqlite.py <device> <output_dir> [--max-size-mb N] [--limit N]
"""
import os
import sys
import struct
import argparse

MAGIC = b"SQLite format 3\x00"
CHUNK = 64 * 1024 * 1024  # 64 MiB
OVERLAP = 4096  # ensure magic on chunk boundary still found


def carve(device: str, outdir: str, max_size_mb: int, limit: int) -> None:
    os.makedirs(outdir, exist_ok=True)
    max_bytes = max_size_mb * 1024 * 1024
    found = 0
    pos = 0
    with open(device, "rb") as f:
        prev_tail = b""
        while True:
            f.seek(pos)
            buf = f.read(CHUNK)
            if not buf:
                break
            search = prev_tail + buf
            # search for magic
            start = 0
            while True:
                idx = search.find(MAGIC, start)
                if idx < 0:
                    break
                # absolute offset on device
                abs_off = pos - len(prev_tail) + idx
                # need at least 100-byte header to read page_size & page_count
                hdr = search[idx:idx + 100]
                if len(hdr) < 100:
                    # need to re-read at abs_off
                    f.seek(abs_off)
                    hdr = f.read(100)
                if len(hdr) < 100:
                    break
                # page_size: 16-17 (BE), 1 means 65536
                page_size = struct.unpack(">H", hdr[16:18])[0]
                if page_size == 1:
                    page_size = 65536
                elif page_size < 512 or (page_size & (page_size - 1)) != 0:
                    start = idx + 1
                    continue
                # page_count: 28-31 (BE)
                page_count = struct.unpack(">I", hdr[28:32])[0]
                if page_count == 0 or page_count > 1_000_000:
                    start = idx + 1
                    continue
                size = page_size * page_count
                if size > max_bytes:
                    start = idx + 1
                    continue
                # write candidate
                out_path = os.path.join(
                    outdir, f"cand_{abs_off:016x}_{size}.sqlite"
                )
                f.seek(abs_off)
                data = f.read(size)
                if len(data) != size:
                    start = idx + 1
                    continue
                with open(out_path, "wb") as o:
                    o.write(data)
                found += 1
                print(
                    f"  hit @ 0x{abs_off:x}  page_size={page_size}  pages={page_count}"
                    f"  size={size:,}  -> {out_path}",
                    flush=True,
                )
                if limit and found >= limit:
                    print(f"reached limit {limit}", flush=True)
                    return
                start = idx + len(MAGIC)
            prev_tail = buf[-OVERLAP:]
            pos += len(buf)
            if pos % (1024 * 1024 * 1024) == 0:
                print(f"  ... scanned {pos // (1024*1024*1024)} GiB, found={found}", flush=True)
    print(f"done. total candidates: {found}", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("device")
    ap.add_argument("outdir")
    ap.add_argument("--max-size-mb", type=int, default=64)
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()
    carve(args.device, args.outdir, args.max_size_mb, args.limit)


if __name__ == "__main__":
    main()
