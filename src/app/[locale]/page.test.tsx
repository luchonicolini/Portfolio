import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Navigation } from '../../components/home-navigation';

vi.mock('next/navigation', () => ({ usePathname: () => '/es' }));
describe('navigation', () => {
  it('identifies the menu and marks unavailable destinations', () => {
    render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <Navigation locale="es" />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByText('Proyectos')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});
