import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('About page is accessible, responsive and verified across locales', async ({
  page
}) => {
  for (const locale of ['es', 'en']) {
    await page.goto(`/${locale}/about`);

    // Verify main headline
    const expectedHeadline = locale === 'es' ? /SOBRE MÍ/ : /ABOUT ME/;
    await expect(
      page.getByRole('heading', { level: 1, name: expectedHeadline })
    ).toBeVisible();

    // Verify intentional typographic portrait exists
    const avatarAriaLabel =
      locale === 'es'
        ? 'Insignia editorial de Luciano Nicolini'
        : 'Editorial badge of Luciano Nicolini';
    await expect(page.getByLabel(avatarAriaLabel)).toBeVisible();

    // Verify localized brand accessible name in header
    const brandAriaLabel =
      locale === 'es'
        ? 'LN. Luciano Nicolini — Inicio'
        : 'LN. Luciano Nicolini — Home';
    await expect(
      page.getByRole('banner').getByRole('link', { name: brandAriaLabel })
    ).toBeVisible();

    // Verify development profile (evidence-based, no unverified dates)
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: locale === 'es' ? /Perfil de desarrollo/ : /Development profile/
      })
    ).toBeVisible();
    await expect(page.getByText('Native iOS — Swift & SwiftUI')).toBeVisible();
    await expect(
      page.getByText('Cross-platform — Flutter & Dart')
    ).toBeVisible();
    await expect(
      page.getByText('Web engineering — Next.js & TypeScript')
    ).toBeVisible();
    await expect(
      page.getByText(
        locale === 'es'
          ? 'Current focus — Producto y accesibilidad'
          : 'Current focus — Product & accessibility'
      )
    ).toBeVisible();

    // Verify unverified dates are strictly absent
    await expect(page.getByText('2019')).toHaveCount(0);
    await expect(page.getByText('2022')).toHaveCount(0);
    await expect(page.getByText('2024')).toHaveCount(0);

    // Verify tech stack
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: locale === 'es' ? /Stack tecnológico/ : /Tech stack/
      })
    ).toBeVisible();
    await expect(page.getByText('Flutter').first()).toBeVisible();
    await expect(page.getByText('SwiftUI').first()).toBeVisible();
    await expect(page.getByText('Next.js').first()).toBeVisible();

    // Verify Nicolini Design independent initiative link
    const nicoliniLink = page.locator(
      'a[href="https://nicolini-design.vercel.app/"]'
    );
    await expect(nicoliniLink).toBeVisible();
    await expect(nicoliniLink).toHaveAttribute('target', '_blank');
    await expect(nicoliniLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify active navigation link
    const activeAboutNav = page
      .getByRole('navigation', { name: /Navegación principal|Main navigation/ })
      .getByRole('link', { name: locale === 'es' ? 'Sobre mí' : 'About' });
    await expect(activeAboutNav).toHaveAttribute('aria-current', 'page');

    // Verify responsive reflow across all 6 viewports
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
    }

    // Axe accessibility scan across full rendered document
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
});

test('Contact page is accessible, responsive and protects production fixtures', async ({
  page
}) => {
  for (const locale of ['es', 'en']) {
    await page.goto(`/${locale}/contact`);

    // Verify headline and envelope artwork
    const expectedHeadline = locale === 'es' ? /HABLEMOS/ : /LET'S TALK/;
    await expect(
      page.getByRole('heading', { level: 1, name: expectedHeadline })
    ).toBeVisible();
    await expect(
      page.getByLabel(
        'Ilustración geométrica neo-brutalista de un sobre de correspondencia'
      )
    ).toBeVisible();

    // Verify verified GitHub destination
    const githubLink = page.locator(
      'a[href="https://github.com/luchonicolini"]'
    );
    await expect(githubLink.first()).toBeVisible();

    // Verify contact@example.com is absent from page content
    const pageText = await page.content();
    expect(pageText).not.toContain('contact@example.com');
    expect(pageText).not.toContain('Copiar email de prueba');
    expect(pageText).not.toContain('Copy test email');
    expect(pageText).not.toContain('Fixture de desarrollo');

    // Verify active navigation link
    const activeContactNav = page
      .getByRole('navigation', { name: /Navegación principal|Main navigation/ })
      .getByRole('link', { name: locale === 'es' ? 'Contacto' : 'Contact' });
    await expect(activeContactNav).toHaveAttribute('aria-current', 'page');

    // Verify responsive reflow across all 6 viewports
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
    }

    // Axe accessibility scan across full rendered document
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
});

test('secondary navigation language switching and nonmodal disclosure menu work on About & Contact', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/about');

  // Verify hamburger button and localized brand accessible name
  await expect(
    page
      .getByRole('banner')
      .getByRole('link', { name: 'LN. Luciano Nicolini — Inicio' })
  ).toBeVisible();
  const menuBtn = page.getByRole('button', { name: 'Abrir menú' });
  await expect(menuBtn).toBeVisible();
  await menuBtn.click();
  await expect(
    page.getByRole('button', { name: 'Cerrar menú' })
  ).toHaveAttribute('aria-expanded', 'true');

  // Close with Escape and verify focus restoration
  await page.keyboard.press('Escape');
  await expect(menuBtn).toBeFocused();
  await expect(
    page.getByRole('button', { name: 'Abrir menú' })
  ).toHaveAttribute('aria-expanded', 'false');

  // Test language switcher preserves /about route in English
  await menuBtn.click();
  await page.getByRole('link', { name: /Cambiar idioma a inglés/ }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(
    page.getByRole('heading', { level: 1, name: /ABOUT ME/ })
  ).toBeVisible();
  await expect(
    page
      .getByRole('banner')
      .getByRole('link', { name: 'LN. Luciano Nicolini — Home' })
  ).toBeVisible();

  // Navigate to /en/contact
  await page.goto('/en/contact');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: /Switch language to Spanish/ }).click();
  await expect(page).toHaveURL(/\/es\/contact$/);
  await expect(
    page.getByRole('heading', { level: 1, name: /HABLEMOS/ })
  ).toBeVisible();
});

test('capture About and Contact screenshots', async ({ page }) => {
  // About Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/es/about', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/about-desktop.png',
    fullPage: true
  });

  // About Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/about', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/about-mobile.png',
    fullPage: true
  });

  // Contact Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/es/contact', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/contact-desktop.png',
    fullPage: true
  });

  // Contact Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es/contact', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'docs/screenshots/contact-mobile.png',
    fullPage: true
  });
});
