/**
 * Canonical Site URL Resolution Utility
 *
 * Implements a robust domain resolution strategy for metadataBase,
 * canonical links, OpenGraph tags, sitemap.xml, and robots.txt.
 *
 * Environment variable contract:
 * 1. NEXT_PUBLIC_SITE_URL: User-configured canonical URL (e.g., "https://lucianonicolini.dev").
 * 2. VERCEL_PROJECT_PRODUCTION_URL: Automatic Vercel production domain.
 * 3. VERCEL_URL: Automatic Vercel preview/deployment domain.
 * 4. CF_PAGES_URL: Cloudflare Pages deployment domain.
 * 5. URL: Netlify production URL.
 */

function sanitizeUrl(raw: string): URL | null {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (parsed.hostname) {
      return parsed;
    }
  } catch {
    // Malformed URL string
  }
  return null;
}

export function getValidatedSiteUrl(): URL {
  // 1. Explicit user-configured canonical URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const parsed = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
    if (parsed) return parsed;
  }

  // 2. Hosting platform deployment variables
  const platformUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    process.env.CF_PAGES_URL ||
    process.env.URL;

  if (platformUrl) {
    const parsed = sanitizeUrl(platformUrl);
    if (parsed) return parsed;
  }

  // 3. Fallback for local development, CI, and unconfigured release builds
  if (
    process.env.NODE_ENV === 'production' &&
    !process.env.CI &&
    !process.env.PLAYWRIGHT &&
    !process.env.VITEST
  ) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(
        '[SEO NOTICE] NEXT_PUBLIC_SITE_URL is not configured in production. Defaulting canonical base to http://localhost:3000. Set NEXT_PUBLIC_SITE_URL before public release.'
      );
    }
  }

  return new URL('http://localhost:3000');
}

export function getSiteUrlString(): string {
  const url = getValidatedSiteUrl();
  return url.origin;
}
