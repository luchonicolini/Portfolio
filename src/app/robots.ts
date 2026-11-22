import type { MetadataRoute } from 'next';
import { getSiteUrlString } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrlString();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/dev/', '/*/dev']
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
