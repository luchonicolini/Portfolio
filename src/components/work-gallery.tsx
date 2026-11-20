'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllProjects } from '@/data/projects';
import {
  filterProjects,
  parseWorkCategory,
  workCategories,
  type WorkCategory
} from '@/data/work-categories';
import {
  CompactProjectCard,
  FeaturedMobileCard,
  FeaturedWideCard
} from './project-cards';
import styles from './work.module.css';
import homeStyles from './home.module.css';

const labels: Record<WorkCategory, [string, string]> = {
  all: ['Todos', 'All projects'],
  mobile: ['Mobile', 'Mobile'],
  'native-ios': ['iOS nativo', 'Native iOS'],
  'full-stack': ['Full-stack', 'Full-stack'],
  engineering: ['Ingeniería', 'Engineering'],
  'web-design': ['Diseño web', 'Web design']
};

export function WorkGallery({ locale }: { locale: string }) {
  const es = locale === 'es';
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearchParams();
  const rawCategory = search.get('category');
  const category =
    rawCategory === null ? 'all' : parseWorkCategory(rawCategory);
  const allProjects = getAllProjects();
  const projects = category ? filterProjects(allProjects, category) : [];

  function selectCategory(next: WorkCategory) {
    const query = new URLSearchParams(search.toString());
    if (next === 'all') query.delete('category');
    else query.set('category', next);
    const suffix = query.toString();
    router.push(
      `${pathname}${suffix ? `?${suffix}` : ''}${window.location.hash}`,
      { scroll: false }
    );
  }

  return (
    <>
      <div className={styles.filtersContainer}>
        <div
          className={styles.filters}
          role="group"
          aria-label={es ? 'Filtrar proyectos' : 'Filter projects'}
        >
          {workCategories.map((item) => {
            const count =
              item === 'all'
                ? allProjects.length
                : allProjects.filter((p) => p.category === item).length;
            const label = labels[item][es ? 0 : 1];
            return (
              <button
                className={styles.filter}
                aria-label={label}
                aria-pressed={category === item}
                key={item}
                onClick={() => selectCategory(item)}
                type="button"
              >
                <span>{label}</span>
                <span className={styles.filterCountBadge}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        {projects.length} {es ? 'proyectos' : 'projects'}
      </p>

      <h2 className={styles.srOnly}>
        {es ? 'Lista de proyectos' : 'Project list'}
      </h2>

      {projects.length ? (
        <div className={homeStyles.workGrid}>
          {projects.map((project) => {
            if (project.id === 'puente' || project.id === 'dolarto')
              return (
                <FeaturedMobileCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  spanClass={
                    project.id === 'puente'
                      ? homeStyles.span7
                      : homeStyles.span5
                  }
                  tallMedia
                  priority
                />
              );
            if (project.id === 'stitchhub')
              return (
                <FeaturedWideCard
                  key={project.id}
                  project={project}
                  locale={locale}
                />
              );
            return (
              <CompactProjectCard
                key={project.id}
                project={
                  project.id === 'rial-electronica'
                    ? { ...project, image: undefined }
                    : project
                }
                locale={locale}
                spanClass={homeStyles.span4}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            !
          </div>
          <p className={styles.emptyText}>
            {es
              ? 'No hay proyectos para este filtro. Elegí otra categoría.'
              : 'No projects match this filter. Choose another category.'}
          </p>
          <button
            type="button"
            className={styles.filter}
            onClick={() => selectCategory('all')}
          >
            {es ? 'Ver todos los proyectos' : 'View all projects'}
          </button>
        </div>
      )}
    </>
  );
}
