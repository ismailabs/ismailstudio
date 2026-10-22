import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const folder='docs/redesign-v3/evidence/baseline';await mkdir(folder,{recursive:true});
const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined});
const results=[];
for(const [site,slug] of [['https://www.ismailstudio.my/','production-v2'],...['kilatmoto','makansedap','kopikita','malaysia'].map(s=>[`https://${s}.ismailstudio.my/`,s])]) {
 const page=await browser.newPage({viewport:{width:1440,height:990},reducedMotion:'reduce'});
 const response=await page.goto(site);await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${folder}/live-${slug}.png`});
 results.push({url:site,status:response.status(),finalUrl:page.url(),title:await page.title(),source:response.headers()['x-release-commit']||null});
 if(response.status()!==200)throw Error(`Live concept failed: ${slug}`);
 if(slug==='production-v2'){await page.setViewportSize({width:390,height:844});await page.screenshot({path:`${folder}/live-production-v2-390.png`});}
 await page.close();
}
await browser.close();await writeFile(`${folder}/live-http-and-demos.json`,JSON.stringify({at:new Date().toISOString(),results},null,2));console.log(JSON.stringify(results));
