import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getValidatedSiteUrl,
  getSiteUrlString,
  resolveSiteUrl,
  isPublicOriginConfigured
} from './site-url';
import robots from '@/app/robots';
import sitemap, { SITEMAP_RELEASE_DATE } from '@/app/sitemap';

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
    const resolution = resolveSiteUrl();
    expect(resolution.origin).toBe('https://lucianonicolini.dev');
    expect(resolution.isConfigured).toBe(true);
    expect(resolution.source).toBe('NEXT_PUBLIC_SITE_URL');
    expect(getSiteUrlString()).toBe('https://lucianonicolini.dev');
    expect(isPublicOriginConfigured()).toBe(true);

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'lucianonicolini.dev');
    const urlNoProtocol = getValidatedSiteUrl();
    expect(urlNoProtocol.origin).toBe('https://lucianonicolini.dev');
  });

  it('falls back to hosting platform variables if NEXT_PUBLIC_SITE_URL is absent', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    // Vercel project production domain
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'portfolio.vercel.app');
    const resVercelProd = resolveSiteUrl();
    expect(resVercelProd.origin).toBe('https://portfolio.vercel.app');
    expect(resVercelProd.source).toBe('VERCEL_PROJECT_PRODUCTION_URL');
    expect(resVercelProd.isConfigured).toBe(true);

    // Vercel deployment preview domain
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    vi.stubEnv('VERCEL_URL', 'portfolio-preview-123.vercel.app');
    const resVercelPreview = resolveSiteUrl();
    expect(resVercelPreview.origin).toBe(
      'https://portfolio-preview-123.vercel.app'
    );
    expect(resVercelPreview.source).toBe('VERCEL_URL');
    expect(resVercelPreview.isConfigured).toBe(true);

    // Cloudflare Pages domain
    delete process.env.VERCEL_URL;
    vi.stubEnv('CF_PAGES_URL', 'portfolio.pages.dev');
    const resCf = resolveSiteUrl();
    expect(resCf.origin).toBe('https://portfolio.pages.dev');
    expect(resCf.source).toBe('CF_PAGES_URL');
    expect(resCf.isConfigured).toBe(true);

    // Netlify URL
    delete process.env.CF_PAGES_URL;
    vi.stubEnv('URL', 'portfolio.netlify.app');
    const resNetlify = resolveSiteUrl();
    expect(resNetlify.origin).toBe('https://portfolio.netlify.app');
    expect(resNetlify.source).toBe('URL');
    expect(resNetlify.isConfigured).toBe(true);
  });

  it('safely rejects non-HTTP protocols, invalid characters, and spaces', () => {
    // Non-HTTP protocols
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'javascript:alert(1)');
    expect(resolveSiteUrl().source).toBe('LOCAL_FALLBACK');

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'data:text/html;base64,PHNjcmlwdD4=');
    expect(resolveSiteUrl().source).toBe('LOCAL_FALLBACK');

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'ftp://ftp.example.com');
    expect(resolveSiteUrl().source).toBe('LOCAL_FALLBACK');

    // Hostnames with invalid characters or spaces
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://bad domain.com');
    expect(resolveSiteUrl().source).toBe('LOCAL_FALLBACK');

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '   ');
    expect(resolveSiteUrl().source).toBe('LOCAL_FALLBACK');
  });

  it('safely falls back to localhost during development or tests', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
    delete process.env.CF_PAGES_URL;
    delete process.env.URL;

    vi.stubEnv('NODE_ENV', 'development');
    const resolution = resolveSiteUrl();
    expect(resolution.origin).toBe('http://localhost:3000');
    expect(resolution.isConfigured).toBe(false);
    expect(resolution.source).toBe('LOCAL_FALLBACK');
    expect(isPublicOriginConfigured()).toBe(false);
  });

  it('rejects localhost in release production builds without configured domain and logs release blocker notice', () => {
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

    const resolution = resolveSiteUrl();
    expect(resolution.origin).toBe('http://localhost:3000');
    expect(resolution.isConfigured).toBe(false);
    expect(resolution.source).toBe('UNCONFIGURED_PRODUCTION');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[RELEASE BLOCKER] Production deployment requires a verified public origin'
      )
    );

    // Also verify that explicit localhost in production is rejected
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000');
    const explicitLocalhost = resolveSiteUrl();
    expect(explicitLocalhost.isConfigured).toBe(false);
    expect(explicitLocalhost.source).toBe('UNCONFIGURED_PRODUCTION');

    warnSpy.mockRestore();
  });

  it('generates robots.txt with disallow for dev design-system preview and links sitemap', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://lucianonicolini.dev';
    const config = robots();

    expect(config.sitemap).toBe('https://lucianonicolini.dev/sitemap.xml');
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    expect(rules[0].disallow).toContain('/*/dev/');
    expect(rules[0].disallow).toContain('/*/dev');
    expect(rules[0].allow).toBe('/');
  });

  it('generates comprehensive sitemap with stable release timestamp, all locales, static routes, and project details', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://lucianonicolini.dev';
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(15);
    expect(SITEMAP_RELEASE_DATE).toBeInstanceOf(Date);

    // Verify all entries use the stable release date timestamp
    for (const entry of entries) {
      expect(entry.lastModified).toEqual(SITEMAP_RELEASE_DATE);
    }

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
