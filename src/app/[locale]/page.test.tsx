import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import FoundationPage from './page';

describe('foundation route', () => {
  it('renders localized technical status without implementing the portfolio home', () => {
    render(
      <NextIntlClientProvider
        locale="es"
        messages={{
          Foundation: { title: 'Portfolio', status: 'Fundación técnica lista' }
        }}
      >
        <FoundationPage />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fundación técnica lista' })
    ).toBeInTheDocument();
  });
});
