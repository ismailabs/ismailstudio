import { mkdir, writeFile } from 'node:fs/promises';

const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const zone = 'dc2bee92d5853929394633d0a4165093';
if (!account || !process.env.CLOUDFLARE_API_TOKEN) throw new Error('Authorized account and API token are required');
async function read(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` } });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(`Read failed: ${response.status} ${path} ${JSON.stringify(payload.errors)}`);
  return payload.result;
}
const scripts = await read(`/accounts/${account}/workers/scripts`);
const domains = await read(`/accounts/${account}/workers/domains`);
const routes = await read(`/zones/${zone}/workers/routes`);
const candidate = scripts.filter((script) => script.id === 'ismailstudio');
const triggers = [];
for (const script of candidate) triggers.push({ script: script.id, triggers: await read(`/accounts/${account}/builds/workers/${script.id}/triggers`) });
await mkdir('.local', { recursive: true });
await writeFile('.local/cloudflare-routing-baseline.json', JSON.stringify({ capturedAt: new Date().toISOString(), account, zone, scripts, domains, routes, triggers }, null, 2));
console.log(JSON.stringify({ account, zone, scriptCount: scripts.length, domainCount: domains.length, routeCount: routes.length, candidate, websiteDomains: domains.filter((item) => ['www.ismailstudio.my','ismailstudio.my'].includes(item.hostname)), websiteRoutes: routes.filter((item) => /^(https?:\/\/)?(www\.)?ismailstudio\.my\//.test(item.pattern)), triggers }, null, 2));
