import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { SiteNavigation } from '../../components/site-navigation';

vi.mock('next/navigation', () => ({ usePathname: () => '/es' }));

describe('navigation', () => {
  it('identifies the menu, active section links, and disabled CV destination', () => {
    render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <SiteNavigation locale="es" />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute(
      'href',
      '#work'
    );
    expect(screen.getByRole('link', { name: 'Sobre mí' })).toHaveAttribute(
      'href',
      '#about'
    );
    expect(screen.getByRole('link', { name: 'Lab' })).toHaveAttribute(
      'href',
      '#lab'
    );
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute(
      'href',
      '#contact'
    );
    expect(screen.getByText(/CV ↗/)).toHaveAttribute('aria-disabled', 'true');
  });
});
