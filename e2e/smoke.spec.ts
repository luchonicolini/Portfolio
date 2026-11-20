import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Spanish and English production routes render and the full document passes axe', async ({
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
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);

  await page.goto('/en');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Technical foundation ready' })
  ).toBeVisible();
  const englishAccessibility = await new AxeBuilder({ page }).analyze();
  expect(englishAccessibility.violations).toEqual([]);

  const previewResponse = await page.goto('/es/dev/design-system');
  expect(previewResponse?.status()).toBe(404);
});
