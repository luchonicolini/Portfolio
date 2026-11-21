import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getValidatedSiteUrl, getSiteUrlString } from './site-url';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('Site URL Resolution & SEO Routing', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = { ...originalEnv };
  });

  it('resolves explicit NEXT_PUBLIC_SITE_URL with or without protocol', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://lucianonicolini.dev');
    const url = getValidatedSiteUrl();
    expect(url?.origin).toBe('https://lucianonicolini.dev');

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'lucianonicolini.dev');
    const urlNoProtocol = getValidatedSiteUrl();
    expect(urlNoProtocol?.origin).toBe('https://lucianonicolini.dev');
    expect(getSiteUrlString()).toBe('https://lucianonicolini.dev');
  });

  it('falls back to hosting platform variables if NEXT_PUBLIC_SITE_URL is absent', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'portfolio.vercel.app');

    const url = getValidatedSiteUrl();
    expect(url?.origin).toBe('https://portfolio.vercel.app');
  });

  it('safely falls back to localhost during development or tests', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
    delete process.env.CF_PAGES_URL;
    delete process.env.URL;

    vi.stubEnv('NODE_ENV', 'development');
    const url = getValidatedSiteUrl();
    expect(url?.origin).toBe('http://localhost:3000');
  });

  it('falls back to localhost and logs notice in release production builds without configured domain', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
    delete process.env.CF_PAGES_URL;
    delete process.env.URL;
    delete process.env.VITEST;
    delete process.env.PLAYWRIGHT;
    delete process.env.CI;

    vi.stubEnv('NODE_ENV', 'production');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const url = getValidatedSiteUrl();
    expect(url.origin).toBe('http://localhost:3000');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[SEO NOTICE] NEXT_PUBLIC_SITE_URL is not configured'
      )
    );

    warnSpy.mockRestore();
  });

  it('generates robots.txt with disallow for dev design-system preview and links sitemap', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://lucianonicolini.dev';
    const config = robots();

    expect(config.sitemap).toBe('https://lucianonicolini.dev/sitemap.xml');
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    expect(rules[0].disallow).toContain('/*/dev/');
    expect(rules[0].allow).toBe('/');
  });

  it('generates comprehensive sitemap with all locales, static routes, and project details', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://lucianonicolini.dev';
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(15);

    // Verify Home, Work, About, Contact, Lab
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://lucianonicolini.dev/es');
    expect(urls).toContain('https://lucianonicolini.dev/en');
    expect(urls).toContain('https://lucianonicolini.dev/es/work');
    expect(urls).toContain('https://lucianonicolini.dev/es/about');
    expect(urls).toContain('https://lucianonicolini.dev/es/contact');
    expect(urls).toContain('https://lucianonicolini.dev/es/lab');

    // Verify projects are present
    expect(urls).toContain('https://lucianonicolini.dev/es/work/puente');
    expect(urls).toContain('https://lucianonicolini.dev/es/work/stitchhub');

    // Verify alternates languages
    const puenteEntry = entries.find(
      (e) => e.url === 'https://lucianonicolini.dev/es/work/puente'
    );
    expect(puenteEntry?.alternates?.languages?.es).toBe(
      'https://lucianonicolini.dev/es/work/puente'
    );
    expect(puenteEntry?.alternates?.languages?.en).toBe(
      'https://lucianonicolini.dev/en/work/puente'
    );
  });
});
