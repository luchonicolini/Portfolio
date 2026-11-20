'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { IconButton } from './design-system/components';
import { LanguageSwitcher } from './design-system/client-components';
import styles from './home.module.css';

export function Navigation({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const es = locale === 'es';

  const navItems = es
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href={
                  pathname === `/${locale}`
                    ? item.href
                    : `/${locale}${item.href}`
                }
                className={styles.navLink}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
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
