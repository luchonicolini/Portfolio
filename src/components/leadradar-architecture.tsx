import { ShieldAlert, ArrowDown } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';
import styles from './case-study.module.css';

interface LeadRadarArchitectureProps {
  copy: CaseStudy['es'];
  locale: string;
}

export function LeadRadarArchitecture({
  copy,
  locale
}: LeadRadarArchitectureProps) {
  const es = locale === 'es';
  const steps = copy.architectureSteps ?? [];

  return (
    <figure className={`${styles.mediaContainer} ${styles.mediaCanvas}`}>
      <div className={styles.archContainer}>
        {steps.map((item, index) => (
          <div key={item.step}>
            <div className={styles.archStep}>
              <div className={styles.archStepHeader}>
                <span className={styles.archStepNumber}>{item.step}</span>
                <span>{item.label}</span>
              </div>
              <p className={styles.archStepDetail}>{item.detail}</p>
            </div>
            {index < steps.length - 1 ? (
              <div className={styles.archConnector} aria-hidden="true">
                <ArrowDown size={18} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className={styles.disclaimerBadge}>
        <ShieldAlert size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
        <span>
          {copy.disclaimer ??
            (es
              ? 'Arquitectura técnica desinfectada; no expone datos de prospectos ni capturas privadas.'
              : 'Sanitized technical architecture; contains no prospect records or proprietary screenshots.')}
        </span>
      </figcaption>
    </figure>
  );
}
