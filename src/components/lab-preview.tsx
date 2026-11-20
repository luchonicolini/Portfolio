'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import { Container } from './design-system/components';
import styles from './home.module.css';

export function LabPreview({ locale }: { locale: string }) {
  const es = locale === 'es';

  // Brutalist Button Builder State
  const [shadowOffset, setShadowOffset] = useState(4);
  const [borderRadius, setBorderRadius] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FFDE00');
  const [pressCount, setPressCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const colors = [
    { label: es ? 'Amarillo' : 'Yellow', hex: '#FFDE00' },
    { label: es ? 'Menta' : 'Mint', hex: '#4ECDC4' },
    { label: es ? 'Coral' : 'Coral', hex: '#FF6B6B' },
    { label: es ? 'Rosa' : 'Pink', hex: '#FF70A6' }
  ];

  function handleReset() {
    setShadowOffset(4);
    setBorderRadius(0);
    setSelectedColor('#FFDE00');
    setPressCount(0);
  }

  const generatedCss = `.brutalist-button {
  background-color: ${selectedColor};
  border: 3px solid #000000;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px #000000;
  border-radius: ${borderRadius}px;
  font-family: var(--font-space-grotesk), sans-serif;
  font-weight: 800;
  padding: 0.75rem 1.5rem;
  text-transform: uppercase;
}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <section id="lab" className={styles.section} aria-labelledby="lab-title">
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>04 / DEVELOPER LAB</p>
            <h2 id="lab-title" className={styles.sectionTitle}>
              {es ? 'EXPERIMENTOS INTERACTIVOS.' : 'INTERACTIVE EXPERIMENTS.'}
            </h2>
          </div>
          <div className={styles.sectionHeaderRight}>
            <span className={styles.sectionBadge} aria-disabled="true">
              LAB COMPLETO →
              <small className={styles.actionBadge}>
                {es ? 'Próximamente' : 'Coming soon'}
              </small>
            </span>
          </div>
        </div>

        <div className={styles.labCard}>
          <div className={styles.labHeader}>
            <div className={styles.labHeaderTitleGroup}>
              <span className={styles.categoryTag}>
                {es
                  ? 'EXPERIMENTO INTERACTIVO 01'
                  : 'INTERACTIVE EXPERIMENT 01'}
              </span>
              <h3 className={styles.labExperimentTitle}>
                {es ? 'Brutalist Button Builder' : 'Brutalist Button Builder'}
              </h3>
            </div>
            <p className={styles.labDescription}>
              {es
                ? 'Ajustá las variables de sombra, radio y color para componer un botón editorial neobrutalista. Cada control altera estilos reales y genera el bloque de CSS correspondiente.'
                : 'Adjust shadow, radius and color variables to compose an editorial neobrutalist button. Every control affects live styles and outputs matching CSS.'}
            </p>
          </div>

          <div className={styles.labLayout}>
            {/* Left Column: Interactive Controls */}
            <div className={styles.labControls}>
              {/* Color Control */}
              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>
                  {es ? 'Color de fondo:' : 'Background color:'}
                </label>
                <div
                  className={styles.colorChips}
                  role="radiogroup"
                  aria-label={es ? 'Color del botón' : 'Button color'}
                >
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      role="radio"
                      aria-checked={selectedColor === c.hex}
                      aria-label={`${c.label} (${c.hex})`}
                      className={`${styles.colorChip} ${selectedColor === c.hex ? styles.colorChipActive : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c.hex)}
                    />
                  ))}
                </div>
              </div>

              {/* Shadow Offset Slider */}
              <div className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label
                    htmlFor="shadow-slider"
                    className={styles.controlLabel}
                  >
                    {es ? 'Desplazamiento de sombra:' : 'Shadow offset:'}
                  </label>
                  <span className={styles.controlValue}>{shadowOffset}px</span>
                </div>
                <input
                  id="shadow-slider"
                  type="range"
                  min="0"
                  max="12"
                  step="2"
                  value={shadowOffset}
                  onChange={(e) => setShadowOffset(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Border Radius Slider */}
              <div className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label
                    htmlFor="radius-slider"
                    className={styles.controlLabel}
                  >
                    {es ? 'Radio de esquinas:' : 'Corner radius:'}
                  </label>
                  <span className={styles.controlValue}>{borderRadius}px</span>
                </div>
                <input
                  id="radius-slider"
                  type="range"
                  min="0"
                  max="16"
                  step="2"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <button
                type="button"
                onClick={handleReset}
                className={styles.resetBtn}
              >
                <RotateCcw size={16} aria-hidden="true" />
                <span>{es ? 'Restablecer valores' : 'Reset defaults'}</span>
              </button>
            </div>

            {/* Right Column: Live Preview & Code */}
            <div className={styles.labPreviewArea}>
              <div className={styles.previewStage}>
                <p className={styles.previewStageLabel}>
                  {es ? 'VISTA PREVIA EN VIVO' : 'LIVE PREVIEW'}
                </p>
                <div className={styles.previewButtonContainer}>
                  <button
                    type="button"
                    onClick={() => setPressCount((prev) => prev + 1)}
                    className={styles.interactivePreviewButton}
                    style={{
                      backgroundColor: selectedColor,
                      border: '3px solid #000000',
                      boxShadow: `${shadowOffset}px ${shadowOffset}px 0px #000000`,
                      borderRadius: `${borderRadius}px`
                    }}
                  >
                    <span className={styles.previewButtonContent}>
                      <Sparkles size={18} aria-hidden="true" />
                      <span>{es ? 'PULSAR AQUÍ' : 'PRESS HERE'}</span>
                    </span>
                  </button>
                </div>
                <p className={styles.pressCounter}>
                  {es
                    ? `Pulsaciones registradas: ${pressCount}`
                    : `Registered clicks: ${pressCount}`}
                </p>
              </div>

              {/* CSS Code Snippet Block */}
              <div className={styles.snippetBlock}>
                <div className={styles.snippetHeader}>
                  <span className={styles.snippetTitle}>CSS Generado</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.copySnippetBtn}
                  >
                    {copied ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>{es ? '¡Copiado!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>{es ? 'Copiar CSS' : 'Copy CSS'}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className={styles.codeSnippet}>
                  <code>{generatedCss}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
