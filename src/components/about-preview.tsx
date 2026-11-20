import { Smartphone, Layers, Globe, ShieldCheck } from 'lucide-react';
import { Container } from './design-system/components';
import styles from './home.module.css';

export function AboutPreview({ locale }: { locale: string }) {
  const es = locale === 'es';

  const pillars = [
    {
      icon: Smartphone,
      title: es ? 'Mobile Nativo (iOS & SwiftUI)' : 'Native iOS (SwiftUI)',
      description: es
        ? 'Arquitectura MVVM, integración fluida con APIs REST mediante Combine y diseño centrado en el ecosistema Apple, priorizando fluidez y rendimiento (como en DolarTo).'
        : 'MVVM architecture, smooth REST API integration using Combine, and user-centric iOS design prioritizing responsiveness and speed (as in DolarTo).',
      tag: 'SwiftUI / Combine'
    },
    {
      icon: Layers,
      title: es
        ? 'Multiplataforma (Flutter & Dart)'
        : 'Cross-Platform (Flutter & Dart)',
      description: es
        ? 'Aplicaciones reactivas con arquitectura por capas, control de estado mediante Riverpod, ciclo de vida de audio estricto y foco offline-first (como en Puente y ScopeGuard).'
        : 'Layered architectures, reactive state with Riverpod, strict audio lifecycles, and offline-first capabilities for Android and iOS (as in Puente and ScopeGuard).',
      tag: 'Flutter / Riverpod'
    },
    {
      icon: Globe,
      title: es
        ? 'Ingeniería Web (Next.js & TypeScript)'
        : 'Web Engineering (Next.js & TS)',
      description: es
        ? 'Aplicaciones modernas con Server Components, bases de datos Supabase/PostgreSQL, Tailwind CSS, suites de pruebas automatizadas y pipelines distribuidos (como en StitchHub y LeadRadar).'
        : 'Modern web platforms with Server Components, Supabase/PostgreSQL databases, Tailwind CSS, automated test suites, and distributed worker pipelines (as in StitchHub and LeadRadar).',
      tag: 'Next.js / Supabase'
    },
    {
      icon: ShieldCheck,
      title: es
        ? 'Accesibilidad & Calidad de Producto'
        : 'Accessibility & Product Craft',
      description: es
        ? 'Objetivo de accesibilidad WCAG 2.2 AA, navegación integral por teclado, soporte de lectores de pantalla, pruebas E2E con Playwright y un lenguaje visual editorial neo-brutalista deliberado.'
        : 'WCAG 2.2 AA accessibility target, full keyboard navigation, screen reader accessibility, Playwright E2E suites, and intentional editorial neo-brutalist visuals.',
      tag: es ? 'A11y / Objetivo WCAG 2.2 AA' : 'A11y / WCAG 2.2 AA Target'
    }
  ];

  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>
              03 / {es ? 'SOBRE MÍ' : 'ABOUT ME'}
            </p>
            <h2 id="about-title" className={styles.sectionTitle}>
              {es ? 'ENFOQUE Y CAPACIDADES.' : 'APPROACH & CAPABILITIES.'}
            </h2>
          </div>
        </div>

        <div className={styles.aboutBanner}>
          <div className={styles.aboutLeadBox}>
            <p className={styles.aboutLeadText}>
              {es
                ? 'Soy Luciano Nicolini, desarrollador mobile y web. Mi objetivo es construir productos digitales donde la solidez técnica y la claridad visual trabajen juntas: arquitecturas mantenibles, interfaces accesibles y código con propósito comprobable.'
                : "I'm Luciano Nicolini, a mobile and web developer. My goal is to build digital products where technical soundness and visual clarity work together: maintainable architectures, accessible interfaces, and verified code."}
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className={styles.pillarCard}>
                  <div className={styles.pillarHeader}>
                    <div className={styles.pillarIconBox}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span className={styles.pillarTag}>{pillar.tag}</span>
                  </div>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDescription}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles.evidenceNotice}>
            <span className={styles.evidenceBadge}>
              {es ? 'EVIDENCIA COMPROBABLE' : 'VERIFIED EVIDENCE'}
            </span>
            <p className={styles.evidenceText}>
              {es
                ? 'Sin métricas inventadas ni porcentajes decorativos. Cada capacidad técnica se refleja en proyectos con código abierto disponibles para inspección en GitHub.'
                : 'No fabricated metrics or arbitrary percentage bars. Every capability is reflected in open-source repositories available for inspection on GitHub.'}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
