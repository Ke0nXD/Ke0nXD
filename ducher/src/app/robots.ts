import type { MetadataRoute } from 'next';

import { brand } from '@/content/business';
import { isIndexable } from '@/lib/site-env';

export default function robots(): MetadataRoute.Robots {
  // Enquanto o conteúdo for provisório, bloqueia tudo.
  if (!isIndexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
    host: brand.siteUrl,
  };
}
