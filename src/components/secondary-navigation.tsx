'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { IconButton } from './design-system/components';
import { LanguageSwitcher } from './design-system/client-components';
import styles from './home.module.css';

export interface SecondaryNavigationProps {
  locale: string;
  activeRoute?: 'work' | 'about' | 'lab' | 'contact';
}

export function SecondaryNavigation({
  locale,
  activeRoute
}: SecondaryNavigationProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const es = locale === 'es';

  const navItems = [
    {
      id: 'work',
      label: es ? 'Proyectos' : 'Work',
      href: `/${locale}#work`,
      active: activeRoute === 'work'
    },
    {
      id: 'about',
      label: es ? 'Sobre mí' : 'About',
      href: `/${locale}/about`,
      active: activeRoute === 'about'
    },
    {
      id: 'lab',
      label: 'Lab',
      href: `/${locale}#lab`,
      active: activeRoute === 'lab'
    },
    {
      id: 'contact',
      label: es ? 'Contacto' : 'Contact',
      href: `/${locale}/contact`,
      active: activeRoute === 'contact'
    }
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
        <Link
          className={styles.brand}
          href={`/${locale}`}
          aria-label="LN. Luciano Nicolini — Inicio"
        >
          <span className={styles.logo}>LN.</span>
          <span className={styles.brandText}>
            LUCIANO
            <br />
            NICOLINI
          </span>
        </Link>

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
          aria-controls="secondary-navigation"
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
          id="secondary-navigation"
          aria-label={es ? 'Navegación principal' : 'Main navigation'}
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && open) close();
          }}
        >
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navLink} ${item.active ? styles.navItemActive : ''}`}
                aria-current={item.active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
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
