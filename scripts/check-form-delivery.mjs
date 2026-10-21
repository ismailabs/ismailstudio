import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// One intentional real submission to the owner-authorized mailbox.
// No submission contents are persisted in evidence or browser traces.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const scope = new URL(base).hostname === 'www.ismailstudio.my' ? 'production-v2' : new URL(base).hostname === '127.0.0.1' ? 'local-v2' : 'preview-v2';
const marker = `ISM-${scope.toUpperCase()}-${new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByLabel('Name (required)', { exact: true }).fill('Ismail Studio release check');
  await page.getByLabel('Email (required)', { exact: true }).fill('contact@ismailstudio.my');
  await page.getByRole('button', { name: 'Next: project needs', exact: true }).click();
  await page.getByLabel('Package', { exact: true }).selectOption('Not sure yet');
  await page.getByLabel('What does your business need?', { exact: false }).fill(`Authorized website delivery verification ${marker}. This is a release test, not a customer enquiry. Please confirm this message reached the Zoho contact mailbox.`);
  await page.locator('input[name="_subject"]').evaluate((field, marker) => { field.value = `Ismail Studio delivery check ${marker}`; }, marker);
  await page.getByRole('button', { name: 'Review enquiry', exact: true }).click();
  const responsePromise = page.waitForResponse((response) => response.url() === 'https://formspree.io/f/mljgyabo' && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  const response = await responsePromise;
  const payload = await response.json();
  await page.locator('#quote-form:not([aria-busy])').waitFor();
  const state = await page.locator('#form-status').getAttribute('data-state');
  const evidence = { marker, scope, url: base, checkedAt: new Date().toISOString(), providerHttp: response.status(), providerAccepted: response.ok() && payload?.ok === true, uiState: state, zohoReceipt: 'PENDING_DIRECT_CONFIRMATION' };
  await mkdir('docs/redesign/evidence', { recursive: true });
  await writeFile(`docs/redesign/evidence/form-${scope}.json`, JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ ...evidence, providerError: payload?.errors?.map((error) => ({ code: error.code, message: error.message })) }));
  if (state === 'success') {
    await mkdir('.local/screenshots', { recursive: true });
    await page.locator('#contact').screenshot({ path: `.local/screenshots/form-${scope}-accepted.png` });
  }
  if (!evidence.providerAccepted || state !== 'success') process.exitCode = 1;
} finally { await browser.close(); }
