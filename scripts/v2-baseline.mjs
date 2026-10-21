import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

await mkdir('docs/redesign/evidence/baseline', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const site = 'https://www.ismailstudio.my/';
const response = await fetch(site);
const html = await response.text();
const receipt = { at: new Date().toISOString(), baseCommit: 'd9dc2b8fdea169742a1951c3690a055af9a02869', url: site, status: response.status, headers: Object.fromEntries(response.headers), htmlSha256: createHash('sha256').update(html).digest('hex'), screenshots: [] };
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
  await page.goto(site);
  await page.evaluate(() => document.fonts.ready);
  const file = `docs/redesign/evidence/baseline/hero-${width}.png`;
  await page.screenshot({ path: file });
  receipt.screenshots.push(file);
  receipt.form = await page.locator('#quote-form').evaluate(form => ({ action: form.getAttribute('action'), method: form.getAttribute('method'), fields: [...form.querySelectorAll('input,select,textarea')].map(field => ({ name: field.name, required: field.required, min: field.minLength, max: field.maxLength })) }));
  await page.close();
}
await browser.close();
await writeFile('docs/redesign/evidence/baseline/site.json', JSON.stringify(receipt, null, 2));
console.log(JSON.stringify({ status: receipt.status, release: receipt.headers['x-release-commit'], screenshots: receipt.screenshots }));
