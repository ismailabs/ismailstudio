import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const baseline = JSON.parse(await readFile('.local/cloudflare-baseline.json', 'utf8'));
const current = JSON.parse(await readFile('.local/cloudflare-current.json', 'utf8'));
const normalize = (records) => records.map(({ id,type,name,content,priority,proxied,ttl }) => ({ id,type,name,content,priority,proxied,ttl })).sort((a,b) => a.id.localeCompare(b.id));
const before = normalize(baseline.records);
const after = normalize(current.records);
assert.deepEqual(after, before, 'DNS records changed since preflight');
const fingerprint = createHash('sha256').update(JSON.stringify(before)).digest('hex');
const summary = { checkedAt: new Date().toISOString(), baselineAt: baseline.capturedAt, currentAt: current.capturedAt, zone: baseline.zone_id, recordCount: before.length, allRecordsUnchanged: true, allRecordsSha256: fingerprint, mailAndCaaCount: before.filter((record) => ['MX','TXT','CAA'].includes(record.type) || record.name.includes('._domainkey.')).length, method: 'Owner read-only token; DNS list only, no DNS write operation or write probe' };
await writeFile('docs/evidence/dns-preservation.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
