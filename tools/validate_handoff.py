#!/usr/bin/env python3
"""Handoff package static integrity check. Does not deploy or scan private data."""
from pathlib import Path
import sys
r=Path(__file__).resolve().parents[1]
files=['START_HERE.md','AGENTS.md','docs/00-requirements.md','docs/01-business-and-claims.md','docs/02-copy-final.md','docs/03-design-system.md','docs/04-technical-architecture.md','docs/05-conversion-and-forms.md','docs/06-seo.md','docs/07-assets-and-motion.md','docs/08-skill-orchestration.md','docs/09-implementation-phases.md','docs/10-qa-and-dod.md','docs/11-release-cloudflare.md','docs/12-risks-and-progress.md','assets/mark.svg','assets/brand-identity.svg','assets/hero-editorial.svg','assets/offers-editorial.svg','assets/contact-editorial.svg','assets/social-cover.svg']
missing=[p for p in files if not (r/p).is_file()]
for f in sorted(r.rglob('*.md')):
 if not f.read_text('utf-8').strip(): missing.append(str(f.relative_to(r)))
print('Checked',len(files),'required deliverables and all markdown content')
print('PASS' if not missing else 'FAIL: '+', '.join(missing))
sys.exit(bool(missing))
