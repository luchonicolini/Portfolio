'use client';

import { useState, useId } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sliders,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import {
  DESIGN_TOKENS_DEFAULTS,
  calculateContrastRatio,
  getWcagStatus,
  generateTokensCss,
  clamp,
  type DesignTokensConfig
} from '@/data/lab';
import styles from './visuals.module.css';

interface TokensPlaygroundProps {
  locale: string;
}

const ACCENT_PRESETS = [
  { label: 'Amarillo / Yellow', hex: '#FFDE00' },
  { label: 'Menta / Mint', hex: '#4ECDC4' },
  { label: 'Coral / Coral', hex: '#FF6B6B' },
  { label: 'Rosa / Pink', hex: '#FF70A6' },
  { label: 'Blanco / White', hex: '#FFFFFF' },
  { label: 'Negro / Black', hex: '#000000' }
];

const SURFACE_PRESETS = [
  { label: 'Canvas Oficial', hex: '#F8F8F6' },
  { label: 'Blanco Puro', hex: '#FFFFFF' },
  { label: 'Concreto', hex: '#E5E5E0' },
  { label: 'Tinta Oscura', hex: '#1A1A1A' }
];

const INK_PRESETS = [
  { label: 'Negro Absoluto', hex: '#000000' },
  { label: 'Grafito', hex: '#222222' },
  { label: 'Blanco', hex: '#FFFFFF' }
];

export function TokensPlayground({ locale }: TokensPlaygroundProps) {
  const es = locale === 'es';

  // Config State initialized from approved defaults
  const [accentColor, setAccentColor] = useState<string>(
    DESIGN_TOKENS_DEFAULTS.accentColor
  );
  const [surfaceColor, setSurfaceColor] = useState<string>(
    DESIGN_TOKENS_DEFAULTS.surfaceColor
  );
  const [inkColor, setInkColor] = useState<string>(
    DESIGN_TOKENS_DEFAULTS.inkColor
  );
  const [borderWidth, setBorderWidth] = useState<number>(
    DESIGN_TOKENS_DEFAULTS.borderWidth
  );
  const [spacingBase, setSpacingBase] = useState<number>(
    DESIGN_TOKENS_DEFAULTS.spacingBase
  );
  const [shadowOffset, setShadowOffset] = useState<number>(
    DESIGN_TOKENS_DEFAULTS.shadowOffset
  );

  // Card interactive button state
  const [cardClicks, setCardClicks] = useState<number>(0);

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);
  const [copyAnnouncement, setCopyAnnouncement] = useState<string>('');

  // IDs for accessibility
  const accentId = useId();
  const surfaceId = useId();
  const inkId = useId();
  const borderId = useId();
  const spacingId = useId();
  const shadowId = useId();

  // Reset to original defaults
  function handleReset() {
    setAccentColor(DESIGN_TOKENS_DEFAULTS.accentColor);
    setSurfaceColor(DESIGN_TOKENS_DEFAULTS.surfaceColor);
    setInkColor(DESIGN_TOKENS_DEFAULTS.inkColor);
    setBorderWidth(DESIGN_TOKENS_DEFAULTS.borderWidth);
    setSpacingBase(DESIGN_TOKENS_DEFAULTS.spacingBase);
    setShadowOffset(DESIGN_TOKENS_DEFAULTS.shadowOffset);
    setCardClicks(0);
  }

  // Active configuration bundle
  const currentConfig: DesignTokensConfig = {
    accentColor,
    surfaceColor,
    inkColor,
    borderWidth,
    spacingBase,
    shadowOffset
  };

  // WCAG Calculations
  const inkOnSurfaceRatio = calculateContrastRatio(inkColor, surfaceColor);
  const inkOnSurfaceStatus = getWcagStatus(inkOnSurfaceRatio);

  const inkOnAccentRatio = calculateContrastRatio(inkColor, accentColor);
  const inkOnAccentStatus = getWcagStatus(inkOnAccentRatio);

  // Scoped CSS Variables applied strictly to the preview container
  const scopedTokensStyle = {
    '--token-accent': accentColor,
    '--token-surface': surfaceColor,
    '--token-ink': inkColor,
    '--token-border-width': `${borderWidth}px`,
    '--token-spacing-base': `${spacingBase}px`,
    '--token-shadow-offset': `${shadowOffset}px`
  } as React.CSSProperties;

  // Generated CSS variables block
  const generatedCss = generateTokensCss(currentConfig);

  async function handleCopyCss() {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      const msg = es
        ? 'Variables CSS copiadas al portapapeles con éxito.'
        : 'CSS custom properties copied to clipboard successfully.';
      setCopyAnnouncement(msg);
      setTimeout(() => {
        setCopied(false);
        setCopyAnnouncement('');
      }, 2500);
    } catch {
      // Graceful fallback for non-clipboard environments
      setCopyAnnouncement(es ? 'Error al copiar' : 'Failed to copy');
    }
  }

  return (
    <article
      id="experiment-tokens"
      className={styles.playgroundCard}
      aria-labelledby="tokens-title"
    >
      {/* Accessible live region for copy announcements */}
      <div aria-live="polite" className={styles.srOnly}>
        {copyAnnouncement}
      </div>

      {/* Card Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.metaGroup}>
            <span className={styles.numberBadge}>EXP 04</span>
            <span className={styles.categoryTag}>
              {es ? 'SISTEMA DE TOKENS' : 'DESIGN TOKENS'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={`${styles.btn} ${styles.btnQuiet}`}
            aria-label={
              es
                ? 'Restablecer tokens a valores por defecto'
                : 'Reset tokens to defaults'
            }
          >
            <RotateCcw size={16} aria-hidden="true" />
            {es ? 'Restablecer' : 'Reset'}
          </button>
        </div>

        <h3 id="tokens-title" className={styles.title}>
          {es ? 'Interactive Design Tokens' : 'Interactive Design Tokens'}
        </h3>
        <p className={styles.tagline}>
          {es
            ? 'Variables CSS y contraste WCAG'
            : 'Scoped CSS tokens and live WCAG contrast'}
        </p>
        <p className={styles.description}>
          {es
            ? 'Modificá la paleta, bordes y espaciados de un componente contenido con cálculo automático de ratio de contraste WCAG AA. Los tokens se aíslan exclusivamente dentro del contenedor de previsualización sin alterar el resto de la interfaz.'
            : 'Tweak palette, borders and spacing inside a scoped component with live WCAG AA contrast ratio calculations. Tokens are strictly encapsulated inside the preview boundary without leaking.'}
        </p>

        <div
          className={styles.techRow}
          aria-label={es ? 'Tecnologías utilizadas' : 'Technologies used'}
        >
          <span className={styles.techPill}>CSS Custom Properties</span>
          <span className={styles.techPill}>WCAG 2.2 AA</span>
          <span className={styles.techPill}>Relative Luminance</span>
          <span className={styles.techPill}>Scope Isolation</span>
        </div>
      </header>

      {/* Interactive Two-Column Stage */}
      <div className={styles.grid}>
        {/* Left Column: Interactive Controls */}
        <section
          className={styles.controlsPanel}
          aria-label={es ? 'Controles de tokens' : 'Token controls'}
        >
          <h4 className={styles.controlsTitle}>
            <span>{es ? 'Parámetros del Sistema' : 'System Parameters'}</span>
            <Sliders size={18} aria-hidden="true" />
          </h4>

          {/* Accent Color */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={accentId} className={styles.label}>
                {es ? 'Color de Acento' : 'Accent Color'}
              </label>
              <span className={styles.valueBadge}>
                {accentColor.toUpperCase()}
              </span>
            </div>
            <div className={styles.colorPickerRow}>
              <input
                id={accentId}
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className={styles.colorPickerBox}
                aria-label={
                  es ? 'Selector de color de acento' : 'Accent color picker'
                }
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                maxLength={7}
                className={styles.hexInput}
                aria-label={
                  es ? 'Valor hexadecimal de acento' : 'Accent hex value'
                }
              />
            </div>
            <div
              className={styles.paletteRow}
              role="group"
              aria-label={
                es ? 'Paleta de acento sugerida' : 'Suggested accent palette'
              }
            >
              {ACCENT_PRESETS.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => setAccentColor(item.hex)}
                  className={`${styles.paletteChip} ${accentColor.toLowerCase() === item.hex.toLowerCase() ? styles.paletteChipActive : ''}`}
                  style={{ backgroundColor: item.hex }}
                  title={item.label}
                  aria-label={`${item.label} (${item.hex})`}
                />
              ))}
            </div>
          </div>

          {/* Surface Color */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={surfaceId} className={styles.label}>
                {es ? 'Color de Superficie' : 'Surface Color'}
              </label>
              <span className={styles.valueBadge}>
                {surfaceColor.toUpperCase()}
              </span>
            </div>
            <div className={styles.colorPickerRow}>
              <input
                id={surfaceId}
                type="color"
                value={surfaceColor}
                onChange={(e) => setSurfaceColor(e.target.value)}
                className={styles.colorPickerBox}
                aria-label={
                  es
                    ? 'Selector de color de superficie'
                    : 'Surface color picker'
                }
              />
              <input
                type="text"
                value={surfaceColor}
                onChange={(e) => setSurfaceColor(e.target.value)}
                maxLength={7}
                className={styles.hexInput}
                aria-label={
                  es ? 'Valor hexadecimal de superficie' : 'Surface hex value'
                }
              />
            </div>
            <div
              className={styles.paletteRow}
              role="group"
              aria-label={
                es
                  ? 'Paleta de superficie sugerida'
                  : 'Suggested surface palette'
              }
            >
              {SURFACE_PRESETS.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => setSurfaceColor(item.hex)}
                  className={`${styles.paletteChip} ${surfaceColor.toLowerCase() === item.hex.toLowerCase() ? styles.paletteChipActive : ''}`}
                  style={{ backgroundColor: item.hex }}
                  title={item.label}
                  aria-label={`${item.label} (${item.hex})`}
                />
              ))}
            </div>
          </div>

          {/* Ink Color */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={inkId} className={styles.label}>
                {es ? 'Color de Tinta / Texto' : 'Ink / Text Color'}
              </label>
              <span className={styles.valueBadge}>
                {inkColor.toUpperCase()}
              </span>
            </div>
            <div className={styles.colorPickerRow}>
              <input
                id={inkId}
                type="color"
                value={inkColor}
                onChange={(e) => setInkColor(e.target.value)}
                className={styles.colorPickerBox}
                aria-label={
                  es ? 'Selector de color de tinta' : 'Ink color picker'
                }
              />
              <input
                type="text"
                value={inkColor}
                onChange={(e) => setInkColor(e.target.value)}
                maxLength={7}
                className={styles.hexInput}
                aria-label={es ? 'Valor hexadecimal de tinta' : 'Ink hex value'}
              />
            </div>
            <div
              className={styles.paletteRow}
              role="group"
              aria-label={
                es ? 'Paleta de tinta sugerida' : 'Suggested ink palette'
              }
            >
              {INK_PRESETS.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => setInkColor(item.hex)}
                  className={`${styles.paletteChip} ${inkColor.toLowerCase() === item.hex.toLowerCase() ? styles.paletteChipActive : ''}`}
                  style={{ backgroundColor: item.hex }}
                  title={item.label}
                  aria-label={`${item.label} (${item.hex})`}
                />
              ))}
            </div>
          </div>

          {/* Border Width Slider */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={borderId} className={styles.label}>
                {es ? 'Grosor de Borde' : 'Border Width'}
              </label>
              <span className={styles.valueBadge}>{borderWidth}px</span>
            </div>
            <input
              id={borderId}
              type="range"
              min={1}
              max={6}
              step={1}
              value={borderWidth}
              onChange={(e) =>
                setBorderWidth(clamp(parseInt(e.target.value, 10), 1, 6))
              }
              className={styles.slider}
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={borderWidth}
              aria-label={
                es
                  ? 'Ajustar grosor de borde de 1 a 6 píxeles'
                  : 'Adjust border width 1 to 6 pixels'
              }
            />
          </div>

          {/* Spacing Base Slider */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={spacingId} className={styles.label}>
                {es ? 'Espaciado Base' : 'Base Spacing'}
              </label>
              <span className={styles.valueBadge}>{spacingBase}px</span>
            </div>
            <input
              id={spacingId}
              type="range"
              min={4}
              max={16}
              step={2}
              value={spacingBase}
              onChange={(e) =>
                setSpacingBase(clamp(parseInt(e.target.value, 10), 4, 16))
              }
              className={styles.slider}
              aria-valuemin={4}
              aria-valuemax={16}
              aria-valuenow={spacingBase}
              aria-label={
                es
                  ? 'Ajustar espaciado base de 4 a 16 píxeles'
                  : 'Adjust base spacing 4 to 16 pixels'
              }
            />
          </div>

          {/* Shadow Offset Slider */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={shadowId} className={styles.label}>
                {es ? 'Offset de Sombra' : 'Shadow Offset'}
              </label>
              <span className={styles.valueBadge}>{shadowOffset}px</span>
            </div>
            <input
              id={shadowId}
              type="range"
              min={0}
              max={12}
              step={1}
              value={shadowOffset}
              onChange={(e) =>
                setShadowOffset(clamp(parseInt(e.target.value, 10), 0, 12))
              }
              className={styles.slider}
              aria-valuemin={0}
              aria-valuemax={12}
              aria-valuenow={shadowOffset}
              aria-label={
                es
                  ? 'Ajustar desplazamiento de sombra de 0 a 12 píxeles'
                  : 'Adjust shadow offset 0 to 12 pixels'
              }
            />
          </div>
        </section>

        {/* Right Column: Live Scoped Preview & Metrics */}
        <section
          className={styles.previewPanel}
          aria-label={
            es ? 'Previsualización y contraste' : 'Preview and contrast'
          }
        >
          {/* Live Preview Container with Scoped CSS Custom Properties */}
          <div
            className={styles.tokensPreviewStage}
            style={scopedTokensStyle}
            aria-label={
              es
                ? 'Área de previsualización con variables scoped'
                : 'Preview area with scoped CSS variables'
            }
          >
            <span className={styles.tokensScopeNotice}>
              {es ? 'Scope: Contenedor Aislado' : 'Scope: Isolated Container'}
            </span>

            {/* Editorial Card Component consuming scoped tokens */}
            <div className={styles.editorialCard}>
              <div className={styles.cardTopRow}>
                <span className={styles.cardBadge}>TOKEN v1.2</span>
                <span className={styles.cardCategory}>
                  {es ? 'COMPONENTE EDITORIAL' : 'EDITORIAL COMPONENT'}
                </span>
              </div>

              <h4 className={styles.cardHeading}>
                {es
                  ? 'Arquitectura Editorial Escalar'
                  : 'Scalable Editorial Architecture'}
              </h4>

              <p className={styles.cardBody}>
                {es
                  ? 'Este bloque consume variables CSS inyectadas en su contenedor raíz. Las sombras duras, el radio nulo y el contraste estricto garantizan coherencia neobrutalista.'
                  : 'This card consumes CSS variables injected into its root container. Hard shadows, zero border-radius, and strict contrast enforce neobrutalist coherence.'}
              </p>

              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setCardClicks((prev) => prev + 1)}
              >
                <span>
                  {es ? 'Botón de prueba editorial' : 'Editorial sample button'}
                </span>
                {cardClicks > 0 && <span>({cardClicks})</span>}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* WCAG Contrast Ratio Metrics Panel */}
          <div
            className={styles.wcagPanel}
            aria-label={
              es ? 'Métricas de contraste WCAG' : 'WCAG contrast metrics'
            }
          >
            <div className={styles.wcagPanelHeader}>
              <h5 className={styles.wcagTitle}>
                {es
                  ? 'Validación de Accesibilidad WCAG 2.2'
                  : 'WCAG 2.2 Accessibility Validation'}
              </h5>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>

            <div className={styles.contrastGrid}>
              {/* Metric 1: Ink on Surface */}
              <div className={styles.contrastCard}>
                <div className={styles.contrastCardHeader}>
                  <span className={styles.contrastPair}>
                    {es ? 'Tinta / Superficie' : 'Ink / Surface'}
                  </span>
                  <span
                    className={
                      inkOnSurfaceStatus.aaNormal
                        ? styles.badgePass
                        : styles.badgeFail
                    }
                    aria-label={`Status: ${inkOnSurfaceStatus.level}`}
                  >
                    {inkOnSurfaceStatus.aaNormal ? 'Pasa AA' : 'Falla AA'}
                  </span>
                </div>
                <div className={styles.contrastScoreRow}>
                  <span className={styles.contrastRatio}>
                    {inkOnSurfaceRatio}:1
                  </span>
                  <span className={styles.contrastRequirement}>
                    {inkOnSurfaceStatus.aaNormal ? (
                      <span style={{ color: '#0d6b4f', fontWeight: 700 }}>
                        {inkOnSurfaceStatus.level} (≥ 4.5:1)
                      </span>
                    ) : (
                      <span style={{ color: '#b91c1c', fontWeight: 700 }}>
                        <AlertTriangle
                          size={12}
                          style={{
                            display: 'inline',
                            verticalAlign: '-1px',
                            marginRight: 2
                          }}
                          aria-hidden="true"
                        />
                        {es ? 'Contraste insuficiente' : 'Low contrast'}
                      </span>
                    )}
                  </span>
                </div>
                <p className={styles.contrastRequirement}>
                  {es
                    ? 'Lectura de texto principal en cuerpo y titulares.'
                    : 'Primary body text and headline readability.'}
                </p>
              </div>

              {/* Metric 2: Ink on Accent */}
              <div className={styles.contrastCard}>
                <div className={styles.contrastCardHeader}>
                  <span className={styles.contrastPair}>
                    {es ? 'Tinta / Acento' : 'Ink / Accent'}
                  </span>
                  <span
                    className={
                      inkOnAccentStatus.aaNormal
                        ? styles.badgePass
                        : styles.badgeFail
                    }
                    aria-label={`Status: ${inkOnAccentStatus.level}`}
                  >
                    {inkOnAccentStatus.aaNormal ? 'Pasa AA' : 'Falla AA'}
                  </span>
                </div>
                <div className={styles.contrastScoreRow}>
                  <span className={styles.contrastRatio}>
                    {inkOnAccentRatio}:1
                  </span>
                  <span className={styles.contrastRequirement}>
                    {inkOnAccentStatus.aaNormal ? (
                      <span style={{ color: '#0d6b4f', fontWeight: 700 }}>
                        {inkOnAccentStatus.level} (≥ 4.5:1)
                      </span>
                    ) : (
                      <span style={{ color: '#b91c1c', fontWeight: 700 }}>
                        <AlertTriangle
                          size={12}
                          style={{
                            display: 'inline',
                            verticalAlign: '-1px',
                            marginRight: 2
                          }}
                          aria-hidden="true"
                        />
                        {es ? 'Contraste insuficiente' : 'Low contrast'}
                      </span>
                    )}
                  </span>
                </div>
                <p className={styles.contrastRequirement}>
                  {es
                    ? 'Etiquetas, insignias y botones interactivos.'
                    : 'Badges, pills and interactive action buttons.'}
                </p>
              </div>
            </div>
          </div>

          {/* Code Snippet Box */}
          <div
            className={styles.codeContainer}
            aria-label={es ? 'Código CSS generado' : 'Generated CSS code'}
          >
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>
                CSS Custom Properties (Scoped)
              </span>
              <button
                type="button"
                onClick={handleCopyCss}
                className={`${styles.copyButton} ${copied ? styles.copyButtonCopied : ''}`}
                aria-label={
                  copied
                    ? es
                      ? 'Copiado al portapapeles'
                      : 'Copied to clipboard'
                    : es
                      ? 'Copiar variables CSS al portapapeles'
                      : 'Copy CSS variables to clipboard'
                }
              >
                {copied ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>{es ? '¡Copiado!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>
                      {es ? 'Copiar variables CSS' : 'Copy CSS variables'}
                    </span>
                  </>
                )}
              </button>
            </div>

            <pre className={styles.codePre} tabIndex={0}>
              <code>{generatedCss}</code>
            </pre>
          </div>
        </section>
      </div>
    </article>
  );
}
