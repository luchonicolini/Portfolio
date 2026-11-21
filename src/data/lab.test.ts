import { describe, it, expect } from 'vitest';
import {
  clamp,
  calculateRelativeLuminance,
  calculateContrastRatio,
  getWcagStatus,
  generateButtonCss,
  generateTypographyCss,
  generateTokensCss,
  generateMotionSpringSnippet,
  generateMotionLayoutSnippet,
  generateSvgSnippet,
  BUTTON_BUILDER_DEFAULTS,
  SPRING_PHYSICS_DEFAULTS,
  TYPOGRAPHY_DEFAULTS,
  DESIGN_TOKENS_DEFAULTS,
  SVG_ANIMATION_DEFAULTS,
  LAB_EXPERIMENTS
} from './lab';

describe('Developer Lab Data & Calculations', () => {
  describe('clamp utility', () => {
    it('clamps values below minimum', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('clamps values above maximum', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('preserves values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('handles NaN gracefully by returning minimum', () => {
      expect(clamp(NaN, 0, 10)).toBe(0);
    });
  });

  describe('Relative Luminance & WCAG Contrast Ratio', () => {
    it('calculates white luminance as 1.0', () => {
      expect(calculateRelativeLuminance('#FFFFFF')).toBeCloseTo(1.0, 2);
    });

    it('calculates black luminance as 0.0', () => {
      expect(calculateRelativeLuminance('#000000')).toBe(0);
    });

    it('handles shorthand 3-digit hex codes', () => {
      expect(calculateRelativeLuminance('#FFF')).toBeCloseTo(1.0, 2);
      expect(calculateRelativeLuminance('#000')).toBe(0);
    });

    it('returns maximum 21:1 contrast for black on white', () => {
      const ratio = calculateContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBe(21);
    });

    it('returns minimum 1:1 contrast for identical colors', () => {
      const ratio = calculateContrastRatio('#FFDE00', '#FFDE00');
      expect(ratio).toBe(1);
    });

    it('accurately evaluates portfolio yellow #FFDE00 with black ink', () => {
      const ratio = calculateContrastRatio('#000000', '#FFDE00');
      // Yellow is bright (luminance ~0.76), black is 0 -> ratio > 14:1
      expect(ratio).toBeGreaterThan(12);
      const status = getWcagStatus(ratio);
      expect(status.aaNormal).toBe(true);
      expect(status.level).toBe('AAA');
    });

    it('accurately identifies low contrast failures', () => {
      const ratio = calculateContrastRatio('#FFFFFF', '#FFDE00');
      expect(ratio).toBeLessThan(3.0);
      const status = getWcagStatus(ratio);
      expect(status.aaNormal).toBe(false);
      expect(status.level).toBe('Fail');
    });
  });

  describe('CSS Snippet Generators', () => {
    it('generates valid CSS for Brutalist Button Builder', () => {
      const css = generateButtonCss(BUTTON_BUILDER_DEFAULTS);
      expect(css).toContain('.brutalist-button');
      expect(css).toContain('background-color: #FFDE00');
      expect(css).toContain('border: 3px solid #000000');
      expect(css).toContain('box-shadow: 4px 4px 0px #000000');
      expect(css).toContain('border-radius: 0px');
      expect(css).toContain(':hover');
      expect(css).toContain(':active');
    });

    it('generates valid CSS for Typography Playground', () => {
      const css = generateTypographyCss(TYPOGRAPHY_DEFAULTS);
      expect(css).toContain('.editorial-type');
      expect(css).toContain('font-size: 32px');
      expect(css).toContain('font-weight: 700');
      expect(css).toContain('var(--font-space-grotesk)');
    });

    it('generates valid CSS custom properties for Design Tokens', () => {
      const css = generateTokensCss(DESIGN_TOKENS_DEFAULTS);
      expect(css).toContain(':root');
      expect(css).toContain('--token-accent: #FFDE00');
      expect(css).toContain('--token-surface: #F8F8F6');
      expect(css).toContain('--token-ink: #000000');
      expect(css).toContain('--token-border-width: 3px');
      expect(css).toContain('--token-spacing-base: 8px');
      expect(css).toContain('--token-shadow-offset: 4px');
    });

    it('generates motion code snippet for spring dynamics', () => {
      const snippet = generateMotionSpringSnippet(SPRING_PHYSICS_DEFAULTS);
      expect(snippet).toContain('stiffness: 200');
      expect(snippet).toContain('damping: 15');
      expect(snippet).toContain('mass: 1');
      expect(snippet).toContain("type: 'spring'");
    });

    it('generates motion code snippet for layout transitions', () => {
      const gridSnippet = generateMotionLayoutSnippet('grid');
      expect(gridSnippet).toContain('layout');
      expect(gridSnippet).toContain('grid-view');

      const listSnippet = generateMotionLayoutSnippet('list');
      expect(listSnippet).toContain('layout');
      expect(listSnippet).toContain('list-view');
    });

    it('generates SVG code snippet with accessible attributes', () => {
      const svg = generateSvgSnippet(SVG_ANIMATION_DEFAULTS);
      expect(svg).toContain('<svg viewBox="0 0 400 300"');
      expect(svg).toContain('aria-labelledby="svg-title svg-desc"');
      expect(svg).toContain('<title id="svg-title">');
      expect(svg).toContain('<desc id="svg-desc">');
      expect(svg).toContain('stroke="#000000"');
      expect(svg).toContain('strokeWidth="3"');
    });
  });

  describe('Inventory & Metadata Integrity', () => {
    it('defines exactly six approved experiments with valid metadata', () => {
      expect(LAB_EXPERIMENTS).toHaveLength(6);
      LAB_EXPERIMENTS.forEach((exp, idx) => {
        expect(exp.id).toBeTruthy();
        expect(exp.number).toBe(`0${idx + 1}`);
        expect(exp.title.es).toBeTruthy();
        expect(exp.title.en).toBeTruthy();
        expect(exp.description.es).toBeTruthy();
        expect(exp.description.en).toBeTruthy();
        expect(exp.tech.length).toBeGreaterThan(0);
      });
    });
  });
});
