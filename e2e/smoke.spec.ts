import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('localized home is accessible and responsive with all sections', async ({
  page
}) => {
  for (const locale of ['es', 'en']) {
    await page.goto(`/${locale}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /LUCIANO\s*NICOLINI/
    );

    // Verify all primary home sections exist
    await expect(page.locator('#work')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#lab')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Verify Selected Work featured projects
    await expect(
      page.getByRole('heading', { name: 'Puente', level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'DolarTo', level: 3 })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'StitchHub', level: 3 })
    ).toBeVisible();

    // Verify verified GitHub destination
    await expect(
      page.locator('a[href="https://github.com/luchonicolini"]').first()
    ).toBeVisible();

    // Verify responsive reflow across all 6 target widths
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
    }

    // Axe accessibility scan across full rendered document
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }

  const response = await page.goto('/es/dev/design-system');
  expect(response?.status()).toBe(404);
});

test('mobile menu works with keyboard, navigation anchors and language switch', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es?source=review#main');

  // Verify Hero primary CTA links to #work
  const exploreWork = page.getByRole('link', { name: 'VER PROYECTOS' });
  await expect(exploreWork).toHaveAttribute('href', '#work');

  // Open menu
  const menu = page.getByRole('button', { name: 'Abrir menú' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Cerrar menú' })
  ).toHaveAttribute('aria-expanded', 'true');

  // Verify navigation anchor inside drawer
  const workLink = page
    .getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: 'Proyectos' });
  await expect(workLink).toHaveAttribute('href', '#work');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();

  // Test language switcher
  await menu.click();
  await page.getByRole('link', { name: /Cambiar idioma a inglés/ }).click();
  await expect(page).toHaveURL(/\/en\?source=review#main$/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('developer lab preview widget is genuinely interactive', async ({
  page
}) => {
  await page.goto('/es');
  const labSection = page.locator('#lab');
  await expect(labSection).toBeVisible();

  // Find preview button inside lab
  const pressBtn = labSection.getByRole('button', { name: /PULSAR AQUÍ/ });
  await expect(pressBtn).toBeVisible();
  await expect(
    labSection.getByText('Pulsaciones registradas: 0')
  ).toBeVisible();

  // Click button
  await pressBtn.click();
  await expect(
    labSection.getByText('Pulsaciones registradas: 1')
  ).toBeVisible();

  // Click again
  await pressBtn.click();
  await expect(
    labSection.getByText('Pulsaciones registradas: 2')
  ).toBeVisible();
});

test('capture home screenshots', async ({ page }) => {
  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/es', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/home-desktop.png',
    fullPage: true
  });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/home-mobile.png',
    fullPage: true
  });
});
