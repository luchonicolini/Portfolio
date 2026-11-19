import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Spanish and English bootstrap routes render and pass an axe scan', async ({
  page
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/es');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Fundación técnica lista' })
  ).toBeVisible();
  expect(
    await page.locator('html').evaluate((element) => element.scrollWidth)
  ).toBeLessThanOrEqual(320);
  const accessibility = await new AxeBuilder({ page })
    .include('main')
    .analyze();
  expect(accessibility.violations).toEqual([]);

  await page.goto('/en');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Technical foundation ready' })
  ).toBeVisible();
});
