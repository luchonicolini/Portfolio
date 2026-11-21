import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProjects } from '@/data/projects';
import { getSiteUrlString } from '@/lib/site-url';

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
        lastModified: new Date(),
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
        lastModified: new Date(),
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
