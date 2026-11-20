'use client';

import { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Container, GithubIcon } from './design-system/components';
import { contactConfig } from '@/data/contact';
import styles from './home.module.css';

export function ContactSection({ locale }: { locale: string }) {
  const es = locale === 'es';
  const [copied, setCopied] = useState(false);

  // Email to use for clipboard copying in test or when configured
  const activeEmail = contactConfig.email || contactConfig.emailFixture;
  const isFixture = !contactConfig.email;

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(activeEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  }

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <Container>
        <div className={styles.contactCard}>
          <div className={styles.contactInner}>
            <div className={styles.contactCopy}>
              <p className={styles.eyebrow}>
                05 / {es ? 'CONTACTO' : 'CONTACT'}
              </p>
              <h2 id="contact-title" className={styles.contactHeadline}>
                {es ? 'HABLEMOS.' : "LET'S TALK."}
              </h2>
              <p className={styles.contactIntro}>
                {es
                  ? '¿Tenés un proyecto en mente, una propuesta técnica o querés conversar sobre desarrollo mobile y web? Conectemos a través de mis canales verificados.'
                  : 'Have a project in mind, a technical challenge, or want to discuss mobile and web engineering? Reach out through my verified channels.'}
              </p>
            </div>

            <div className={styles.contactActions}>
              {/* Verified GitHub Link */}
              <a
                href={contactConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactActionBtn} ${styles.btnPrimary}`}
              >
                <GithubIcon size={20} />
                <span className={styles.contactBtnText}>
                  GitHub / luchonicolini
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>

              {/* Email Button / Copy Fixture */}
              {isFixture ? (
                <div className={styles.emailFixtureWrapper}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`${styles.contactActionBtn} ${styles.btnSecondary}`}
                  >
                    {copied ? (
                      <>
                        <Check size={20} aria-hidden="true" />
                        <span className={styles.contactBtnText}>
                          {es ? '¡Email copiado!' : 'Email copied!'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail size={20} aria-hidden="true" />
                        <span className={styles.contactBtnText}>
                          {es ? 'Copiar email de prueba' : 'Copy test email'}
                        </span>
                        <Copy size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <small className={styles.fixtureNotice}>
                    {es
                      ? 'Fixture de desarrollo (contact@example.com) · Dirección oficial pendiente'
                      : 'Development fixture (contact@example.com) · Official address pending'}
                  </small>
                </div>
              ) : (
                <a
                  href={`mailto:${contactConfig.email}`}
                  className={`${styles.contactActionBtn} ${styles.btnSecondary}`}
                >
                  <Mail size={20} aria-hidden="true" />
                  <span className={styles.contactBtnText}>
                    {contactConfig.email}
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}

              {/* LinkedIn Placeholder */}
              <span
                className={`${styles.contactActionBtn} ${styles.btnDisabled}`}
                aria-disabled="true"
              >
                <span className={styles.contactBtnText}>LinkedIn</span>
                <small className={styles.actionBadge}>
                  {es ? 'Próximamente' : 'Coming soon'}
                </small>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
