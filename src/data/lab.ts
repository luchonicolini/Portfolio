/**
 * Developer Lab shared data, types, defaults, and pure utility functions.
 * Adheres to editorial neo-brutalism design system and WCAG 2.2 AA standards.
 */

type LabCategory =
  'all' | 'components' | 'motion' | 'typography' | 'tokens' | 'layout' | 'svg';

export interface LabExperimentMeta {
  id: string;
  number: string;
  category: LabCategory;
  accentColor: string;
  title: { es: string; en: string };
  tagline: { es: string; en: string };
  description: { es: string; en: string };
  tech: string[];
}

export const LAB_EXPERIMENTS: LabExperimentMeta[] = [
  {
    id: 'button-builder',
    number: '01',
    category: 'components',
    accentColor: '#FFDE00',
    title: {
      es: 'Brutalist Button Builder',
      en: 'Brutalist Button Builder'
    },
    tagline: {
      es: 'Composición de botones con CSS real',
      en: 'Button composition with live CSS variables'
    },
    description: {
      es: 'Ajustá sombra, grosor de borde, radio y color para componer un botón editorial neobrutalista con CSS nativo exportable.',
      en: 'Adjust shadow offset, border width, corner radius and color to compose an editorial neobrutalist button with exportable CSS.'
    },
    tech: ['CSS Variables', 'React 19', 'WCAG AA']
  },
  {
    id: 'spring-physics',
    number: '02',
    category: 'motion',
    accentColor: '#4ECDC4',
    title: {
      es: 'Spring Physics Playground',
      en: 'Spring Physics Playground'
    },
    tagline: {
      es: 'Física de resortes con Motion',
      en: 'Real spring dynamics with Motion'
    },
    description: {
      es: 'Explorá tensión, fricción y masa en tiempo real. Comprendé cómo la masa genera inercia y cómo el damping amortigua el movimiento.',
      en: 'Explore stiffness, damping and mass in real-time. Understand how mass adds inertia and damping settles oscillation.'
    },
    tech: ['Motion', 'Spring Dynamics', 'Prefers Reduced Motion']
  },
  {
    id: 'typography',
    number: '03',
    category: 'typography',
    accentColor: '#FF70A6',
    title: {
      es: 'Typography Playground',
      en: 'Typography Playground'
    },
    tagline: {
      es: 'Space Grotesk & Space Mono en vivo',
      en: 'Live Space Grotesk & Space Mono scaling'
    },
    description: {
      es: 'Calibrá tamaños, pesos, interlineado y tracking sobre las fuentes oficiales del portafolio con respuesta elástica.',
      en: 'Calibrate font sizes, weights, line heights and tracking across the portfolio fonts with responsive reflow.'
    },
    tech: ['CSS Typography', 'Space Grotesk', 'Space Mono']
  },
  {
    id: 'design-tokens',
    number: '04',
    category: 'tokens',
    accentColor: '#FFDE00',
    title: {
      es: 'Interactive Design Tokens',
      en: 'Interactive Design Tokens'
    },
    tagline: {
      es: 'Variables CSS y contraste WCAG',
      en: 'Scoped CSS tokens and live WCAG contrast'
    },
    description: {
      es: 'Modificá la paleta, bordes y espaciados de un componente contenido con cálculo automático de ratio de contraste WCAG AA.',
      en: 'Tweak palette, borders and spacing inside a scoped component with live WCAG AA contrast ratio calculations.'
    },
    tech: ['Scoped Tokens', 'WCAG 2.2 AA', 'Luminance Engine']
  },
  {
    id: 'layout-animation',
    number: '05',
    category: 'layout',
    accentColor: '#4ECDC4',
    title: {
      es: 'Layout Animation Playground',
      en: 'Layout Animation Playground'
    },
    tagline: {
      es: 'Transiciones de layout FLIP',
      en: 'FLIP layout transitions with Motion'
    },
    description: {
      es: 'Alterná entre cuadrícula y lista o reordená tarjetas interactivas sin saltos de renderizado preservando el orden en el DOM.',
      en: 'Toggle between grid and list or reorder interactive cards with seamless layout transitions and accessible DOM ordering.'
    },
    tech: ['Motion Layout', 'FLIP Technique', 'Keyboard Accessible']
  },
  {
    id: 'svg-animation',
    number: '06',
    category: 'svg',
    accentColor: '#FF6B6B',
    title: {
      es: 'SVG Animation Playground',
      en: 'SVG Animation Playground'
    },
    tagline: {
      es: 'Dibujo vectorial procedural',
      en: 'Interactive procedural vector paths'
    },
    description: {
      es: 'Controlá la duración, grosor de trazo y reproducción de una composición vectorial geométrica original con alternativa estática accesible.',
      en: 'Control duration, stroke width and progress of an original geometric vector artwork with an accessible static fallback.'
    },
    tech: ['Native SVG', 'Path Drawing', 'Accessible Vectors']
  }
];

// --- Experiment 01: Button Builder Types & Defaults ---
export interface ButtonBuilderConfig {
  backgroundColor: string;
  textColor: string;
  borderWidth: number;
  borderRadius: number;
  shadowOffset: number;
  hoverDisplacement: number;
  label: string;
}

export const BUTTON_BUILDER_DEFAULTS: ButtonBuilderConfig = {
  backgroundColor: '#FFDE00',
  textColor: '#000000',
  borderWidth: 3,
  borderRadius: 0,
  shadowOffset: 4,
  hoverDisplacement: 2,
  label: 'PULSAR AQUÍ'
};

export const BUTTON_PALETTE = [
  { label: 'Amarillo / Yellow', hex: '#FFDE00' },
  { label: 'Menta / Mint', hex: '#4ECDC4' },
  { label: 'Coral / Coral', hex: '#FF6B6B' },
  { label: 'Rosa / Pink', hex: '#FF70A6' },
  { label: 'Blanco / White', hex: '#FFFFFF' },
  { label: 'Negro / Black', hex: '#000000' }
];

export const BUTTON_TEXT_PALETTE = [
  { label: 'Negro / Black', hex: '#000000' },
  { label: 'Blanco / White', hex: '#FFFFFF' },
  { label: 'Amarillo / Yellow', hex: '#FFDE00' }
];

// --- Experiment 02: Spring Physics Types & Defaults ---
export interface SpringPhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export const SPRING_PHYSICS_DEFAULTS: SpringPhysicsConfig = {
  stiffness: 200,
  damping: 15,
  mass: 1.0
};

// --- Experiment 03: Typography Types & Defaults ---
export interface TypographyConfig {
  fontFamily: 'Space Grotesk' | 'Space Mono';
  fontSize: number;
  fontWeight: 400 | 500 | 600 | 700;
  lineHeight: number;
  letterSpacing: number;
  textTransform: 'none' | 'uppercase' | 'lowercase';
  sampleText: string;
}

export const TYPOGRAPHY_DEFAULTS: TypographyConfig = {
  fontFamily: 'Space Grotesk',
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: 0,
  textTransform: 'uppercase',
  sampleText: 'EDITORIAL NEO-BRUTALISM'
};

// --- Experiment 04: Design Tokens Types & Defaults ---
export interface DesignTokensConfig {
  accentColor: string;
  surfaceColor: string;
  inkColor: string;
  borderWidth: number;
  spacingBase: number;
  shadowOffset: number;
}

export const DESIGN_TOKENS_DEFAULTS: DesignTokensConfig = {
  accentColor: '#FFDE00',
  surfaceColor: '#F8F8F6',
  inkColor: '#000000',
  borderWidth: 3,
  spacingBase: 8,
  shadowOffset: 4
};

// --- Experiment 05: Layout Animation Types & Defaults ---
export interface LayoutItem {
  id: string;
  index: string;
  title: { es: string; en: string };
  category: 'mobile' | 'web' | 'systems';
  tag: string;
}

export const LAYOUT_ITEMS: LayoutItem[] = [
  {
    id: 'card-1',
    index: '01',
    title: { es: 'Motor de Gestos Táctiles', en: 'Touch Gesture Engine' },
    category: 'mobile',
    tag: 'SwiftUI'
  },
  {
    id: 'card-2',
    index: '02',
    title: { es: 'Canal de Render FLIP', en: 'FLIP Render Pipeline' },
    category: 'web',
    tag: 'Motion'
  },
  {
    id: 'card-3',
    index: '03',
    title: { es: 'Tokens de Color Dinámicos', en: 'Dynamic Color Tokens' },
    category: 'systems',
    tag: 'CSS Engine'
  },
  {
    id: 'card-4',
    index: '04',
    title: { es: 'Sincronización Fuera de Línea', en: 'Offline Data Sync' },
    category: 'mobile',
    tag: 'Flutter'
  },
  {
    id: 'card-5',
    index: '05',
    title: { es: 'Árbol de Accesibilidad AOM', en: 'AOM Accessibility Tree' },
    category: 'web',
    tag: 'WCAG 2.2'
  },
  {
    id: 'card-6',
    index: '06',
    title: { es: 'Trazos Vectoriales Reactivos', en: 'Reactive Vector Paths' },
    category: 'systems',
    tag: 'SVG'
  }
];

// --- Experiment 06: SVG Animation Types & Defaults ---
export interface SvgAnimationConfig {
  duration: number;
  strokeWidth: number;
  strokeColor: string;
  isPaused: boolean;
  progress: number;
}

export const SVG_ANIMATION_DEFAULTS: SvgAnimationConfig = {
  duration: 3.0,
  strokeWidth: 3,
  strokeColor: '#000000',
  isPaused: false,
  progress: 100
};

// --- Pure Helper Functions ---

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates WCAG 2.2 relative luminance from 3 or 6 digit hex.
 * Spec: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function calculateRelativeLuminance(hex: string): number {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleanHex.length !== 6) {
    return 0;
  }

  const rInt = parseInt(cleanHex.substring(0, 2), 16);
  const gInt = parseInt(cleanHex.substring(2, 4), 16);
  const bInt = parseInt(cleanHex.substring(4, 6), 16);

  const [r, g, b] = [rInt, gInt, bInt].map((v) => {
    const sRGB = v / 255;
    return sRGB <= 0.04045
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates WCAG contrast ratio between two hex colors.
 * Returns ratio from 1.0 to 21.0.
 */
export function calculateContrastRatio(
  foregroundHex: string,
  backgroundHex: string
): number {
  const l1 = calculateRelativeLuminance(foregroundHex);
  const l2 = calculateRelativeLuminance(backgroundHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export interface WcagStatus {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
}

export function getWcagStatus(ratio: number): WcagStatus {
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;

  let level: WcagStatus['level'] = 'Fail';
  if (aaaNormal) level = 'AAA';
  else if (aaNormal) level = 'AA';
  else if (aaLarge) level = 'AA Large';

  return { ratio, aaNormal, aaLarge, aaaNormal, level };
}

// --- CSS Snippet Generators ---

export function generateButtonCss(config: ButtonBuilderConfig): string {
  const {
    backgroundColor,
    textColor,
    borderWidth,
    borderRadius,
    shadowOffset,
    hoverDisplacement
  } = config;

  return `.brutalist-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background-color: ${backgroundColor};
  color: ${textColor};
  font-family: var(--font-space-grotesk), sans-serif;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: ${borderWidth}px solid #000000;
  border-radius: ${borderRadius}px;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px #000000;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.brutalist-button:hover {
  transform: translate(-${hoverDisplacement}px, -${hoverDisplacement}px);
  box-shadow: ${shadowOffset + hoverDisplacement}px ${shadowOffset + hoverDisplacement}px 0px #000000;
}

.brutalist-button:active {
  transform: translate(${shadowOffset}px, ${shadowOffset}px);
  box-shadow: 0px 0px 0px #000000;
}`;
}

export function generateTypographyCss(config: TypographyConfig): string {
  const fontVar =
    config.fontFamily === 'Space Mono'
      ? 'var(--font-space-mono), monospace'
      : 'var(--font-space-grotesk), sans-serif';

  return `.editorial-type {
  font-family: ${fontVar};
  font-size: ${config.fontSize}px;
  font-weight: ${config.fontWeight};
  line-height: ${config.lineHeight};
  letter-spacing: ${config.letterSpacing}px;
  text-transform: ${config.textTransform};
  color: #000000;
  word-break: break-word;
}`;
}

export function generateTokensCss(config: DesignTokensConfig): string {
  return `:root {
  --token-accent: ${config.accentColor};
  --token-surface: ${config.surfaceColor};
  --token-ink: ${config.inkColor};
  --token-border-width: ${config.borderWidth}px;
  --token-spacing-base: ${config.spacingBase}px;
  --token-shadow-offset: ${config.shadowOffset}px;
  --token-border: var(--token-border-width) solid var(--token-ink);
  --token-shadow: var(--token-shadow-offset) var(--token-shadow-offset) 0px var(--token-ink);
}`;
}

export function generateMotionSpringSnippet(
  config: SpringPhysicsConfig
): string {
  return `import { motion } from 'motion/react';

export function SpringBox() {
  return (
    <motion.div
      animate={{ scale: [1, 1.25, 1], rotate: [0, 6, -6, 0] }}
      transition={{
        type: 'spring',
        stiffness: ${config.stiffness},
        damping: ${config.damping},
        mass: ${config.mass}
      }}
      className="spring-target"
    />
  );
}`;
}

export function generateMotionLayoutSnippet(mode: 'grid' | 'list'): string {
  const isGridDefault = mode === 'grid';
  return `import { motion } from 'motion/react';

export function AnimatedList({ items, isGrid = ${isGridDefault} }: { items: Item[]; isGrid?: boolean }) {
  return (
    <motion.ul layout className={isGrid ? 'grid-view' : 'list-view'}>
      {items.map((item) => (
        <motion.li
          key={item.id}
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          {item.title}
        </motion.li>
      ))}
    </motion.ul>
  );
}`;
}

export function generateSvgSnippet(config: SvgAnimationConfig): string {
  return `<svg viewBox="0 0 400 300" className="animated-vector" aria-labelledby="svg-title svg-desc">
  <title id="svg-title">Composición Geométrica Neobrutalista</title>
  <desc id="svg-desc">Arte vectorial interactivo con trazos animados y geometría precisa.</desc>
  <path
    d="M 50 150 Q 200 20 350 150 T 50 150"
    fill="none"
    stroke="${config.strokeColor}"
    strokeWidth="${config.strokeWidth}"
    strokeDasharray="1000"
    style={{
      animation: 'dash ${config.duration}s cubic-bezier(0.65, 0, 0.35, 1) infinite alternate'
    }}
  />
</svg>`;
}
