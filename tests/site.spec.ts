import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const endpoint = 'https://formspree.io/f/mljgyabo';
test.beforeEach(async ({ page }) => {
  // Tests are isolated: no automated test is allowed to send real enquiries.
  await page.route(endpoint, (route) => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Test transport is isolated"}' }));
});

async function fillEnquiry(page: Page) {
  await page.getByLabel('Name (required)', { exact: true }).fill('Release Test');
  await page.getByLabel('Email (required)', { exact: true }).fill('test@example.com');
  await page.getByRole('button', { name: 'Next: project needs' }).click();
  await page.getByLabel('What does your business need?', { exact: false }).fill('A clear website to explain our services and project scope.');
  await page.getByRole('button', { name: 'Review enquiry', exact: true }).click();
}

for (const width of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
  test(`content, layout and accessibility at ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    await page.evaluate(async () => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('BUILT FOR BIGGER PROBLEMS.');
    await expect(page.locator('.project-preview .concept-label')).toHaveCount(4);
    await expect(page.locator('.project-preview img')).toHaveCount(4);
    for (const [name, price, pages, revisions] of [
      ['Starter', 'RM599', '1 page', '1 revision round'],
      ['Business', 'RM1,299', 'Up to 5 pages', '2 revision rounds'],
      ['Premium', 'RM2,999', 'Up to 12 pages', '2 revision rounds'],
    ]) {
      const plan = page.locator('.plan').filter({ has: page.getByRole('heading', { name, exact: true }) });
      await expect(plan.locator('.price')).toHaveText(`From ${price}`);
      await expect(plan.locator('.page-scope')).toHaveText(pages);
      await expect(plan).toContainText(revisions);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    expect(overflow).toBe(false);
    // Exercise native lazy loading at its actual scroll position.
    for (const image of await page.locator('img').all()) {
      if (!(await image.isVisible())) {
        expect((await page.request.get(await image.getAttribute('src') ?? '')).status()).toBe(200);
        continue;
      }
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('metadata, anchors, external links and published routes', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Ismail Studio | Web Design & Frontend Development in Melaka, Malaysia');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.ismailstudio.my/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://www.ismailstudio.my/og-image.png');
  const badAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? '').filter((href) => !document.getElementById(href.slice(1))));
  expect(badAnchors).toEqual([]);
  for (const slug of ['kilatmoto', 'makansedap', 'kopikita', 'malaysia']) {
    await expect(page.locator(`a.project-live[href="https://${slug}.ismailstudio.my/"]`)).toHaveAttribute('rel', 'noopener noreferrer');
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/og-image.png']) expect((await request.get(path)).status()).toBe(200);
  for (const path of ['/docs/02-copy-final.md', '/.env', '/package.json', '/assets/../.git/config', '/unknown-route/']) expect((await request.get(path)).status()).toBe(404);
  const schema: unknown = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
  expect(schema).toMatchObject({ '@type': 'WebSite', url: 'https://www.ismailstudio.my/' });
});

test('package selection, native FAQ and keyboard skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  for (const plan of ['Starter', 'Business', 'Premium']) {
    await page.getByRole('link', { name: `Enquire about ${plan}`, exact: true }).click();
    await expect(page.getByLabel('Package', { exact: true })).toHaveValue(plan);
    expect(new URL(page.url()).hash).toBe('#contact');
  }
  const question = page.locator('.faq-list summary').filter({ hasText: 'Can I update my website later?' });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Yes. Updates can be arranged through manual code changes', { exact: false })).toBeVisible();
});

test('mobile menu opens, closes on Escape and follows anchors', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Offers', exact: true }).click();
  expect(new URL(page.url()).hash).toBe('#services');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('form rejects invalid, too short and oversized values without network', async ({ page }) => {
  let posts = 0;
  await page.route(endpoint, async (route) => { posts++; await route.fulfill({ status: 200, json: { ok: true } }); });
  await page.goto('/');
  const next = page.getByRole('button', { name: 'Next: project needs', exact: true });
  await next.click();
  await expect(page.getByLabel('Name (required)', { exact: true })).toBeFocused();
  await expect(page.locator('#form-status')).toContainText('Please check');
  await page.getByLabel('Name (required)', { exact: true }).fill('Release Test');
  await page.getByLabel('Email (required)', { exact: true }).fill('bad-email');
  await next.click();
  await expect(page.locator('#email-error')).toContainText('valid email');
  await page.getByLabel('Email (required)', { exact: true }).fill('test@example.com');
  await next.click();
  const review = page.getByRole('button', { name: 'Review enquiry', exact: true });
  await page.getByLabel('What does your business need?', { exact: false }).fill('too short');
  await review.click();
  await expect(page.locator('#message-error')).toContainText('at least 20');
  await page.locator('#message').evaluate((field: HTMLTextAreaElement) => { field.value = 'a'.repeat(2001); });
  await review.click();
  await expect(page.locator('#message-error')).toContainText('2000 characters or fewer');
  expect(posts).toBe(0);
});

test('simulated provider acceptance has loading, one request, reset and accessible success', async ({ page }) => {
  let resolveRequest: (() => void) | undefined;
  const released = new Promise<void>((resolve) => { resolveRequest = resolve; });
  let posts = 0;
  await page.route(endpoint, async (route) => { posts++; await released; await route.fulfill({ status: 200, json: { ok: true } }); });
  await page.goto('/');
  await fillEnquiry(page);
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  await expect(page.locator('#quote-form')).toHaveAttribute('aria-busy', 'true');
  await page.locator('#quote-form').evaluate((form: HTMLFormElement) => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  resolveRequest?.();
  await expect(page.getByRole('status')).toContainText('your enquiry has been submitted');
  await expect(page.getByLabel('Name (required)', { exact: true })).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Next: project needs', exact: true })).toBeEnabled();
  expect(posts).toBe(1);
});

for (const failure of ['provider', 'network', 'unconfirmed']) {
  test(`simulated ${failure} failure preserves content and offers retry`, async ({ page }) => {
    await page.route(endpoint, (route) => failure === 'network' ? route.abort('failed') : route.fulfill({ status: failure === 'provider' ? 429 : 200, json: failure === 'provider' ? { error: 'Rate limited' } : { unexpected: true } }));
    await page.goto('/');
    await fillEnquiry(page);
    await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
    await expect(page.getByRole('status')).toContainText("Your enquiry wasn't sent");
    await expect(page.getByLabel('Email (required)', { exact: true })).toHaveValue('test@example.com');
    await expect(page.getByRole('button', { name: 'Send enquiry', exact: true })).toBeEnabled();
  });
}

test('no-JavaScript content, navigation, FAQ and native provider POST survive', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.locator('#quote-form')).toHaveAttribute('action', endpoint);
  await expect(page.locator('#quote-form')).toHaveAttribute('method', 'post');
  await page.locator('.faq-list summary').filter({ hasText: 'How many revisions are included?' }).click();
  await expect(page.getByText('Starter includes one revision round.', { exact: false })).toBeVisible();
  await context.close();
});

test('reduced motion, forced colors, 200% equivalent reflow and privacy', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/');
  const animated = await page.locator('[data-reveal], .hero-art img').evaluateAll((nodes) => nodes.some((node) => getComputedStyle(node).animationName !== 'none'));
  expect(animated).toBe(false);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.email-fallback a')).toHaveAttribute('href', 'mailto:contact@ismailstudio.my');
  expect(await page.locator('a[href*="wa.me"],a[href*="whatsapp"],input[type="tel"]').count()).toBe(0);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});
