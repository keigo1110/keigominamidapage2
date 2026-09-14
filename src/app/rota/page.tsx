import { RotaSection } from '@/components/sections/RotaSection'
import { RotaStructuredData } from '@/components/StructuredData'
import type { Metadata } from 'next'

const BASE_URL = 'https://keigominamida.com'

export const metadata: Metadata = {
  title: 'ROTA',
  description:
    'ROTA is a computational wizard by Keigo Minamida. The name comes from the Latin rotare — to rotate.',
  keywords: [
    'ROTA',
    '計算機魔法使い',
    'computational wizard',
    'Keigo Minamida',
    '南田桂吾',
    'LINE stamp',
    'LINEスタンプ',
  ],
  alternates: { canonical: `${BASE_URL}/rota` },
  openGraph: {
    title: 'ROTA | Keigo Minamida',
    description:
      'Meet ROTA, the computational wizard guiding Keigo Minamida’s portfolio. Named from rotare — to rotate.',
    url: `${BASE_URL}/rota`,
    siteName: 'Keigo Minamida Portfolio',
    type: 'website',
    images: [
      {
        url: '/images/rota/portrait.png',
        width: 960,
        height: 960,
        alt: 'ROTA, computational wizard',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ROTA | Keigo Minamida',
    description: 'Meet ROTA, the computational wizard who guides this portfolio.',
    images: ['/images/rota/portrait.png'],
  },
  robots: { index: true, follow: true },
}

export default function RotaPage() {
  return (
    <>
      <RotaStructuredData />
      <RotaSection />
    </>
  )
}
