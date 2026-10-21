import { chromium } from '@playwright/test';
import { probe, layout, frame } from '../.agents/skills/design-taste-frontend/scripts/lib/probe.mjs';
import { judge, judgeLayout } from '../.agents/skills/design-taste-frontend/scripts/lib/rules.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

// Same skill measurements/rules, using the working installed Edge/Playwright
// transport. Bundled direct-CDP launcher exits before connecting on this host.
const allow = ['headline-lines', 'eyebrow', 'numbering', 'micro-label', 'hairline', 'outlined-box', 'palette-claude', 'palette-terracotta'];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const evidence = { transport: 'Playwright Edge fallback', approvedBriefExceptions: allow, viewports: [] };
for (const width of [1440, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 768 ? 1024 : 900 } });
  await page.addInitScript(() => {
    window.__movingElements = new Set();
    addEventListener('animationstart', (event) => window.__movingElements.add(event.target), true);
    addEventListener('transitionrun', (event) => window.__movingElements.add(event.target), true);
  });
  await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);
  const frames = [];
  for (const heading of await page.locator('h1,h2').all()) {
    await heading.scrollIntoViewIfNeeded();
    // Wait for actual finite animations, not arbitrary sleeps.
    await page.evaluate(async () => Promise.all(document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).map((animation) => animation.finished.catch(() => {}))));
    frames.push(await page.evaluate(frame));
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  const metrics = await page.evaluate(probe);
  const geometry = await page.evaluate(layout);
  const findings = [...judge(metrics, { width, allow }), ...judgeLayout(geometry, { width, allow })];
  const movingElements = await page.evaluate(() => window.__movingElements.size);
  evidence.viewports.push({ width, movingElements, findings, metrics, geometry, frames });
  console.log(JSON.stringify({ width, movingElements, findings: findings.map(({ level, id, message }) => ({ level, id, message })) }));
  await page.close();
}
await browser.close();
await mkdir('.local/design-inspector', { recursive: true });
await writeFile('.local/design-inspector/report.json', JSON.stringify(evidence, null, 2));
const failures = evidence.viewports.flatMap((viewport) => viewport.findings.filter((finding) => finding.level === 'FAIL'));
if (failures.length) process.exitCode = 1;
