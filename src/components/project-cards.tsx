import Image from 'next/image';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './design-system/components';
import { Project } from '@/data/projects';
import styles from './home.module.css';

const accentColorMap: Record<Project['accentColor'], string> = {
  mint: styles.cardMint,
  coral: styles.cardCoral,
  yellow: styles.cardYellow,
  canvas: styles.cardCanvas
};

export interface FeaturedMobileCardProps {
  project: Project;
  locale: string;
  spanClass: string;
  tallMedia?: boolean;
  priority?: boolean;
}

export function FeaturedMobileCard({
  project,
  locale,
  spanClass,
  tallMedia = false,
  priority = false
}: FeaturedMobileCardProps) {
  const es = locale === 'es';
  const content = es ? project.es : project.en;
  const accentClass = accentColorMap[project.accentColor] || styles.cardMint;

  return (
    <article
      className={`${styles.projectCard} ${accentClass} ${spanClass}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.tagGroup}>
          <span className={styles.categoryTag}>{content.categoryLabel}</span>
          <span className={styles.statusPill}>{content.statusLabel}</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 id={`project-${project.id}-title`} className={styles.projectTitle}>
          <a href={`/${locale}/work/${project.slug}`}>{content.title}</a>
        </h3>
        <p className={styles.projectTagline}>{content.tagline}</p>
        <p className={styles.projectDescription}>{content.description}</p>

        {content.highlights.length > 0 && (
          <ul className={styles.highlightList}>
            {content.highlights.map((hl) => (
              <li key={hl} className={styles.highlightItem}>
                <CheckCircle2
                  size={16}
                  className={styles.checkIcon}
                  aria-hidden="true"
                />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.techPills}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techPill}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.image && (
        <div className={tallMedia ? styles.mediaFrameTall : styles.mediaFrame}>
          <Image
            src={project.image.src}
            alt={es ? project.image.altEs : project.image.altEn}
            width={project.image.width}
            height={project.image.height}
            priority={priority}
            className={
              tallMedia ? styles.projectImageContain : styles.projectImage
            }
            sizes={
              tallMedia
                ? '(max-width: 767px) 90vw, (max-width: 1200px) 35vw, 420px'
                : '(max-width: 767px) 90vw, (max-width: 1200px) 50vw, 650px'
            }
          />
        </div>
      )}

      {(project.repositoryUrl || project.liveUrl) && (
        <div className={styles.cardFooterLinks}>
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
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
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLinkPrimary}
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>{es ? 'Demo en vivo' : 'Live demo'} ↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export interface FeaturedWideCardProps {
  project: Project;
  locale: string;
  spanClass?: string;
}

export function FeaturedWideCard({
  project,
  locale,
  spanClass = styles.span12
}: FeaturedWideCardProps) {
  const es = locale === 'es';
  const content = es ? project.es : project.en;
  const accentClass = accentColorMap[project.accentColor] || styles.cardYellow;

  return (
    <article
      className={`${styles.projectCard} ${accentClass} ${spanClass}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.tagGroup}>
          <span className={styles.categoryTag}>{content.categoryLabel}</span>
          <span className={styles.statusPill}>{content.statusLabel}</span>
        </div>
      </div>

      <div className={styles.cardWideLayout}>
        <div className={styles.cardWideCopy}>
          <h3
            id={`project-${project.id}-title`}
            className={styles.projectTitle}
          >
            <a href={`/${locale}/work/${project.slug}`}>{content.title}</a>
          </h3>
          <p className={styles.projectTagline}>{content.tagline}</p>
          <p className={styles.projectDescription}>{content.description}</p>

          {content.highlights.length > 0 && (
            <ul className={styles.highlightList}>
              {content.highlights.map((hl) => (
                <li key={hl} className={styles.highlightItem}>
                  <CheckCircle2
                    size={16}
                    className={styles.checkIcon}
                    aria-hidden="true"
                  />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.techPills}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techPill}>
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.cardFooterLinks}>
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <GithubIcon size={16} />
                <span>{es ? 'Repositorio' : 'Repository'} ↗</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
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

        {project.image && (
          <div className={styles.mediaFrameWide}>
            <Image
              src={project.image.src}
              alt={es ? project.image.altEs : project.image.altEn}
              width={project.image.width}
              height={project.image.height}
              className={styles.projectImageCover}
              sizes="(max-width: 767px) 90vw, (max-width: 1200px) 55vw, 680px"
            />
          </div>
        )}
      </div>
    </article>
  );
}

export interface CompactProjectCardProps {
  project: Project;
  locale: string;
  spanClass: string;
  showHighlights?: boolean;
}

export function CompactProjectCard({
  project,
  locale,
  spanClass,
  showHighlights = false
}: CompactProjectCardProps) {
  const es = locale === 'es';
  const content = es ? project.es : project.en;
  const accentClass = accentColorMap[project.accentColor] || styles.cardCanvas;

  return (
    <article
      className={`${styles.projectCard} ${accentClass} ${spanClass}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.tagGroup}>
          <span className={styles.categoryTag}>{content.categoryLabel}</span>
          <span className={styles.statusPill}>{content.statusLabel}</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 id={`project-${project.id}-title`} className={styles.projectTitle}>
          <a href={`/${locale}/work/${project.slug}`}>{content.title}</a>
        </h3>
        <p className={styles.projectTagline}>{content.tagline}</p>
        <p className={styles.projectDescription}>{content.description}</p>

        {showHighlights && content.highlights.length > 0 && (
          <ul className={styles.highlightList}>
            {content.highlights.map((hl) => (
              <li key={hl} className={styles.highlightItem}>
                <CheckCircle2
                  size={16}
                  className={styles.checkIcon}
                  aria-hidden="true"
                />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.techPills}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techPill}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.image && (
        <div className={styles.mediaFrameCompact}>
          <Image
            src={project.image.src}
            alt={es ? project.image.altEs : project.image.altEn}
            width={project.image.width}
            height={project.image.height}
            className={styles.projectImage}
            sizes="(max-width: 767px) 90vw, (max-width: 1200px) 30vw, 360px"
          />
        </div>
      )}

      {(project.repositoryUrl || project.liveUrl) && (
        <div className={styles.cardFooterLinks}>
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              <GithubIcon size={16} />
              <span>{es ? 'Repositorio' : 'Repository'} ↗</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLinkPrimary}
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>Demo ↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
