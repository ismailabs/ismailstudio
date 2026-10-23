import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const phase = process.argv[2];
if (!/^[a-z0-9-]+$/.test(phase ?? '')) throw Error('Provide a scoped capture phase');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4327';
const folder = `docs/redesign-v3/evidence/final-polish/${phase}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined });
const evidence = { utc: new Date().toISOString(), base, sha: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), diffSha256: createHash('sha256').update(execFileSync('git', ['diff', '--', 'src', 'scripts', 'public', 'tests'])).digest('hex'), browser: browser.version(), captures: [], errors: [] };
const widths = phase.includes('landscape') ? [[390,320],[667,375],[780,390],[844,390]] : phase.includes('matrix') ? [[320,700],[360,780],[390,780],[430,932],[667,375],[844,390],[768,1024],[1024,768],[1440,900],[1920,1080]] : [[320,700],[390,780],[768,1024],[1440,900]];
try {
  for (const [width,height] of widths) {
    const page = await browser.newPage({ viewport: { width,height }, reducedMotion: 'reduce' });
    page.on('pageerror', error => evidence.errors.push(String(error)));
    await page.route('https://formspree.io/f/mljgyabo', route => route.fulfill({ status:200, json:{ok:true} }));
    const response = await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero-scene img').evaluate(img => img.decode());
    const capture = async state => {
      await page.evaluate(() => new Promise(requestAnimationFrame));
      await page.evaluate(async () => { await Promise.all(Array.from(document.images).filter(img => { const r=img.getBoundingClientRect();return r.width>0&&r.height>0&&r.top<innerHeight&&r.bottom>0&&!img.closest('dialog:not([open])'); }).map(img=>img.decode())); });
      const file=`${width}-${state}.png`; await page.screenshot({path:`${folder}/${file}`}); evidence.captures.push({width,height,state,file,url:page.url(),source:response.headers()['x-release-commit']??null});
    };
    await capture('hero');
    evidence.captures.at(-1).overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if ([390,1440].includes(width) && height>=700) {
      await page.screenshot({path:`${folder}/${width}-full.png`,fullPage:true});
      for (const [state,selector] of [['work','#work'],['offers','#services'],['about','#about'],['faq','.faq'],['contact','#contact']]) {
        await page.locator(selector).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'})); await capture(state);
      }
      await page.locator('.plan-business .plan-fit').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'})); await capture('offer-deliverables');
      await page.locator('.integration-details>summary').click();await page.locator('.integration-details').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await capture('integrations-open');
      const timing = page.locator('.faq-list details').filter({hasText:'How long does a project take?'});await timing.locator('summary').click();await timing.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await capture('faq-timing-open');
      await page.locator('.project-kilatmoto .project-preview').click(); await capture('study'); await page.keyboard.press('Escape');
      await page.locator('.project-makansedap .project-preview').click();await page.locator('#case-makansedap .case-copy dl>div:last-child').scrollIntoViewIfNeeded();await capture('study-limitations');await page.keyboard.press('Escape');
      for(const slug of ['kilatmoto','makansedap','kopikita','malaysia']) {await page.goto(`${base}/work/${slug}/`);await page.evaluate(()=>document.fonts.ready);await capture(`page-${slug}`);}
      await page.goto(base);await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.locator('#name').fill('Synthetic QA');await page.locator('#email').fill('qa@example.com');await page.getByRole('button',{name:'Next: project needs'}).click();await capture('form-needs');
      await page.locator('#message').fill('Synthetic isolated verification, no real provider request.');await page.getByRole('button',{name:'Review enquiry',exact:true}).click();await capture('form-review');
      await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await page.locator('#form-status[data-state="success"]').waitFor();await capture('form-success-MOCK');
    }
    if(width<=800) {await page.goto(base);await page.getByRole('button',{name:'Open menu',exact:true}).click();await capture('menu');await page.keyboard.press('Escape');}
    await page.close();
  }
  const outputs=[];for(const file of (await readdir('dist',{recursive:true})).filter(file=>/\.(html|css|js)$/.test(file)))outputs.push({file,sha256:createHash('sha256').update(await readFile(`dist/${file}`)).digest('hex')});
  evidence.outputs=outputs; evidence.complete=true;
} catch(error) {evidence.errors.push(String(error));evidence.complete=false;throw error;}
finally {await browser.close();await writeFile(`${folder}/receipt.json`,JSON.stringify(evidence,null,2));}
console.log(JSON.stringify({phase,captures:evidence.captures.length,errors:evidence.errors}));
