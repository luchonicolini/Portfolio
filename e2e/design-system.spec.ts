import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const previewPath = '/es/dev/design-system';

test('the preview reflows at the approved viewport widths', async ({
  page
}) => {
  await page.goto(previewPath);

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    expect(
      documentWidth,
      `unexpected horizontal overflow at ${width}px`
    ).toBeLessThanOrEqual(width);

    const controls = page.locator('a:visible, button:visible');
    for (const control of await controls.all()) {
      const bounds = await control.boundingBox();
      expect(
        bounds?.height,
        `touch target height at ${width}px`
      ).toBeGreaterThanOrEqual(44);
    }
  }
});

test('keyboard focus, dialog, copy action and disabled state work', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(previewPath);

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS('outline-style', 'solid');

  const disabledButton = page
    .getByRole('button', { name: 'Deshabilitado' })
    .first();
  await expect(disabledButton).toBeDisabled();

  const primaryButton = page.getByRole('button', { name: 'Acción principal' });
  await primaryButton.hover();
  await expect(primaryButton).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await primaryButton.focus();
  await expect(primaryButton).toHaveCSS('outline-style', 'solid');

  await page
    .getByRole('button', { name: 'Ver ejemplos de movimiento' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Movimiento con propósito' })
  ).toBeInViewport();

  const dialogOpener = page.getByRole('button', {
    name: 'Abrir diálogo accesible'
  });
  await dialogOpener.click();
  const dialog = page.getByRole('dialog', { name: 'Diálogo de muestra' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(dialogOpener).toBeFocused();

  await page.getByRole('button', { name: 'Copiar token primario' }).click();
  await expect(page.getByRole('status')).toContainText('Token copiado.');
  const clipboardText = await page.evaluate(() =>
    navigator.clipboard.readText()
  );
  expect(clipboardText).toBe('--color-primary: #FFDE00');
  await expect(
    page.getByRole('button', { name: 'Ver ejemplos de movimiento' })
  ).toBeVisible();
});

test('language switcher preserves the preview route in English', async ({
  page
}) => {
  await page.goto(previewPath);
  await page.getByRole('link', { name: 'Cambiar idioma a inglés' }).click();
  await expect(page).toHaveURL(/\/en\/dev\/design-system$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Visual system, working parts.'
  );
});

test('the full document passes axe in Spanish and English', async ({
  page
}) => {
  for (const [path, title] of [
    [previewPath, 'Sistema visual, piezas de base.'],
    ['/en/dev/design-system', 'Visual system, working parts.']
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { level: 1, name: title })
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `axe violations at ${path}`).toEqual([]);
  }
});

test('Motion example follows reduced-motion preferences and supports layout changes', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(previewPath);
  await expect(page.getByText('prefers-reduced-motion: reduce')).toBeVisible();
  const motionGrid = page.locator('[data-layout]').first();
  await page.getByRole('button', { name: 'Lista' }).click();
  await expect(motionGrid).toHaveAttribute('data-layout', 'list');
  await page.getByRole('button', { name: 'Cuadrícula' }).click();
  await expect(motionGrid).toHaveAttribute('data-layout', 'grid');
});
