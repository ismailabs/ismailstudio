#!/usr/bin/env python3
"""List asset filenames and SHA256, no image dependencies."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parents[1]
for p in sorted((root/'assets').rglob('*')):
 if p.is_file():
  print(hashlib.sha256(p.read_bytes()).hexdigest(),p.relative_to(root))
