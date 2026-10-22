import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const [base,phase]=process.argv.slice(2);
assert.ok(['preview','production'].includes(phase));assert.equal(new URL(base).protocol,'https:');
await mkdir('.local/v3',{recursive:true});
const privateReceipt=`.local/v3/form-${phase}-send-intent.json`;
try {await access(privateReceipt);throw Error(`A ${phase} send was already initiated. Do not repeat the live form test.`);} catch(error) {if(error.code!=='ENOENT')throw error;}
const marker=`ISM-V3-${phase.toUpperCase()}-${new Date().toISOString().replace(/\D/g,'').slice(0,14)}`;
const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined});
try {
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await page.goto(base);
  assert.equal(await page.locator('#quote-form').getAttribute('action'),'https://formspree.io/f/mljgyabo');
  await page.locator('#name').fill('Synthetic V3 release check');await page.locator('#email').fill('contact@ismailstudio.my');
  await page.getByRole('button',{name:'Next: project needs'}).click();
  await page.locator('#message').fill(`Authorized synthetic Ismail Studio delivery verification. Marker ${marker}. This is not a customer enquiry and requires no reply.`);
  await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  // Intent is recorded BEFORE the only live send. A failure must be investigated,
  // not retried as another email in the same environment.
  await writeFile(privateReceipt,JSON.stringify({at:new Date().toISOString(),phase,base,marker,state:'send-initiated'},null,2));
  const responsePromise=page.waitForResponse(r=>r.url()==='https://formspree.io/f/mljgyabo'&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  const response=await responsePromise;const json=await response.json();assert.equal(response.status(),200);assert.equal(json.ok,true);
  await expect(page.locator('#form-status')).toHaveAttribute('data-state','success');
  const receipt={at:new Date().toISOString(),phase,base,marker,providerStatus:response.status(),providerAccepted:json.ok===true,browserSuccess:true,recipientReceipt:'PENDING independent Zoho evidence; provider acceptance is not delivery'};
  await writeFile(`docs/redesign-v3/evidence/form-${phase}-acceptance.json`,JSON.stringify(receipt,null,2));
  console.log(JSON.stringify(receipt));
} finally {await browser.close();}
