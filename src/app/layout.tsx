import { TranslationProvider } from '../contexts/TranslationContext'
import { StructuredData } from '../components/StructuredData'
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://keigominamida.com'),
  title: 'Keigo Minamida | HCI Researcher & Creative Technologist',
  description: 'Keigo Minamida (南田桂吾, みなみだけいご, けいごみなみだ) is a Master\'s student at The University of Tokyo, specializing in Human-Computer Interaction, Augmented Humans, AI, and Computer Vision. Explore his research projects, creative works, and innovative solutions.',
  keywords: [
    "Keigo Minamida",
    "南田桂吾",
    "みなみだけいご",
    "けいごみなみだ",
    "University of Tokyo",
    "Rekimoto Lab",
    "human-robot interaction",
    "computer vision",
    "machine learning",
    "augmented reality",
    "researcher",
    "entrepreneur",
    "software developer",
    "portfolio",
    "ポートフォリオ",
    "研究者",
    "起業家",
    "ソフトウェア開発者",
    "東京大学",
    "暦本研究室",
    "SIGGRAPH Asia",
    "Gaussian Splatting",
    "IoT",
    "bicycle safety",
    "interactive art",
    "GUGEN2024",
    "HCI",
    "Human-Computer Interaction",
    "Augmented Humans",
    "AI",
    "Research",
    "Creative Technology",
    "Portfolio"
  ],
  authors: [{
    name: "Keigo Minamida",
    url: "https://keigominamida.com/"
  }],
  creator: "Keigo Minamida",
  publisher: "Keigo Minamida",
  category: "technology",
  classification: "portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    title: "Keigo Minamida | HCI Researcher & Creative Technologist",
    description: "Explore the innovative research and creative works of Keigo Minamida, specializing in Human-Computer Interaction and Augmented Humans at The University of Tokyo.",
    siteName: "Keigo Minamida Portfolio",
    url: "https://keigominamida.com/",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Keigo Minamida Portfolio - HCI Research and Creative Technology",
        type: "image/jpeg"
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Keigo Minamida Profile",
        type: "image/jpeg"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keigo Minamida | HCI Researcher & Creative Technologist",
    description: "Innovative research in Human-Computer Interaction and Augmented Humans at The University of Tokyo.",
    creator: "@keigominamida",
    site: "@keigominamida",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'ja': '/ja',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#8b5cf6' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    "theme-color": "#0f172a",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Keigo Minamida",
    "application-name": "Keigo Minamida Portfolio",
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured Data */}
        <StructuredData />

        {/* Additional performance hints */}
        <link rel="prefetch" href="/images/myface.jpg" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} ${geistMono.variable} font-sans antialiased bg-slate-900 text-white dark`} suppressHydrationWarning>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}