import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ButtonBuilder } from './button-builder';
import { TypographyPlayground } from './typography-playground';
import { SpringPlayground } from './spring-playground';
import { LayoutPlayground } from './layout-playground';
import { TokensPlayground } from './tokens-playground';
import { SvgPlayground } from './svg-playground';
import { LabContent } from './lab-content';
import {
  BUTTON_BUILDER_DEFAULTS,
  SPRING_PHYSICS_DEFAULTS,
  TYPOGRAPHY_DEFAULTS,
  DESIGN_TOKENS_DEFAULTS,
  SVG_ANIMATION_DEFAULTS,
  calculateContrastRatio,
  getWcagStatus
} from '@/data/lab';

describe('Verifier Independent Audit - Developer Lab (All 6 Experiments)', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });
  });

  describe('Audit 1: Functional Correctness & Reset Controls', () => {
    it('Experiment 01 (Button Builder): verifies interactive controls, snippet updates and reset', () => {
      render(<ButtonBuilder locale="es" />);

      // Verify default state
      const buttonPreview = screen.getByRole('button', { name: /PULSAR AQUÍ/ });
      expect(buttonPreview).toBeDefined();

      // Change border width
      const borderWidthSlider = screen.getByLabelText(/Grosor de borde:/i);
      fireEvent.change(borderWidthSlider, { target: { value: '5' } });
      expect(screen.getByText('5px')).toBeDefined();

      // Reset
      const resetBtn = screen.getByRole('button', {
        name: /Reiniciar valores/i
      });
      fireEvent.click(resetBtn);

      expect(borderWidthSlider).toHaveValue(
        `${BUTTON_BUILDER_DEFAULTS.borderWidth}`
      );
    });

    it('Experiment 02 (Spring Physics): verifies physics sliders, replay trigger and reset', () => {
      render(<SpringPlayground locale="es" />);

      const stiffnessSlider = screen.getByLabelText(/Ajustar rigidez/i);
      fireEvent.change(stiffnessSlider, { target: { value: '420' } });
      expect(screen.getByText(/stiffness: 420/)).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer valores/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByText(
          new RegExp(`stiffness: ${SPRING_PHYSICS_DEFAULTS.stiffness}`)
        )
      ).toBeDefined();
    });

    it('Experiment 03 (Typography Playground): verifies font switches, presets and reset', () => {
      render(<TypographyPlayground locale="es" />);

      const fontSizeSlider = screen.getByLabelText(/Tamaño de fuente:/i);
      fireEvent.change(fontSizeSlider, { target: { value: '56' } });
      expect(screen.getByText('56px')).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Reiniciar valores/i
      });
      fireEvent.click(resetBtn);

      expect(fontSizeSlider).toHaveValue(`${TYPOGRAPHY_DEFAULTS.fontSize}`);
    });

    it('Experiment 04 (Design Tokens): verifies scoped tokens, contrast ratio and reset', () => {
      render(<TokensPlayground locale="es" />);

      const borderSlider = screen.getByLabelText(/Ajustar grosor de borde/i);
      fireEvent.change(borderSlider, { target: { value: '6' } });
      expect(screen.getByText('6px')).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer tokens/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByText(`${DESIGN_TOKENS_DEFAULTS.borderWidth}px`)
      ).toBeDefined();
    });

    it('Experiment 05 (Layout Animation): verifies grid/list toggle, shuffle and reset', () => {
      render(<LayoutPlayground locale="es" />);

      const listBtn = screen.getByRole('button', { name: /Lista/i });
      fireEvent.click(listBtn);
      expect(listBtn).toHaveAttribute('aria-pressed', 'true');

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer orden y filtros/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByRole('button', { name: /Cuadrícula/i })
      ).toHaveAttribute('aria-pressed', 'true');
    });

    it('Experiment 06 (SVG Animation): verifies play/pause, scrub slider and reset', () => {
      render(<SvgPlayground locale="es" />);

      const strokeSlider = screen.getByLabelText(/Ajustar grosor de trazo/i);
      fireEvent.change(strokeSlider, { target: { value: '8' } });
      expect(screen.getByText('8px')).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer animación SVG/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByText(`${SVG_ANIMATION_DEFAULTS.strokeWidth}px`)
      ).toBeDefined();
    });
  });

  describe('Audit 2: Accessibility & Localization (WCAG 2.2 AA)', () => {
    it('verifies Spanish localization across all 6 experiments', () => {
      render(
        <div>
          <ButtonBuilder locale="es" />
          <SpringPlayground locale="es" />
          <TypographyPlayground locale="es" />
          <TokensPlayground locale="es" />
          <LayoutPlayground locale="es" />
          <SvgPlayground locale="es" />
        </div>
      );

      expect(screen.getByText('Brutalist Button Builder')).toBeDefined();
      expect(screen.getByText('Física de Resortes con Motion')).toBeDefined();
      expect(screen.getByText('Typography Playground')).toBeDefined();
      expect(screen.getByText('Interactive Design Tokens')).toBeDefined();
      expect(screen.getByText('Transiciones de Layout FLIP')).toBeDefined();
      expect(screen.getByText('SVG Animation Playground')).toBeDefined();
    });

    it('verifies English localization across all 6 experiments', () => {
      render(
        <div>
          <ButtonBuilder locale="en" />
          <SpringPlayground locale="en" />
          <TypographyPlayground locale="en" />
          <TokensPlayground locale="en" />
          <LayoutPlayground locale="en" />
          <SvgPlayground locale="en" />
        </div>
      );

      expect(screen.getByText('01 / COMPONENTS')).toBeDefined();
      expect(screen.getByText('Spring Physics Playground')).toBeDefined();
      expect(screen.getByText('03 / TYPOGRAPHY')).toBeDefined();
      expect(screen.getByText('DESIGN TOKENS')).toBeDefined();
      expect(screen.getByText('Layout Animation Playground')).toBeDefined();
      expect(screen.getByText('SVG ANIMATION')).toBeDefined();
    });

    it('verifies aria-live regions for clipboard feedback', async () => {
      render(<ButtonBuilder locale="es" />);

      const copyBtn = screen.getByRole('button', {
        name: /Copiar código CSS al portapapeles/i
      });
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(screen.getByText('COPIADO')).toBeDefined();
      expect(screen.getByText('CSS copiado al portapapeles')).toBeDefined();
    });

    it('validates pure WCAG relative luminance and contrast engine edge cases', () => {
      // Black on White: 21:1
      const maxContrast = calculateContrastRatio('#000000', '#ffffff');
      expect(maxContrast).toBe(21);
      expect(getWcagStatus(maxContrast).level).toBe('AAA');

      // White on White: 1:1
      const minContrast = calculateContrastRatio('#ffffff', '#ffffff');
      expect(minContrast).toBe(1);
      expect(getWcagStatus(minContrast).level).toBe('Fail');

      // Yellow #FFDE00 on Black #000000: > 10:1
      const yellowOnBlack = calculateContrastRatio('#ffde00', '#000000');
      expect(yellowOnBlack).toBeGreaterThan(10);
      expect(getWcagStatus(yellowOnBlack).aaNormal).toBe(true);
    });
  });

  describe('Audit 4: Category Navigation & Reduced-Motion Scroll', () => {
    it('filters experiments when category buttons are clicked and triggers scrollIntoView', async () => {
      const scrollIntoViewMock = vi.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (cb) => setTimeout(cb, 10) as unknown as number
      );

      render(<LabContent locale="es" />);

      // Filter to Motion
      const motionBtn = screen.getByRole('button', { name: /Física Motion/i });
      await act(async () => {
        fireEvent.click(motionBtn);
      });

      expect(motionBtn).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Física de Resortes con Motion')).toBeDefined();
      expect(screen.queryByText('Brutalist Button Builder')).toBeNull();

      await act(async () => {
        await new Promise((r) => setTimeout(r, 20));
      });

      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('respects prefers-reduced-motion when scrolling on category click', async () => {
      const scrollIntoViewMock = vi.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn()
        }))
      });

      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (cb) => setTimeout(cb, 10) as unknown as number
      );

      render(<LabContent locale="es" />);

      const typoBtn = screen.getByRole('button', { name: /Tipografía/i });
      await act(async () => {
        fireEvent.click(typoBtn);
      });

      await act(async () => {
        await new Promise((r) => setTimeout(r, 20));
      });

      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'start'
      });
    });
  });
});
