import Image from 'next/image';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Container, GithubIcon } from './design-system/components';
import { getAllProjects } from '@/data/projects';
import styles from './home.module.css';

export function SelectedWork({ locale }: { locale: string }) {
  const es = locale === 'es';
  const projects = getAllProjects();

  const puente = projects.find((p) => p.id === 'puente')!;
  const dolarto = projects.find((p) => p.id === 'dolarto')!;
  const stitchhub = projects.find((p) => p.id === 'stitchhub')!;
  const leadradar = projects.find((p) => p.id === 'leadradar')!;
  const rial = projects.find((p) => p.id === 'rial-electronica')!;
  const scopeguard = projects.find((p) => p.id === 'scopeguard')!;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>
              02 / {es ? 'PROYECTOS DESTACADOS' : 'SELECTED WORK'}
            </p>
            <h2 id="work-title" className={styles.sectionTitle}>
              {es ? 'TRABAJO SELECCIONADO.' : 'SELECTED WORK.'}
            </h2>
          </div>
          <div className={styles.sectionHeaderRight}>
            <span className={styles.sectionBadge} aria-disabled="true">
              {es ? 'VER TODOS' : 'VIEW ALL'} →
              <small className={styles.actionBadge}>
                {es ? 'Próximamente' : 'Coming soon'}
              </small>
            </span>
          </div>
        </div>

        <div className={styles.workGrid}>
          {/* 1. Puente — Prominent Mobile/Accessibility Card (7 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardMint} ${styles.span7}`}
            aria-labelledby="project-puente-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es ? puente.es.categoryLabel : puente.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? puente.es.statusLabel : puente.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 id="project-puente-title" className={styles.projectTitle}>
                {puente.es.title}
              </h3>
              <p className={styles.projectTagline}>
                {es ? puente.es.tagline : puente.en.tagline}
              </p>
              <p className={styles.projectDescription}>
                {es ? puente.es.description : puente.en.description}
              </p>

              <ul className={styles.highlightList}>
                {(es ? puente.es.highlights : puente.en.highlights).map(
                  (hl) => (
                    <li key={hl} className={styles.highlightItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.checkIcon}
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  )
                )}
              </ul>

              <div className={styles.techPills}>
                {puente.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {puente.image && (
              <div className={styles.mediaFrame}>
                <Image
                  src={puente.image.src}
                  alt={puente.image.alt}
                  width={puente.image.width}
                  height={puente.image.height}
                  className={styles.projectImage}
                  sizes="(max-width: 767px) 90vw, (max-width: 1200px) 50vw, 650px"
                />
              </div>
            )}

            <div className={styles.cardFooter}>
              {puente.repositoryUrl && (
                <a
                  href={puente.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <GithubIcon size={16} />
                  <span>
                    {es ? 'Ver repositorio en GitHub' : 'View on GitHub'} ↗
                  </span>
                </a>
              )}
            </div>
          </article>

          {/* 2. DolarTo — Native iOS Card (5 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardCoral} ${styles.span5}`}
            aria-labelledby="project-dolarto-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es ? dolarto.es.categoryLabel : dolarto.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? dolarto.es.statusLabel : dolarto.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 id="project-dolarto-title" className={styles.projectTitle}>
                {dolarto.es.title}
              </h3>
              <p className={styles.projectTagline}>
                {es ? dolarto.es.tagline : dolarto.en.tagline}
              </p>
              <p className={styles.projectDescription}>
                {es ? dolarto.es.description : dolarto.en.description}
              </p>

              <ul className={styles.highlightList}>
                {(es ? dolarto.es.highlights : dolarto.en.highlights).map(
                  (hl) => (
                    <li key={hl} className={styles.highlightItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.checkIcon}
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  )
                )}
              </ul>

              <div className={styles.techPills}>
                {dolarto.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {dolarto.image && (
              <div className={styles.mediaFrameTall}>
                <Image
                  src={dolarto.image.src}
                  alt={dolarto.image.alt}
                  width={dolarto.image.width}
                  height={dolarto.image.height}
                  className={styles.projectImageContain}
                  sizes="(max-width: 767px) 90vw, (max-width: 1200px) 35vw, 420px"
                />
              </div>
            )}

            <div className={styles.cardFooter}>
              {dolarto.repositoryUrl && (
                <a
                  href={dolarto.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <GithubIcon size={16} />
                  <span>
                    {es ? 'Ver repositorio en GitHub' : 'View on GitHub'} ↗
                  </span>
                </a>
              )}
            </div>
          </article>

          {/* 3. StitchHub — Wide Desktop Showcase Card (12 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardYellow} ${styles.span12}`}
            aria-labelledby="project-stitchhub-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es ? stitchhub.es.categoryLabel : stitchhub.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? stitchhub.es.statusLabel : stitchhub.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardWideLayout}>
              <div className={styles.cardWideCopy}>
                <h3
                  id="project-stitchhub-title"
                  className={styles.projectTitle}
                >
                  {stitchhub.es.title}
                </h3>
                <p className={styles.projectTagline}>
                  {es ? stitchhub.es.tagline : stitchhub.en.tagline}
                </p>
                <p className={styles.projectDescription}>
                  {es ? stitchhub.es.description : stitchhub.en.description}
                </p>

                <ul className={styles.highlightList}>
                  {(es ? stitchhub.es.highlights : stitchhub.en.highlights).map(
                    (hl) => (
                      <li key={hl} className={styles.highlightItem}>
                        <CheckCircle2
                          size={16}
                          className={styles.checkIcon}
                          aria-hidden="true"
                        />
                        <span>{hl}</span>
                      </li>
                    )
                  )}
                </ul>

                <div className={styles.techPills}>
                  {stitchhub.technologies.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooterLinks}>
                  {stitchhub.repositoryUrl && (
                    <a
                      href={stitchhub.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <GithubIcon size={16} />
                      <span>{es ? 'Repositorio' : 'Repository'} ↗</span>
                    </a>
                  )}
                  {stitchhub.liveUrl && (
                    <a
                      href={stitchhub.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLinkPrimary}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      <span>{es ? 'Demo en vivo' : 'Live demo'} ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {stitchhub.image && (
                <div className={styles.mediaFrameWide}>
                  <Image
                    src={stitchhub.image.src}
                    alt={stitchhub.image.alt}
                    width={stitchhub.image.width}
                    height={stitchhub.image.height}
                    className={styles.projectImageCover}
                    sizes="(max-width: 767px) 90vw, (max-width: 1200px) 55vw, 680px"
                  />
                </div>
              )}
            </div>
          </article>

          {/* 4. LeadRadar — Engineering / B2B Audit Card (5 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardCanvas} ${styles.span5}`}
            aria-labelledby="project-leadradar-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es ? leadradar.es.categoryLabel : leadradar.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? leadradar.es.statusLabel : leadradar.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 id="project-leadradar-title" className={styles.projectTitle}>
                {leadradar.es.title}
              </h3>
              <p className={styles.projectTagline}>
                {es ? leadradar.es.tagline : leadradar.en.tagline}
              </p>
              <p className={styles.projectDescription}>
                {es ? leadradar.es.description : leadradar.en.description}
              </p>

              <ul className={styles.highlightList}>
                {(es ? leadradar.es.highlights : leadradar.en.highlights).map(
                  (hl) => (
                    <li key={hl} className={styles.highlightItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.checkIcon}
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  )
                )}
              </ul>

              <div className={styles.techPills}>
                {leadradar.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              {leadradar.repositoryUrl && (
                <a
                  href={leadradar.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <GithubIcon size={16} />
                  <span>
                    {es ? 'Ver repositorio en GitHub' : 'View on GitHub'} ↗
                  </span>
                </a>
              )}
            </div>
          </article>

          {/* 5. Rial Electrónica — Independent Redesign Demo (4 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardMint} ${styles.span4}`}
            aria-labelledby="project-rial-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es ? rial.es.categoryLabel : rial.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? rial.es.statusLabel : rial.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 id="project-rial-title" className={styles.projectTitle}>
                {rial.es.title}
              </h3>
              <p className={styles.projectTagline}>
                {es ? rial.es.tagline : rial.en.tagline}
              </p>
              <p className={styles.projectDescription}>
                {es ? rial.es.description : rial.en.description}
              </p>

              <div className={styles.techPills}>
                {rial.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {rial.image && (
              <div className={styles.mediaFrameCompact}>
                <Image
                  src={rial.image.src}
                  alt={rial.image.alt}
                  width={rial.image.width}
                  height={rial.image.height}
                  className={styles.projectImage}
                  sizes="(max-width: 767px) 90vw, (max-width: 1200px) 30vw, 360px"
                />
              </div>
            )}

            <div className={styles.cardFooterLinks}>
              {rial.repositoryUrl && (
                <a
                  href={rial.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <GithubIcon size={16} />
                  <span>{es ? 'Repo' : 'Repo'} ↗</span>
                </a>
              )}
              {rial.liveUrl && (
                <a
                  href={rial.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLinkPrimary}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Demo ↗</span>
                </a>
              )}
            </div>
          </article>

          {/* 6. ScopeGuard — In-development Mobile Tool (3 cols) */}
          <article
            className={`${styles.projectCard} ${styles.cardYellow} ${styles.span3}`}
            aria-labelledby="project-scopeguard-title"
          >
            <div className={styles.cardHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.categoryTag}>
                  {es
                    ? scopeguard.es.categoryLabel
                    : scopeguard.en.categoryLabel}
                </span>
                <span className={styles.statusPill}>
                  {es ? scopeguard.es.statusLabel : scopeguard.en.statusLabel}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 id="project-scopeguard-title" className={styles.projectTitle}>
                {scopeguard.es.title}
              </h3>
              <p className={styles.projectTagline}>
                {es ? scopeguard.es.tagline : scopeguard.en.tagline}
              </p>
              <p className={styles.projectDescription}>
                {es ? scopeguard.es.description : scopeguard.en.description}
              </p>

              <div className={styles.techPills}>
                {scopeguard.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.cardFooter}>
              {scopeguard.repositoryUrl && (
                <a
                  href={scopeguard.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <GithubIcon size={16} />
                  <span>{es ? 'Ver repositorio' : 'View on GitHub'} ↗</span>
                </a>
              )}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
