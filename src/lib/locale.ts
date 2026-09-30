export const LOCALE_COOKIE = 'locale'

export type Locale = 'en' | 'ja'

const PUBLIC_PATHS = ['/', '/artwork', '/startup', '/experience', '/rota'] as const

export function localeFromPathname(pathname: string): Locale {
  const path = pathname.split('?')[0]?.split('#')[0] ?? '/'
  return path === '/ja' || path.startsWith('/ja/') ? 'ja' : 'en'
}

export function pathnameWithoutLocale(pathname: string): string {
  const path = pathname.split('?')[0]?.split('#')[0] ?? '/'
  if (path === '/ja') return '/'
  if (path.startsWith('/ja/')) {
    const rest = path.slice(3)
    return rest.startsWith('/') ? rest : `/${rest}`
  }
  return path || '/'
}

export function localizedPath(pathname: string, locale: Locale): string {
  const hashIndex = pathname.indexOf('#')
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : ''
  let bare = pathnameWithoutLocale(pathname)
  if (bare.length > 1 && bare.endsWith('/')) bare = bare.slice(0, -1)
  if (locale === 'en') return `${bare}${hash}`
  if (bare === '/') return `/ja${hash}`
  return `/ja${bare}${hash}`
}

export function isLocalizedPublicPath(pathname: string): boolean {
  const bare = pathnameWithoutLocale(pathname)
  return PUBLIC_PATHS.some((path) => path === bare)
}

export function prefersJapanese(acceptLanguage: string | null): boolean {
  const first = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? ''
  return first === 'ja' || first.startsWith('ja-')
}

export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
}
