'use client';

import { useState, useEffect, useRef, useId, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Sliders,
  Info
} from 'lucide-react';
import {
  SVG_ANIMATION_DEFAULTS,
  generateSvgSnippet,
  clamp,
  type SvgAnimationConfig
} from '@/data/lab';
import styles from './visuals.module.css';

interface SvgPlaygroundProps {
  locale: string;
}

const STROKE_PALETTE = [
  { label: 'Negro Tinta', hex: '#000000' },
  { label: 'Amarillo Primario', hex: '#FFDE00' },
  { label: 'Menta', hex: '#4ECDC4' },
  { label: 'Coral', hex: '#FF6B6B' },
  { label: 'Rosa Neobrutal', hex: '#FF70A6' },
  { label: 'Blanco', hex: '#FFFFFF' }
];

export function SvgPlayground({ locale }: SvgPlaygroundProps) {
  const es = locale === 'es';

  // Config State initialized from approved defaults
  const [duration, setDuration] = useState<number>(
    SVG_ANIMATION_DEFAULTS.duration
  );
  const [strokeWidth, setStrokeWidth] = useState<number>(
    SVG_ANIMATION_DEFAULTS.strokeWidth
  );
  const [strokeColor, setStrokeColor] = useState<string>(
    SVG_ANIMATION_DEFAULTS.strokeColor
  );
  const [isPaused, setIsPaused] = useState<boolean>(
    SVG_ANIMATION_DEFAULTS.isPaused
  );
  const [progress, setProgress] = useState<number>(
    SVG_ANIMATION_DEFAULTS.progress
  );

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);
  const [copyAnnouncement, setCopyAnnouncement] = useState<string>('');

  // IDs for accessibility
  const durationId = useId();
  const strokeWidthId = useId();
  const strokeColorId = useId();
  const progressId = useId();

  // Detect system reduced motion preference
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPaused(true);
      setProgress(100);
    }

    function handleChange(e: MediaQueryListEvent) {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPaused(true);
        setProgress(100);
      }
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation loop via requestAnimationFrame
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const animateLoop = useCallback(
    (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused && !prefersReducedMotion) {
        setProgress((prev) => {
          // Duration in ms: duration * 1000
          const increment = (delta / (duration * 1000)) * 100;
          const next = prev + increment;
          return next >= 100 ? 0 : next;
        });
      }

      animRef.current = requestAnimationFrame(animateLoop);
    },
    [isPaused, prefersReducedMotion, duration]
  );

  useEffect(() => {
    if (!isPaused && !prefersReducedMotion) {
      lastTimeRef.current = null;
      animRef.current = requestAnimationFrame(animateLoop);
    } else {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    }

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [isPaused, prefersReducedMotion, animateLoop]);

  // Reset to defaults
  function handleReset() {
    setDuration(SVG_ANIMATION_DEFAULTS.duration);
    setStrokeWidth(SVG_ANIMATION_DEFAULTS.strokeWidth);
    setStrokeColor(SVG_ANIMATION_DEFAULTS.strokeColor);
    setIsPaused(prefersReducedMotion ? true : SVG_ANIMATION_DEFAULTS.isPaused);
    setProgress(SVG_ANIMATION_DEFAULTS.progress);
  }

  // Active config bundle for snippet generator
  const currentConfig: SvgAnimationConfig = {
    duration,
    strokeWidth,
    strokeColor,
    isPaused,
    progress: Math.round(progress)
  };

  const generatedSnippet = generateSvgSnippet(currentConfig);

  async function handleCopySnippet() {
    try {
      await navigator.clipboard.writeText(generatedSnippet);
      setCopied(true);
      const msg = es
        ? 'Código SVG copiado al portapapeles con éxito.'
        : 'SVG snippet copied to clipboard successfully.';
      setCopyAnnouncement(msg);
      setTimeout(() => {
        setCopied(false);
        setCopyAnnouncement('');
      }, 2500);
    } catch {
      setCopyAnnouncement(es ? 'Error al copiar' : 'Failed to copy');
    }
  }

  // Calculate normalized stroke dashoffset for paths with pathLength="100"
  // When progress = 100, offset = 0 (full path visible)
  // When progress = 0, offset = 100 (no path visible)
  const effectiveProgress = prefersReducedMotion ? 100 : progress;
  const strokeDashoffset = 100 - effectiveProgress;

  return (
    <article
      id="experiment-svg"
      className={styles.playgroundCard}
      aria-labelledby="svg-experiment-title"
    >
      {/* Live announcement region for copy status */}
      <div aria-live="polite" className={styles.srOnly}>
        {copyAnnouncement}
      </div>

      {/* Card Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.metaGroup}>
            <span className={styles.numberBadge}>EXP 06</span>
            <span className={`${styles.categoryTag} ${styles.categoryTagSvg}`}>
              {es ? 'DIBUJO VECTORIAL' : 'SVG ANIMATION'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={`${styles.btn} ${styles.btnQuiet}`}
            aria-label={
              es
                ? 'Restablecer animación SVG a valores por defecto'
                : 'Reset SVG animation to defaults'
            }
          >
            <RotateCcw size={16} aria-hidden="true" />
            {es ? 'Restablecer' : 'Reset'}
          </button>
        </div>

        <h3 id="svg-experiment-title" className={styles.title}>
          {es ? 'SVG Animation Playground' : 'SVG Animation Playground'}
        </h3>
        <p className={styles.tagline}>
          {es
            ? 'Dibujo vectorial procedural'
            : 'Interactive procedural vector paths'}
        </p>
        <p className={styles.description}>
          {es
            ? 'Controlá la duración, grosor de trazo y reproducción de una composición vectorial geométrica original. Los trazos se animan mediante pathLength normalizado y strokeDashoffset reactivo, con fallback estático para usuarios con preferencias de movimiento reducido.'
            : 'Control duration, stroke width and progress of an original geometric vector artwork. Paths are dynamically revealed via normalized pathLength and reactive strokeDashoffset, featuring a robust static fallback for reduced-motion preferences.'}
        </p>

        <div
          className={styles.techRow}
          aria-label={es ? 'Tecnologías utilizadas' : 'Technologies used'}
        >
          <span className={styles.techPill}>Native SVG 2.0</span>
          <span className={styles.techPill}>pathLength API</span>
          <span className={styles.techPill}>strokeDashoffset</span>
          <span className={styles.techPill}>Accessible Vector Semantics</span>
        </div>
      </header>

      {/* Two-Column Stage */}
      <div className={styles.grid}>
        {/* Left Column: Interactive Controls */}
        <section
          className={styles.controlsPanel}
          aria-label={
            es ? 'Controles de animación SVG' : 'SVG animation controls'
          }
        >
          <h4 className={styles.controlsTitle}>
            <span>
              {es ? 'Parámetros del Trazo' : 'Vector Stroke Controls'}
            </span>
            <Sliders size={18} aria-hidden="true" />
          </h4>

          {/* Stroke Color */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={strokeColorId} className={styles.label}>
                {es ? 'Color del Trazo' : 'Stroke Color'}
              </label>
              <span className={styles.valueBadge}>
                {strokeColor.toUpperCase()}
              </span>
            </div>
            <div className={styles.colorPickerRow}>
              <input
                id={strokeColorId}
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className={styles.colorPickerBox}
                aria-label={
                  es
                    ? 'Selector de color de trazo SVG'
                    : 'SVG stroke color picker'
                }
              />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                maxLength={7}
                className={styles.hexInput}
                aria-label={
                  es ? 'Valor hexadecimal de trazo' : 'Stroke hex value'
                }
              />
            </div>
            <div
              className={styles.paletteRow}
              role="group"
              aria-label={
                es ? 'Paleta de trazo sugerida' : 'Suggested stroke palette'
              }
            >
              {STROKE_PALETTE.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => setStrokeColor(item.hex)}
                  className={`${styles.paletteChip} ${strokeColor.toLowerCase() === item.hex.toLowerCase() ? styles.paletteChipActive : ''}`}
                  style={{ backgroundColor: item.hex }}
                  title={item.label}
                  aria-label={`${item.label} (${item.hex})`}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width Slider (1-8px) */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={strokeWidthId} className={styles.label}>
                {es ? 'Grosor de Trazo' : 'Stroke Width'}
              </label>
              <span className={styles.valueBadge}>{strokeWidth}px</span>
            </div>
            <input
              id={strokeWidthId}
              type="range"
              min={1}
              max={8}
              step={1}
              value={strokeWidth}
              onChange={(e) =>
                setStrokeWidth(clamp(parseInt(e.target.value, 10), 1, 8))
              }
              className={styles.slider}
              aria-valuemin={1}
              aria-valuemax={8}
              aria-valuenow={strokeWidth}
              aria-label={
                es
                  ? 'Ajustar grosor de trazo de 1 a 8 píxeles'
                  : 'Adjust stroke width 1 to 8 pixels'
              }
            />
          </div>

          {/* Duration Slider (1-8s) */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={durationId} className={styles.label}>
                {es ? 'Duración de Ciclo' : 'Cycle Duration'}
              </label>
              <span className={styles.valueBadge}>{duration}s</span>
            </div>
            <input
              id={durationId}
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={duration}
              onChange={(e) =>
                setDuration(clamp(parseFloat(e.target.value), 1, 8))
              }
              className={styles.slider}
              aria-valuemin={1}
              aria-valuemax={8}
              aria-valuenow={duration}
              aria-label={
                es
                  ? 'Ajustar duración de 1 a 8 segundos'
                  : 'Adjust duration 1 to 8 seconds'
              }
            />
          </div>

          {/* Progress Slider (0-100%) */}
          <div className={styles.controlItem}>
            <div className={styles.labelRow}>
              <label htmlFor={progressId} className={styles.label}>
                {es ? 'Progreso Manual' : 'Manual Progress'}
              </label>
              <span className={styles.valueBadge}>{Math.round(progress)}%</span>
            </div>
            <input
              id={progressId}
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(progress)}
              onChange={(e) => {
                const val = clamp(parseInt(e.target.value, 10), 0, 100);
                setProgress(val);
                setIsPaused(true);
              }}
              className={styles.slider}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label={
                es
                  ? 'Ajustar progreso de dibujo de 0 a 100%'
                  : 'Adjust drawing progress 0 to 100%'
              }
            />
          </div>

          {/* Play / Pause Toggle Button */}
          <div className={styles.actionRow}>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className={`${styles.btn} ${styles.btnPrimary}`}
              aria-label={
                isPaused
                  ? es
                    ? 'Reanudar animación'
                    : 'Resume animation'
                  : es
                    ? 'Pausar animación'
                    : 'Pause animation'
              }
            >
              {isPaused ? (
                <>
                  <Play size={16} aria-hidden="true" fill="currentColor" />
                  <span>{es ? 'Reproducir' : 'Play'}</span>
                </>
              ) : (
                <>
                  <Pause size={16} aria-hidden="true" fill="currentColor" />
                  <span>{es ? 'Pausar' : 'Pause'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setProgress(0);
                setIsPaused(false);
              }}
              className={`${styles.btn} ${styles.btnSecondary}`}
              aria-label={
                es ? 'Reiniciar ciclo desde cero' : 'Restart cycle from zero'
              }
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>{es ? 'Reiniciar' : 'Restart'}</span>
            </button>
          </div>
        </section>

        {/* Right Column: Live SVG Stage & Snippet */}
        <section
          className={styles.previewPanel}
          aria-label={es ? 'Área de lienzo vectorial' : 'Vector canvas area'}
        >
          {/* Reduced Motion Notice banner if detected */}
          {prefersReducedMotion && (
            <div className={styles.reducedMotionBanner} role="status">
              <Info size={16} aria-hidden="true" />
              <span>
                {es
                  ? 'Preferencia de movimiento reducido activa: modo estático.'
                  : 'Prefers-reduced-motion active: static mode displayed.'}
              </span>
            </div>
          )}

          {/* SVG Vector Stage */}
          <div className={styles.svgStage}>
            {/* Original Editorial Neobrutalist Geometric Vector Composition */}
            <svg
              viewBox="0 0 600 380"
              role="img"
              aria-labelledby="svg-artwork-title svg-artwork-desc"
              className={styles.svgCanvas}
            >
              <title id="svg-artwork-title">
                {es
                  ? 'Composición Geométrica Neobrutalista Procedural'
                  : 'Procedural Neobrutalist Geometric Composition'}
              </title>
              <desc id="svg-artwork-desc">
                {es
                  ? 'Estructura geométrica arquitectónica con trazos animados reactivos, marcas de corte editorial y cuadrícula de precisión.'
                  : 'Architectural geometric artwork featuring reactive animated strokes, editorial trim marks, and precision coordinate grid.'}
              </desc>

              {/* Technical Grid & Corner Brackets */}
              <g stroke="#000000" strokeWidth="2" fill="none" opacity="0.35">
                {/* Corner registration marks */}
                <path d="M 24 44 L 24 24 L 44 24" />
                <path d="M 576 44 L 576 24 L 556 24" />
                <path d="M 24 336 L 24 356 L 44 356" />
                <path d="M 576 336 L 576 356 L 556 356" />

                {/* Sub-grid coordinate pins */}
                <path d="M 150 180 L 150 200 M 140 190 L 160 190" />
                <path d="M 450 180 L 450 200 M 440 190 L 460 190" />
                <path d="M 300 40 L 300 60 M 290 50 L 310 50" />
                <path d="M 300 320 L 300 340 M 290 330 L 310 330" />
              </g>

              {/* Editorial Technical Metadata Labels */}
              <text
                x="32"
                y="40"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="10"
                fontWeight="700"
                fill="#000000"
                letterSpacing="0.08em"
              >
                FIG 06 // VECTOR DYNAMICS
              </text>
              <text
                x="475"
                y="40"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="10"
                fontWeight="700"
                fill="#000000"
                letterSpacing="0.08em"
              >
                SCALE: 1:1
              </text>

              {/* Neo-brutalist Background Architectural Guides */}
              <rect
                x="60"
                y="65"
                width="480"
                height="250"
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* Static Geometric Anchor: Isometric Polygon */}
              <polygon
                points="110,130 170,95 230,130 230,200 170,235 110,200"
                fill="#FFDE00"
                stroke="#000000"
                strokeWidth="3"
                opacity="0.85"
              />

              {/* Static Concentric Hard Target on Right */}
              <circle
                cx="460"
                cy="190"
                r="45"
                fill="#4ECDC4"
                stroke="#000000"
                strokeWidth="3"
                opacity="0.85"
              />
              <circle
                cx="460"
                cy="190"
                r="22"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2.5"
              />
              <circle cx="460" cy="190" r="6" fill="#000000" />

              {/* Dynamic Animated Path 01: Sweeping Editorial Arch Ribbon */}
              <path
                d="M 60 270 C 140 270 170 110 260 110 S 370 270 450 270 S 510 130 540 130"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="square"
                strokeLinejoin="miter"
                pathLength={100}
                strokeDasharray="100"
                strokeDashoffset={strokeDashoffset}
              />

              {/* Dynamic Animated Path 02: Intersecting Kinetic Stepped Wave */}
              <path
                d="M 60 110 Q 180 30 300 190 T 540 270"
                fill="none"
                stroke={strokeColor}
                strokeWidth={Math.max(1, strokeWidth - 1)}
                strokeLinecap="round"
                strokeDasharray="100"
                pathLength={100}
                strokeDashoffset={strokeDashoffset}
                opacity="0.75"
              />

              {/* Dynamic Animated Path 03: Precision Central Diagonal Axis */}
              <path
                d="M 120 300 L 480 80"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray="100"
                pathLength={100}
                strokeDashoffset={strokeDashoffset}
              />

              {/* Neo-brutalist Star Node at intersection */}
              <g transform="translate(300, 190)">
                <rect
                  x="-10"
                  y="-10"
                  width="20"
                  height="20"
                  fill="#FF6B6B"
                  stroke="#000000"
                  strokeWidth="2"
                  transform={`rotate(${effectiveProgress * 3.6})`}
                />
                <circle cx="0" cy="0" r="3" fill="#000000" />
              </g>

              {/* Coordinates Indicator at bottom */}
              <text
                x="32"
                y="346"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="10"
                fontWeight="700"
                fill="#000000"
              >
                OFFSET: {Math.round(strokeDashoffset)}% | PROGRESS:{' '}
                {Math.round(effectiveProgress)}%
              </text>
            </svg>

            {/* Quick Interactive Scrub Row */}
            <div className={styles.svgInteractiveControls}>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className={styles.playToggleBtn}
              >
                {isPaused ? (
                  <Play size={16} aria-hidden="true" />
                ) : (
                  <Pause size={16} aria-hidden="true" />
                )}
                <span>
                  {isPaused ? (es ? 'Play' : 'Play') : es ? 'Pausa' : 'Pause'}
                </span>
              </button>

              <div className={styles.progressContainer}>
                <div className={styles.progressLabelRow}>
                  <span>{es ? 'Ciclo de Animación' : 'Animation Cycle'}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(progress)}
                  onChange={(e) => {
                    setProgress(clamp(parseInt(e.target.value, 10), 0, 100));
                    setIsPaused(true);
                  }}
                  className={styles.slider}
                  aria-label={
                    es
                      ? 'Control deslizante de ciclo de animación'
                      : 'Animation cycle slider'
                  }
                />
              </div>
            </div>
          </div>

          {/* Copyable SVG Code Snippet Box */}
          <div
            className={styles.codeContainer}
            aria-label={es ? 'Bloque de código SVG' : 'SVG code block'}
          >
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>SVG Vector Snippet</span>
              <button
                type="button"
                onClick={handleCopySnippet}
                className={`${styles.copyButton} ${copied ? styles.copyButtonCopied : ''}`}
                aria-label={
                  copied
                    ? es
                      ? 'Copiado al portapapeles'
                      : 'Copied to clipboard'
                    : es
                      ? 'Copiar fragmento SVG al portapapeles'
                      : 'Copy SVG snippet to clipboard'
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
                      {es ? 'Copiar fragmento SVG' : 'Copy SVG snippet'}
                    </span>
                  </>
                )}
              </button>
            </div>

            <pre className={styles.codePre} tabIndex={0}>
              <code>{generatedSnippet}</code>
            </pre>
          </div>
        </section>
      </div>
    </article>
  );
}
