#!/usr/bin/env python3
"""Read-only V3 handoff validation. Does NOT test or deploy the live site."""
from pathlib import Path
import hashlib, json, sys, csv
ROOT=Path(__file__).resolve().parents[1]
errors=[]
critical=['START_HERE.md','00-AUTHORITY-AND-PROTECTIONS.md','approved-v3-specs/assets/approved-mockups/01-hero-built-for-bigger-problems.png','approved-v3-specs/assets/approved-mockups/02-work-case-study-homepage.png','approved-v3-specs/assets/approved-mockups/03-light-offers-market-comparison.png','approved-v3-specs/assets/approved-mockups/04-mobile-dark-light-layout.png','approved-image-only-pack/approved-originals/hero-desktop.png','approved-image-only-pack/approved-originals/mobile-pair.png','machine/approved-invariants.json','docs/13-acceptance-gates.md','docs/15-release-runbook.md','manifest.sha256']
for p in critical:
    if not (ROOT/p).is_file(): errors.append('Missing: '+p)
manifest=ROOT/'manifest.sha256'
if manifest.exists():
    for n,line in enumerate(manifest.read_text(encoding='utf-8').splitlines(),1):
        if not line.strip():continue
        try: digest,rel=line.split('  ',1)
        except ValueError: errors.append('Bad manifest row '+str(n));continue
        p=ROOT/rel
        if not p.is_file():errors.append('Missing in manifest: '+rel);continue
        if hashlib.sha256(p.read_bytes()).hexdigest()!=digest:errors.append('HASH MISMATCH: '+rel)
try:
    inv=json.loads((ROOT/'machine/approved-invariants.json').read_text(encoding='utf-8'))
    assert inv['headline']=='BUILT FOR BIGGER PROBLEMS.'
    assert [(p['name'],p['from_myr'],p['pages_max'],p['revision_rounds']) for p in inv['offers']]==[('Starter',599,1,1),('Business',1299,5,2),('Premium',2999,12,2)]
    assert len(inv['concepts'])==4 and all(c['url'].startswith('https://') for c in inv['concepts'])
except Exception as e:errors.append('Invariants invalid: '+str(e))
print('V3 handoff package: '+('PASS' if not errors else 'FAIL')+' | '+str(len(list(ROOT.rglob('*'))))+' path entries')
if errors:
    for issue in errors:print('ERROR: '+issue)
    sys.exit(1)
