'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { IconButton } from './design-system/components';
import { LanguageSwitcher } from './design-system/client-components';
import styles from './home.module.css';

export function Navigation({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const es = locale === 'es';
  const labels = es
    ? ['Proyectos', 'Sobre mí', 'Lab', 'Contacto']
    : ['Work', 'About', 'Lab', 'Contact'];

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
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
        <IconButton
          ref={trigger}
          aria-label={
            open
              ? es
                ? 'Cerrar menú'
                : 'Close menu'
              : es
                ? 'Abrir menú'
                : 'Open menu'
          }
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && open) close();
          }}
          className={styles.menuButton}
          type="button"
        >
          {open ? (
            <X aria-hidden="true" size={24} />
          ) : (
            <Menu aria-hidden="true" size={24} />
          )}
        </IconButton>
        <nav
          id="site-navigation"
          aria-label={es ? 'Navegación principal' : 'Main navigation'}
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && open) close();
          }}
        >
          <div className={styles.navLinks}>
            {labels.map((label, index) => (
              <span
                key={label}
                className={`${styles.navItem} ${index === 0 ? styles.navItemActive : ''}`}
                aria-disabled="true"
              >
                {label}{' '}
                <small className={styles.navBadge}>
                  {es ? 'Próximamente' : 'Coming soon'}
                </small>
              </span>
            ))}
          </div>
          <div className={styles.navRight}>
            <LanguageSwitcher
              spanishLabel={es ? 'Español' : 'Switch language to Spanish'}
              englishLabel={es ? 'Cambiar idioma a inglés' : 'English'}
            />
            <span className={styles.cv} aria-disabled="true">
              CV ↗{' '}
              <small className={styles.navBadge}>
                {es ? 'Próximamente' : 'Coming soon'}
              </small>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
