import { RefinedStartupSection } from '@/components/sections/RefinedStartupSection'
import type { Metadata } from 'next'

const BASE_URL = 'https://keigominamida.com'

export const metadata: Metadata = {
  title: 'Startup',
  description:
    'Wakabar — bicycle safety startup by Keigo Minamida. IoT and location-based alerts to prevent accidents. Partner with local governments; try the app.',
  alternates: { canonical: `${BASE_URL}/startup` },
  openGraph: {
    title: 'Startup | Keigo Minamida',
    description: 'Wakabar: bicycle safety startup using IoT. Prevent accidents with location-based alerts. Try the app.',
    url: `${BASE_URL}/startup`,
    siteName: 'Keigo Minamida Portfolio',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Keigo Minamida Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup | Keigo Minamida',
    description: 'Wakabar — bicycle safety startup by Keigo Minamida. IoT and location-based accident prevention.',
  },
  robots: { index: true, follow: true },
}

export default function StartupPage() {
  return <RefinedStartupSection />;
}
