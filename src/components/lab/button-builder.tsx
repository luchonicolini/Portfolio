'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import {
  BUTTON_BUILDER_DEFAULTS,
  BUTTON_PALETTE,
  BUTTON_TEXT_PALETTE,
  generateButtonCss,
  clamp,
  type ButtonBuilderConfig
} from '@/data/lab';
import styles from './controls.module.css';

export interface ButtonBuilderProps {
  locale?: string;
}

export function ButtonBuilder({ locale = 'es' }: ButtonBuilderProps) {
  const isEs = locale === 'es';

  const [config, setConfig] = useState<ButtonBuilderConfig>({
    ...BUTTON_BUILDER_DEFAULTS,
    label: isEs ? BUTTON_BUILDER_DEFAULTS.label : 'CLICK ME'
  });

  const [clickCount, setClickCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');

  const generatedCss = generateButtonCss(config);

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
    setConfig({
      ...BUTTON_BUILDER_DEFAULTS,
      label: isEs ? BUTTON_BUILDER_DEFAULTS.label : 'CLICK ME'
    });
    setClickCount(0);
  };

  return (
    <article
      id="experiment-01"
      className={styles.labCard}
      aria-labelledby="exp-01-title"
    >
      {/* Header */}
      <header className={styles.labHeader}>
        <div className={styles.headerMeta}>
          <span className={styles.categoryBadge}>
            {isEs ? '01 / COMPONENTES' : '01 / COMPONENTS'}
          </span>
          <span className={styles.experimentNumber}>EXP-01</span>
        </div>
        <h2 id="exp-01-title" className={styles.labTitle}>
          Brutalist Button Builder
        </h2>
        <p className={styles.labTagline}>
          {isEs
            ? 'Composición de botones con CSS real'
            : 'Button composition with live CSS variables'}
        </p>
        <p className={styles.labDescription}>
          {isEs
            ? 'Ajustá sombra, grosor de borde, radio y color para componer un botón editorial neobrutalista con CSS nativo exportable.'
            : 'Adjust shadow offset, border width, corner radius and color to compose an editorial neobrutalist button with exportable CSS.'}
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className={styles.labLayout}>
        {/* Controls Column */}
        <section
          className={styles.controlsPanel}
          aria-label={
            isEs
              ? 'Panel de configuración del botón'
              : 'Button builder settings'
          }
        >
          {/* Background Color Palette */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              {isEs ? 'Color de fondo:' : 'Background color:'}
            </label>
            <div
              className={styles.paletteRow}
              role="radiogroup"
              aria-label={isEs ? 'Paleta de fondo' : 'Background palette'}
            >
              {BUTTON_PALETTE.map((item) => {
                const isSelected = config.backgroundColor === item.hex;
                return (
                  <button
                    key={item.hex}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${item.label} (${item.hex})`}
                    className={`${styles.colorChip} ${
                      isSelected ? styles.colorChipActive : ''
                    }`}
                    style={{ backgroundColor: item.hex }}
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        backgroundColor: item.hex
                      }))
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Text Color Palette */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              {isEs ? 'Color de texto:' : 'Text color:'}
            </label>
            <div
              className={styles.paletteRow}
              role="radiogroup"
              aria-label={isEs ? 'Paleta de texto' : 'Text color palette'}
            >
              {BUTTON_TEXT_PALETTE.map((item) => {
                const isSelected = config.textColor === item.hex;
                return (
                  <button
                    key={item.hex}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${item.label} (${item.hex})`}
                    className={`${styles.colorChip} ${
                      isSelected ? styles.colorChipActive : ''
                    }`}
                    style={{ backgroundColor: item.hex }}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, textColor: item.hex }))
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Border Thickness Slider (1 - 6px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label htmlFor="btn-border-width" className={styles.controlLabel}>
                {isEs ? 'Grosor de borde:' : 'Border thickness:'}
              </label>
              <span className={styles.controlValue}>
                {config.borderWidth}px
              </span>
            </div>
            <input
              id="btn-border-width"
              type="range"
              min={1}
              max={6}
              step={1}
              value={config.borderWidth}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 1, 6);
                setConfig((prev) => ({ ...prev, borderWidth: val }));
              }}
            />
          </div>

          {/* Border Radius Slider (0 - 24px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label
                htmlFor="btn-border-radius"
                className={styles.controlLabel}
              >
                {isEs ? 'Radio de esquinas:' : 'Border radius:'}
              </label>
              <span className={styles.controlValue}>
                {config.borderRadius}px
              </span>
            </div>
            <input
              id="btn-border-radius"
              type="range"
              min={0}
              max={24}
              step={1}
              value={config.borderRadius}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 0, 24);
                setConfig((prev) => ({ ...prev, borderRadius: val }));
              }}
            />
          </div>

          {/* Shadow Offset Slider (0 - 16px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label
                htmlFor="btn-shadow-offset"
                className={styles.controlLabel}
              >
                {isEs ? 'Desplazamiento de sombra:' : 'Shadow offset:'}
              </label>
              <span className={styles.controlValue}>
                {config.shadowOffset}px
              </span>
            </div>
            <input
              id="btn-shadow-offset"
              type="range"
              min={0}
              max={16}
              step={1}
              value={config.shadowOffset}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 0, 16);
                setConfig((prev) => ({ ...prev, shadowOffset: val }));
              }}
            />
          </div>

          {/* Hover Displacement Slider (0 - 8px) */}
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <label htmlFor="btn-hover-disp" className={styles.controlLabel}>
                {isEs
                  ? 'Desplazamiento al pasar cursor:'
                  : 'Hover displacement:'}
              </label>
              <span className={styles.controlValue}>
                {config.hoverDisplacement}px
              </span>
            </div>
            <input
              id="btn-hover-disp"
              type="range"
              min={0}
              max={8}
              step={1}
              value={config.hoverDisplacement}
              className={styles.rangeInput}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 0, 8);
                setConfig((prev) => ({ ...prev, hoverDisplacement: val }));
              }}
            />
          </div>

          {/* Editable Button Label */}
          <div className={styles.controlGroup}>
            <label htmlFor="btn-label-input" className={styles.controlLabel}>
              {isEs ? 'Texto del botón:' : 'Button label:'}
            </label>
            <input
              id="btn-label-input"
              type="text"
              maxLength={28}
              value={config.label}
              className={styles.textInput}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, label: e.target.value }))
              }
            />
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
              isEs ? 'Escenario de previsualización' : 'Live preview stage'
            }
          >
            <div className={styles.previewStageHeader}>
              <span className={styles.previewStageBadge}>
                {isEs ? 'VISTA PREVIA EN VIVO' : 'LIVE PREVIEW'}
              </span>
              <span
                className={styles.clickCounterBadge}
                aria-live="polite"
                aria-atomic="true"
              >
                {isEs ? `CLICKS: ${clickCount}` : `CLICKS: ${clickCount}`}
              </span>
            </div>

            <div className={styles.buttonPreviewWrapper}>
              <button
                type="button"
                className={styles.interactivePreviewButton}
                style={
                  {
                    '--btn-bg': config.backgroundColor,
                    '--btn-color': config.textColor,
                    '--btn-border': `${config.borderWidth}px`,
                    '--btn-radius': `${config.borderRadius}px`,
                    '--btn-shadow': `${config.shadowOffset}px`,
                    '--btn-hover': `${config.hoverDisplacement}px`
                  } as React.CSSProperties
                }
                onClick={() => setClickCount((c) => c + 1)}
              >
                <Sparkles size={16} aria-hidden="true" />
                <span>{config.label || (isEs ? 'BOTÓN' : 'BUTTON')}</span>
              </button>
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
