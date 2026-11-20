import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/design-system/components';
import { Navigation } from '@/components/home-navigation';
import { HomeFooter } from '@/components/home-footer';
import { WorkGallery } from '@/components/work-gallery';
import styles from '@/components/work.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === 'es'
      ? 'Proyectos — Luciano Nicolini'
      : 'Work — Luciano Nicolini';
  const description =
    locale === 'es'
      ? 'Proyectos de desarrollo móvil y web.'
      : 'Mobile and web development projects.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website'
    },
    alternates: {
      canonical: `/${locale}/work`,
      languages: { es: '/es/work', en: '/en/work' }
    }
  };
}

export default async function WorkPage({
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
      <Navigation locale={locale} />
      <main id="main" className={styles.main}>
        <Container>
          <header className={styles.workHeader}>
            <div className={styles.workHeaderLeft}>
              <p className={styles.eyebrow}>02 / {es ? 'PROYECTOS' : 'WORK'}</p>
              <div className={styles.headingWrapper}>
                <h1 className={styles.heading}>
                  {es ? 'PROYECTOS.' : 'WORK.'}
                </h1>
                <div className={styles.headingUnderline} aria-hidden="true" />
              </div>
              <p className={styles.intro}>
                {es
                  ? 'Una selección de productos y experimentos de desarrollo móvil y web.'
                  : 'A selection of mobile and web products and experiments.'}
              </p>
            </div>
            <div className={styles.workHeaderArtwork} aria-hidden="true">
              <div className={styles.codeWindow}>
                <div className={styles.codeWindowBar}>
                  <span className={`${styles.windowDot} ${styles.dotRed}`} />
                  <span className={`${styles.windowDot} ${styles.dotYellow}`} />
                  <span className={`${styles.windowDot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.codeWindowBody}>
                  <span>{'</>'}</span>
                  <span className={styles.cursorPointer}>↖</span>
                </div>
              </div>
              <div className={styles.headerNotepad}>
                <span>/ {es ? 'Aplicaciones móviles' : 'Mobile apps'}</span>
                <span>/ {es ? 'Plataformas web' : 'Web platforms'}</span>
                <span>
                  / {es ? 'Herramientas y experimentos' : 'Tools & experiments'}
                </span>
              </div>
            </div>
          </header>
          <Suspense
            fallback={
              <p className={styles.loading}>
                {es ? 'Cargando proyectos…' : 'Loading projects…'}
              </p>
            }
          >
            <WorkGallery locale={locale} />
          </Suspense>
        </Container>
      </main>
      <HomeFooter locale={locale} />
    </>
  );
}
