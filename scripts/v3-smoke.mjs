import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const [base,source,phase='preview']=process.argv.slice(2);
assert.match(source||'',/^[a-f0-9]{40}$/);assert.match(phase,/^[a-z0-9-]+$/);
const root=new URL(base);assert.equal(root.protocol,'https:');
const assets=JSON.parse(await readFile('.local/release-assets.json','utf8'));
const results=[];
for(let offset=0;offset<assets.length;offset+=4) {
  await Promise.all(assets.slice(offset,offset+4).filter(a=>a.path!=='_headers').map(async asset=>{
    const pathname=asset.path.endsWith('index.html')?asset.path.slice(0,-10):asset.path;
    const response=await fetch(new URL(pathname,root));const bytes=Buffer.from(await response.arrayBuffer());
    assert.equal(response.status,200,asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,`Published byte mismatch ${asset.path}`);
    if(asset.path.endsWith('.html')) {
      assert.equal(response.headers.get('x-release-commit'),source);
      assert.match(response.headers.get('content-security-policy')||'',/script-src 'self'/);
      assert.equal(response.headers.get('x-content-type-options'),'nosniff');
      assert.match(bytes.toString(),/https:\/\/www\.ismailstudio\.my\//);
    }
    results.push({path:asset.path,status:response.status,sha256:asset.sha256,bytes:bytes.length});
  }));
}
for(const pathname of ['/docs/redesign-v3/START_HERE.md','/.env','/package.json','/src/scripts/site.ts','/.git/config','/_headers','/unknown-v3-route/']) {
  const response=await fetch(new URL(pathname,root));assert.equal(response.status,404,pathname);
}
const redirect=await fetch('https://ismailstudio.my/work/kilatmoto/?from=v3-release',{redirect:'manual'});
assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'https://www.ismailstudio.my/work/kilatmoto/?from=v3-release');
await writeFile(`docs/redesign-v3/evidence/${phase}-integrity.json`,JSON.stringify({at:new Date().toISOString(),url:root.href,source,assetCount:results.length,results,privatePaths:'404',apexRedirect:'301 with path and query preserved'},null,2));
console.log(JSON.stringify({phase,url:root.href,source,hashedAssets:results.length,privatePaths:'PASS',apex:'PASS'}));
