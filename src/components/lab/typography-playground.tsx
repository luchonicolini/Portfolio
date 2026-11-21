'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import {
  TYPOGRAPHY_DEFAULTS,
  generateTypographyCss,
  clamp,
  type TypographyConfig
} from '@/data/lab';
import styles from './controls.module.css';

export interface TypographyPlaygroundProps {
  locale?: string;
}

const PRESETS = [
  {
    label: { es: 'Titular Brutalista', en: 'Brutalist Headline' },
    text: 'EDITORIAL NEO-BRUTALISM'
  },
  {
    label: { es: 'Registro Monospace', en: 'Monospace Telemetry' },
    text: 'SYSTEM_INIT: READY [OK]'
  },
  {
    label: { es: 'Párrafo Editorial', en: 'Editorial Lead' },
    text: 'Diseño de interfaces sólidas, accesibles y con carácter.'
  },
  {
    label: { es: 'Coordenadas', en: 'Coordinates' },
    text: 'BUENOS AIRES // 2026'
  }
];

export function TypographyPlayground({
  locale = 'es'
}: TypographyPlaygroundProps) {
  const isEs = locale === 'es';

  const [config, setConfig] = useState<TypographyConfig>({
    ...TYPOGRAPHY_DEFAULTS
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');

  const generatedCss = generateTypographyCss(config);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(generatedCss);
      }
      setCopied(true);
      setCopyFeedback(
        isEs ? 'CSS copiado al portapapeles' : 'CSS copied to clipboard'
      );
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 2500);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setConfig({ ...TYPOGRAPHY_DEFAULTS });
  };

  return (
    <article
      id="experiment-03"
      className={styles.labCard}
      aria-labelledby="exp-03-title"
    >
      {/* Header */}
      <header className={styles.labHeader}>
        <div className={styles.headerMeta}>
          <span className={styles.categoryBadge}>
            {isEs ? '03 / TIPOGRAFÍA' : '03 / TYPOGRAPHY'}
          </span>
          <span className={styles.experimentNumber}>EXP-03</span>
        </div>
        <h2 id="exp-03-title" className={styles.labTitle}>
          Typography Playground
        </h2>
        <p className={styles.labTagline}>
          {isEs
            ? 'Space Grotesk & Space Mono en vivo'
            : 'Live Space Grotesk & Space Mono scaling'}
        </p>
        <p className={styles.labDescription}>
          {isEs
            ? 'Calibrá tamaños, pesos, interlineado y tracking sobre las fuentes oficiales del portafolio con respuesta elástica.'
            : 'Calibrate font sizes, weights, line heights and tracking across the portfolio fonts with responsive reflow.'}
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className={styles.labLayout}>
        {/* Controls Column */}
        <section
          className={styles.controlsPanel}
          aria-label={
            isEs
              ? 'Panel de calibración tipográfica'
              : 'Typography calibration settings'
          }
        >
          {/* Font Family Toggle */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              {isEs ? 'Familia tipográfica:' : 'Font family:'}
            </label>
            <div
              className={styles.segmentGroup}
              role="radiogroup"
              aria-label={
                isEs ? 'Selección de fuente' : 'Font family selection'
              }
            >
              {(['Space Grotesk', 'Space Mono'] as const).map((family) => {
                const isSelected = config.fontFamily === family;
                return (
                  <button
                    key={family}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.segmentButton} ${
                      isSelected ? styles.segmentButtonActive : ''
                    }`}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, fontFamily: family }))
                    }
                  >
                    {family}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size Slider (14 - 64px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label htmlFor="type-font-size" className={styles.controlLabel}>
                {isEs ? 'Tamaño de fuente:' : 'Font size:'}
              </label>
              <span className={styles.controlValue}>{config.fontSize}px</span>
            </div>
            <input
              id="type-font-size"
              type="range"
              min={14}
              max={64}
              step={1}
              value={config.fontSize}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 14, 64);
                setConfig((prev) => ({ ...prev, fontSize: val }));
              }}
            />
          </div>

          {/* Font Weight Selector (400, 500, 600, 700) */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              {isEs ? 'Peso tipográfico:' : 'Font weight:'}
            </label>
            <div
              className={styles.segmentGroup}
              role="radiogroup"
              aria-label={isEs ? 'Pesos tipográficos' : 'Font weight options'}
            >
              {([400, 500, 600, 700] as const).map((weight) => {
                const isSelected = config.fontWeight === weight;
                const weightLabels: Record<number, { es: string; en: string }> =
                  {
                    400: { es: '400 Normal', en: '400 Regular' },
                    500: { es: '500 Medio', en: '500 Medium' },
                    600: { es: '600 Semibold', en: '600 Semibold' },
                    700: { es: '700 Bold', en: '700 Bold' }
                  };
                return (
                  <button
                    key={weight}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.segmentButton} ${
                      isSelected ? styles.segmentButtonActive : ''
                    }`}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, fontWeight: weight }))
                    }
                  >
                    {weightLabels[weight][isEs ? 'es' : 'en']}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Line Height Slider (1.0 - 2.0) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label htmlFor="type-line-height" className={styles.controlLabel}>
                {isEs ? 'Interlineado (Line height):' : 'Line height:'}
              </label>
              <span className={styles.controlValue}>
                {config.lineHeight.toFixed(2)}
              </span>
            </div>
            <input
              id="type-line-height"
              type="range"
              min={1.0}
              max={2.0}
              step={0.05}
              value={config.lineHeight}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseFloat(e.target.value), 1.0, 2.0);
                setConfig((prev) => ({ ...prev, lineHeight: val }));
              }}
            />
          </div>

          {/* Letter Spacing Slider (-2 to 6px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label
                htmlFor="type-letter-spacing"
                className={styles.controlLabel}
              >
                {isEs ? 'Espaciado (Letter spacing):' : 'Letter spacing:'}
              </label>
              <span className={styles.controlValue}>
                {config.letterSpacing}px
              </span>
            </div>
            <input
              id="type-letter-spacing"
              type="range"
              min={-2}
              max={6}
              step={0.5}
              value={config.letterSpacing}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseFloat(e.target.value), -2, 6);
                setConfig((prev) => ({ ...prev, letterSpacing: val }));
              }}
            />
          </div>

          {/* Text Transform Toggle (none / uppercase / lowercase) */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              {isEs ? 'Transformación de texto:' : 'Text transform:'}
            </label>
            <div
              className={styles.segmentGroup}
              role="radiogroup"
              aria-label={isEs ? 'Transformación' : 'Text transform options'}
            >
              {(['none', 'uppercase', 'lowercase'] as const).map((trans) => {
                const isSelected = config.textTransform === trans;
                const labels: Record<string, { es: string; en: string }> = {
                  none: { es: 'Normal (Aa)', en: 'None (Aa)' },
                  uppercase: { es: 'Mayúsculas (AA)', en: 'Uppercase (AA)' },
                  lowercase: { es: 'Minúsculas (aa)', en: 'Lowercase (aa)' }
                };
                return (
                  <button
                    key={trans}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.segmentButton} ${
                      isSelected ? styles.segmentButtonActive : ''
                    }`}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, textTransform: trans }))
                    }
                  >
                    {labels[trans][isEs ? 'es' : 'en']}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editable Sample Text Input & Quick Presets */}
          <div className={styles.controlGroup}>
            <label htmlFor="type-sample-input" className={styles.controlLabel}>
              {isEs ? 'Texto de muestra editable:' : 'Editable sample text:'}
            </label>
            <input
              id="type-sample-input"
              type="text"
              maxLength={120}
              value={config.sampleText}
              className={styles.textInput}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, sampleText: e.target.value }))
              }
            />

            <div className={styles.presetsList}>
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.presetChip}
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, sampleText: p.text }))
                  }
                  title={p.text}
                >
                  {p.label[isEs ? 'es' : 'en']}
                </button>
              ))}
            </div>
          </div>

          {/* Action: Reset */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.secondaryButton}
            >
              <RotateCcw size={15} aria-hidden="true" />
              <span>{isEs ? 'Reiniciar valores' : 'Reset defaults'}</span>
            </button>
          </div>
        </section>

        {/* Live Preview & Code Snippet Column */}
        <div className={styles.previewColumn}>
          {/* Live Stage */}
          <div
            className={styles.previewStage}
            aria-label={
              isEs
                ? 'Escenario de previsualización tipográfica'
                : 'Typography live stage'
            }
          >
            <div className={styles.previewStageHeader}>
              <span className={styles.previewStageBadge}>
                {isEs ? 'RENDERIZADO ACTIVO' : 'LIVE RENDER'}
              </span>
              <span className={styles.previewStageBadge}>
                {config.fontFamily} / {config.fontWeight}
              </span>
            </div>

            <div className={styles.typographyStage}>
              <p
                className={styles.typographyText}
                style={{
                  fontFamily:
                    config.fontFamily === 'Space Mono'
                      ? 'var(--font-space-mono), monospace'
                      : 'var(--font-space-grotesk), sans-serif',
                  fontSize: `${config.fontSize}px`,
                  fontWeight: config.fontWeight,
                  lineHeight: config.lineHeight,
                  letterSpacing: `${config.letterSpacing}px`,
                  textTransform: config.textTransform
                }}
              >
                {config.sampleText ||
                  (isEs ? 'Escribe tu texto...' : 'Type your text...')}
              </p>
            </div>
          </div>

          {/* Live CSS Code Card */}
          <div className={styles.codeCard}>
            <div className={styles.codeCardHeader}>
              <span className={styles.codeCardTitle}>CSS OUTPUT</span>
              <button
                type="button"
                onClick={handleCopy}
                className={`${styles.copyButton} ${
                  copied ? styles.copyButtonCopied : ''
                }`}
                aria-label={
                  copied
                    ? isEs
                      ? 'Copiado al portapapeles'
                      : 'Copied to clipboard'
                    : isEs
                      ? 'Copiar código CSS al portapapeles'
                      : 'Copy CSS code to clipboard'
                }
              >
                {copied ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>{isEs ? 'COPIADO' : 'COPIED'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>{isEs ? 'Copiar código CSS' : 'Copy CSS code'}</span>
                  </>
                )}
              </button>
            </div>
            <pre className={styles.codePre}>
              <code>{generatedCss}</code>
            </pre>
          </div>

          {/* Screen reader live notification for copy event */}
          <div aria-live="polite" className={styles.srOnly}>
            {copyFeedback}
          </div>
        </div>
      </div>
    </article>
  );
}
