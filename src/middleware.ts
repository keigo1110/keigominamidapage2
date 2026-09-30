import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  LOCALE_COOKIE,
  isLocalizedPublicPath,
  localeFromPathname,
  localizedPath,
  prefersJapanese,
} from '@/lib/locale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  const locale = localeFromPathname(pathname)
  requestHeaders.set('x-locale', locale)

  const userAgent = request.headers.get('user-agent') ?? ''
  const isBot = /bot|crawler|spider|slurp|facebookexternalhit|whatsapp|telegram|embedly|lighthouse|gptbot|chatgpt|claude|perplexity|bytespider|semrush|ahrefs/i.test(userAgent)

  if (!isBot && isLocalizedPublicPath(pathname) && locale !== 'ja') {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value
    const preference = saved === 'ja' || saved === 'en' ? saved : null
    const wantJapanese = preference === 'ja' || (preference === null && prefersJapanese(request.headers.get('accept-language')))

    if (wantJapanese) {
      const url = request.nextUrl.clone()
      url.pathname = localizedPath(pathname, 'ja')
      return NextResponse.redirect(url, 302)
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
