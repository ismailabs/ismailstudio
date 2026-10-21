import { chromium } from '@playwright/test';
import { mkdir,writeFile } from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4321';
const folder='docs/redesign/evidence/matrix';
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
const evidence={at:new Date().toISOString(),browser:browser.version(),base,states:[]};
for(const [width,height] of [[320,700],[768,1024],[1024,768],[1920,1080]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto(base); await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<0)&&getComputedStyle(el).position!=='fixed';}).map(el=>({tag:el.tagName,class:el.getAttribute('class'),rect:el.getBoundingClientRect().toJSON()})));
  await page.screenshot({path:`${folder}/${width}-hero.png`});
  evidence.states.push({width,height,overflow,pageWidth:await page.evaluate(()=>document.documentElement.scrollWidth)});
  console.log(JSON.stringify(evidence.states.at(-1)));
  await page.close();
}
if(!process.argv.includes('--diagnose')) {
  for(const width of [1440,390]) for(const slug of ['kilatmoto','makansedap','kopikita','malaysia']) {
    const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});
    await page.goto(`${base}/work/${slug}/`);await page.evaluate(()=>document.fonts.ready);await page.locator('main>img').evaluate(img=>img.decode());
    const file=`${folder}/${width}-study-${slug}.png`;await page.screenshot({path:file,fullPage:true});evidence.states.push({width,route:`/work/${slug}/`,file});await page.close();
  }
}
await browser.close();await writeFile(`${folder}/manifest.json`,JSON.stringify(evidence,null,2));
