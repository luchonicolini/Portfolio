import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteFooter } from '@/components/site-footer';
import { ContactPageContent } from '@/components/contact/contact-page-content';
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
      ? 'Contacto — Luciano Nicolini | Hablemos'
      : "Contact — Luciano Nicolini | Let's Talk",
    description: es
      ? 'Canales de contacto verificados para colaborar en desarrollo mobile, ingeniería web y propuestas técnicas.'
      : 'Verified contact channels to collaborate on mobile development, web engineering, and technical proposals.'
  };
}

export default async function ContactPage({
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
      <SiteNavigation locale={locale} activeRoute="contact" />
      <main id="main">
        <ContactPageContent locale={locale} />
      </main>
      <SiteFooter locale={locale} variant="secondary" />
    </>
  );
}
