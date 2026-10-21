#!/usr/bin/env python3
"""Read-only simple checks of *present* repo facts. Not a substitute for browser QA."""
import argparse,re,sys
from pathlib import Path
p=argparse.ArgumentParser()
p.add_argument('--repo',type=Path,default=Path.cwd())
a=p.parse_args();repo=a.repo.resolve()
files=['src/data/packages.ts','src/data/projects.ts','src/components/Contact.astro','package.json']
errs=[]
for f in files:
 if not (repo/f).is_file():errs.append('MISSING '+f)
if errs:print('\n'.join(errs));sys.exit(1)
pkg=(repo/files[0]).read_text(encoding='utf-8')
projects=(repo/files[1]).read_text(encoding='utf-8')
contact=(repo/files[2]).read_text(encoding='utf-8')
for price in ['599','1,299','2,999']:
 if price not in pkg:errs.append('Package amount missing from data: '+price)
for name in ['Starter','Business','Premium']:
 if name not in pkg:errs.append('Package missing: '+name)
for slug in ['kilatmoto','makansedap','kopikita','malaysia']:
 if slug not in projects:errs.append('Project slug missing: '+slug)
if 'contact@ismailstudio.my' not in contact:errs.append('Business email not found in Contact.astro')
if errs:print('\n'.join(errs));sys.exit(1)
print('PASS: basic repo source file checks (not UI or deployment tests)')
