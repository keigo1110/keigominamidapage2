import type { MetadataRoute } from 'next'
import { localizedPath } from '@/lib/locale'
import { SITE_URL } from '@/data/site'

const paths = ['/', '/artwork', '/startup', '/experience', '/rota'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()

  return paths.flatMap((path) => {
    const enPath = path
    const jaPath = localizedPath(path, 'ja')
    const languages = {
      en: enPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${enPath}`,
      ja: `${SITE_URL}${jaPath}`,
      'x-default': enPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${enPath}`,
    }

    return (['en', 'ja'] as const).map((locale) => {
      const urlPath = locale === 'en' ? enPath : jaPath
      return {
        url: urlPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${urlPath}`,
        lastModified,
        changeFrequency: path === '/' ? 'weekly' as const : 'monthly' as const,
        priority: path === '/' ? 1 : path === '/rota' ? 0.7 : 0.9,
        alternates: { languages },
      }
    })
  })
}
