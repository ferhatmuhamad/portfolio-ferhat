#!/usr/bin/env python3
"""Extract all printable text runs from raw pages near needle hits."""
import re
import sys

DEVICE = "/dev/sda1"
HITS = [0x78804f000, 0x970507000, 0xa30078000]


def main():
    # Look at one page first; data should be identical
    with open(DEVICE, "rb") as f:
        f.seek(HITS[0])
        page = f.read(4096)
    # Match printable ASCII or UTF-8 bytes (very permissive)
    runs = re.findall(rb"[\x20-\x7e\xc2-\xf4](?:[\x20-\x7e]|[\x80-\xbf]|\xc2|\xe2){3,}", page)
    print(f"page 0x{HITS[0]:x}, found {len(runs)} runs:")
    for r in runs:
        try:
            s = r.decode("utf-8")
        except UnicodeDecodeError:
            s = r.decode("latin-1")
        if len(s) >= 4:
            print(f"  [{len(s):3d}] {s!r}")


if __name__ == "__main__":
    main()
