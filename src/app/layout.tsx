import { TranslationProvider } from '../contexts/TranslationContext'
import { StructuredData } from '../components/StructuredData'
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://keigominamida.com'),
  title: {
    default: "Keigo Minamida | 南田桂吾",
    template: "%s | Keigo Minamida | 南田桂吾"
  },
  description: "Portfolio of Keigo Minamida (南田桂吾) - A passionate researcher and entrepreneur at The University of Tokyo, pioneering human-robot interaction and real-world object manipulation. Explore cutting-edge research, innovative artworks, and entrepreneurial ventures.",
  keywords: [
    "Keigo Minamida",
    "南田桂吾",
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
    "GUGEN2024"
  ],
  authors: [{
    name: "Keigo Minamida",
    url: "https://keigominamida.com/"
  }],
  creator: "Keigo Minamida",
  publisher: "Keigo Minamida",
  category: "Portfolio",
  classification: "Personal Website",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    title: "Keigo Minamida | 南田桂吾",
    description: "Portfolio of Keigo Minamida (南田桂吾) - A passionate researcher and entrepreneur at The University of Tokyo, pioneering human-robot interaction and real-world object manipulation.",
    siteName: "Keigo Minamida Portfolio",
    url: "https://keigominamida.com/",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Keigo Minamida - Researcher, Entrepreneur & Software Developer"
      },
      {
        url: "/images/myface.jpg",
        width: 400,
        height: 400,
        alt: "Keigo Minamida Profile Photo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keigo Minamida | 南田桂吾",
    description: "Portfolio of Keigo Minamida (南田桂吾) - A passionate researcher and entrepreneur at The University of Tokyo, pioneering human-robot interaction.",
    creator: "@mKeigo1110",
    site: "@mKeigo1110",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://keigominamida.com/",
    languages: {
      'en': 'https://keigominamida.com/',
      'ja': 'https://keigominamida.com/',
    },
  },
  other: {
    "theme-color": "#0f172a",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Keigo Minamida",
    "application-name": "Keigo Minamida Portfolio",
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://keigominamida.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.iii.u-tokyo.ac.jp" />
        <link rel="dns-prefetch" href="//lab.rekimoto.org" />
        <link rel="dns-prefetch" href="//twitter.com" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-slate-900 text-white dark`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}