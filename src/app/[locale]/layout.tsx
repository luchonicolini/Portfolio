import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ReactGrab } from '@/components/react-grab';
import '../globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk'
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Luciano Nicolini — Portfolio',
  description: 'Portfolio técnico en preparación.',
  icons: { icon: '/brand/favicon.svg' }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <NextIntlClientProvider messages={null}>
          {children}
          {process.env.NODE_ENV === 'development' &&
          process.env.NEXT_PUBLIC_REACT_GRAB !== 'false' ? (
            <ReactGrab />
          ) : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
