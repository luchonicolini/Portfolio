import { ArrowUp } from 'lucide-react';
import { Container } from './design-system/components';
import { contactConfig } from '@/data/contact';
import styles from './home.module.css';

export function HomeFooter({ locale }: { locale: string }) {
  const es = locale === 'es';

  const navLinks = es
    ? [
        { label: 'Proyectos', href: '#work' },
        { label: 'Sobre mí', href: '#about' },
        { label: 'Lab', href: '#lab' },
        { label: 'Contacto', href: '#contact' }
      ]
    : [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Lab', href: '#lab' },
        { label: 'Contact', href: '#contact' }
      ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <a
              className={styles.brand}
              href={`/${locale}`}
              aria-label="LN. Luciano Nicolini"
            >
              <span className={styles.logo}>LN.</span>
              <span className={styles.brandText}>
                LUCIANO
                <br />
                NICOLINI
              </span>
            </a>

            <nav
              className={styles.footerNav}
              aria-label={es ? 'Navegación del pie' : 'Footer navigation'}
            >
              <ul className={styles.footerNavList}>
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.footerNavLink}>
                      {item.label}
                    </a>
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
              {es
                ? 'Editorial Neo-brutalism · StitchHub inspired'
                : 'Editorial Neo-brutalism · StitchHub inspired'}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
