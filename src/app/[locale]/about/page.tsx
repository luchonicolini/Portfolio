import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SecondaryNavigation } from '@/components/secondary-navigation';
import { SecondaryFooter } from '@/components/secondary-footer';
import { AboutContent } from '@/components/about/about-content';
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
  return {
    title: es
      ? 'Sobre mí — Luciano Nicolini | Mobile & Web Developer'
      : 'About — Luciano Nicolini | Mobile & Web Developer',
    description: es
      ? 'Conocé mi trayectoria, stack tecnológico comprobable, enfoque de accesibilidad y forma de trabajo en desarrollo móvil y web.'
      : 'Learn about my journey, verified tech stack, accessibility focus, and approach to mobile and web engineering.'
  };
}

export default async function AboutPage({
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
      <SecondaryNavigation locale={locale} activeRoute="about" />
      <main id="main">
        <AboutContent locale={locale} />
      </main>
      <SecondaryFooter locale={locale} />
    </>
  );
}
