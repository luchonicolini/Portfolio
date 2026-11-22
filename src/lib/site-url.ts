/**
 * Canonical Site URL Resolution Utility
 *
 * Implements a release-safe domain resolution strategy for metadataBase,
 * canonical links, OpenGraph tags, sitemap.xml, and robots.txt.
 *
 * Environment variable resolution contract:
 * 1. NEXT_PUBLIC_SITE_URL: User-configured canonical URL (e.g., "https://lucianonicolini.dev").
 * 2. VERCEL_PROJECT_PRODUCTION_URL: Automatic Vercel production domain.
 * 3. VERCEL_URL: Automatic Vercel deployment preview domain.
 * 4. CF_PAGES_URL: Cloudflare Pages deployment domain.
 * 5. URL: Netlify production URL.
 *
 * Safety & Release constraints:
 * - Malformed strings or non-HTTP protocols (javascript:, ftp:, data:) are strictly rejected.
 * - Localhost / 127.0.0.1 origins are rejected as valid public origins in production mode.
 * - In development and automated test environments (CI, Playwright, Vitest), it safely
 *   falls back to "http://localhost:3000" to allow headless verification without network dependencies.
 * - In unconfigured production builds, it reports a release blocker notice.
 */

export interface SiteUrlResolution {
  url: URL;
  origin: string;
  isConfigured: boolean;
  source:
    | 'NEXT_PUBLIC_SITE_URL'
    | 'VERCEL_PROJECT_PRODUCTION_URL'
    | 'VERCEL_URL'
    | 'CF_PAGES_URL'
    | 'URL'
    | 'LOCAL_FALLBACK'
    | 'UNCONFIGURED_PRODUCTION';
}

function sanitizeUrl(raw: unknown): URL | null {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Reject non-HTTP protocols (e.g. javascript:, ftp:, data:)
  if (
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) &&
    !/^https?:\/\//i.test(trimmed)
  ) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    // Reject invalid hostnames, empty hosts, or hostnames containing spaces
    if (!parsed.hostname || parsed.hostname.includes(' ')) {
      return null;
    }

    // In production builds outside test runners, reject localhost/loopback as public origin
    const isTestEnv =
      Boolean(process.env.CI) ||
      Boolean(process.env.PLAYWRIGHT) ||
      Boolean(process.env.VITEST);

    if (
      process.env.NODE_ENV === 'production' &&
      !isTestEnv &&
      (parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '0.0.0.0')
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function resolveSiteUrl(): SiteUrlResolution {
  // 1. Explicit user-configured canonical URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const parsed = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
    if (parsed) {
      return {
        url: parsed,
        origin: parsed.origin,
        isConfigured: true,
        source: 'NEXT_PUBLIC_SITE_URL'
      };
    }
  }

  // 2. Verified Vercel production domain
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const parsed = sanitizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    if (parsed) {
      return {
        url: parsed,
        origin: parsed.origin,
        isConfigured: true,
        source: 'VERCEL_PROJECT_PRODUCTION_URL'
      };
    }
  }

  // 3. Vercel deployment preview domain
  if (process.env.VERCEL_URL) {
    const parsed = sanitizeUrl(process.env.VERCEL_URL);
    if (parsed) {
      return {
        url: parsed,
        origin: parsed.origin,
        isConfigured: true,
        source: 'VERCEL_URL'
      };
    }
  }

  // 4. Other hosting platforms (Cloudflare Pages, Netlify)
  if (process.env.CF_PAGES_URL) {
    const parsed = sanitizeUrl(process.env.CF_PAGES_URL);
    if (parsed) {
      return {
        url: parsed,
        origin: parsed.origin,
        isConfigured: true,
        source: 'CF_PAGES_URL'
      };
    }
  }

  if (process.env.URL) {
    const parsed = sanitizeUrl(process.env.URL);
    if (parsed) {
      return {
        url: parsed,
        origin: parsed.origin,
        isConfigured: true,
        source: 'URL'
      };
    }
  }

  // 5. Local development or test runner fallback
  const isDevOrTest =
    process.env.NODE_ENV !== 'production' ||
    Boolean(process.env.CI) ||
    Boolean(process.env.PLAYWRIGHT) ||
    Boolean(process.env.VITEST);

  if (isDevOrTest) {
    const fallback = new URL('http://localhost:3000');
    return {
      url: fallback,
      origin: fallback.origin,
      isConfigured: false,
      source: 'LOCAL_FALLBACK'
    };
  }

  // 6. Unconfigured production release build
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(
      '[RELEASE BLOCKER] Production deployment requires a verified public origin via NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL. Localhost fallback must not be published to production.'
    );
  }

  const unconfigured = new URL('http://localhost:3000');
  return {
    url: unconfigured,
    origin: unconfigured.origin,
    isConfigured: false,
    source: 'UNCONFIGURED_PRODUCTION'
  };
}

export function getValidatedSiteUrl(): URL {
  return resolveSiteUrl().url;
}

export function getSiteUrlString(): string {
  return resolveSiteUrl().origin;
}

export function isPublicOriginConfigured(): boolean {
  return resolveSiteUrl().isConfigured;
}
