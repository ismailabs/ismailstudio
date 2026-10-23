#!/usr/bin/env python3
"""Read-only integrity checker for this standalone Codex handoff.
No network, repository mutation, install or deploy operations.
"""
from pathlib import Path
import hashlib
import sys

root = Path(__file__).resolve().parents[1]
manifest = root / 'manifest.sha256'
errors = []
if not manifest.is_file():
    errors.append('Missing manifest.sha256')
else:
    checked = set()
    for n, line in enumerate(manifest.read_text(encoding='utf-8').splitlines(), 1):
        if not line.strip():
            continue
        try:
            expected, relative = line.split('  ', 1)
        except ValueError:
            errors.append(f'Invalid manifest line {n}')
            continue
        if not (len(expected) == 64 and all(x in '0123456789abcdef' for x in expected)):
            errors.append(f'Invalid digest: {relative}')
            continue
        target = (root / relative).resolve()
        if not target.is_relative_to(root.resolve()):
            errors.append(f'Unsafe manifest path: {relative}')
            continue
        if not target.is_file():
            errors.append(f'Missing: {relative}')
            continue
        actual = hashlib.sha256(target.read_bytes()).hexdigest()
        if actual != expected:
            errors.append(f'SHA256 mismatch: {relative}')
        checked.add(relative)
    actual_files = {p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file() and p.name != 'manifest.sha256'}
    unchecked = actual_files - checked
    if unchecked:
        errors += [f'Unlisted file: {x}' for x in sorted(unchecked)]

for critical in ('START_HERE.md', '01_APPROVALS_AND_BOUNDARIES.md',
                 'assets/hero-desktop-approved-original.png',
                 'assets/hero-mobile-option-A-background.png',
                 'assets/mobile-option-A-approval-preview.png'):
    if not (root / critical).is_file():
        errors.append(f'Missing critical handoff file: {critical}')

if errors:
    print('Ismail Studio V3 final polish handoff: FAIL')
    for item in errors:
        print(' -', item)
    sys.exit(1)
print('Ismail Studio V3 final polish handoff: PASS')
print(f'Verified {len(checked)} files using SHA-256; no repository modification performed.')
