'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Download,
  Compass,
  PenTool,
  Code2,
  CheckCircle2,
  HeartHandshake,
  Rocket,
  Layers,
  Sparkles
} from 'lucide-react';
import { Container } from '../design-system/components';
import { contactConfig } from '../../data/contact';
import styles from './about.module.css';

export function AboutContent({ locale }: { locale: string }) {
  const es = locale === 'es';

  const profileItems = [
    {
      badge: 'iOS',
      title: 'Native iOS — Swift & SwiftUI',
      text: es
        ? 'Desarrollo nativo para el ecosistema Apple, aplicando SwiftUI y arquitecturas limpias para interfaces fluidas.'
        : 'Native engineering for Apple platforms, applying SwiftUI and clean architectures for smooth user interfaces.',
      active: false
    },
    {
      badge: 'Flutter',
      title: 'Cross-platform — Flutter & Dart',
      text: es
        ? 'Aplicaciones multiplataforma con arquitectura por capas, gestión de estado predecible y accesibilidad integrada.'
        : 'Cross-platform applications with layered architectures, predictable state management, and built-in accessibility.',
      active: false
    },
    {
      badge: 'Web',
      title: 'Web engineering — Next.js & TypeScript',
      text: es
        ? 'Ingeniería web moderna con tipado estricto, componentes semánticos, rendimiento optimizado y suites de pruebas.'
        : 'Modern web engineering with strict typing, semantic components, optimized performance, and test suites.',
      active: false
    },
    {
      badge: es ? 'Enfoque' : 'Focus',
      title: es
        ? 'Current focus — Producto y accesibilidad'
        : 'Current focus — Product & accessibility',
      text: es
        ? 'Desarrollo de productos propios combinando mobile, web, diseño editorial y accesibilidad comprobable.'
        : 'Building independent products combining mobile, web, editorial craft, and verified accessibility.',
      active: true
    }
  ];

  const techStack = [
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Swift', category: 'iOS' },
    { name: 'SwiftUI', category: 'iOS' },
    { name: 'Next.js', category: 'Web' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'React', category: 'Web' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'GitHub', category: 'Tooling' }
  ];

  const processSteps = [
    {
      icon: Compass,
      colorClass: styles.iconYellow,
      title: es ? 'Exploro y defino' : 'Explore & Define',
      desc: es
        ? 'Entiendo el problema, el contexto de uso y los objetivos técnicos.'
        : 'Understand the problem, user context, and core technical goals.'
    },
    {
      icon: PenTool,
      colorClass: styles.iconPink,
      title: es ? 'Diseño la solución' : 'Design the Solution',
      desc: es
        ? 'Estructura modular, flujos de navegación y una experiencia clara.'
        : 'Modular structure, clear user flows, and intuitive interactions.'
    },
    {
      icon: Code2,
      colorClass: styles.iconMint,
      title: es ? 'Desarrollo con rigor' : 'Build with Rigor',
      desc: es
        ? 'Código limpio, tipado estricto, accesible y arquitecturas mantenibles.'
        : 'Clean code, strict typing, accessible semantics, and maintainability.'
    },
    {
      icon: CheckCircle2,
      colorClass: styles.iconCoral,
      title: es ? 'Pruebo y valido' : 'Test & Validate',
      desc: es
        ? 'Pruebas automatizadas, escaneos a11y y refactorización continua.'
        : 'Automated test suites, a11y scans, and continuous refinement.'
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <Container>
        {/* Intro Layout: Bio / Typographic Avatar / Journey */}
        <section
          className={styles.introLayout}
          aria-labelledby="about-main-title"
        >
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              03 / {es ? 'SOBRE MÍ' : 'ABOUT ME'}
            </p>

            <div className={styles.headlineRow}>
              <h1 id="about-main-title" className={styles.headline}>
                {es ? 'SOBRE MÍ.' : 'ABOUT ME.'}
              </h1>
              <div className={styles.rays} aria-hidden="true">
                <Sparkles size={28} />
              </div>
            </div>

            <span className={styles.rolePill}>
              {es ? 'Desarrollador Mobile & Web' : 'Mobile & Web Developer'}
            </span>

            <p className={styles.bio}>
              {es
                ? 'Soy Luciano Nicolini, desarrollador de aplicaciones móviles y web. Me enfoco en crear productos útiles, accesibles y con una experiencia de usuario cuidada, que resuelvan problemas reales.'
                : "I'm Luciano Nicolini, a mobile and web developer. I focus on building useful, accessible products with refined user experiences that solve real problems."}
            </p>

            <div className={styles.actions}>
              <Link href={`/${locale}#work`} className={styles.btnPrimary}>
                <span>{es ? 'Ver proyectos' : 'Explore work'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              {contactConfig.cvUrl ? (
                <a
                  href={contactConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  <Download size={18} aria-hidden="true" />
                  <span>{es ? 'Descargar CV' : 'Download CV'}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.btnDisabled}
                  disabled
                  aria-disabled="true"
                >
                  <Download size={18} aria-hidden="true" />
                  <span>{es ? 'Descargar CV' : 'Download CV'}</span>
                  <span className={styles.badgeSmall}>
                    {es ? 'Próximamente' : 'Coming soon'}
                  </span>
                </button>
              )}
            </div>

            {/* Intentional Typographic/Geometric Avatar */}
            <div
              className={styles.portraitComposition}
              aria-label={
                es
                  ? 'Insignia editorial de Luciano Nicolini'
                  : 'Editorial badge of Luciano Nicolini'
              }
              role="img"
            >
              <div className={styles.avatarCard}>
                <div className={styles.avatarHeader}>
                  <span className={styles.avatarMonogram}>LN.</span>
                  <div className={styles.avatarDots} aria-hidden="true">
                    <span className={styles.avatarDot} />
                    <span className={styles.avatarDot} />
                    <span className={styles.avatarDot} />
                    <span className={styles.avatarDot} />
                    <span className={styles.avatarDot} />
                    <span className={styles.avatarDot} />
                  </div>
                </div>

                <div className={styles.avatarBody}>
                  <p className={styles.avatarName}>Luciano Nicolini</p>
                  <p className={styles.avatarTagline}>
                    {es
                      ? 'Desarrollo nativo & multiplataforma'
                      : 'Native & Cross-Platform Development'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Development Profile */}
          <div
            className={styles.journeyCard}
            aria-labelledby="journey-card-title"
          >
            <div className={styles.journeyHeader}>
              <h2 id="journey-card-title" className={styles.journeyTitle}>
                <Layers size={20} aria-hidden="true" />
                <span>
                  {es ? 'Perfil de desarrollo.' : 'Development profile.'}
                </span>
              </h2>
              <div className={styles.journeyHazard} aria-hidden="true" />
            </div>

            <ol className={styles.timelineList}>
              {profileItems.map((item) => (
                <li
                  key={item.badge}
                  className={`${styles.timelineItem} ${item.active ? styles.timelineItemActive : ''}`}
                >
                  <span className={styles.timelineNode} aria-hidden="true" />
                  <span
                    className={`${styles.timelineYearBadge} ${item.active ? styles.timelineYearBadgeActive : ''}`}
                  >
                    {item.badge}
                  </span>
                  <div className={styles.timelineContent}>
                    <strong className={styles.timelineItemTitle}>
                      {item.title}
                    </strong>
                    <p className={styles.timelineText}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Middle Section: 3-Pillar Cards */}
        <section
          className={styles.pillarsGrid}
          aria-label={es ? 'Pilares y capacidades' : 'Pillars and capabilities'}
        >
          {/* Pillar 1: Tech Stack */}
          <article
            className={`${styles.pillarCard} ${styles.cardMint}`}
            aria-labelledby="pillar-tech-title"
          >
            <div className={styles.pillarHeader}>
              <h2 id="pillar-tech-title" className={styles.pillarTitle}>
                <span>&lt;/&gt;</span>
                <span>{es ? 'Stack tecnológico.' : 'Tech stack.'}</span>
              </h2>
            </div>
            <p className={styles.pillarSubtitle}>
              {es
                ? 'Tecnologías y herramientas que utilizo en mis proyectos comprobables.'
                : 'Technologies and tools used across my verified open-source projects.'}
            </p>

            <div className={styles.techGrid}>
              {techStack.map((tech) => (
                <div key={tech.name} className={styles.techPillBox}>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Pillar 2: Process / How I Work */}
          <article
            className={`${styles.pillarCard} ${styles.cardCream}`}
            aria-labelledby="pillar-process-title"
          >
            <div className={styles.pillarHeader}>
              <h2 id="pillar-process-title" className={styles.pillarTitle}>
                <Rocket size={20} aria-hidden="true" />
                <span>{es ? 'Mi forma de trabajar.' : 'How I work.'}</span>
              </h2>
            </div>
            <p className={styles.pillarSubtitle}>
              {es
                ? 'Un proceso simple y enfocado en llevar ideas a productos reales.'
                : 'A straightforward process focused on shipping solid, usable products.'}
            </p>

            <ul className={styles.processList}>
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className={styles.processItem}>
                    <div
                      className={`${styles.processIconBox} ${step.colorClass}`}
                      aria-hidden="true"
                    >
                      <Icon size={16} />
                    </div>
                    <div className={styles.processCopy}>
                      <h3 className={styles.processStepTitle}>{step.title}</h3>
                      <p className={styles.processStepDesc}>{step.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>

          {/* Pillar 3: Accessibility & Inclusion */}
          <article
            className={`${styles.pillarCard} ${styles.cardPink}`}
            aria-labelledby="pillar-inclusion-title"
          >
            <div className={styles.pillarHeader}>
              <h2 id="pillar-inclusion-title" className={styles.pillarTitle}>
                <HeartHandshake size={20} aria-hidden="true" />
                <span>
                  {es ? 'Accesibilidad e inclusión.' : 'Inclusion & a11y.'}
                </span>
              </h2>
            </div>
            <div className={styles.inclusionBody}>
              <p className={styles.inclusionText}>
                {es
                  ? 'Me interesa construir tecnología que sea realmente accesible y útil para más personas. Por eso desarrollo proyectos como Puente, enfocado en la comunicación y autonomía cotidiana de personas sordas.'
                  : 'I care about building technology that is genuinely accessible and useful to more people. That is why I develop projects like Puente, focused on daily communication and independence for deaf and hard-of-hearing users.'}
              </p>

              <div className={styles.currentlyBox}>
                <div className={styles.currentlyHeader}>
                  <Sparkles size={16} aria-hidden="true" />
                  <h3 className={styles.currentlyTitle}>
                    {es ? 'Actualmente.' : 'Current focus.'}
                  </h3>
                </div>
                <ul className={styles.currentlyList}>
                  <li className={styles.currentlyItem}>
                    <span className={styles.currentlyDotMint} />
                    <span>
                      {es
                        ? 'Puente — funciones de conversación y a11y'
                        : 'Puente — conversation features & a11y'}
                    </span>
                  </li>
                  <li className={styles.currentlyItem}>
                    <span className={styles.currentlyDotYellow} />
                    <span>
                      {es
                        ? 'LeadRadar — prospección y auditoría web'
                        : 'LeadRadar — web audit & pipeline'}
                    </span>
                  </li>
                  <li className={styles.currentlyItem}>
                    <span className={styles.currentlyDotPink} />
                    <span>
                      {es
                        ? 'Portafolio — diseño editorial y sistemas'
                        : 'Portfolio — editorial design system'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* Bottom Banner: MI CV */}
        <section className={styles.cvBanner} aria-labelledby="cv-banner-title">
          <div className={styles.cvBannerLeft}>
            <div className={styles.cvHazard} aria-hidden="true" />
            <h2 id="cv-banner-title" className={styles.cvTitle}>
              {es ? 'MI CV.' : 'MY CV.'}
            </h2>
            <p className={styles.cvDesc}>
              {es
                ? 'Conocé mi experiencia, formación y proyectos en detalle.'
                : 'Explore my background, education and project history in detail.'}
            </p>
          </div>

          <div className={styles.cvBannerRight}>
            {contactConfig.cvUrl ? (
              <a
                href={contactConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <Download size={18} aria-hidden="true" />
                <span>
                  {es
                    ? 'Descargar currículum (PDF)'
                    : 'Download curriculum (PDF)'}
                </span>
              </a>
            ) : (
              <button
                type="button"
                className={styles.btnDisabled}
                disabled
                aria-disabled="true"
              >
                <Download size={18} aria-hidden="true" />
                <span>
                  {es
                    ? 'Descargar currículum (PDF)'
                    : 'Download curriculum (PDF)'}
                </span>
                <span className={styles.badgeSmall}>
                  {es ? 'Próximamente' : 'Coming soon'}
                </span>
              </button>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
