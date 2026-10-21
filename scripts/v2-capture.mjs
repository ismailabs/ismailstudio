import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const round = process.argv[2] || 'round1';
if (!/^[a-z0-9-]+$/.test(round)) throw Error('Invalid capture folder');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const folder = `docs/redesign/evidence/${round}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const evidence = { at: new Date().toISOString(), base, sha: execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), dirty: Boolean(execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim()), browser: browser.version(), captures: [], measurements: [] };
for (const width of [1440,390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
  await page.route('https://formspree.io/f/mljgyabo', route => route.fulfill({status:200,json:{ok:true}}));
  const response = await page.goto(base);
  const servedSource = response?.headers()['x-release-commit'] ?? null;
  await page.evaluate(() => document.fonts.ready);
  const capture = async (state, locator) => {
    if (locator) await locator.scrollIntoViewIfNeeded();
    const file = `${folder}/${width}-${state}.png`;
    await page.screenshot({path:file});
    evidence.captures.push({ width, height: width===390?844:900, state, file, url: page.url(), servedSource });
  };
  await capture('hero');
  for (const [state,selector] of [['work','#work'],['work-second','.project-kopikita'],['process','#process'],['pricing','#services'],['about','#about'],['faq','.faq'],['contact-step1','#contact']]) {
    await page.locator(selector).evaluate(element => element.scrollIntoView({block:'start',behavior:'instant'}));
    if (state.startsWith('work')) {
      for (const img of await page.locator(`${state==='work'?'#work':'.project-kopikita'} img`).all()) if (await img.isVisible()) await img.evaluate(img => img.decode());
    }
    await capture(state);
  }
  await page.getByLabel('Name (required)',{exact:true}).fill('Studio QA');
  await page.getByLabel('Email (required)',{exact:true}).fill('qa@example.com');
  await page.getByRole('button',{name:'Next: project needs'}).click();
  await capture('contact-step2',page.locator('.form-panel'));
  await page.getByLabel('What does your business need?',{exact:false}).fill('A synthetic interaction check for the approved studio redesign.');
  await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  await capture('contact-review',page.locator('.form-panel'));
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await page.locator('#form-status[data-state="success"]').waitFor();
  await capture('contact-success-simulated',page.locator('.form-panel'));
  await page.getByRole('button',{name:'Next: project needs'}).click();
  await capture('contact-error',page.locator('.form-panel'));
  await page.locator('.project-kilatmoto .project-preview').click();
  await page.locator('#case-kilatmoto img').evaluate(img => img.decode());
  await capture('case-kilatmoto');
  await page.keyboard.press('Escape');
  if (width===390) { await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'})); await page.getByRole('button',{name:'Menu'}).click(); await capture('menu'); }
  evidence.measurements.push(await page.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight,h1:getComputedStyle(document.querySelector('h1')).fontSize})));
  await page.close();
}
await browser.close();
await writeFile(`${folder}/manifest.json`,JSON.stringify(evidence,null,2));
console.log(JSON.stringify({round,captures:evidence.captures.length,measurements:evidence.measurements}));
