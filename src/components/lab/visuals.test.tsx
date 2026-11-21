import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TokensPlayground } from './tokens-playground';
import { SvgPlayground } from './svg-playground';
import { DESIGN_TOKENS_DEFAULTS, SVG_ANIMATION_DEFAULTS } from '@/data/lab';

describe('Developer Lab Visual Systems (Worker C)', () => {
  beforeEach(() => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    // Mock matchMedia
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

  describe('TokensPlayground (Experiment 04)', () => {
    it('renders in Spanish with default tokens and contrast metrics', () => {
      render(<TokensPlayground locale="es" />);

      expect(screen.getByText('EXP 04')).toBeDefined();
      expect(screen.getByText('Interactive Design Tokens')).toBeDefined();
      expect(screen.getByText('SISTEMA DE TOKENS')).toBeDefined();

      // Scoped preview check
      expect(screen.getByText('Scope: Contenedor Aislado')).toBeDefined();
      expect(screen.getByText('Arquitectura Editorial Escalar')).toBeDefined();

      // Live WCAG contrast badges
      const passBadges = screen.getAllByText('Pasa AA');
      expect(passBadges.length).toBeGreaterThanOrEqual(2);

      // Sliders with default values
      expect(
        screen.getByText(`${DESIGN_TOKENS_DEFAULTS.borderWidth}px`)
      ).toBeDefined();
      expect(
        screen.getByText(`${DESIGN_TOKENS_DEFAULTS.spacingBase}px`)
      ).toBeDefined();
      expect(
        screen.getByText(`${DESIGN_TOKENS_DEFAULTS.shadowOffset}px`)
      ).toBeDefined();
    });

    it('renders in English localization correctly', () => {
      render(<TokensPlayground locale="en" />);

      expect(screen.getByText('DESIGN TOKENS')).toBeDefined();
      expect(screen.getByText('Scope: Isolated Container')).toBeDefined();
      expect(screen.getByText('Scalable Editorial Architecture')).toBeDefined();
      expect(screen.getByText('System Parameters')).toBeDefined();
    });

    it('interacts with color pickers and updates WCAG contrast', () => {
      render(<TokensPlayground locale="es" />);

      const surfacePicker = screen.getByLabelText(
        /Selector de color de superficie/i
      );
      // Change surface color to black to force a contrast failure with black ink
      fireEvent.change(surfacePicker, { target: { value: '#000000' } });

      // Ink (#000000) on Surface (#000000) is 1:1, failing AA
      expect(screen.getByText('Falla AA')).toBeDefined();
      expect(screen.getByText('1:1')).toBeDefined();
    });

    it('adjusts border width, spacing and shadow sliders', () => {
      render(<TokensPlayground locale="es" />);

      const borderSlider = screen.getByLabelText(/Ajustar grosor de borde/i);
      fireEvent.change(borderSlider, { target: { value: '5' } });
      expect(screen.getByText('5px')).toBeDefined();

      const spacingSlider = screen.getByLabelText(/Ajustar espaciado base/i);
      fireEvent.change(spacingSlider, { target: { value: '12' } });
      expect(screen.getByText('12px')).toBeDefined();

      const shadowSlider = screen.getByLabelText(
        /Ajustar desplazamiento de sombra/i
      );
      fireEvent.change(shadowSlider, { target: { value: '8' } });
      expect(screen.getByText('8px')).toBeDefined();
    });

    it('copies generated CSS to clipboard with accessible feedback', async () => {
      render(<TokensPlayground locale="es" />);

      const copyBtn = screen.getByRole('button', {
        name: /Copiar variables CSS/i
      });
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('--token-accent:')
      );
      expect(screen.getByText('¡Copiado!')).toBeDefined();
    });

    it('resets tokens to default values', () => {
      render(<TokensPlayground locale="es" />);

      const borderSlider = screen.getByLabelText(/Ajustar grosor de borde/i);
      fireEvent.change(borderSlider, { target: { value: '6' } });
      expect(screen.getByText('6px')).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer tokens a valores por defecto/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByText(`${DESIGN_TOKENS_DEFAULTS.borderWidth}px`)
      ).toBeDefined();
    });

    it('allows clicking the editorial sample card button', () => {
      render(<TokensPlayground locale="es" />);

      const cardBtn = screen.getByRole('button', {
        name: /Botón de prueba editorial/i
      });
      fireEvent.click(cardBtn);
      expect(screen.getByText('(1)')).toBeDefined();
    });
  });

  describe('SvgPlayground (Experiment 06)', () => {
    it('renders in Spanish with accessible SVG semantics', () => {
      render(<SvgPlayground locale="es" />);

      expect(screen.getByText('EXP 06')).toBeDefined();
      expect(screen.getByText('SVG Animation Playground')).toBeDefined();
      expect(screen.getByText('DIBUJO VECTORIAL')).toBeDefined();

      // SVG accessibility checks
      const svgElement = screen.getByRole('img');
      expect(svgElement).toBeDefined();
      expect(svgElement.getAttribute('aria-labelledby')).toContain(
        'svg-artwork-title'
      );
      expect(
        screen.getByText(/Composición Geométrica Neobrutalista Procedural/i)
      ).toBeDefined();
    });

    it('renders in English localization correctly', () => {
      render(<SvgPlayground locale="en" />);

      expect(screen.getByText('SVG ANIMATION')).toBeDefined();
      expect(screen.getByText('Vector Stroke Controls')).toBeDefined();
      expect(
        screen.getByText(/Procedural Neobrutalist Geometric Composition/i)
      ).toBeDefined();
    });

    it('toggles play and pause animation controls', () => {
      render(<SvgPlayground locale="es" />);

      const pauseBtn = screen.getByRole('button', {
        name: /Pausar animación/i
      });
      fireEvent.click(pauseBtn);

      // Now should show play option
      expect(
        screen.getByRole('button', { name: /Reanudar animación/i })
      ).toBeDefined();
    });

    it('scrubs progress slider and updates offset', () => {
      render(<SvgPlayground locale="es" />);

      const progressSlider = screen.getByLabelText(
        /Ajustar progreso de dibujo/i
      );
      fireEvent.change(progressSlider, { target: { value: '50' } });

      const percentageElements = screen.getAllByText(/50%/);
      expect(percentageElements.length).toBeGreaterThanOrEqual(1);
    });

    it('adjusts stroke width and duration sliders', () => {
      render(<SvgPlayground locale="es" />);

      const strokeSlider = screen.getByLabelText(/Ajustar grosor de trazo/i);
      fireEvent.change(strokeSlider, { target: { value: '6' } });
      expect(screen.getByText('6px')).toBeDefined();

      const durationSlider = screen.getByLabelText(/Ajustar duración/i);
      fireEvent.change(durationSlider, { target: { value: '5' } });
      expect(screen.getByText('5s')).toBeDefined();
    });

    it('copies SVG snippet with aria-live feedback', async () => {
      render(<SvgPlayground locale="es" />);

      const copyBtn = screen.getByRole('button', {
        name: /Copiar fragmento SVG/i
      });
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('<svg viewBox="0 0 400 300"')
      );
      expect(screen.getByText('¡Copiado!')).toBeDefined();
    });

    it('resets SVG animation parameters to default values', () => {
      render(<SvgPlayground locale="es" />);

      const strokeSlider = screen.getByLabelText(/Ajustar grosor de trazo/i);
      fireEvent.change(strokeSlider, { target: { value: '7' } });
      expect(screen.getByText('7px')).toBeDefined();

      const resetBtn = screen.getByRole('button', {
        name: /Restablecer animación SVG/i
      });
      fireEvent.click(resetBtn);

      expect(
        screen.getByText(`${SVG_ANIMATION_DEFAULTS.strokeWidth}px`)
      ).toBeDefined();
    });

    it('activates static fallback when reduced motion is preferred', () => {
      // Mock matchMedia to return true for reduced-motion
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }));

      render(<SvgPlayground locale="es" />);

      expect(
        screen.getByText(
          /Preferencia de movimiento reducido activa: modo estático/i
        )
      ).toBeDefined();
    });
  });
});
