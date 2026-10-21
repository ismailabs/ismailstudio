import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const projects = ['kilatmoto', 'makansedap', 'kopikita', 'malaysia'];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
await mkdir('public/assets/projects', { recursive: true });
await mkdir('.local/project-originals', { recursive: true });
const evidence = [];
for (const slug of projects) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 990 }, reducedMotion: 'reduce' });
  const url = `https://${slug}.ismailstudio.my/`;
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
    await page.evaluate(async () => { await document.fonts.ready; });
    // Let deferred media become ready, then capture the actual first viewport.
    await page.locator('body').waitFor({ state: 'visible' });
    const bytes = await page.screenshot({ path: `.local/project-originals/${slug}.png` });
    for (const width of [400, 640, 800, 1200]) {
      await sharp(bytes).resize(width, Math.round(width * 825 / 1200)).webp({ quality: 83 }).toFile(`public/assets/projects/${slug}-${width}.webp`);
    }
    evidence.push({ slug, url, status: response.status(), finalUrl: page.url(), title: await page.title(), capturedAt: new Date().toISOString(), originalViewport: '1440x990', derivativeSizes: ['400x275', '640x440', '800x550', '1200x825'] });
    console.log(`${slug}: HTTP ${response.status()}, genuine screenshot saved`);
  } catch (error) {
    evidence.push({ slug, url, error: String(error) });
    console.error(`${slug}: preview unavailable`);
  } finally { await page.close(); }
}
await browser.close();
await mkdir('docs/evidence', { recursive: true });
await writeFile('docs/evidence/project-captures.json', JSON.stringify(evidence, null, 2));
if (evidence.some((item) => item.error)) process.exitCode = 1;
