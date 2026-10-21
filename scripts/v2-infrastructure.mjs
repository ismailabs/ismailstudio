import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const stage=process.argv[2]||'before';if(!['before','after'].includes(stage))throw Error('Invalid stage');
const data=JSON.parse(await readFile(`.local/v2/connector-${stage}.json`,'utf8'));
for(const [key,value] of Object.entries(data))assert.equal(value.success,true,`Read failed ${key}`);
const dns=items=>items.map(({id,type,name,content,priority,proxied,ttl,comment,tags})=>({id,type,name,content,priority,proxied,ttl,comment,tags})).sort((a,b)=>a.id.localeCompare(b.id));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
if(stage==='after') {
  const before=JSON.parse(await readFile('.local/v2/connector-before.json','utf8'));
  assert.deepEqual(dns(data.dns.result),dns(before.dns.result),'DNS changed');
  assert.deepEqual(data.routes.result,before.routes.result,'Routes changed');
  assert.deepEqual(data.domains.result,before.domains.result,'Custom domains changed');
  assert.deepEqual(data.apexDeployments.result,before.apexDeployments.result,'Apex changed');
  for(const worker of before.scripts.result.filter(item=>item.id!=='ismailstudio'))assert.equal(data.scripts.result.find(item=>item.id===worker.id)?.modified_on,worker.modified_on,`Other Worker changed: ${worker.id}`);
  assert.deepEqual(data.settings.result.bindings,before.settings.result.bindings,'Worker bindings changed');
}
const redactDeployments=value=>value.deployments.map(({id,versions,created_on})=>({id,versions,created_on}));
const result={at:new Date().toISOString(),stage,comparison:stage==='after'?'PASS':'baseline',account:'44214a829e2337ca50cf40e4cd827cba',zone:'dc2bee92d5853929394633d0a4165093',workerCount:data.scripts.result.length,customDomainCount:data.domains.result.length,otherWorkers:data.scripts.result.filter(item=>item.id!=='ismailstudio').map(({id,modified_on})=>({id,modified_on})),routes:data.routes.result,dnsCount:data.dns.result.length,dnsSha256:hash(dns(data.dns.result)),mailAndCaaCount:data.dns.result.filter(item=>['MX','TXT','CAA'].includes(item.type)).length,deployments:redactDeployments(data.deployments.result),apexDeployments:redactDeployments(data.apexDeployments.result),bindings:data.settings.result.bindings,buildTriggerCount:data.triggers.result.length};
await writeFile(`docs/redesign/evidence/infrastructure-${stage}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
