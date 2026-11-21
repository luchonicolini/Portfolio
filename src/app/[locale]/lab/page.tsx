import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteFooter } from '@/components/site-footer';
import { LabContent } from '@/components/lab/lab-content';
import styles from '@/components/home.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === 'es';
  const title = es
    ? 'Developer Lab — Luciano Nicolini | Mobile & Web Developer'
    : 'Developer Lab — Luciano Nicolini | Mobile & Web Developer';
  const description = es
    ? 'Laboratorio interactivo de desarrollo y diseño: Brutalist Button Builder, físicas con Motion, tokens de diseño, tipografía y animaciones SVG.'
    : 'Interactive development and design laboratory: Brutalist Button Builder, Motion spring dynamics, design tokens, typography, and SVG animations.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: es ? 'es_AR' : 'en_US',
      type: 'website'
    },
    alternates: {
      canonical: `/${locale}/lab`,
      languages: {
        es: '/es/lab',
        en: '/en/lab'
      }
    }
  };
}

export default async function LabPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const es = locale === 'es';

  return (
    <>
      <a className={styles.skip} href="#main">
        {es ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <SiteNavigation locale={locale} activeRoute="lab" />
      <main id="main">
        <LabContent locale={locale} />
      </main>
      <SiteFooter locale={locale} variant="secondary" />
    </>
  );
}
