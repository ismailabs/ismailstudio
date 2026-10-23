"""Compare scoped read-only Cloudflare snapshots offline; never loads credentials."""
import hashlib
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
stage = sys.argv[1]
assert stage.isascii() and all(c.islower() or c.isdigit() or c == '-' for c in stage)
private = root / '.local/final-polish'
out = root / 'docs/redesign-v3/evidence/final-polish'
baseline = json.loads((out / 'infrastructure-before.json').read_text(encoding='utf-8'))
current = json.loads((private / f'infrastructure-{stage}.raw.json').read_text(encoding='utf-8'))
data = {}
for row in current['requests']:
    response = row['response']
    assert response['status'] == 200 and response['success'], row['name']
    data[row['name']] = response['result']
    count = response.get('result_info', {}).get('total_count')
    if isinstance(response['result'], list) and count is not None:
        assert count == len(response['result']), 'Incomplete pagination: ' + row['name']

def sha(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()).hexdigest()

dns_keys = ['id', 'type', 'name', 'content', 'ttl', 'proxied', 'priority', 'data', 'settings', 'tags', 'comment']
dns = [{k: r[k] for k in dns_keys if k in r} for r in sorted(data['dns'], key=lambda r: (r['type'], r['name'], r['content']))]
deployments = lambda key: [{k: d.get(k) for k in ('id', 'strategy', 'versions', 'created_on')} for d in data[key]['deployments']]
other_workers = [{'name': r['id'], 'modifiedOn': r['modified_on']} for r in sorted(data['scripts'], key=lambda r: r['id']) if r['id'] != 'ismailstudio']
fingerprints = {
    'dnsSha256': sha(dns),
    'mailAndCaaSha256': sha([r for r in dns if r['type'] in ('MX', 'TXT', 'CAA')]),
    'routesSha256': sha(sorted(data['routes'], key=lambda r: r['id'])),
    'domainsSha256': sha(sorted(data['domains'], key=lambda r: r['id'])),
    'apexDeploymentsSha256': sha(deployments('apexDeployments')),
    'apexSettingsSha256': sha(data['apexSettings']),
    'apexSubdomainSha256': sha(data['apexSubdomain']),
    'otherWorkersSha256': sha(other_workers),
}
for key, value in fingerprints.items():
    assert value == baseline[key], 'Protected resource changed: ' + key
assert data['websiteSettings']['bindings'] == baseline['websiteBindings'], 'Bindings changed'
assert data['websiteScriptSettings'] == baseline['websiteScriptSettings'], 'Website global settings changed'
assert data['websiteSubdomain'] == baseline['websiteSubdomain'], 'Website subdomain settings changed'
assert len(data['websiteBuildTriggers']) == baseline['websiteBuildTriggerCount'] == 0
assert len(data['websiteBuilds']) == baseline['websiteBuildCount'] == 0
assert len(data['apexBuildTriggers']) == baseline['apexBuildTriggerCount'] == 0
if stage in ('preupload', 'preview', 'prepromotion'):
    assert deployments('websiteDeployments') == baseline['websiteDeployments'], 'Production traffic changed before promotion'
receipt = {
    'utc': current['capturedAt'], 'stage': stage, 'comparison': 'PASS',
    'method': 'Fresh Cloudflare connector GET only, normalized identically to infrastructure-before.json',
    'dnsCount': len(dns), 'workerCount': len(data['scripts']), 'routeCount': len(data['routes']),
    'protectedFingerprints': fingerprints, 'otherWorkersUnchanged': True,
    'websiteBindingsUnchanged': True, 'globalSettingsUnchanged': True,
    'buildTriggersUnchanged': True, 'websiteDeployments': deployments('websiteDeployments'),
    'rollbackVersionReadable': data['websiteVersion']['id'],
    'privateSnapshot': f'.local/final-polish/infrastructure-{stage}.raw.json',
}
(out / f'infrastructure-{stage}.json').write_text(json.dumps(receipt, indent=2), encoding='utf-8')
print(json.dumps({'stage': stage, 'comparison': 'PASS', 'dnsCount': len(dns), 'otherWorkersUnchanged': True}))
