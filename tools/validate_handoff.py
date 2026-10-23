#!/usr/bin/env python3
"""Validate the current approved V3 handoff and production-source boundaries."""
from pathlib import Path
import runpy
import re

root = Path(__file__).resolve().parents[1]
try:
    runpy.run_path(str(root / 'docs/redesign-v3/tools/validate_handoff.py'), run_name='__main__')
except SystemExit as result:
    if result.code: raise
try:
    runpy.run_path(str(root / 'docs/ismailstudio-v3-final-polish/tools/verify_handoff.py'), run_name='__main__')
except SystemExit as result:
    if result.code: raise
required = ['AGENTS.md', 'src/components/Hero.astro', 'src/data/packages.ts', 'src/data/projects.ts', 'src/lib/form-config.ts', 'public/favicon.svg']
errors = [f'Missing {p}' for p in required if not (root / p).is_file()]
hero = (root / 'src/components/Hero.astro').read_text('utf-8')
if not all(word in hero for word in ['BUILT FOR', 'BIGGER', 'PROBLEMS.']): errors.append('V3 headline missing')
source_paths = list((root / 'src').rglob('*')) + list((root / 'public').rglob('*'))
for path in source_paths:
    if not path.is_file() or path.suffix not in ['.astro', '.ts', '.css', '.svg', '.html', '.txt', '.xml']: continue
    content = path.read_text('utf-8')
    if re.search(r'wa\.me/|api\.whatsapp|(?:sk_live_|sk_test_)[A-Za-z0-9]{12,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY', content): errors.append(f'Private contact or secret pattern in {path.relative_to(root)}')
for package, price, pages, revisions in [('Starter','599','1 page','1 revision round'),('Business','1,299','Up to 5 pages','2 revision rounds'),('Premium','2,999','Up to 12 pages','2 revision rounds')]:
    text = (root / 'src/data/packages.ts').read_text('utf-8')
    if not re.search(r"name: '"+package+r"'.*price: '"+price+r"'.*pages: '"+pages+r"'.*revisions: '"+revisions+r"'",text): errors.append(f'Package fact mismatch: {package}')
print('V3 source boundaries:', 'FAIL: ' + '; '.join(errors) if errors else 'PASS')
raise SystemExit(bool(errors))
