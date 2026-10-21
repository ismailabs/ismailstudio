import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const baseline = process.argv.includes('--baseline');
const base = process.env.TEST_BASE_URL || 'https://www.ismailstudio.my';
const evidence = { checkedAt: new Date().toISOString(), base, baseline, responses: [] };
if (baseline) {
  for (const url of ['https://www.ismailstudio.my/','https://ismailstudio.my/','http://www.ismailstudio.my/','http://ismailstudio.my/']) {
    const response = await fetch(url, { redirect: 'manual' });
    const html = await response.text();
    evidence.responses.push({ url, status: response.status, location: response.headers.get('location'), title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] });
  }
} else {
  const response = await fetch(base + '/');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes('Professional websites for small businesses.'));
  assert.ok(!html.includes('static.cloudflareinsights.com/beacon.min.js'), 'Unverified analytics was injected');
  assert.ok(response.headers.get('cache-control')?.includes('no-transform'), 'Missing site-level transform protection');
  assert.ok(html.includes('<link rel="canonical" href="https://www.ismailstudio.my/">'));
  if (process.env.RELEASE_COMMIT) assert.equal(response.headers.get('x-release-commit'), process.env.RELEASE_COMMIT);
  for (const header of ['content-security-policy','strict-transport-security','x-content-type-options','referrer-policy','permissions-policy']) assert.ok(response.headers.get(header), `Missing ${header}`);
  evidence.responses.push({ url: base + '/', status: response.status, releaseCommit: response.headers.get('x-release-commit'), headers: Object.fromEntries(['content-security-policy','strict-transport-security','x-content-type-options','referrer-policy','permissions-policy'].map((name) => [name, response.headers.get(name)])) });
  const assets = JSON.parse(await readFile('.local/release-assets.json', 'utf8'));
  for (const asset of assets.filter((file) => !['index.html','_headers'].includes(file.path))) {
    const result = await fetch(`${base}/${asset.path}`);
    assert.equal(result.status, 200, asset.path);
    assert.equal(createHash('sha256').update(new Uint8Array(await result.arrayBuffer())).digest('hex'), asset.sha256, asset.path);
    evidence.responses.push({ path: asset.path, status: result.status, sha256Matches: true });
  }
  for (const file of ['.env','.git/config','package.json','src/pages/index.astro','docs/02-copy-final.md','_headers','unknown-route/']) {
    const result = await fetch(`${base}/${file}`);
    assert.equal(result.status, 404, file);
    evidence.responses.push({ path: file, status: result.status });
  }
  if (new URL(base).hostname === 'www.ismailstudio.my') {
    for (const source of ['https://ismailstudio.my/','http://ismailstudio.my/','https://ismailstudio.my/path/to/page?source=release&x=a%20b','http://www.ismailstudio.my/?source=release']) {
      const result = await fetch(source, { redirect: 'manual' });
      assert.ok([301,308].includes(result.status), `${source}: ${result.status}`);
      const expected = new URL(source); expected.protocol = 'https:'; expected.hostname = 'www.ismailstudio.my';
      assert.equal(result.headers.get('location'), expected.href);
      evidence.responses.push({ url: source, status: result.status, location: result.headers.get('location') });
    }
  }
}
await mkdir('docs/evidence', { recursive: true });
const scope = baseline ? 'prelaunch-http' : new URL(base).hostname === 'www.ismailstudio.my' ? 'production-http' : 'preview-http';
await writeFile(`docs/evidence/${scope}.json`, JSON.stringify(evidence, null, 2));
console.log(JSON.stringify({ scope, checks: evidence.responses.length, passed: true, responses: baseline ? evidence.responses : undefined }));
