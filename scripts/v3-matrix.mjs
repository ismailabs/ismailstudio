import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const folder = 'docs/redesign-v3/evidence/matrix';
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined });
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const evidence = { at: new Date().toISOString(), base, sha: execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), dirty:true, browser: browser.version(), viewports:[], states:[], errors:[], projectAssets:[] };
for (const [width,height] of [[320,700],[375,812],[390,844],[430,932],[768,1024],[834,1112],[1024,768],[1280,800],[1440,900],[1920,1080],[844,390]]) {
  const page = await browser.newPage({viewport:{width,height}, reducedMotion:'reduce'});
  page.on('pageerror',error=>evidence.errors.push({width,error:error.message}));
  await page.route('https://formspree.io/f/mljgyabo', route=>route.fulfill({status:503,json:{error:'Isolated'}}));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`${folder}/${width}-${height}-hero.png`});
  const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:getComputedStyle(document.querySelector('h1')).fontSize,cta:document.querySelector('.hero .button').getBoundingClientRect().bottom}));
  if(layout.scrollWidth>width)throw Error(`Overflow ${width}`);
  evidence.viewports.push({width,height,...layout});
  if(width===834||width===1024) { await page.locator('#services').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await page.screenshot({path:`${folder}/${width}-offers.png`}); }
  if(width===390||width===1440) for(const slug of ['kilatmoto','makansedap','kopikita','malaysia']) {
    await page.locator(`.project-${slug} .project-preview`).click();await page.locator(`#case-${slug} img`).evaluate(i=>i.decode());
    await page.screenshot({path:`${folder}/${width}-study-${slug}.png`});await page.keyboard.press('Escape');
  }
  await page.close();
}
for(const width of [390,1440]) for(const mode of ['no-js','forced-colors']) {
  const context=await browser.newContext({viewport:{width,height:width===390?844:900},javaScriptEnabled:mode!=='no-js',reducedMotion:'reduce',forcedColors:mode==='forced-colors'?'active':'none'});
  const page=await context.newPage();await page.goto(base);await page.screenshot({path:`${folder}/${width}-${mode}.png`});
  await page.locator('#contact').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
  if(mode==='no-js') {await expect(page.locator('#message')).toBeVisible();await expect(page.locator('#quote-form')).toHaveAttribute('method','post');}
  await page.screenshot({path:`${folder}/${width}-${mode}-contact.png`});evidence.states.push({width,mode,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});await context.close();
}
// Real animation trace, isolated transport. Public content only, no customer submissions.
const context=await browser.newContext({viewport:{width:1440,height:900}});await context.tracing.start({screenshots:true,snapshots:true,sources:false});
const page=await context.newPage();await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.locator('#work').scrollIntoViewIfNeeded();await expect(page.locator('.site-header')).toHaveAttribute('data-floating','');
await page.emulateMedia({reducedMotion:'reduce'});await expect.poll(()=>page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
await context.tracing.stop({path:`${folder}/motion-and-reduced-motion.zip`});await context.close();
for(const file of execFileSync('git',['ls-files','public/assets/projects'],{encoding:'utf8'}).trim().split('\n')) {
  const current=await readFile(file);const original=execFileSync('git',['show',`65d2f51:${file}`],{maxBuffer:4*1024*1024});if(!current.equals(original))throw Error(`Changed authentic preview ${file}`);
  evidence.projectAssets.push({path:file,sha256:createHash('sha256').update(current).digest('hex'),matchesBaseline:true});
}
await browser.close();await writeFile(`${folder}/manifest.json`,JSON.stringify(evidence,null,2));console.log(JSON.stringify({viewports:evidence.viewports,errors:evidence.errors,authenticFiles:evidence.projectAssets.length}));
