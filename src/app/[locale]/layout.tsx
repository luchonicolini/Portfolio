import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ReactGrab } from '@/components/react-grab';
import '../globals.css';

function getValidatedSiteUrl(): URL {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const trimmed = envUrl.trim();
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    try {
      const parsed = new URL(withProtocol);
      if (parsed.hostname) {
        return parsed;
      }
    } catch {
      // In case of malformed environment variable, safely fall back
    }
  }

  // Safe fallback for local development and test environments
  return new URL('http://localhost:3000');
}

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

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === 'es';
  const title = 'Luciano Nicolini — Portfolio';
  const description = es
    ? 'Portfolio de Luciano Nicolini, desarrollador de aplicaciones móviles y web especializado en SwiftUI, Flutter, React y Next.js.'
    : "Luciano Nicolini's portfolio showcasing mobile and web development with SwiftUI, Flutter, React and Next.js.";

  return {
    metadataBase: getValidatedSiteUrl(),
    title,
    description,
    icons: { icon: '/brand/favicon.svg' },
    openGraph: {
      title,
      description,
      locale: es ? 'es_AR' : 'en_US',
      type: 'website'
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en'
      }
    }
  };
}

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
