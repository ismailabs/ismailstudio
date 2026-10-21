import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const account = '44214a829e2337ca50cf40e4cd827cba';
const zone = 'dc2bee92d5853929394633d0a4165093';
const baseline = JSON.parse(await readFile('.local/cloudflare-routing-baseline.json', 'utf8'));
async function read(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` } });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(`Read failed: HTTP ${response.status} ${path}`);
  return payload.result;
}
const scripts = await read(`/accounts/${account}/workers/scripts`);
const domains = await read(`/accounts/${account}/workers/domains`);
const routes = await read(`/zones/${zone}/workers/routes`);
const ownNames = ['ismailstudio','ismailstudio-apex'];
for (const old of baseline.scripts) {
  const current = scripts.find((script) => script.id === old.id);
  assert.ok(current, `Missing existing Worker ${old.id}`);
  assert.equal(current.modified_on, old.modified_on, `Unrelated Worker modified: ${old.id}`);
}
const sortDomains = (items) => [...items].sort((a,b) => a.hostname.localeCompare(b.hostname));
assert.deepEqual(sortDomains(domains), sortDomains(baseline.domains), 'Existing custom domains changed');
for (const route of baseline.routes) assert.deepEqual(routes.find((item) => item.id === route.id), route);
const deployments = {};
for (const name of ownNames) {
  if (scripts.some((script) => script.id === name)) deployments[name] = await read(`/accounts/${account}/workers/scripts/${name}/deployments`);
}
await mkdir('.local', { recursive: true });
await writeFile('.local/cloudflare-routing-current.json', JSON.stringify({ checkedAt: new Date().toISOString(), scripts, domains, routes, deployments }, null, 2));
const publicDeployments = Object.fromEntries(Object.entries(deployments).map(([name, result]) => {
  const items = Array.isArray(result) ? result : result.deployments;
  if (!Array.isArray(items)) throw new Error('Unexpected deployments result shape');
  return [name, items.map(({ id, created_on, source, strategy, versions }) => ({ id, created_on, source, strategy, versions: versions?.map(({ version_id, percentage }) => ({ version_id, percentage })) }))];
}));
const summary = { checkedAt: new Date().toISOString(), account, zone, unrelatedWorkersUnchanged: baseline.scripts.length, existingCustomDomainsUnchanged: domains.length, routes: routes.filter((route) => ownNames.includes(route.script)), deployments: publicDeployments };
await writeFile('docs/evidence/cloudflare-state.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
