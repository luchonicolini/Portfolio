import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('work filters persist in the URL and history', async ({ page }) => {
  await page.goto('/es/work');
  await expect(page.getByText('7 proyectos')).toBeVisible();
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page).toHaveURL(/category=mobile/);
  await expect(page.getByText('2 proyectos')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Puente' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'DolarTo' })).toHaveCount(0);
  await page.goBack();
  await expect(page.getByText('7 proyectos')).toBeVisible();
  await page.goForward();
  await expect(page.getByText('2 proyectos')).toBeVisible();
  await page.getByRole('link', { name: /Cambiar idioma a inglés/ }).click();
  await expect(page).toHaveURL(/\/en\/work\?category=mobile/);
});

test('all localized cases render and unknown slugs return 404', async ({
  page
}) => {
  for (const locale of ['es', 'en']) {
    for (const slug of [
      'puente',
      'dolarto',
      'stitchhub',
      'leadradar',
      'rial-electronica',
      'scopeguard',
      'nicolini-design'
    ]) {
      const response = await page.goto(`/${locale}/work/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
    expect((await page.goto(`/${locale}/work/unknown`))?.status()).toBe(404);
  }
});

test('work and a case reflow and pass full document axe', async ({ page }) => {
  for (const locale of ['es', 'en']) {
    for (const path of ['work', 'work/puente', 'work/stitchhub']) {
      await page.goto(`/${locale}/${path}`);
      for (const width of [320, 390, 768, 1024, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth)
        ).toBeLessThanOrEqual(width);
      }
      expect(
        (await new AxeBuilder({ page }).exclude('.ph-no-capture').analyze())
          .violations
      ).toEqual([]);
    }
  }
});

test('capture review screenshots after assets settle', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [path, name] of [
    ['work', 'work'],
    ['work/puente', 'puente-detail'],
    ['work/stitchhub', 'stitchhub-detail'],
    ['work/nicolini-design', 'nicolini-design-detail']
  ]) {
    for (const [width, height, size] of [
      [1440, 900, 'desktop'],
      [390, 844, 'mobile']
    ] as const) {
      await page.setViewportSize({ width, height });
      await page.goto(`/es/${path}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map((image) => image.decode()));
      });
      await expect
        .poll(() =>
          page.evaluate(() =>
            [...document.images].every((image) => image.naturalWidth > 0)
          )
        )
        .toBe(true);
      await page.screenshot({
        path: `docs/screenshots/${name}-${size}.png`,
        fullPage: true
      });
    }
  }
});
