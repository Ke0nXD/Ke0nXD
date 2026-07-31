import type { MetadataRoute } from 'next';

import { brand } from '@/content/business';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: brand.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
