import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('localized home is accessible and responsive', async ({ page }) => {
  for (const locale of ['es', 'en']) {
    await page.goto(`/${locale}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /LUCIANO\s*NICOLINI/
    );
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
  const response = await page.goto('/es/dev/design-system');
  expect(response?.status()).toBe(404);
});

test('mobile menu works with keyboard and language switch', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es?source=review#main');
  const menu = page.getByRole('button', { name: 'Abrir menú' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Cerrar menú' })
  ).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('link', { name: /Cambiar idioma a inglés/ }).click();
  await expect(page).toHaveURL(/\/en\?source=review#main$/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
