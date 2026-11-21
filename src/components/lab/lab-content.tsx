'use client';

import { useState, useEffect } from 'react';
import {
  FlaskConical,
  Check,
  Layers,
  Activity,
  Type,
  LayoutGrid,
  PenTool,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Container } from '../design-system/components';
import { ButtonBuilder } from './button-builder';
import { SpringPlayground } from './spring-playground';
import { TypographyPlayground } from './typography-playground';
import { TokensPlayground } from './tokens-playground';
import { LayoutPlayground } from './layout-playground';
import { SvgPlayground } from './svg-playground';
import styles from './lab.module.css';

export interface LabContentProps {
  locale: string;
}

type FilterCategory =
  'all' | 'components' | 'motion' | 'typography' | 'tokens' | 'layout' | 'svg';

export function LabContent({ locale }: LabContentProps) {
  const isEs = locale === 'es';
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>('all');
  const [targetAnchor, setTargetAnchor] = useState<string | null>(null);

  useEffect(() => {
    if (!targetAnchor || typeof window === 'undefined') return;

    // Use requestAnimationFrame to guarantee React has committed and mounted the filtered view in the DOM
    const frameId = requestAnimationFrame(() => {
      const element = document.getElementById(targetAnchor);
      if (element) {
        const prefersReducedMotion =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        element.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
      setTargetAnchor(null);
    });

    return () => cancelAnimationFrame(frameId);
  }, [selectedCategory, targetAnchor]);

  function handleFilterClick(category: FilterCategory, anchor?: string) {
    setSelectedCategory(category);
    if (anchor) {
      setTargetAnchor(anchor);
    } else {
      setTargetAnchor('lab-experiments-container');
    }
  }

  const filterOptions: {
    id: FilterCategory;
    label: string;
    icon: typeof Sliders;
    anchor?: string;
  }[] = [
    {
      id: 'all',
      label: isEs ? 'Todos' : 'All',
      icon: Sliders
    },
    {
      id: 'components',
      label: isEs ? 'Componentes' : 'Components',
      icon: Sparkles,
      anchor: 'experiment-01'
    },
    {
      id: 'motion',
      label: isEs ? 'Física Motion' : 'Motion Physics',
      icon: Activity,
      anchor: 'spring-physics'
    },
    {
      id: 'typography',
      label: isEs ? 'Tipografía' : 'Typography',
      icon: Type,
      anchor: 'experiment-03'
    },
    {
      id: 'tokens',
      label: isEs ? 'Design Tokens' : 'Design Tokens',
      icon: Layers,
      anchor: 'experiment-tokens'
    },
    {
      id: 'layout',
      label: isEs ? 'Layout FLIP' : 'Layout FLIP',
      icon: LayoutGrid,
      anchor: 'layout-animation'
    },
    {
      id: 'svg',
      label: isEs ? 'SVG Vectorial' : 'Vector SVG',
      icon: PenTool,
      anchor: 'experiment-svg'
    }
  ];

  const checklistItems = isEs
    ? [
        'Probar componentes interactivos reales',
        'Explorar físicas de resorte y transiciones FLIP',
        'Ver y copiar bloques de CSS y Motion en vivo',
        'Verificar contraste WCAG 2.2 AA en tiempo real'
      ]
    : [
        'Test real interactive components',
        'Explore spring dynamics and FLIP transitions',
        'Inspect and copy live CSS & Motion snippets',
        'Validate WCAG 2.2 AA contrast ratios in real time'
      ];

  const technologies = [
    'Next.js 16',
    'React 19',
    'Motion',
    'TypeScript',
    'Tailwind CSS v4',
    'CSS Modules',
    'Native SVG',
    'WCAG 2.2 AA'
  ];

  return (
    <div className={styles.labMain}>
      {/* Editorial Hero Section */}
      <section
        className={styles.heroSection}
        aria-labelledby="lab-main-heading"
      >
        <Container>
          <div className={styles.heroGrid}>
            {/* Left Column: Heading, Lead & Feature Window */}
            <div>
              <span className={styles.eyebrow}>04 / DEVELOPER LAB</span>
              <h1 id="lab-main-heading" className={styles.heroTitle}>
                DEV LAB.
              </h1>
              <p className={styles.heroLead}>
                {isEs
                  ? 'Un laboratorio interactivo donde experimento, construyo y comparto ideas, componentes y soluciones técnicas con rigor de ingeniería y estética neobrutalista.'
                  : 'An interactive creative-coding laboratory where I experiment, build and share ideas, components and technical solutions with engineering rigor and editorial neo-brutalism.'}
              </p>

              <div className={styles.heroFeatureBox}>
                {/* Terminal Graphic Window */}
                <div className={styles.terminalWindow} aria-hidden="true">
                  <div className={styles.terminalHeader}>
                    <span
                      className={`${styles.terminalDot} ${styles.terminalDotRed}`}
                    />
                    <span
                      className={`${styles.terminalDot} ${styles.terminalDotYellow}`}
                    />
                    <span
                      className={`${styles.terminalDot} ${styles.terminalDotGreen}`}
                    />
                  </div>
                  <span className={styles.terminalCodeIcon}>&lt;/&gt;</span>
                </div>

                {/* Pillars Checklist Card */}
                <div className={styles.checklistCard}>
                  {checklistItems.map((item, idx) => (
                    <div key={idx} className={styles.checklistItem}>
                      <span className={styles.checkIconBox} aria-hidden="true">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Manifesto Card */}
            <div className={styles.heroCalloutCol}>
              <div className={styles.manifestoCard}>
                <div className={styles.manifestoHeader}>
                  <h2 className={styles.manifestoHeaderTitle}>
                    <FlaskConical
                      size={20}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span>{isEs ? 'Experimentá.' : 'Experiment.'}</span>
                  </h2>
                </div>
                <div className={styles.manifestoBody}>
                  <p className={styles.manifestoText}>
                    {isEs
                      ? 'Interactuá, cambiá parámetros y probá en tiempo real. Este espacio documenta exploraciones funcionales antes de consolidarlas en productos de producción.'
                      : 'Interact, tune parameters and test in real time. This space documents functional explorations before landing them in production products.'}
                  </p>
                  <div className={styles.manifestoPillars}>
                    <span className={styles.manifestoPill}>React 19</span>
                    <span className={styles.manifestoPill}>Motion</span>
                    <span className={styles.manifestoPill}>CSS Variables</span>
                    <span className={styles.manifestoPill}>WCAG AA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Category Filter Bar */}
      <nav
        className={styles.filterBarSticky}
        aria-label={isEs ? 'Filtro de experimentos' : 'Experiments filter'}
      >
        <Container>
          <div className={styles.filterButtons} role="toolbar">
            {filterOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = selectedCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                  onClick={() => handleFilterClick(opt.id, opt.anchor)}
                  aria-pressed={isActive}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </nav>

      {/* Interactive Experiments Container */}
      <div
        id="lab-experiments-container"
        className={styles.experimentsContainer}
      >
        <Container>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}
          >
            {/* Experiment 01: Brutalist Button Builder */}
            {(selectedCategory === 'all' ||
              selectedCategory === 'components') && (
              <section
                id="sec-button-builder"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 01: Brutalist Button Builder'
                    : 'Experiment 01: Brutalist Button Builder'
                }
              >
                <ButtonBuilder locale={locale} />
              </section>
            )}

            {/* Experiment 02: Spring Physics Playground */}
            {(selectedCategory === 'all' || selectedCategory === 'motion') && (
              <section
                id="sec-spring-physics"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 02: Spring Physics Playground'
                    : 'Experiment 02: Spring Physics Playground'
                }
              >
                <SpringPlayground locale={locale} />
              </section>
            )}

            {/* Experiment 03: Typography Playground */}
            {(selectedCategory === 'all' ||
              selectedCategory === 'typography') && (
              <section
                id="sec-typography"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 03: Typography Playground'
                    : 'Experiment 03: Typography Playground'
                }
              >
                <TypographyPlayground locale={locale} />
              </section>
            )}

            {/* Experiment 04: Interactive Design Tokens */}
            {(selectedCategory === 'all' || selectedCategory === 'tokens') && (
              <section
                id="sec-design-tokens"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 04: Interactive Design Tokens'
                    : 'Experiment 04: Interactive Design Tokens'
                }
              >
                <TokensPlayground locale={locale} />
              </section>
            )}

            {/* Experiment 05: Layout Animation Playground */}
            {(selectedCategory === 'all' || selectedCategory === 'layout') && (
              <section
                id="sec-layout-animation"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 05: Layout Animation Playground'
                    : 'Experiment 05: Layout Animation Playground'
                }
              >
                <LayoutPlayground locale={locale} />
              </section>
            )}

            {/* Experiment 06: SVG Animation Playground */}
            {(selectedCategory === 'all' || selectedCategory === 'svg') && (
              <section
                id="sec-svg-animation"
                className={styles.experimentSection}
                aria-label={
                  isEs
                    ? 'Experimento 06: SVG Animation Playground'
                    : 'Experiment 06: SVG Animation Playground'
                }
              >
                <SvgPlayground locale={locale} />
              </section>
            )}
          </div>
        </Container>
      </div>

      {/* Technologies & Manifesto Strip */}
      <section
        className={styles.techSection}
        aria-labelledby="lab-tech-heading"
      >
        <Container>
          <div className={styles.techGrid}>
            <div className={styles.techStripCard}>
              <p className={styles.techStripLabel}>
                {isEs ? 'STACK TÉCNICO' : 'TECHNICAL STACK'}
              </p>
              <h2 id="lab-tech-heading" className={styles.techStripHeading}>
                {isEs
                  ? 'Tecnologías y librerías utilizadas'
                  : 'Technologies and libraries employed'}
              </h2>
              <div className={styles.techPills}>
                {technologies.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.whyCard} aria-labelledby="why-lab-heading">
              <h2 id="why-lab-heading" className={styles.whyTitle}>
                <Sparkles size={18} aria-hidden="true" />
                <span>{isEs ? '¿Por qué este lab?' : 'Why this lab?'}</span>
              </h2>
              <p className={styles.whyText}>
                {isEs
                  ? 'Un espacio abierto para validar ideas, poner a prueba físicas de interfaz y refinar código con foco en accesibilidad, rendimiento y diseño editorial.'
                  : 'An open space to validate ideas, stress-test interface physics, and refine code with a focus on accessibility, performance, and editorial design.'}
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* Neo-brutalist Hazard Banner */}
      <aside
        className={styles.hazardRibbon}
        aria-label={isEs ? 'Lema del laboratorio' : 'Lab manifesto banner'}
      >
        <div className={styles.hazardTrack}>
          <span>EXPERIMENTAR</span>
          <span>/</span>
          <span>PROTOTIPAR</span>
          <span>/</span>
          <span>APRENDER</span>
          <span>/</span>
          <span>COMPARTIR</span>
          <span>/</span>
          <span>EXPERIMENT</span>
          <span>/</span>
          <span>PROTOTYPE</span>
          <span>/</span>
          <span>LEARN</span>
          <span>/</span>
          <span>SHARE</span>
        </div>
      </aside>
    </div>
  );
}
