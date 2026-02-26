import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/.next/', '/_next/static/'],
      },
    ],
    sitemap: 'https://keigominamida.com/sitemap.xml',
  }
}
