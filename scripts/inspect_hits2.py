"""Print only hits whose dominant content looks like project data (not Python source, not logs)."""
import json

data = json.load(open('scripts/projects_by_name.json'))

def is_python_source(joined):
    markers = ['import ', 'def ', 'sys.argv', 'os.path', 'TEXT_RE', 'PAGE_SIZE', 'NEEDLES', 'struct.unpack', 'rb"\\x', '"""', '#!/usr/bin']
    return sum(1 for m in markers if m in joined) >= 3

def is_log(joined):
    return joined.count('HTTP/') > 2 or joined.count('AppleWebKit') > 2

def is_html(joined):
    return joined.count('class="') > 5 or joined.count('</') > 5

def is_php_source(joined):
    return '<?php' in joined or 'namespace ' in joined or '$this->' in joined or 'Project::' in joined

print(f'Total hits: {len(data)}')
candidates = []
for d in data:
    joined = ' '.join(d['texts'])
    if is_python_source(joined) or is_log(joined) or is_html(joined) or is_php_source(joined):
        continue
    if not d['texts']:
        continue
    candidates.append(d)

print(f'After filtering: {len(candidates)}')
print()
seen_offsets = set()
for d in candidates:
    page = int(d['page_off'], 16)
    # cluster by 64KB
    cluster = page >> 16
    if cluster in seen_offsets:
        continue
    seen_offsets.add(cluster)
    print(f"=== {d['needle']:20} @ {d['page_off']} ({len(d['texts'])} runs) ===")
    for t in d['texts']:
        if len(t) > 40:
            print(f"  [{len(t)}] {t[:300]}")
    print()
