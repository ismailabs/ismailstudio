import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://formspree.io/f/mljgyabo', route => route.fulfill({ status: 503, json: { error: 'Isolated V3 transport' } }));
});

test('floating navigation remains reachable and identifies the current section', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.site-header');
  await expect(header).not.toHaveAttribute('data-floating');
  for (const id of ['work', 'services', 'process', 'about', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.evaluate(id => window.scrollTo({ top: document.getElementById(id)!.offsetTop - 110, behavior: 'instant' }), id);
    await expect(header).toHaveAttribute('data-floating', '');
    await expect(header).toBeInViewport();
    await expect(page.locator(`#primary-nav a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location');
    const rect = await header.boundingBox();
    expect(rect!.y).toBeGreaterThanOrEqual(0);
    expect(rect!.height).toBeLessThan(100);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(header).not.toHaveAttribute('data-floating');
});

test('motion is deferred until navigation interaction and honors reduced motion', async ({ page }) => {
  const modules: string[] = [];
  page.on('request', request => { if (/\/_astro\/.*\.js/.test(request.url())) modules.push(request.url()); });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(modules).toHaveLength(1);
  await page.locator('#work').scrollIntoViewIfNeeded();
  await expect.poll(() => modules.length).toBeGreaterThan(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0);
  await page.reload();
  modules.length = 0;
  await page.locator('#services').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-header')).toHaveAttribute('data-floating', '');
  expect(modules).toHaveLength(0);
});

test('tablet and mobile navigation opens without obstruction, closes outside and at resize', async ({ page }) => {
  for (const width of [320, 390, 768, 834, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const toggle = page.locator('.menu-toggle');
    if (width <= 800) {
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#primary-nav')).toBeInViewport();
      await page.locator('.menu-backdrop').click({ position: { x: 4, y: 450 } });
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await toggle.click();
      await page.setViewportSize({ width: 1100, height: 900 });
      await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#primary-nav')).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('offers explain one-time tiers and facts without unsupported comparison claims', async ({ page }) => {
  await page.goto('/');
  for (const [name, tier] of [['Starter', 'Basic On-Page SEO'], ['Business', 'Technical SEO setup'], ['Premium', 'Advanced On-Site SEO']]) {
    const plan = page.locator('.plan').filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(plan.locator('.seo-tier')).toHaveText(tier);
    await plan.locator('summary').click();
    await expect(plan.locator('.seo-details p')).toBeVisible();
    await plan.locator('summary').click();
  }
  await expect(page.locator('.scope-context')).toContainText('one-time');
  await expect(page.locator('.pricing-note')).toContainText('Backend systems');
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/most popular|real businesses\. real results|lowest price|within 24 hours|guaranteed growth/i);
  await expect(page.locator('.about-location')).toHaveText('Melaka, Malaysia');
  await expect(page.locator('.hero-description')).toContainText('websites');
});

test('short-height mobile disclosure keeps the final link and Escape reachable', async ({ page }) => {
  for (const [width, height] of [[390, 320], [700, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    const contact = page.locator('#primary-nav').getByRole('link', { name: 'Contact', exact: true });
    await contact.focus();
    await expect(contact).toBeInViewport();
    const panel = await page.locator('#primary-nav').boundingBox();
    expect(panel!.y + panel!.height).toBeLessThanOrEqual(height);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused();
  }
});

test('original scalable identity and favicon assets are served consistently', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('.brand [data-brand-mark]')).toHaveCount(2);
  for (const size of [16, 32, 48, 192, 512]) {
    const response = await request.get(size >= 192 ? `/icon-${size}.png` : `/favicon-${size}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const data = await response.body();
    expect(data.readUInt32BE(16)).toBe(size);
    expect(data.readUInt32BE(20)).toBe(size);
  }
  for (const mode of ['symbol', 'wordmark-inline', 'wordmark-stacked']) for (const variant of ['black', 'white', 'accent']) {
    const response = await request.get(`/assets/brand/${mode}-${variant}.svg`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('<path');
  }
});

test('approved dark-to-light silhouette and semantic artwork stay usable with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero .button')).toBeInViewport();
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.hero-scene img')).toHaveAttribute('alt', '');
    const colors = await page.evaluate(() => ({ paper: getComputedStyle(document.querySelector('.work-band')!).backgroundColor, accent: getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim(), animations: document.getAnimations().filter(a => a.playState === 'running').length }));
    expect(colors.paper).toBe('rgb(247, 248, 251)');
    expect(colors.accent).toBe('#7854bd');
    expect(colors.animations).toBe(0);
  }
});
