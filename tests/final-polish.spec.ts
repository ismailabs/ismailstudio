import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const endpoint = 'https://formspree.io/f/mljgyabo';
const canonical = 'https://www.ismailstudio.my';
const concepts = [
  { slug: 'kilatmoto', name: 'KilatMoto' },
  { slug: 'makansedap', name: 'MakanSedap' },
  { slug: 'kopikita', name: 'KopiKita' },
  { slug: 'malaysia', name: 'Malaysia — Between Places' },
] as const;

test.beforeEach(async ({ page }) => {
  // Browser checks must never submit to the real provider.
  await page.route(endpoint, route => route.fulfill({ status: 503, json: { error: 'Isolated final-polish transport' } }));
});

for (const [width, height] of [[320, 700], [360, 780], [390, 780], [430, 932], [667, 375], [844, 390], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]]) {
  test(`approved hero remains semantic and usable at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toHaveText('BUILT FOR BIGGER PROBLEMS.');
    await expect(heading).toBeVisible();
    const image = page.locator('.hero-scene img');
    await expect(image).toHaveAttribute('alt', '');
    await expect(image).toHaveAttribute('fetchpriority', 'high');
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    expect(await image.evaluate((node: HTMLImageElement) => new URL(node.currentSrc).pathname)).toBe(width <= 600 ? '/assets/hero-mobile.webp' : '/assets/hero-desktop.webp');
    for (const name of ['Get a website quote', 'Explore my work']) {
      const link = page.locator('.hero').getByRole('link', { name, exact: false });
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test('mobile overlay contains keyboard focus, locks background and restores the trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await expect(toggle).toHaveAccessibleName('Open menu');
  await expect(toggle).toHaveAttribute('aria-controls', 'primary-nav');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAccessibleName('Close menu');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Work', exact: true })).toBeFocused();
  expect(await page.locator('#main').evaluate((node: HTMLElement) => node.inert)).toBe(true);
  expect(await page.evaluate(() => [document.documentElement, document.body].some(node => /hidden|clip/.test(getComputedStyle(node).overflowY)))).toBe(true);
  const panel = await nav.boundingBox();
  expect(panel!.height).toBeGreaterThan(780 * 0.7);
  for (const link of await nav.getByRole('link').all()) {
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
  for (const key of ['Shift+Tab', ...Array<string>(12).fill('Tab')]) {
    await page.keyboard.press(key);
    expect(await page.locator('.site-header').evaluate(node => node.contains(document.activeElement))).toBe(true);
    expect(await page.locator('#main').evaluate(node => node.contains(document.activeElement))).toBe(false);
  }
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAccessibleName('Open menu');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(await page.locator('#main').evaluate((node: HTMLElement) => node.inert)).toBe(false);
});

test('mobile overlay closes by trigger, backdrop, anchor and desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  // The center of the backdrop is covered by the panel; its exposed edge is the outside target.
  await page.locator('.menu-backdrop').click({ position: { x: 4, y: 390 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#primary-nav').getByRole('link', { name: 'Offers', exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#services')).toBeInViewport();
  expect(await page.locator('#main').evaluate((node: HTMLElement) => node.inert)).toBe(false);
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).not.toBeVisible();
  await expect(page.locator('#primary-nav')).toBeVisible();
  expect(await page.locator('#main').evaluate((node: HTMLElement) => node.inert)).toBe(false);
  expect(await page.evaluate(() => [document.documentElement, document.body].every(node => !/hidden|clip/.test(getComputedStyle(node).overflowY)))).toBe(true);
});

test('short landscape menu keeps final link and close action available', async ({ page }) => {
  for (const [width, height] of [[667, 375], [780, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const toggle = page.locator('.menu-toggle');
    await toggle.click();
    const contact = page.locator('#primary-nav').getByRole('link', { name: 'Contact', exact: true });
    await contact.focus();
    await expect(contact).toBeInViewport();
    await expect(toggle).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test('entrance cues keep text visible and reveal each section only once', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const heading = page.locator('#work-heading');
  await expect(heading).toHaveAttribute('data-reveal', '');
  expect(await heading.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute('data-revealed', 'true');
  await heading.evaluate(async node => { await Promise.allSettled(node.getAnimations().map(animation => animation.finished)); });
  await page.locator('#about').scrollIntoViewIfNeeded();
  await heading.scrollIntoViewIfNeeded();
  expect(await heading.evaluate(node => node.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
  const movingHighlights = await page.locator('.iridescent').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').map(node => Boolean(node.closest('.hero'))));
  expect(movingHighlights.length).toBeGreaterThan(0);
  expect(movingHighlights.every(Boolean)).toBe(true);
});

test('reduced motion shows all content and changes mobile navigation without running animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/');
  for (const heading of await page.locator('main h2').all()) {
    expect(await heading.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
    expect(await heading.evaluate(node => getComputedStyle(node).transform)).toBe('none');
  }
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.locator('#primary-nav')).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused();
});

test('working-day delivery estimates retain all conditions and commercial boundaries', async ({ page }) => {
  await page.goto('/');
  for (const [name, days] of [['Starter', 2], ['Business', 3], ['Premium', 7]] as const) {
    const plan = page.locator('.plan').filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(plan).toContainText(new RegExp(`${days} working days`, 'i'));
    await expect(plan).toContainText(/estimat/i);
  }
  const text = await page.locator('body').innerText();
  expect(text).toMatch(/Monday\s*[–—-]\s*Friday|Monday to Friday/i);
  expect(text).toMatch(/excluding[^.]*Malaysian public holidays/i);
  expect(text).toMatch(/scope[^.]*agreed|agreed[^.]*scope/i);
  expect(text).toMatch(/required[^.]*materials/i);
  expect(text).toMatch(/initial[^.]*payment/i);
  expect(text).toMatch(/written start date/i);
  expect(text).toMatch(/not guaranteed|not a guaranteed|not guarantees/i);
  expect(text).not.toMatch(/48\s*(?:working\s*)?hours|most popular|guaranteed (?:growth|ranking|completion)|\d+%\s*(?:deposit|upfront)/i);
  await expect(page.locator('.pricing-note')).toContainText(/separate|separately/i);
});

test('FAQ disclosures work by keyboard and cover the approved decision points', async ({ page }) => {
  await page.goto('/');
  const details = page.locator('.faq-list details');
  expect(await details.count()).toBeGreaterThan(0);
  for (const detail of await details.all()) {
    const summary = detail.locator('summary');
    await summary.focus();
    await page.keyboard.press('Space');
    await expect(detail).toHaveAttribute('open');
    await expect(detail.locator('.faq-answer')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(detail).not.toHaveAttribute('open');
  }
  const text = await page.locator('.faq-list').textContent() ?? '';
  for (const intent of [/quote/i, /materials|business details|provide/i, /domain/i, /source|access|handover/i, /working days/i, /revision/i, /updates/i, /hosting/i, /Google|search engines/i, /booking/i, /payment/i, /WhatsApp/i, /enquiry|enquire/i]) expect(text).toMatch(intent);
});

test('homepage and authentic concept routes expose truthful unique search metadata', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Ismail Studio');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Melaka.*Malaysia|Malaysia.*Melaka/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${canonical}/`);
  await expect(page.locator('html')).toHaveAttribute('lang', /^en(?:-MY)?$/i);
  const siteSchema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
  expect(siteSchema).toMatchObject({ '@type': 'WebSite', url: `${canonical}/` });
  expect(JSON.stringify(siteSchema)).not.toMatch(/aggregateRating|reviewRating|streetAddress|openingHours|taxID/);
  const descriptions = new Set<string>();
  const titles = new Set<string>();
  for (const { slug, name } of concepts) {
    await page.goto(`/work/${slug}/`);
    await expect(page).toHaveTitle(new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*Ismail Studio`));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${canonical}/work/${slug}/`);
    await expect(page.locator('.concept-label')).toContainText('Concept Project');
    await expect(page.locator('a[href="https://' + slug + '.ismailstudio.my/"]')).toHaveCount(1);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(30);
    descriptions.add(description ?? '');
    titles.add(await page.title());
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
    expect(schema).toMatchObject({ '@type': 'WebPage', url: `${canonical}/work/${slug}/` });
    expect(JSON.stringify(schema)).not.toMatch(/aggregateRating|reviewRating|streetAddress|openingHours|taxID/);
  }
  expect(titles.size).toBe(4);
  expect(descriptions.size).toBe(4);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ['/', ...concepts.map(({ slug }) => `/work/${slug}/`)]) expect(xml).toContain(`${canonical}${path}`);
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain(`Sitemap: ${canonical}/sitemap.xml`);
});

test('blocked decorative images leave the hero and primary enquiry action usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.route('**/*', route => route.request().resourceType() === 'image' ? route.abort('failed') : route.fallback());
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('BUILT FOR BIGGER PROBLEMS.');
  await expect(page.locator('.hero-description')).toBeVisible();
  await page.locator('.hero').getByRole('link', { name: 'Get a website quote', exact: false }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
  await page.locator('#name').scrollIntoViewIfNeeded();
  await expect(page.locator('#name')).toBeInViewport();
  await page.locator('#name').fill('Synthetic image-failure check');
  await expect(page.locator('#name')).toHaveValue('Synthetic image-failure check');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('no-JavaScript mobile content, menu and estimate conditions remain readable without imagery', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 780 } });
  await context.route(endpoint, route => route.fulfill({ status: 503, json: { error: 'Isolated no-JS transport' } }));
  await context.route('**/*', route => route.request().resourceType() === 'image' ? route.abort('failed') : route.fallback());
  const page = await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const name of ['Work', 'Offers', 'Approach', 'About', 'Contact']) await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  await nav.getByRole('link', { name: 'Offers', exact: true }).click();
  await expect(page.locator('#services')).toBeInViewport();
  await expect(page.locator('#services')).toContainText('2 working days');
  await expect(page.locator('#services')).toContainText('written start date');
  for (const heading of await page.locator('main h2').all()) expect(await heading.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  await context.close();
});
