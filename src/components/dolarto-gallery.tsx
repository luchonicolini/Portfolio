'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './case-study.module.css';

export function DolarToGallery({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const es = locale === 'es';
  const images = [
    {
      src: '/projects/dolarto/rates.png',
      labelEs: 'Cotizaciones',
      labelEn: 'Exchange Rates',
      captionEs:
        'Pantalla principal de cotizaciones del dólar en simulador nativo iOS.',
      captionEn:
        'Main dollar exchange rates screen running on native iOS simulator.'
    },
    {
      src: '/projects/dolarto/preview.png',
      labelEs: 'Conversión',
      labelEn: 'Conversion',
      captionEs:
        'Pantalla de conversión interactiva de divisas en simulador nativo iOS.',
      captionEn:
        'Interactive currency conversion screen running on native iOS simulator.'
    }
  ];
  const selected = images[active];

  return (
    <figure className={`${styles.mediaContainer} ${styles.mediaCoral}`}>
      <div className={styles.mediaImageWrapper}>
        <Image
          src={selected.src}
          alt={es ? selected.captionEs : selected.captionEn}
          width={966}
          height={1812}
          priority
          fetchPriority="high"
          className={styles.mediaImage}
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>
      <figcaption className={styles.mediaCaption}>
        {es ? selected.captionEs : selected.captionEn}
      </figcaption>
      <div
        className={styles.galleryControls}
        role="group"
        aria-label={es ? 'Elegir captura de pantalla' : 'Choose screenshot'}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={styles.filter}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {es ? image.labelEs : image.labelEn}
          </button>
        ))}
      </div>
    </figure>
  );
}
