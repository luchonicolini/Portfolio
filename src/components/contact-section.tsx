'use client';

import { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Container, GithubIcon } from './design-system/components';
import { contactConfig } from '@/data/contact';
import styles from './home.module.css';

export function ContactSection({ locale }: { locale: string }) {
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

              {/* Verified Email Action (rendered only when valid email is configured) */}
              {contactConfig.email ? (
                <div className={styles.emailWrapper}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`${styles.contactActionBtn} ${styles.btnSecondary}`}
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
                          {contactConfig.email}
                        </span>
                        <Copy size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <div role="status" aria-live="polite" className="sr-only">
                    {copied &&
                      (es
                        ? 'Dirección de correo electrónico copiada al portapapeles'
                        : 'Email address copied to clipboard')}
                    {copyError &&
                      (es
                        ? 'No se pudo copiar automáticamente. Por favor seleccioná y copiá el texto manualmente.'
                        : 'Automatic copy failed. Please select and copy text manually.')}
                  </div>
                </div>
              ) : (
                /* Noninteractive availability notice when direct email is unconfigured */
                <div className={styles.contactNotice}>
                  <p className={styles.contactNoticeBadge}>
                    {es ? 'CANAL DIRECTO' : 'DIRECT CHANNEL'}
                  </p>
                  <p className={styles.contactNoticeText}>
                    {es
                      ? 'Canal de contacto directo por email disponible a la brevedad. Por consultas o propuestas técnicas, podés conectar a través de mi perfil verificado de GitHub.'
                      : 'Direct email contact channel opening soon. For inquiries or technical proposals, please connect via my verified GitHub profile.'}
                  </p>
                </div>
              )}

              {/* LinkedIn Action (rendered only when valid owner-approved value exists) */}
              {contactConfig.linkedinUrl && (
                <a
                  href={contactConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactActionBtn} ${styles.btnSecondary}`}
                >
                  <span className={styles.contactBtnText}>LinkedIn</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}

              {/* CV Action (rendered only when valid owner-approved value exists) */}
              {contactConfig.cvUrl && (
                <a
                  href={contactConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactActionBtn} ${styles.btnSecondary}`}
                >
                  <span className={styles.contactBtnText}>
                    {es ? 'Descargar CV' : 'Download CV'}
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
