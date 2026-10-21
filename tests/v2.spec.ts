import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const endpoint = 'https://formspree.io/f/mljgyabo';
test.beforeEach(async ({page}) => { await page.route(endpoint, route => route.fulfill({status:503,json:{error:'Isolated test'}})); });

for (const slug of ['kilatmoto','makansedap','kopikita','malaysia']) {
  test(`${slug} case supports keyboard, focus and accessibility`,async ({page}) => {
    await page.goto('/');
    const trigger=page.locator(`.project-${slug} .project-preview`);
    await trigger.focus(); await page.keyboard.press('Enter');
    const dialog=page.locator(`#case-${slug}`);
    await expect(dialog).toBeVisible();
    expect(new URL(page.url()).searchParams.get('case')).toBe(slug);
    await expect(dialog.locator('.case-close')).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Tab');
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible(); await expect(trigger).toBeFocused();
  });
  test(`${slug} case history, direct entry and static fallback`,async ({page,request}) => {
    await page.goto('/');
    await page.locator(`.project-${slug} .project-preview`).click();
    const dialog=page.locator(`#case-${slug}`);
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await page.goForward(); await expect(dialog).toBeVisible();
    await page.goBack(); await expect(dialog).not.toBeVisible();
    await page.goto(`/?case=${slug}`); await expect(dialog).toBeVisible();
    await dialog.locator('.case-close').click(); await expect(dialog).not.toBeVisible();
    const response=await request.get(`/work/${slug}/`); expect(response.status()).toBe(200);
    await page.goto(`/work/${slug}/`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://www.ismailstudio.my/work/${slug}/`);
    expect((await page.locator('h1').count())).toBe(1);
    await expect(page.locator('.concept-label')).toContainText('Concept Project');
  });
}

test('three steps preserve values, exact payload, editing and deliberate package choice',async ({page})=>{
  let data='';
  await page.route(endpoint, async route=>{ data=route.request().postData()??''; await route.fulfill({status:200,json:{ok:true}}); });
  await page.goto('/');
  await expect(page.locator('#package')).toHaveValue('Not sure yet');
  await page.getByLabel('Name (required)',{exact:true}).fill('QA Tester');
  await page.getByLabel('Business name (optional)',{exact:true}).fill('Synthetic Studio');
  await page.getByLabel('Email (required)',{exact:true}).fill('qa@example.com');
  await page.getByRole('button',{name:'Next: project needs'}).click();
  await page.locator('#message').fill('A synthetic project description for isolated browser verification.');
  await page.locator('#timeline').selectOption('Within 1–3 months');
  await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  await expect(page.locator('#enquiry-review')).toContainText('qa@example.com');
  await page.getByRole('button',{name:'Edit project needs'}).click();
  await page.getByRole('button',{name:'Your details',exact:false}).click();
  await expect(page.locator('#name')).toHaveValue('QA Tester');
  await page.getByRole('link',{name:'Enquire about Premium',exact:true}).click();
  await expect(page.locator('#package')).toHaveValue('Premium');
  await expect(page.locator('#message')).toBeVisible();
  await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  await expect(page.locator('#enquiry-review')).toContainText('Premium');
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await expect(page.locator('#form-status')).toHaveAttribute('data-state','success');
  for (const value of ['QA Tester','Synthetic Studio','qa@example.com','Premium','Within 1–3 months','_gotcha','_subject']) expect(data).toContain(value);
  await expect(page.locator('#package')).toHaveValue('Not sure yet');
});

test('timeout preserves review and retry without false success',async ({page})=>{
  await page.route(endpoint,()=>{});
  await page.goto('/');
  await page.clock.install();
  await page.locator('#name').fill('QA Tester'); await page.locator('#email').fill('qa@example.com');
  await page.getByRole('button',{name:'Next: project needs'}).click();
  await page.locator('#message').fill('A synthetic description long enough to validate.');
  await page.getByRole('button',{name:'Review enquiry',exact:true}).click();
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await expect(page.locator('#quote-form')).toHaveAttribute('aria-busy','true');
  await page.clock.fastForward(21000);
  await expect(page.locator('#form-status')).toHaveAttribute('data-state','error');
  await expect(page.locator('#enquiry-review')).toContainText('qa@example.com');
  await expect(page.getByRole('button',{name:'Send enquiry',exact:true})).toBeEnabled();
});

test('no-JS full native form sends unchanged provider fields through isolated transport',async ({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage(); let data='';
  await page.route(endpoint,async route=>{data=route.request().postData()??''; await route.fulfill({status:200,contentType:'text/html',body:'<h1>Isolated provider acceptance</h1>'});});
  await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:4321');
  await expect(page.locator('#name')).toBeVisible(); await expect(page.locator('#message')).toBeVisible();
  await page.locator('#name').fill('QA Native'); await page.locator('#email').fill('qa@example.com'); await page.locator('#message').fill('A synthetic no-JavaScript native form verification.');
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Isolated provider acceptance'})).toBeVisible();
  expect(data).toContain('QA Native'); expect(data).toContain('_gotcha');
  await context.close();
});

test('no-JS direct study fallback remains readable',async ({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto((process.env.TEST_BASE_URL||'http://127.0.0.1:4321')+'/work/kilatmoto/');
  await expect(page.locator('h1')).toHaveText('KilatMoto');
  await context.close();
});

test('mobile dialogs, landscape and 400-percent equivalent reflow retain controls',async ({page})=>{
  for(const [width,height] of [[390,844],[844,390],[320,700]]) {
    await page.setViewportSize({width,height}); await page.goto('/?case=malaysia');
    await expect(page.locator('#case-malaysia .case-close')).toBeInViewport();
    await page.locator('#case-malaysia .button').scrollIntoViewIfNeeded();
    await expect(page.locator('#case-malaysia .button')).toBeInViewport();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.locator('#case-malaysia .case-close').click();
    await expect(page.locator('#case-malaysia')).not.toBeVisible();
  }
});
