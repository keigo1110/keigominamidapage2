import { TranslationProvider } from '../contexts/TranslationContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { StructuredData } from '../components/StructuredData'
import { Navigation } from '../components/layout/Navigation'
import { Footer } from '../components/layout/Footer'
import { SkipLink } from '../components/SkipLink'
import { PageTransition } from '../components/PageTransition'
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
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
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://keigominamida.com'),
  title: {
    default: 'Keigo Minamida | HCI Researcher & Creative Technologist',
    template: '%s | Keigo Minamida',
  },
  description: 'Keigo Minamida (南田桂吾) is a Master\'s student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
  keywords: [
    "Keigo Minamida",
    "南田桂吾",
    "みなみだけいご",
    "東京大学",
    "University of Tokyo",
    "Rekimoto Lab",
    "暦本研究室",
    "HCI",
    "Human-Computer Interaction",
    "Augmented Humans",
    "computer vision",
    "machine learning",
    "researcher",
    "entrepreneur",
    "portfolio",
    "SIGGRAPH Asia",
    "Gaussian Splatting",
    "Wakabar",
    "4ZIGEN",
    "interactive art",
    "GUGEN2024",
  ],
  authors: [{ name: "Keigo Minamida", url: "https://keigominamida.com/" }],
  creator: "Keigo Minamida",
  publisher: "Keigo Minamida",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    title: "Keigo Minamida | HCI Researcher & Creative Technologist",
    description: "Keigo Minamida (南田桂吾) — Master's student at The University of Tokyo. Research in HCI, Augmented Humans, and Computer Vision. Portfolio of projects and creative works.",
    siteName: "Keigo Minamida Portfolio",
    url: "https://keigominamida.com/",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Keigo Minamida Portfolio - HCI Research and Creative Technology",
        type: "image/jpeg",
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Keigo Minamida Profile",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keigo Minamida | HCI Researcher & Creative Technologist",
    description: "Researcher at The University of Tokyo. HCI, Augmented Humans, Computer Vision. Portfolio and projects.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "/",
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
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0071E3' },
    ],
  },
  manifest: '/manifest.json',
  referrer: "strict-origin-when-cross-origin",
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Keigo Minamida",
    "application-name": "Keigo Minamida Portfolio",
    "msapplication-TileColor": "#0071E3",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Theme flash prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (!theme && systemDark) || (theme === 'system' && systemDark);
                  document.documentElement.classList.add(isDark ? 'dark' : 'light');
                } catch(e) {}
              })();
            `,
          }}
        />

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
      <body className={`${geist.className} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <TranslationProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-hidden transition-colors duration-500">
              <SkipLink />
              <Navigation />
              <main id="main-content" className="pt-20 relative z-10">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}
