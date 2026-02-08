import type { MetadataRoute } from 'next'

const BASE_URL = 'https://keigominamida.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/artwork`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/startup`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
