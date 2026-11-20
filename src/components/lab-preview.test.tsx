import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LabPreview } from './lab-preview';

describe('LabPreview', () => {
  it('renders Brutalist Button Builder controls and updates preview', () => {
    render(<LabPreview locale="es" />);

    expect(screen.getByText('Brutalist Button Builder')).toBeDefined();

    // Check interactive preview button
    const previewBtn = screen.getByRole('button', { name: /PULSAR AQUÍ/ });
    expect(previewBtn).toBeDefined();

    // Click preview button to test press counter
    expect(screen.getByText('Pulsaciones registradas: 0')).toBeDefined();
    fireEvent.click(previewBtn);
    expect(screen.getByText('Pulsaciones registradas: 1')).toBeDefined();

    // Change shadow slider
    const shadowSlider = screen.getByLabelText(/Desplazamiento de sombra:/);
    fireEvent.change(shadowSlider, { target: { value: '8' } });
    expect(screen.getByText('8px')).toBeDefined();

    // Test color selection
    const mintChip = screen.getByRole('radio', { name: /Menta/ });
    fireEvent.click(mintChip);
    expect(mintChip).toHaveAttribute('aria-checked', 'true');

    // Test reset
    const resetBtn = screen.getByRole('button', {
      name: /Restablecer valores/
    });
    fireEvent.click(resetBtn);
    expect(screen.getByText('Pulsaciones registradas: 0')).toBeDefined();
    expect(screen.getByText('4px')).toBeDefined();
  });
});
