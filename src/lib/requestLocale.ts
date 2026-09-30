import { headers } from 'next/headers'
import type { Locale } from '@/lib/locale'

export async function getRequestLocale(): Promise<Locale> {
  const headerList = await headers()
  return headerList.get('x-locale') === 'ja' ? 'ja' : 'en'
}
