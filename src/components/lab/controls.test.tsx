import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ButtonBuilder } from './button-builder';
import { TypographyPlayground } from './typography-playground';

describe('Developer Lab - Creative Controls', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve())
      }
    });
  });

  describe('ButtonBuilder (Experiment 01)', () => {
    it('renders with default values in Spanish', () => {
      render(<ButtonBuilder locale="es" />);

      expect(screen.getByText('Brutalist Button Builder')).toBeDefined();
      expect(screen.getByText('EXP-01')).toBeDefined();

      // Live button
      const previewBtn = screen.getByRole('button', { name: /PULSAR AQUÍ/ });
      expect(previewBtn).toBeDefined();

      // Sliders exist with defaults
      expect(screen.getByLabelText(/Grosor de borde:/)).toHaveValue('3');
      expect(screen.getByLabelText(/Radio de esquinas:/)).toHaveValue('0');
      expect(screen.getByLabelText(/Desplazamiento de sombra:/)).toHaveValue(
        '4'
      );
      expect(
        screen.getByLabelText(/Desplazamiento al pasar cursor:/)
      ).toHaveValue('2');

      // Click counter
      expect(screen.getByText('CLICKS: 0')).toBeDefined();
    });

    it('increments click counter on interactive button click', () => {
      render(<ButtonBuilder locale="es" />);

      const previewBtn = screen.getByRole('button', { name: /PULSAR AQUÍ/ });
      fireEvent.click(previewBtn);
      expect(screen.getByText('CLICKS: 1')).toBeDefined();

      fireEvent.click(previewBtn);
      expect(screen.getByText('CLICKS: 2')).toBeDefined();
    });

    it('updates configuration via sliders and inputs', () => {
      render(<ButtonBuilder locale="es" />);

      // Slider: border radius
      const radiusSlider = screen.getByLabelText(/Radio de esquinas:/);
      fireEvent.change(radiusSlider, { target: { value: '12' } });
      expect(radiusSlider).toHaveValue('12');
      expect(screen.getByText('12px')).toBeDefined();

      // Label input
      const labelInput = screen.getByLabelText(/Texto del botón:/);
      fireEvent.change(labelInput, { target: { value: 'NUEVO BOTÓN' } });
      expect(screen.getByRole('button', { name: /NUEVO BOTÓN/ })).toBeDefined();
    });

    it('allows selecting color chips', () => {
      render(<ButtonBuilder locale="es" />);

      const mintChip = screen.getByRole('radio', { name: /Menta \/ Mint/ });
      fireEvent.click(mintChip);
      expect(mintChip).toHaveAttribute('aria-checked', 'true');
    });

    it('copies CSS to clipboard and updates copy button state', async () => {
      render(<ButtonBuilder locale="es" />);

      const copyBtn = screen.getByRole('button', {
        name: /Copiar código CSS al portapapeles/
      });
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(screen.getByText('COPIADO')).toBeDefined();
      });
    });

    it('resets configuration and click count when reset is clicked', () => {
      render(<ButtonBuilder locale="es" />);

      const previewBtn = screen.getByRole('button', { name: /PULSAR AQUÍ/ });
      fireEvent.click(previewBtn);
      expect(screen.getByText('CLICKS: 1')).toBeDefined();

      const radiusSlider = screen.getByLabelText(/Radio de esquinas:/);
      fireEvent.change(radiusSlider, { target: { value: '16' } });
      expect(radiusSlider).toHaveValue('16');

      const resetBtn = screen.getByRole('button', {
        name: /Reiniciar valores/
      });
      fireEvent.click(resetBtn);

      expect(screen.getByText('CLICKS: 0')).toBeDefined();
      expect(screen.getByLabelText(/Radio de esquinas:/)).toHaveValue('0');
    });

    it('renders with English locale strings', () => {
      render(<ButtonBuilder locale="en" />);

      expect(screen.getByText('01 / COMPONENTS')).toBeDefined();
      expect(screen.getByLabelText(/Border thickness:/)).toBeDefined();
      expect(screen.getByRole('button', { name: /CLICK ME/ })).toBeDefined();
    });
  });

  describe('TypographyPlayground (Experiment 03)', () => {
    it('renders with default Space Grotesk typography settings', () => {
      render(<TypographyPlayground locale="es" />);

      expect(screen.getByText('Typography Playground')).toBeDefined();
      expect(screen.getByText('EXP-03')).toBeDefined();

      const sampleText = screen.getByText('EDITORIAL NEO-BRUTALISM');
      expect(sampleText).toBeDefined();

      expect(screen.getByLabelText(/Tamaño de fuente:/)).toHaveValue('32');
      expect(screen.getByLabelText(/Interlineado/)).toHaveValue('1.2');
      expect(screen.getByLabelText(/Espaciado/)).toHaveValue('0');
    });

    it('toggles font family between Space Grotesk and Space Mono', () => {
      render(<TypographyPlayground locale="es" />);

      const monoBtn = screen.getByRole('radio', { name: 'Space Mono' });
      fireEvent.click(monoBtn);
      expect(monoBtn).toHaveAttribute('aria-checked', 'true');
    });

    it('applies quick presets to sample text', () => {
      render(<TypographyPlayground locale="es" />);

      const telemetryPreset = screen.getByRole('button', {
        name: /Registro Monospace/
      });
      fireEvent.click(telemetryPreset);

      expect(screen.getByText('SYSTEM_INIT: READY [OK]')).toBeDefined();
    });

    it('updates font size, weight, and text transform', () => {
      render(<TypographyPlayground locale="es" />);

      // Font size
      const sizeSlider = screen.getByLabelText(/Tamaño de fuente:/);
      fireEvent.change(sizeSlider, { target: { value: '48' } });
      expect(screen.getByText('48px')).toBeDefined();

      // Font weight 500
      const weight500 = screen.getByRole('radio', { name: /500 Medio/ });
      fireEvent.click(weight500);
      expect(weight500).toHaveAttribute('aria-checked', 'true');

      // Text transform lowercase
      const lowerBtn = screen.getByRole('radio', { name: /Minúsculas/ });
      fireEvent.click(lowerBtn);
      expect(lowerBtn).toHaveAttribute('aria-checked', 'true');
    });

    it('copies CSS snippet to clipboard', async () => {
      render(<TypographyPlayground locale="es" />);

      const copyBtn = screen.getByRole('button', {
        name: /Copiar código CSS al portapapeles/
      });
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(screen.getByText('COPIADO')).toBeDefined();
      });
    });

    it('resets typography settings to default', () => {
      render(<TypographyPlayground locale="es" />);

      const sizeSlider = screen.getByLabelText(/Tamaño de fuente:/);
      fireEvent.change(sizeSlider, { target: { value: '54' } });
      expect(sizeSlider).toHaveValue('54');

      const resetBtn = screen.getByRole('button', {
        name: /Reiniciar valores/
      });
      fireEvent.click(resetBtn);

      expect(screen.getByLabelText(/Tamaño de fuente:/)).toHaveValue('32');
    });

    it('renders with English locale strings', () => {
      render(<TypographyPlayground locale="en" />);

      expect(screen.getByText('03 / TYPOGRAPHY')).toBeDefined();
      expect(screen.getByLabelText(/Font size:/)).toBeDefined();
      expect(
        screen.getByRole('button', { name: /Brutalist Headline/ })
      ).toBeDefined();
    });
  });
});
