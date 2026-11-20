'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { IconButton } from './design-system/components';
import { LanguageSwitcher } from './design-system/client-components';
import styles from './home.module.css';

export interface SiteNavigationProps {
  locale: string;
  activeRoute?: 'work' | 'about' | 'lab' | 'contact';
}

export function SiteNavigation({ locale, activeRoute }: SiteNavigationProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '';
  const es = locale === 'es';

  // Determine if we are on the Home page (anchor mode vs route mode)
  const isHome =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === '/' ||
    pathname === '';

  // Derive current route if not explicitly provided
  const currentRoute =
    activeRoute ||
    (pathname.includes('/work')
      ? 'work'
      : pathname.includes('/about')
        ? 'about'
        : pathname.includes('/contact')
          ? 'contact'
          : undefined);

  const navItems = [
    {
      id: 'work',
      label: es ? 'Proyectos' : 'Work',
      href: isHome ? '#work' : `/${locale}/work`,
      active: currentRoute === 'work'
    },
    {
      id: 'about',
      label: es ? 'Sobre mí' : 'About',
      href: isHome ? '#about' : `/${locale}/about`,
      active: currentRoute === 'about'
    },
    {
      id: 'lab',
      label: 'Lab',
      href: isHome ? '#lab' : `/${locale}#lab`,
      active: currentRoute === 'lab'
    },
    {
      id: 'contact',
      label: es ? 'Contacto' : 'Contact',
      href: isHome ? '#contact' : `/${locale}/contact`,
      active: currentRoute === 'contact'
    }
  ];

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  // Nonmodal disclosure menu: global Escape key closure with focus restoration
  useEffect(() => {
    if (!open) return;
    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close();
      }
    }
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => document.removeEventListener('keydown', handleDocumentKeyDown);
  }, [open]);

  // Outside click detection to close disclosure menu
  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(event: MouseEvent) {
      if (
        navInnerRef.current &&
        !navInnerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [open]);

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
      <div ref={navInnerRef} className={styles.navInner}>
        <Link
          className={styles.brand}
          href={`/${locale}`}
          aria-label={
            es ? 'LN. Luciano Nicolini — Inicio' : 'LN. Luciano Nicolini — Home'
          }
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
