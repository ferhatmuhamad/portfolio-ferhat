import json
data = json.load(open('scripts/projects_by_name.json'))
candidates = [d for d in data if d['kind'] == 'data' and len(d['texts']) >= 30]
print(f'High-info data hits: {len(candidates)}')
seen_clusters = set()
for d in candidates:
    cluster = int(d['page_off'], 16) >> 24
    key = (d['needle'], cluster)
    if key in seen_clusters:
        continue
    seen_clusters.add(key)
    print()
    print(f"=== {d['needle']:20} @ {d['page_off']} ({len(d['texts'])} runs) ===")
    for t in d['texts']:
        if len(t) > 60 and 'HTTP/' not in t and 'AppleWebKit' not in t and 'class=' not in t and '/build/' not in t and 'XSRF' not in t and 'Mozilla' not in t:
            print(f"  [{len(t)}] {t[:280]}")
