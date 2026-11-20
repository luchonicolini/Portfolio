import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ContactPageContent } from '../../../components/contact/contact-page-content';
import { SecondaryNavigation } from '../../../components/secondary-navigation';

vi.mock('next/navigation', () => ({
  usePathname: () => '/es/contact'
}));

describe('Contact page components', () => {
  it('renders primary Contact elements without exposing test fixtures', () => {
    const { container } = render(
      <NextIntlClientProvider locale="es" messages={{}}>
        <SecondaryNavigation locale="es" activeRoute="contact" />
        <ContactPageContent locale="es" />
      </NextIntlClientProvider>
    );

    // Headline & Envelope Artwork
    expect(
      screen.getByRole('heading', { name: /HABLEMOS\./i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        'Ilustración geométrica neo-brutalista de un sobre de correspondencia'
      )
    ).toBeInTheDocument();

    // Verified GitHub link
    const githubLink = screen.getByRole('link', {
      name: 'GitHub / luchonicolini'
    });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/luchonicolini'
    );

    // Assert that contact@example.com is absent from rendered output
    expect(container.textContent).not.toContain('contact@example.com');
    expect(container.textContent).not.toContain('Copiar email de prueba');

    // Topics card
    expect(
      screen.getByRole('heading', {
        name: '¿Qué podés contarme?',
        level: 2
      })
    ).toBeInTheDocument();

    // Secondary navigation active state
    const contactLink = screen.getByRole('link', { name: 'Contacto' });
    expect(contactLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders English equivalent content without test email leak', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <ContactPageContent locale="en" />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByRole('heading', { name: /LET'S TALK\./i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What can we talk about?', level: 2 })
    ).toBeInTheDocument();
    expect(container.textContent).not.toContain('contact@example.com');
  });
});
