import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { AboutContent } from '../../../components/about/about-content';
import { SecondaryNavigation } from '../../../components/secondary-navigation';

vi.mock('next/navigation', () => ({
  usePathname: () => '/es/about'
}));

describe('About page components', () => {
  it('renders primary About sections, bio, and timeline in Spanish', () => {
    render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <SecondaryNavigation locale="es" activeRoute="about" />
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

    // Timeline items
    expect(screen.getByText('2019')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Hoy')).toBeInTheDocument();

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
    expect(screen.getByText('Now')).toBeInTheDocument();
    expect(screen.getByText('Explore & Define')).toBeInTheDocument();
  });
});
