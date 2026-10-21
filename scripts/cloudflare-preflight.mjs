import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Read-only, using cf's own credential store and refresh implementation.
function cf(args) {
  try {
    const raw = execFileSync(process.execPath, ['node_modules/cf/bin/cf', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(raw);
  } catch (error) {
    console.error(String(error.stderr || error.message).trim());
    process.exit(1);
  }
}
const zones = cf(['zones', 'list', '--name', 'ismailstudio.my', '--per-page', '50']);
if (!Array.isArray(zones) || zones.length !== 1) throw new Error('Exact zone must be uniquely accessible');
const zone = zones[0];
const records = cf(['dns', 'records', 'list', '--zone', zone.id, '--per-page', '5000']);
if (!Array.isArray(records)) throw new Error('DNS list returned an unfamiliar shape');
const snapshot = { zone_id: zone.id, account_id: zone.account.id, records, capturedAt: new Date().toISOString() };
await mkdir('.local', { recursive: true });
let filename = '.local/cloudflare-baseline.json';
try { await readFile(filename); filename = '.local/cloudflare-current.json'; } catch {}
await writeFile(filename, JSON.stringify(snapshot, null, 2));
const mail = records.filter((record) => ['MX', 'TXT', 'CAA'].includes(record.type) || record.name.includes('._domainkey.'));
const protectedRecords = records.filter((record) => !(['ismailstudio.my','www.ismailstudio.my'].includes(record.name) && ['A','AAAA','CNAME'].includes(record.type)));
const fingerprint = (items) => createHash('sha256').update(JSON.stringify(items.map(({ id,type,name,content,priority,proxied,ttl }) => ({ id,type,name,content,priority,proxied,ttl })).sort((a,b) => a.id.localeCompare(b.id)))).digest('hex');
const mailHash = fingerprint(mail);
const protectedHash = fingerprint(protectedRecords);
console.log(JSON.stringify({ accountId: zone.account.id, zoneId: zone.id, zoneStatus: zone.status, recordCount: records.length, mailAndCaaCount: mail.length, mailSnapshotSha256: mailHash,
  protectedRecordCount: protectedRecords.length, protectedSnapshotSha256: protectedHash,
  websiteRecords: records.filter((record) => ['ismailstudio.my','www.ismailstudio.my'].includes(record.name) && !['MX','TXT'].includes(record.type)).map(({ id,type,name,content,proxied }) => ({ id,type,name,content,proxied })),
}));
