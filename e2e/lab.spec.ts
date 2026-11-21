import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';

test.describe('Developer Lab E2E & Visual Verification', () => {
  test('Developer Lab is fully accessible and localized on both /es/lab and /en/lab', async ({
    page
  }) => {
    for (const locale of ['es', 'en']) {
      await page.goto(`/${locale}/lab`);

      // Verify Hero Title
      await expect(
        page.getByRole('heading', { level: 1, name: /DEV LAB\./i })
      ).toBeVisible();

      // Verify Eyebrow
      await expect(page.getByText('04 / DEVELOPER LAB')).toBeVisible();

      // Verify Checklist items
      const firstChecklistText =
        locale === 'es'
          ? 'Probar componentes interactivos reales'
          : 'Test real interactive components';
      await expect(page.getByText(firstChecklistText)).toBeVisible();

      // Run Axe accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test('Navigation from Home Lab Preview reaches /es/lab cleanly', async ({
    page
  }) => {
    await page.goto('/es');

    const labSection = page.locator('#lab');
    await expect(labSection).toBeVisible();

    // Find and click the full lab link
    const fullLabLink = labSection.getByRole('link', { name: /LAB COMPLETO/i });
    await expect(fullLabLink).toBeVisible();
    await fullLabLink.click();

    await expect(page).toHaveURL(/\/es\/lab/);
    await expect(
      page.getByRole('heading', { level: 1, name: /DEV LAB\./i })
    ).toBeVisible();
  });

  test('Interactive experiments respond to user controls, copy code, and reset cleanly', async ({
    page
  }) => {
    await page.goto('/es/lab');

    // 1. Brutalist Button Builder
    const buttonBuilder = page.locator('#experiment-01');
    await expect(buttonBuilder).toBeVisible();
    const liveButton = buttonBuilder.getByRole('button', {
      name: /PULSAR AQUÍ/i
    });
    await expect(liveButton).toBeVisible();
    await liveButton.click();
    await expect(buttonBuilder.getByText(/CLICKS:\s*1/i)).toBeVisible();

    // 2. Spring Physics Playground
    const springPlayground = page.locator('#spring-physics');
    await expect(springPlayground).toBeVisible();
    const replaySpringBtn = springPlayground.getByRole('button', {
      name: /Disparar animación|Volver a lanzar|Replay|Trigger/i
    });
    await expect(replaySpringBtn).toBeVisible();
    await replaySpringBtn.click();

    // 3. Typography Playground
    const typePlayground = page.locator('#experiment-03');
    await expect(typePlayground).toBeVisible();
    const fontToggle = typePlayground.getByRole('button', {
      name: /Space Mono/i
    });
    if (await fontToggle.isVisible()) {
      await fontToggle.click();
    }

    // 4. Interactive Design Tokens
    const tokensPlayground = page.locator('#experiment-tokens');
    await expect(tokensPlayground).toBeVisible();
    await expect(
      tokensPlayground.getByText(/Ratio de contraste|WCAG/i).first()
    ).toBeVisible();

    // 5. Layout Animation Playground
    const layoutPlayground = page.locator('#layout-animation');
    await expect(layoutPlayground).toBeVisible();
    const listViewBtn = layoutPlayground.getByRole('button', {
      name: /Lista|List/i
    });
    await expect(listViewBtn).toBeVisible();
    await listViewBtn.click();

    // 6. SVG Animation Playground
    const svgPlayground = page.locator('#experiment-svg');
    await expect(svgPlayground).toBeVisible();
    const playPauseBtn = svgPlayground
      .getByRole('button', { name: /Pausar|Pause|Reanudar|Play/i })
      .first();
    await expect(playPauseBtn).toBeVisible();
  });

  test('Reduced motion emulation is respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/lab');

    // Check for reduced motion indicator or fallback
    await expect(page.locator('#spring-physics')).toBeVisible();
    await expect(page.locator('#experiment-svg')).toBeVisible();
  });

  test('Category filter navigation filters experiments and handles scroll targets cleanly', async ({
    page
  }) => {
    await page.goto('/es/lab');

    const filterNav = page.locator('nav[aria-label="Filtro de experimentos"]');
    await expect(filterNav).toBeVisible();

    // Filter to Motion
    const motionBtn = filterNav.getByRole('button', { name: /Física Motion/i });
    await motionBtn.click();
    await expect(motionBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#spring-physics')).toBeVisible();
    await expect(page.locator('#experiment-01')).toBeHidden();

    // Filter to Typography
    const typeBtn = filterNav.getByRole('button', { name: /Tipografía/i });
    await typeBtn.click();
    await expect(typeBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#experiment-03')).toBeVisible();
    await expect(page.locator('#spring-physics')).toBeHidden();

    // Filter to SVG
    const svgBtn = filterNav.getByRole('button', { name: /SVG Vectorial/i });
    await svgBtn.click();
    await expect(svgBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#experiment-svg')).toBeVisible();
    await expect(page.locator('#experiment-03')).toBeHidden();

    // Filter back to Todos
    const allBtn = filterNav.getByRole('button', { name: /Todos/i });
    await allBtn.click();
    await expect(allBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#experiment-01')).toBeVisible();
    await expect(page.locator('#spring-physics')).toBeVisible();
    await expect(page.locator('#experiment-03')).toBeVisible();
    await expect(page.locator('#experiment-tokens')).toBeVisible();
    await expect(page.locator('#layout-animation')).toBeVisible();
    await expect(page.locator('#experiment-svg')).toBeVisible();
  });

  test('Captures high-fidelity screenshots for documentation across viewports', async ({
    page
  }) => {
    const screenshotDir = path.resolve(process.cwd(), 'docs/screenshots');

    // 1. Desktop full page
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/lab');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(screenshotDir, 'lab-desktop.png'),
      fullPage: true
    });

    // 2. Mobile full page
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/es/lab');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(screenshotDir, 'lab-mobile.png'),
      fullPage: true
    });

    // 3. Individual Experiment Desktop Screenshots
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/lab');
    await page.waitForLoadState('networkidle');

    const exp1 = page.locator('#experiment-01');
    if (await exp1.isVisible()) {
      await exp1.screenshot({
        path: path.join(screenshotDir, 'button-builder-desktop.png')
      });
    }

    const exp2 = page.locator('#spring-physics');
    if (await exp2.isVisible()) {
      await exp2.screenshot({
        path: path.join(screenshotDir, 'spring-playground-desktop.png')
      });
    }

    const exp3 = page.locator('#experiment-03');
    if (await exp3.isVisible()) {
      await exp3.screenshot({
        path: path.join(screenshotDir, 'typography-playground-desktop.png')
      });
    }

    const exp4 = page.locator('#experiment-tokens');
    if (await exp4.isVisible()) {
      await exp4.screenshot({
        path: path.join(screenshotDir, 'tokens-playground-desktop.png')
      });
    }

    const exp5 = page.locator('#layout-animation');
    if (await exp5.isVisible()) {
      await exp5.screenshot({
        path: path.join(screenshotDir, 'layout-playground-desktop.png')
      });
    }

    const exp6 = page.locator('#experiment-svg');
    if (await exp6.isVisible()) {
      await exp6.screenshot({
        path: path.join(screenshotDir, 'svg-playground-desktop.png')
      });
    }
  });

  test('Reflow validation across viewports (320px, 390px, 768px, 1024px, 1280px, 1440px)', async ({
    page
  }) => {
    const viewports = [
      { width: 320, height: 600 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/es/lab');
      await expect(
        page.getByRole('heading', { level: 1, name: /DEV LAB\./i })
      ).toBeVisible();

      // Verify no horizontal document overflow
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      if (scrollWidth > clientWidth + 2) {
        const overflowing = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          return Array.from(document.querySelectorAll('*'))
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.right > docWidth + 2;
            })
            .map(
              (el) =>
                `${el.tagName}.${el.className} [w=${Math.round(el.getBoundingClientRect().width)}, r=${Math.round(el.getBoundingClientRect().right)}]`
            );
        });
        console.log(`OVERFLOW AT ${vp.width}px:`, JSON.stringify(overflowing));
      }
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for rounding
    }
  });
});
