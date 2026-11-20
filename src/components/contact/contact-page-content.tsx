'use client';

import { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Download,
  CheckSquare
} from 'lucide-react';
import { Container, GithubIcon } from '../design-system/components';
import { contactConfig } from '../../data/contact';
import styles from './contact-page.module.css';

function LinkedinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function EnvelopeArtwork() {
  return (
    <div
      className={styles.artworkWrap}
      role="img"
      aria-label="Ilustración geométrica neo-brutalista de un sobre de correspondencia"
    >
      <svg
        viewBox="0 0 380 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.envelopeArtSvg}
        aria-hidden="true"
      >
        {/* Starburst Explosion Shape in Mint & Yellow */}
        <polygon
          points="190,15 235,65 295,35 305,100 365,115 330,170 375,220 310,235 315,305 245,280 205,325 165,275 100,295 110,230 45,210 80,155 35,105 100,90 95,25 160,50"
          fill="#4ECDC4"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Yellow geometric secondary wedge */}
        <polygon
          points="250,55 350,110 320,185 270,140"
          fill="#FFDE00"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Speed rays top right */}
        <line
          x1="320"
          y1="40"
          x2="335"
          y2="15"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="345"
          y1="55"
          x2="370"
          y2="35"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="360"
          y1="75"
          x2="390"
          y2="70"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Envelope shadow */}
        <g transform="translate(6, 6)">
          <rect
            x="85"
            y="95"
            width="210"
            height="145"
            rx="6"
            fill="#000000"
            transform="rotate(-5 190 167)"
          />
        </g>

        {/* Envelope body (Pink #FF70A6 / Coral-pink) */}
        <g transform="rotate(-5 190 167)">
          <rect
            x="85"
            y="95"
            width="210"
            height="145"
            rx="6"
            fill="#FF70A6"
            stroke="#000000"
            strokeWidth="3.5"
          />

          {/* Envelope interior opening (White) */}
          <polygon
            points="87,97 190,175 293,97"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Envelope fold diagonals */}
          <line
            x1="87"
            y1="238"
            x2="155"
            y2="165"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="293"
            y1="238"
            x2="225"
            y2="165"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Open top flap contour */}
          <polygon
            points="87,97 190,35 293,97"
            fill="#FF85B3"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function ContactPageContent({ locale }: { locale: string }) {
  const es = locale === 'es';
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function handleCopyEmail() {
    if (!contactConfig.email) return;
    try {
      await navigator.clipboard.writeText(contactConfig.email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2500);
    }
  }

  const checklistItems = es
    ? [
        'Ideas o proyectos en desarrollo.',
        'Oportunidades laborales y consultoría técnica.',
        'Colaboraciones, feedback y arquitectura.'
      ]
    : [
        'Ideas or active projects in development.',
        'Career opportunities and technical consulting.',
        'Collaborations, feedback, and architecture.'
      ];

  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Top Hero: Headline + Envelope Artwork */}
        <section className={styles.heroRow} aria-labelledby="contact-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>05 / {es ? 'CONTACTO' : 'CONTACT'}</p>

            <div className={styles.headlineBannerWrap}>
              <div className={styles.headlineBanner}>
                <h1 id="contact-heading" className={styles.headline}>
                  {es ? 'HABLEMOS.' : "LET'S TALK."}
                </h1>
              </div>
            </div>

            <p className={styles.introText}>
              {es ? (
                <>
                  ¿Tenés una idea, un proyecto o querés trabajar juntos?{' '}
                  <span className={styles.highlightText}>Escribime</span> y
                  conversemos.
                </>
              ) : (
                <>
                  Have an idea, a project, or want to collaborate?{' '}
                  <span className={styles.highlightText}>Reach out</span> and
                  let&apos;s talk.
                </>
              )}
            </p>
          </div>

          <EnvelopeArtwork />
        </section>

        {/* Content Grid: Action Cards 2x2 + Topics Checklist */}
        <div className={styles.contentGrid}>
          {/* Action Cards (2x2 Grid) */}
          <div
            className={styles.actionCardsGrid}
            aria-label={
              es ? 'Canales directos de contacto' : 'Direct contact channels'
            }
          >
            {/* 1. Email Card */}
            {contactConfig.email ? (
              <div
                className={`${styles.actionCard} ${styles.actionCardInteractive} ${styles.cardMint}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Mail size={22} />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={styles.arrowBox}
                    aria-label={
                      copied
                        ? es
                          ? 'Email copiado'
                          : 'Email copied'
                        : es
                          ? `Copiar email: ${contactConfig.email}`
                          : `Copy email: ${contactConfig.email}`
                    }
                  >
                    {copied ? <Check size={18} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>Email</h2>
                  <p className={styles.cardSubtitle}>{contactConfig.email}</p>
                </div>
                <div role="status" aria-live="polite" className="sr-only">
                  {copied &&
                    (es
                      ? 'Dirección de correo electrónico copiada al portapapeles'
                      : 'Email address copied to clipboard')}
                  {copyError &&
                    (es
                      ? 'No se pudo copiar automáticamente. Por favor seleccioná el texto manualmente.'
                      : 'Automatic copy failed. Please select text manually.')}
                </div>
              </div>
            ) : (
              <div
                className={`${styles.actionCard} ${styles.actionCardDisabled} ${styles.cardMint}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Mail size={22} />
                  </div>
                  <span className={styles.statusBadge}>
                    {es ? 'Próximamente' : 'Coming soon'}
                  </span>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>Email</h2>
                  <p className={styles.cardSubtitle}>
                    {es
                      ? 'Canal de email directo disponible a la brevedad.'
                      : 'Direct email channel opening soon.'}
                  </p>
                </div>
              </div>
            )}

            {/* 2. GitHub Card (Verified link) */}
            <a
              href={contactConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionCard} ${styles.actionCardInteractive} ${styles.cardWhite}`}
              aria-label="GitHub / luchonicolini"
            >
              <div className={styles.cardTop}>
                <div className={styles.iconBox} aria-hidden="true">
                  <GithubIcon size={24} />
                </div>
                <div className={styles.arrowBox} aria-hidden="true">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className={styles.cardBottom}>
                <h2 className={styles.cardTitle}>GitHub</h2>
                <p className={styles.cardSubtitle}>/luchonicolini</p>
              </div>
            </a>

            {/* 3. LinkedIn Card */}
            {contactConfig.linkedinUrl ? (
              <a
                href={contactConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionCard} ${styles.actionCardInteractive} ${styles.cardWhite}`}
                aria-label="LinkedIn"
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <LinkedinIcon size={22} />
                  </div>
                  <div className={styles.arrowBox} aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>LinkedIn</h2>
                  <p className={styles.cardSubtitle}>
                    {es
                      ? 'Conectemos por profesión.'
                      : "Let's connect professionally."}
                  </p>
                </div>
              </a>
            ) : (
              <div
                className={`${styles.actionCard} ${styles.actionCardDisabled} ${styles.cardWhite}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <LinkedinIcon size={22} />
                  </div>
                  <span className={styles.statusBadge}>
                    {es ? 'Próximamente' : 'Coming soon'}
                  </span>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>LinkedIn</h2>
                  <p className={styles.cardSubtitle}>
                    {es
                      ? 'Conectemos por profesión.'
                      : "Let's connect professionally."}
                  </p>
                </div>
              </div>
            )}

            {/* 4. Descargar CV Card */}
            {contactConfig.cvUrl ? (
              <a
                href={contactConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionCard} ${styles.actionCardInteractive} ${styles.cardYellow}`}
                aria-label={es ? 'Descargar CV en PDF' : 'Download CV in PDF'}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Download size={22} />
                  </div>
                  <div className={styles.arrowBox} aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>
                    {es ? 'Descargar CV' : 'Download CV'}
                  </h2>
                  <p className={styles.cardSubtitle}>
                    {es
                      ? 'Mi experiencia y proyectos en PDF.'
                      : 'Experience & projects in PDF.'}
                  </p>
                </div>
              </a>
            ) : (
              <div
                className={`${styles.actionCard} ${styles.actionCardDisabled} ${styles.cardYellow}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Download size={22} />
                  </div>
                  <span className={styles.statusBadge}>
                    {es ? 'Próximamente' : 'Coming soon'}
                  </span>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>
                    {es ? 'Descargar CV' : 'Download CV'}
                  </h2>
                  <p className={styles.cardSubtitle}>
                    {es
                      ? 'Mi experiencia y proyectos en PDF.'
                      : 'Experience & projects in PDF.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Topics Checklist */}
          <article
            className={styles.topicsCard}
            aria-labelledby="topics-card-heading"
          >
            <div className={styles.topicsHeader}>
              <h2 id="topics-card-heading" className={styles.topicsTitle}>
                {es ? '¿Qué podés contarme?' : 'What can we talk about?'}
              </h2>
              <div className={styles.hazardStripeMini} aria-hidden="true" />
            </div>

            <ul className={styles.checklist}>
              {checklistItems.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <div className={styles.checkboxIcon} aria-hidden="true">
                    <CheckSquare size={16} />
                  </div>
                  <p className={styles.checkLabel}>{item}</p>
                </li>
              ))}
            </ul>

            <div className={styles.topicsFooter}>
              <p className={styles.topicsNotice}>
                {es
                  ? 'Respondo personalmente a todas las consultas sobre desarrollo mobile, web y proyectos.'
                  : 'I personally reply to all inquiries regarding mobile, web engineering, and product collaboration.'}
              </p>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
