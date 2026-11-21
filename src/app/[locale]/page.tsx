import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, Download } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/design-system/components';
import { SiteNavigation } from '@/components/site-navigation';
import { SelectedWork } from '@/components/selected-work';
import { AboutPreview } from '@/components/about-preview';
import { LabPreview } from '@/components/lab-preview';
import { ContactSection } from '@/components/contact-section';
import { SiteFooter } from '@/components/site-footer';
import styles from '@/components/home.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
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
      <SiteNavigation locale={locale} />
      <main id="main">
        <Container>
          <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.copy}>
              <p className={styles.eyebrow}>
                01 / {es ? 'INTRODUCCIÓN' : 'INTRODUCTION'}
              </p>
              <h1 id="hero-title" className={styles.title}>
                LUCIANO
                <br />
                NICOLINI.
              </h1>
              <p className={styles.role}>Mobile &amp; Web Developer</p>
              <p className={styles.intro}>
                {es
                  ? 'Construyo productos digitales con diseño, código e intención.'
                  : 'I build digital products with design, code and intent.'}
              </p>
              <div className={styles.actions}>
                <a
                  href="#work"
                  className={`${styles.action} ${styles.primary}`}
                >
                  <span className={styles.actionText}>
                    {es ? 'VER PROYECTOS' : 'EXPLORE WORK'}
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2.5}
                    />
                  </span>
                </a>
                <button className={styles.action} disabled type="button">
                  <span className={styles.actionText}>
                    <Download aria-hidden="true" size={18} strokeWidth={2.5} />
                    {es ? 'DESCARGAR CV' : 'DOWNLOAD CV'}
                  </span>
                  <small className={styles.actionBadge}>
                    {es ? 'Próximamente' : 'Coming soon'}
                  </small>
                </button>
              </div>
            </div>
            <div className={`${styles.art} graphic-tilt`}>
              <Image
                src="/artwork/hero-artwork.webp"
                alt=""
                width={1448}
                height={1086}
                sizes="(max-width: 767px) 45vw, (max-width: 1200px) 48vw, 620px"
                priority
                fetchPriority="high"
              />
            </div>
          </section>
        </Container>
        <div
          className={styles.strip}
          aria-label={es ? 'Tecnologías principales' : 'Core technologies'}
        >
          <div className={styles.stripInner}>
            <ul className={styles.stripList}>
              {['SwiftUI', 'Flutter', 'Next.js', 'TypeScript', 'React'].map(
                (tech) => (
                  <li key={tech}>{tech}</li>
                )
              )}
            </ul>
            <div className={styles.stripHazard} aria-hidden="true" />
          </div>
        </div>

        <SelectedWork locale={locale} />
        <AboutPreview locale={locale} />
        <LabPreview locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
