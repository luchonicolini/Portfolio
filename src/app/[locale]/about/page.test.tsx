import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { AboutContent } from '../../../components/about/about-content';
import { SiteNavigation } from '../../../components/site-navigation';

vi.mock('next/navigation', () => ({
  usePathname: () => '/es/about'
}));

describe('About page components', () => {
  it('renders primary About sections, bio, and timeline in Spanish', () => {
    render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <SiteNavigation locale="es" activeRoute="about" />
        <AboutContent locale="es" />
      </NextIntlClientProvider>
    );

    // Headline & Role
    expect(
      screen.getByRole('heading', { name: /SOBRE MÍ\./i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText('Desarrollador Mobile & Web')).toBeInTheDocument();

    // Intentional Typographic Portrait
    expect(
      screen.getByLabelText('Insignia editorial de Luciano Nicolini')
    ).toBeInTheDocument();
    expect(screen.getAllByText('LN.').length).toBeGreaterThanOrEqual(2);

    // Development profile items (evidence-based, no unverified dates)
    expect(
      screen.getByRole('heading', {
        name: /Perfil de desarrollo\./i,
        level: 2
      })
    ).toBeInTheDocument();
    expect(screen.getByText('iOS')).toBeInTheDocument();
    expect(
      screen.getByText('Native iOS — Swift & SwiftUI')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Flutter').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText('Cross-platform — Flutter & Dart')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Web').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText('Web engineering — Next.js & TypeScript')
    ).toBeInTheDocument();
    expect(screen.getByText('Enfoque')).toBeInTheDocument();
    expect(
      screen.getByText('Current focus — Producto y accesibilidad')
    ).toBeInTheDocument();

    // Tech Stack verified pills
    expect(screen.getAllByText('Flutter').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('SwiftUI').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThanOrEqual(1);

    // Process steps
    expect(screen.getByText('Exploro y defino')).toBeInTheDocument();
    expect(screen.getByText('Diseño la solución')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo con rigor')).toBeInTheDocument();
    expect(screen.getByText('Pruebo y valido')).toBeInTheDocument();

    // Secondary navigation active state
    const activeLink = screen.getByRole('link', { name: 'Sobre mí' });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders English equivalent content without fabricated metrics', () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <AboutContent locale="en" />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByRole('heading', { name: /ABOUT ME\./i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText('Mobile & Web Developer')).toBeInTheDocument();
    expect(screen.getByText('Development profile.')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('Explore & Define')).toBeInTheDocument();
  });
});
