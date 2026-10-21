import { chromium } from '@playwright/test';
import { mkdir,writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4321';
const folder='docs/redesign/evidence/resilience'; await mkdir(folder,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
const evidence={at:new Date().toISOString(),base,browser:browser.version(),states:[]};
for(const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:width===390?844:900}});
  await page.context().tracing.start({screenshots:true,snapshots:true});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('503'))errors.push(m.text());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  if(width===1440) {
    await page.mouse.move(1000,260);
    await page.waitForFunction(()=>document.querySelector('.glyph-object').style.transform!=='');
    await page.screenshot({path:`${folder}/motion-pointer.png`});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.mouse.move(600,200);
  assert.equal(await page.locator('.glyph-object').evaluate(el=>getComputedStyle(el).transform),'none');
  await page.screenshot({path:`${folder}/${width}-reduced-motion.png`});
  await page.context().tracing.stop({path:`.local/v2/motion-${width}.zip`});
  let release;const pending=new Promise(resolve=>{release=resolve;});
  await page.route('https://formspree.io/f/mljgyabo',async route=>{await pending;await route.fulfill({status:503,json:{error:'Synthetic unavailable provider'}});});
  await page.locator('#name').fill('Studio QA');await page.locator('#email').fill('qa@example.com');
  await page.getByRole('button',{name:'Next: project needs'}).click();await page.locator('#message').fill('An isolated browser check. No real enquiry is sent.');await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await page.locator('#quote-form[aria-busy]').waitFor();
  await page.locator('.form-panel').scrollIntoViewIfNeeded();await page.screenshot({path:`${folder}/${width}-pending-simulated.png`});release();
  await page.locator('#form-status[data-state="error"]').waitFor();await page.screenshot({path:`${folder}/${width}-provider-error-simulated.png`});
  evidence.states.push({width,reducedMotion:'PASS',pending:'PASS',providerFailure:'PASS',runtimeErrors:errors});assert.deepEqual(errors,[]);
  await page.close();
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:width===390?844:900}});const native=await context.newPage();await native.goto(base);await native.locator('#contact').evaluate(el=>el.scrollIntoView());await native.screenshot({path:`${folder}/${width}-no-js.png`,fullPage:false});assert.equal(await native.locator('#name').isVisible(),true);assert.equal(await native.locator('#message').isVisible(),true);await context.close();
}
await browser.close();await writeFile(`${folder}/manifest.json`,JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));
