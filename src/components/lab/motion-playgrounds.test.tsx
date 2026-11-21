import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react';
import { SpringPlayground } from './spring-playground';
import { LayoutPlayground } from './layout-playground';
import { SPRING_PHYSICS_DEFAULTS, LAYOUT_ITEMS } from '../../data/lab';

describe('SpringPlayground', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly in Spanish with initial defaults', () => {
    render(<SpringPlayground locale="es" />);

    expect(screen.getByText('Física de Resortes con Motion')).toBeDefined();
    expect(screen.getByLabelText(/Ajustar rigidez/i)).toBeDefined();
    expect(screen.getByLabelText(/Ajustar amortiguación/i)).toBeDefined();
    expect(screen.getByLabelText(/Ajustar masa/i)).toBeDefined();

    // Verify explanation cards exist
    expect(screen.getByText(/k = Hooke/i)).toBeDefined();
    expect(screen.getByText(/c = Fricción/i)).toBeDefined();
    expect(screen.getByText(/m = Inercia/i)).toBeDefined();

    // Verify code snippet includes default values
    const code = screen.getByText(
      new RegExp(`stiffness: ${SPRING_PHYSICS_DEFAULTS.stiffness}`)
    );
    expect(code).toBeDefined();
  });

  it('updates sliders and code snippet on input changes', () => {
    render(<SpringPlayground locale="es" />);

    const stiffnessSlider = screen.getByLabelText(/Ajustar rigidez/i);
    fireEvent.change(stiffnessSlider, { target: { value: '380' } });

    expect(screen.getByText(/stiffness: 380/)).toBeDefined();

    const dampingSlider = screen.getByLabelText(/Ajustar amortiguación/i);
    fireEvent.change(dampingSlider, { target: { value: '35' } });

    expect(screen.getByText(/damping: 35/)).toBeDefined();

    const massSlider = screen.getByLabelText(/Ajustar masa/i);
    fireEvent.change(massSlider, { target: { value: '2.5' } });

    expect(screen.getByText(/mass: 2.5/)).toBeDefined();
  });

  it('resets parameters to defaults when Reset button is clicked', () => {
    render(<SpringPlayground locale="es" />);

    const stiffnessSlider = screen.getByLabelText(/Ajustar rigidez/i);
    fireEvent.change(stiffnessSlider, { target: { value: '450' } });
    expect(screen.getByText(/stiffness: 450/)).toBeDefined();

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

  it('triggers animation on button click and keyboard interaction', () => {
    render(<SpringPlayground locale="es" />);

    const triggerBtn = screen.getByRole('button', {
      name: /Disparar animación/i
    });
    fireEvent.click(triggerBtn);

    const springBox = screen.getByRole('button', {
      name: /Objeto neobrutalista/i
    });
    fireEvent.click(springBox);
    fireEvent.keyDown(springBox, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(springBox, { key: ' ', code: 'Space' });
  });

  it('copies code snippet and shows confirmation feedback', async () => {
    render(<SpringPlayground locale="es" />);

    const copyBtn = screen.getByRole('button', {
      name: /Copiar código de configuración/i
    });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('¡Copiado!')).toBeDefined();
    });
  });

  it('renders correctly in English', () => {
    render(<SpringPlayground locale="en" />);

    expect(screen.getByText('Spring Physics Playground')).toBeDefined();
    expect(screen.getByText('LIVE MOTION/REACT SNIPPET')).toBeDefined();
    expect(
      screen.getByRole('button', { name: /Trigger spring animation/i })
    ).toBeDefined();
  });
});

describe('LayoutPlayground', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders 6 initial layout items in Spanish', () => {
    render(<LayoutPlayground locale="es" />);

    expect(screen.getByText('Transiciones de Layout FLIP')).toBeDefined();

    for (const item of LAYOUT_ITEMS) {
      expect(screen.getByText(item.title.es)).toBeDefined();
    }
  });

  it('toggles view mode between grid and list', () => {
    render(<LayoutPlayground locale="es" />);

    const gridBtn = screen.getByRole('button', { name: /Cuadrícula/i });
    const listBtn = screen.getByRole('button', { name: /Lista/i });

    expect(gridBtn).toHaveAttribute('aria-pressed', 'true');
    expect(listBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(listBtn);
    expect(listBtn).toHaveAttribute('aria-pressed', 'true');
    expect(gridBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('filters items by category', () => {
    render(<LayoutPlayground locale="es" />);

    const mobileBtn = screen.getByRole('button', { name: 'Mobile' });
    fireEvent.click(mobileBtn);

    const mobileItems = LAYOUT_ITEMS.filter((i) => i.category === 'mobile');
    const webItems = LAYOUT_ITEMS.filter((i) => i.category === 'web');

    for (const item of mobileItems) {
      expect(screen.getByText(item.title.es)).toBeDefined();
    }

    for (const item of webItems) {
      expect(screen.queryByText(item.title.es)).toBeNull();
    }

    // Restore to all
    const allBtn = screen.getByRole('button', { name: 'Todos' });
    fireEvent.click(allBtn);

    for (const item of LAYOUT_ITEMS) {
      expect(screen.getByText(item.title.es)).toBeDefined();
    }
  });

  it('shuffles items and resets layout state', () => {
    render(<LayoutPlayground locale="es" />);

    const shuffleBtn = screen.getByRole('button', {
      name: /Reordenar tarjetas/i
    });
    fireEvent.click(shuffleBtn);

    const resetBtn = screen.getByRole('button', {
      name: /Restablecer orden y filtros/i
    });
    fireEvent.click(resetBtn);

    expect(screen.getByRole('button', { name: /Cuadrícula/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('toggles inspection details on card', () => {
    render(<LayoutPlayground locale="es" />);

    const firstItem = LAYOUT_ITEMS[0];
    const inspectBtn = screen.getByRole('button', {
      name: new RegExp(`Inspeccionar ${firstItem.title.es}`)
    });

    fireEvent.click(inspectBtn);
    expect(inspectBtn).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(inspectBtn);
    expect(inspectBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('copies layout snippet to clipboard', async () => {
    render(<LayoutPlayground locale="es" />);

    const copyBtn = screen.getByRole('button', {
      name: /Copiar código de animación/i
    });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('¡Copiado!')).toBeDefined();
    });
  });

  it('renders correctly in English', () => {
    render(<LayoutPlayground locale="en" />);

    expect(screen.getByText('Layout Animation Playground')).toBeDefined();
    expect(screen.getByRole('button', { name: /Grid/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /List/i })).toBeDefined();

    for (const item of LAYOUT_ITEMS) {
      expect(screen.getByText(item.title.en)).toBeDefined();
    }
  });
});
