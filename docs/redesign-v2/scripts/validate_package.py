#!/usr/bin/env python3
"""Read-only integrity audit of this release handoff. Standard library only."""
import argparse, hashlib, json, sys
from pathlib import Path

p=argparse.ArgumentParser()
p.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
a=p.parse_args()
root=a.root.resolve()
manifest=root/'manifest.json'
if not manifest.exists(): sys.exit('FAIL: missing manifest.json')
m=json.loads(manifest.read_text(encoding='utf-8'))
errors=[]
for rel,sha in m['files'].items():
    f=root/rel
    if not f.is_file(): errors.append('MISSING '+rel); continue
    digest=hashlib.sha256(f.read_bytes()).hexdigest()
    if digest!=sha: errors.append('HASH MISMATCH '+rel)
actual={str(p.relative_to(root)).replace('\\','/') for p in root.rglob('*') if p.is_file() and p.name!='manifest.json'}
missing=set(m['files'])-actual
unexpected=actual-set(m['files'])
errors.extend('UNEXPECTED '+i for i in sorted(unexpected))
errors.extend('NOT IN ACTUAL '+i for i in sorted(missing))
frames=sorted((root/'assets/approved-mockups/frames').glob('[0-9][0-9]-*.png'))
if len(frames)!=17: errors.append(f'Expected 17 numbered PNG frames, got {len(frames)}')
project=list((root/'assets/project-preview-crops').glob('*.webp'))
if len(project)!=4: errors.append(f'Expected 4 project crops, got {len(project)}')
if errors:
 print('\n'.join(errors)); sys.exit(1)
print('PASS: package hashes, expected assets, no unexpected files; '+str(len(actual))+' verified files')
