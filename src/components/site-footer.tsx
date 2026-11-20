import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { Container } from './design-system/components';
import { contactConfig } from '@/data/contact';
import styles from './site-footer.module.css';

export interface SiteFooterProps {
  locale: string;
  variant?: 'default' | 'secondary';
}

export function SiteFooter({ locale, variant = 'default' }: SiteFooterProps) {
  const es = locale === 'es';

  const navLinks = [
    { label: es ? 'Proyectos' : 'Work', href: `/${locale}/work` },
    { label: es ? 'Sobre mí' : 'About', href: `/${locale}/about` },
    { label: 'Lab', href: `/${locale}#lab` },
    { label: es ? 'Contacto' : 'Contact', href: `/${locale}/contact` }
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          {/* Editorial Secondary Banner (from approved reference) */}
          {variant === 'secondary' && (
            <div className={styles.secondaryBanner}>
              <div className={styles.bannerBrand}>
                <span className={styles.bannerLogo}>LN.</span>
                <span>LUCIANO NICOLINI</span>
              </div>
              <div className={styles.bannerPillars}>
                <span>{es ? 'DESARROLLO' : 'DEVELOPMENT'}</span>
                <span>/</span>
                <span>{es ? 'DISEÑO' : 'DESIGN'}</span>
                <span>/</span>
                <span>{es ? 'ACCESIBILIDAD' : 'ACCESSIBILITY'}</span>
              </div>
              <div className={styles.bannerHazard} aria-hidden="true" />
            </div>
          )}

          <div className={styles.footerTop}>
            <Link
              className={styles.brand}
              href={`/${locale}`}
              aria-label={
                es
                  ? 'LN. Luciano Nicolini — Inicio'
                  : 'LN. Luciano Nicolini — Home'
              }
            >
              <span className={styles.logo}>LN.</span>
              <span className={styles.brandText}>
                LUCIANO
                <br />
                NICOLINI
              </span>
            </Link>

            <nav
              className={styles.footerNav}
              aria-label={es ? 'Navegación del pie' : 'Footer navigation'}
            >
              <ul className={styles.footerNavList}>
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.footerNavLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={contactConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerNavLink}
                  >
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#main" className={styles.backToTop}>
              <span>{es ? 'Volver arriba' : 'Back to top'}</span>
              <ArrowUp size={16} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © 2026 Luciano Nicolini.{' '}
              {es
                ? 'Construido con diseño, código e intención.'
                : 'Built with design, code and intent.'}
            </p>
            <p className={styles.footerTagline}>
              Editorial Neo-brutalism · StitchHub inspired
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
