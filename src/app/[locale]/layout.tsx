import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ReactGrab } from '@/components/react-grab';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          {process.env.NODE_ENV === 'development' ? <ReactGrab /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
