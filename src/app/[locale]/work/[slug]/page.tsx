import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code,
  Compass,
  Cpu,
  ExternalLink,
  Layers,
  Palette,
  Target,
  Zap
} from 'lucide-react';
import { Container } from '@/components/design-system/components';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteFooter } from '@/components/site-footer';
import { DolarToGallery } from '@/components/dolarto-gallery';
import { LeadRadarArchitecture } from '@/components/leadradar-architecture';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { getCaseStudy } from '@/data/case-studies';
import styles from '@/components/case-study.module.css';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const content = locale === 'es' ? project.es : project.en;
  const title = `${content.title} — Luciano Nicolini`;
  return {
    title,
    description: content.tagline,
    openGraph: { title, description: content.tagline },
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { es: `/es/work/${slug}`, en: `/en/work/${slug}` }
    }
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const es = locale === 'es';
  const content = es ? project.es : project.en;
  const copy = es ? study.es : study.en;

  const projects = getAllProjects();
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const previousContent = es ? previous.es : previous.en;
  const nextContent = es ? next.es : next.en;

  const accentClass =
    project.accentColor === 'mint'
      ? styles.mediaMint
      : project.accentColor === 'coral'
        ? styles.mediaCoral
        : project.accentColor === 'yellow'
          ? styles.mediaYellow
          : styles.mediaCanvas;

  return (
    <>
      <SiteNavigation locale={locale} activeRoute="work" />
      <main id="main" className={styles.main}>
        <Container>
          <nav
            aria-label={es ? 'Ruta de navegación' : 'Breadcrumbs'}
            className={styles.breadcrumbs}
          >
            <Link href={`/${locale}/work`} className={styles.breadcrumbLink}>
              {es ? 'PROYECTOS' : 'WORK'}
            </Link>
            <span className={styles.breadcrumbSeparator} aria-hidden="true">
              &gt;
            </span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              {content.title.toUpperCase()}
            </span>
          </nav>

          <section className={styles.hero} aria-labelledby="project-title">
            <div className={styles.heroIntro}>
              <div>
                <div className={styles.heroBadgeRow}>
                  <div
                    className={styles.appIcon}
                    style={{
                      background:
                        project.accentColor === 'mint'
                          ? 'var(--color-mint)'
                          : project.accentColor === 'coral'
                            ? 'var(--color-coral)'
                            : 'var(--color-primary)'
                    }}
                    aria-hidden="true"
                  >
                    {content.title.substring(0, 2).toUpperCase()}
                  </div>
                  <span className={styles.categoryTag}>
                    {content.categoryLabel}
                  </span>
                </div>
                <h1 id="project-title" className={styles.title}>
                  {content.title}
                </h1>
                <p className={styles.tagline}>{content.tagline}</p>
                <p className={styles.description}>{content.description}</p>
              </div>

              <div
                className={styles.techTags}
                role="list"
                aria-label={es ? 'Tecnologías utilizadas' : 'Technologies used'}
              >
                {project.technologies.map((tech) => (
                  <span key={tech} role="listitem" className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {slug === 'dolarto' ? (
              <DolarToGallery locale={locale} />
            ) : slug === 'leadradar' ? (
              <LeadRadarArchitecture copy={copy} locale={locale} />
            ) : project.image ? (
              <figure className={`${styles.mediaContainer} ${accentClass}`}>
                <div className={styles.mediaImageWrapper}>
                  <Image
                    src={project.image.src}
                    alt={es ? project.image.altEs : project.image.altEn}
                    width={project.image.width}
                    height={project.image.height}
                    priority
                    fetchPriority="high"
                    className={styles.mediaImage}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>
                <figcaption className={styles.mediaCaption}>
                  {slug === 'puente'
                    ? es
                      ? 'Ilustración de onboarding; no es una captura de la aplicación.'
                      : 'Onboarding illustration; not an application screenshot.'
                    : slug === 'stitchhub'
                      ? es
                        ? 'Captura de pantalla de la plataforma web en funcionamiento (datos demostrativos).'
                        : 'Screenshot of the running web platform (demonstrative preview data).'
                      : slug === 'rial-electronica'
                        ? es
                          ? 'Demostración de catálogo comercial independiente (no oficial, sin cobros reales).'
                          : 'Independent unofficial commercial catalog demo (no real payment processing).'
                        : es
                          ? 'Captura del proyecto.'
                          : 'Project screenshot.'}
                </figcaption>
                {copy.disclaimer ? (
                  <div className={styles.disclaimerBadge}>
                    <AlertCircle
                      size={18}
                      aria-hidden="true"
                      style={{ flexShrink: 0 }}
                    />
                    <span>{copy.disclaimer}</span>
                  </div>
                ) : null}
              </figure>
            ) : (
              <figure
                className={`${styles.mediaContainer} ${styles.mediaYellow}`}
              >
                <figcaption className={styles.mediaCaption}>
                  {copy.disclaimer ??
                    (es
                      ? 'Prototipo de laboratorio demostrativo local sin persistencia remota ni backend activo.'
                      : 'Local demonstration lab prototype without remote backend or active persistence.')}
                </figcaption>
              </figure>
            )}

            <div className={styles.overviewCard}>
              <div className={styles.overviewHeader}>
                <span>{es ? 'RESUMEN.' : 'OVERVIEW.'}</span>
                <div className={styles.stripes} aria-hidden="true" />
              </div>
              <div className={styles.overviewBody}>
                <p className={styles.overviewText}>{copy.overview}</p>

                <div className={styles.metaGrid}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>
                      {es ? 'Estado' : 'Status'}
                    </span>
                    <span className={styles.statusPill}>
                      {copy.statusBadge}
                    </span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>
                      {es ? 'Plataformas' : 'Platforms'}
                    </span>
                    <span className={styles.metaValue}>{copy.platforms}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>
                      {es ? 'Tecnologías' : 'Technologies'}
                    </span>
                    <span className={styles.metaValue}>
                      {project.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>
                      {es ? 'Repositorio' : 'Repository'}
                    </span>
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.metaLink}
                      >
                        GitHub ↗
                      </a>
                    ) : (
                      <span className={styles.metaValue}>
                        {es ? 'Privado / Confidencial' : 'Private / Internal'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className={styles.problemSolutionGrid}
            aria-labelledby="problem-heading"
          >
            <div className={styles.problemCard}>
              <div className={styles.cardHeader}>
                <Target
                  size={24}
                  aria-hidden="true"
                  style={{ color: 'var(--color-coral)' }}
                />
                <h2 id="problem-heading">
                  {es ? 'El problema y el objetivo' : 'Problem & objective'}
                </h2>
              </div>
              <p className={styles.cardText}>{copy.problem}</p>
            </div>

            <div className={styles.arrowDivider} aria-hidden="true">
              &rarr;
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <Zap
                  size={24}
                  aria-hidden="true"
                  style={{ color: 'var(--color-ink)' }}
                />
                <h2>
                  {es ? 'La solución implementada' : 'Implemented solution'}
                </h2>
              </div>
              <p className={styles.cardText}>{copy.solution}</p>
            </div>
          </section>

          <section
            aria-labelledby="features-heading"
            style={{ marginBottom: '3.5rem' }}
          >
            <h2 id="features-heading" className={styles.sectionHeading}>
              <Layers size={26} aria-hidden="true" />
              {es ? 'Funcionalidades principales' : 'Core capabilities'}
            </h2>
            <div className={styles.featuresGrid}>
              {copy.features.map((feat) => (
                <div key={feat.title} className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        background: 'var(--color-ink)',
                        display: 'inline-block'
                      }}
                      aria-hidden="true"
                    />
                    {feat.title}
                  </h3>
                  <p className={styles.featureDesc}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="deepdive-heading"
            style={{ marginBottom: '3.5rem' }}
          >
            <h2 id="deepdive-heading" className={styles.srOnly}>
              {es
                ? 'Profundización técnica y decisiones'
                : 'Technical deep-dive and decisions'}
            </h2>
            <div className={styles.deepDiveGrid}>
              <div className={styles.deepDiveCard}>
                <h3 className={styles.deepDiveHeader}>
                  <Cpu size={22} aria-hidden="true" />
                  {es
                    ? 'Arquitectura y decisiones'
                    : 'Architecture & decisions'}
                </h3>
                <p className={styles.deepDiveBody}>{copy.architecture}</p>
              </div>

              <div className={styles.deepDiveCard}>
                <h3 className={styles.deepDiveHeader}>
                  <Palette size={22} aria-hidden="true" />
                  {es ? 'Diseño y experiencia' : 'Design & experience'}
                </h3>
                <p className={styles.deepDiveBody}>{copy.design}</p>
                <div
                  className={styles.swatchesRow}
                  aria-label={es ? 'Paleta del proyecto' : 'Project palette'}
                >
                  <div
                    className={styles.swatch}
                    style={{ background: 'var(--color-mint)' }}
                    title="Mint"
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: 'var(--color-primary)' }}
                    title="Yellow"
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: 'var(--color-coral)' }}
                    title="Coral"
                  />
                  <div
                    className={styles.swatch}
                    style={{ background: 'var(--color-ink)' }}
                    title="Ink"
                  />
                </div>
              </div>

              <div className={styles.deepDiveCard}>
                <h3 className={styles.deepDiveHeader}>
                  <CheckCircle2 size={22} aria-hidden="true" />
                  {es ? 'Validación y pruebas' : 'Testing & validation'}
                </h3>
                <p className={styles.deepDiveBody}>{copy.testing}</p>
                <p className={styles.deepDiveBody}>
                  <strong>
                    {es ? 'Estado y límites:' : 'Status & limits:'}
                  </strong>{' '}
                  {copy.limitations}
                </p>
              </div>

              <div className={styles.deepDiveCard}>
                <h3 className={styles.deepDiveHeader}>
                  <Compass size={22} aria-hidden="true" />
                  {es
                    ? 'Funcionalidad implementada'
                    : 'Implemented functionality'}
                </h3>
                <p className={styles.deepDiveBody}>{copy.implementation}</p>
              </div>
            </div>
          </section>

          <section
            className={styles.actionBanner}
            aria-labelledby="banner-heading"
          >
            <h2 id="banner-heading" className={styles.actionBannerTitle}>
              <Code size={28} aria-hidden="true" />
              {es ? 'VER EL PROYECTO.' : 'VIEW PROJECT.'}
            </h2>
            <div className={styles.actionButtons}>
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <span>
                    {es ? 'Repositorio en GitHub' : 'GitHub Repository'}
                  </span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              ) : null}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <span>{es ? 'Demostración en vivo' : 'Live Demo'}</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              ) : (
                <span
                  className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
                  aria-disabled="true"
                >
                  {slug === 'leadradar'
                    ? es
                      ? 'Herramienta interna privada'
                      : 'Internal private tool'
                    : slug === 'puente'
                      ? es
                        ? 'En desarrollo activo'
                        : 'Active MVP development'
                      : slug === 'dolarto'
                        ? es
                          ? 'Enlace App Store en revisión'
                          : 'App Store listing in review'
                        : es
                          ? 'Demostración local'
                          : 'Local demonstration'}
                </span>
              )}
            </div>
          </section>

          <nav
            className={styles.projectNavigation}
            aria-label={
              es ? 'Navegación entre proyectos' : 'Project navigation'
            }
          >
            <Link
              href={`/${locale}/work/${previous.slug}`}
              className={styles.navLink}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>
                {es ? 'Anterior:' : 'Previous:'} {previousContent.title}
              </span>
            </Link>

            <Link href={`/${locale}/work`} className={styles.navLink}>
              <span>{es ? '← Volver a proyectos' : '← Back to work'}</span>
            </Link>

            <Link
              href={`/${locale}/work/${next.slug}`}
              className={styles.navLink}
            >
              <span>
                {es ? 'Siguiente:' : 'Next:'} {nextContent.title}
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </nav>
        </Container>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
