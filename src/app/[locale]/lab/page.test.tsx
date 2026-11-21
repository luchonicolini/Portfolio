import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LabContent } from '../../../components/lab/lab-content';
import { SiteNavigation } from '../../../components/site-navigation';
import { generateMetadata, generateStaticParams } from './page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/es/lab'
}));

describe('Developer Lab page components and metadata', () => {
  it('generates static params for all supported locales', () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: 'es' }, { locale: 'en' }]);
  });

  it('generates localized metadata for Spanish and English', async () => {
    const esMeta = await generateMetadata({
      params: Promise.resolve({ locale: 'es' })
    });
    expect(esMeta.title).toContain('Developer Lab');
    expect(esMeta.description).toContain('Brutalist Button Builder');

    const enMeta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' })
    });
    expect(enMeta.title).toContain('Developer Lab');
    expect(enMeta.description).toContain('Motion spring dynamics');
  });

  it('renders primary Developer Lab heading, checklist, and all six experiments', () => {
    render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <SiteNavigation locale="es" activeRoute="lab" />
        <LabContent locale="es" />
      </NextIntlClientProvider>
    );

    // Hero headline
    expect(
      screen.getByRole('heading', { name: /DEV LAB\./i, level: 1 })
    ).toBeInTheDocument();

    // Eyebrow and checklist
    expect(screen.getByText('04 / DEVELOPER LAB')).toBeInTheDocument();
    expect(
      screen.getByText('Probar componentes interactivos reales')
    ).toBeInTheDocument();

    // Experiment 01: Brutalist Button Builder
    expect(
      screen.getByRole('heading', { name: /Brutalist Button Builder/i })
    ).toBeInTheDocument();

    // Experiment 02: Spring Physics Playground
    expect(
      screen.getByRole('heading', { name: /Resortes/i, level: 2 })
    ).toBeInTheDocument();

    // Experiment 03: Typography Playground
    expect(
      screen.getByRole('heading', { name: /Typography/i })
    ).toBeInTheDocument();

    // Experiment 04: Interactive Design Tokens
    expect(
      screen.getByRole('heading', { name: /Interactive Design Tokens/i })
    ).toBeInTheDocument();

    // Experiment 05: Layout Animation Playground
    expect(
      screen.getByRole('heading', {
        name: /Transiciones de Layout FLIP/i,
        level: 2
      })
    ).toBeInTheDocument();

    // Experiment 06: SVG Animation Playground
    expect(
      screen.getByRole('heading', { name: /SVG Animation Playground/i })
    ).toBeInTheDocument();

    // Technical stack and manifesto
    expect(
      screen.getByRole('heading', {
        name: /Tecnologías y librerías utilizadas/i,
        level: 2
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getAllByText('Motion').length).toBeGreaterThanOrEqual(1);
  });
});
