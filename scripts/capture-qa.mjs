import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const round = process.argv[2] ?? 'round1';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const folder = `.local/screenshots/${round}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const measurements = [];
for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);
  for (const image of await page.locator('img').all()) {
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img) => img.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `${folder}/${width}-hero.png` });
  await page.screenshot({ path: `${folder}/${width}-page.jpg`, fullPage: true, type: 'jpeg', quality: 75 });
  for (const section of ['work', 'services', 'contact']) {
    await page.locator(`#${section}`).screenshot({ path: `${folder}/${width}-${section}.png` });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  measurements.push(await page.evaluate(() => ({ width: innerWidth, pageWidth: document.documentElement.scrollWidth, pageHeight: document.documentElement.scrollHeight,
    h1: { text: document.querySelector('h1')?.textContent, fontSize: getComputedStyle(document.querySelector('h1')).fontSize, height: document.querySelector('h1')?.getBoundingClientRect().height },
    firstQuoteButton: document.querySelector('.hero-actions .button')?.getBoundingClientRect().toJSON(),
    assets: [...document.images].map((img) => ({ path: new URL(img.currentSrc || img.src, document.baseURI).pathname, visible: img.getBoundingClientRect().height > 0, loaded: img.complete && img.naturalWidth > 0 })),
  })));
  await page.close();
  console.log(`${round}: ${width}px screenshots saved`);
}
await browser.close();
await writeFile(`${folder}/measurements.json`, JSON.stringify(measurements, null, 2));
