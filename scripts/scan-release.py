"""Targeted staged-file checks. This is not a Gitleaks or complete secret audit."""
import json
import re
import subprocess

paths = subprocess.check_output(['git', 'diff', '--cached', '--name-only', '-z']).decode().split('\0')
checks = {
    'private key': re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    'GitHub token': re.compile(rb'\bgh[pousr]_[A-Za-z0-9]{20,}\b'),
    'AWS access identifier': re.compile(rb'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    'literal credential assignment': re.compile(rb'''(?i)(?:api[_-]?key|secret|password|auth[_-]?token)\s*[:=]\s*["'][A-Za-z0-9_+/=.-]{25,}["']'''),
    'personal phone': re.compile(rb'(?<![A-Za-z0-9])(?:\+60|0060)[ -]?1[0-9][ -]?[0-9 -]{7,}(?![A-Za-z0-9])'),
}
findings = []
scanned = 0
for path in filter(None, paths):
    if path.startswith(('.local/', '.cloudflare/', 'node_modules/', 'dist/', '.env')) and path != '.env.example':
        findings.append({'file': path, 'rule': 'private/generated path'})
    content = subprocess.check_output(['git', 'show', ':' + path])
    if b'\0' in content:
        continue
    scanned += 1
    for rule, pattern in checks.items():
        if pattern.search(content):
            findings.append({'file': path, 'rule': rule})
    if path.startswith(('src/', 'public/')) and re.search(rb'wa\.me/|api\.whatsapp\.com|href=["\']tel:', content):
        findings.append({'file': path, 'rule': 'unapproved phone destination'})
print(json.dumps({'scope': 'staged files', 'textFilesScanned': scanned, 'findings': findings, 'limit': 'Targeted pattern and path check, not Gitleaks or a complete credential audit'}))
raise SystemExit(bool(findings))
