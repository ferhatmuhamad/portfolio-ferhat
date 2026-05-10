"""Extract project rows from text dumps. Project rows have a recognizable pattern:
   <8byte_garbage>33<title><slug><category><client><summary_en><summary_id>...

Pattern: text starts with '33' (column type byte), then long text fields.
We look for any text run containing 'wordpress' or 'laravel' or 'vue' or 'odoo' or 'react'
that ALSO contains a slug-like substring matching '<lower-hyphenated>-<6chars>'.
"""
import json, re

CATEGORIES = ['wordpress', 'laravel', 'vue', 'odoo', 'react']

data = json.load(open('scripts/projects_by_name.json'))

# Collect ALL text runs across all hits, then dedupe
all_runs = []
for d in data:
    for t in d['texts']:
        all_runs.append(t)

# Dedupe
unique_runs = list(dict.fromkeys(all_runs))
print(f'Total runs: {len(all_runs)}, unique: {len(unique_runs)}')

# Find project-row-like runs:
# - long (>500 chars)
# - contains a category keyword
# - contains a slug pattern
project_runs = []
SLUG_RE = re.compile(r'([a-z0-9](?:[a-z0-9\-]+)-[A-Za-z0-9]{6})(wordpress|laravel|vue|odoo|react)')
for t in unique_runs:
    if len(t) < 400:
        continue
    m = SLUG_RE.search(t)
    if not m:
        continue
    project_runs.append((t, m.group(1), m.group(2)))

print(f'\nProject-like runs: {len(project_runs)}')
for t, slug, cat in project_runs:
    print(f'\n--- slug={slug} cat={cat} len={len(t)} ---')
    print(t[:1500])
    print('...')
    if len(t) > 1500:
        print(t[1500:3000])
