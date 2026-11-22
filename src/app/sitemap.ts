import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProjects } from '@/data/projects';
import { getSiteUrlString } from '@/lib/site-url';

/**
 * Stable release date timestamp to avoid unnecessary re-crawling on every build.
 * Update this timestamp when publishing a new version or content release.
 */
export const SITEMAP_RELEASE_DATE = new Date('2026-11-21T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrlString();
  const projects = getAllProjects();

  const staticPages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/work', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/lab', changeFrequency: 'weekly' as const, priority: 0.8 }
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static routes for each locale
  for (const page of staticPages) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page.path}`,
        lastModified: SITEMAP_RELEASE_DATE,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            es: `${siteUrl}/es${page.path}`,
            en: `${siteUrl}/en${page.path}`
          }
        }
      });
    }
  }

  // Dynamic project routes for each locale
  for (const project of projects) {
    for (const locale of routing.locales) {
      const projectPath = `/work/${project.slug}`;
      entries.push({
        url: `${siteUrl}/${locale}${projectPath}`,
        lastModified: SITEMAP_RELEASE_DATE,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            es: `${siteUrl}/es${projectPath}`,
            en: `${siteUrl}/en${projectPath}`
          }
        }
      });
    }
  }

  return entries;
}
