import { Container } from './design-system/components';
import { getAllProjects } from '@/data/projects';
import {
  FeaturedMobileCard,
  FeaturedWideCard,
  CompactProjectCard
} from './project-cards';
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
            <a className={styles.sectionBadge} href={`/${locale}/work`}>
              {es ? 'VER TODOS' : 'VIEW ALL'} →
            </a>
          </div>
        </div>

        <div className={styles.workGrid}>
          {/* 1. Puente — Prominent Mobile/Accessibility Card (7 cols) */}
          <FeaturedMobileCard
            project={puente}
            locale={locale}
            spanClass={styles.span7}
          />

          {/* 2. DolarTo — Native iOS Card (5 cols) */}
          <FeaturedMobileCard
            project={dolarto}
            locale={locale}
            spanClass={styles.span5}
            tallMedia
          />

          {/* 3. StitchHub — Wide Desktop Showcase Card (12 cols) */}
          <FeaturedWideCard project={stitchhub} locale={locale} />

          {/* 4. LeadRadar — Engineering Architecture Case Study (5 cols) */}
          <CompactProjectCard
            project={leadradar}
            locale={locale}
            spanClass={styles.span5}
            showHighlights
          />

          {/* 5. Rial Electrónica — Independent Redesign Demo (4 cols) */}
          <CompactProjectCard
            project={rial}
            locale={locale}
            spanClass={styles.span4}
          />

          {/* 6. ScopeGuard — In-development Mobile Foundation (3 cols) */}
          <CompactProjectCard
            project={scopeguard}
            locale={locale}
            spanClass={styles.span3}
          />
        </div>
      </Container>
    </section>
  );
}
