import { TranslationProvider } from '../contexts/TranslationContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { SiteIdentityStructuredData } from '../components/StructuredData'
import { Navigation } from '../components/layout/Navigation'
import { Footer } from '../components/layout/Footer'
import { PortfolioAgent } from '../components/portfolio-agent/PortfolioAgent'
import { SkipLink } from '../components/SkipLink'
import { PageTransition } from '../components/PageTransition'
import { ScrollEnchantment } from '../components/ScrollEnchantment'
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
  themeColor: '#0c0b0a',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://keigominamida.com'),
  title: {
    default: 'Keigo Minamida | HCI Researcher & Creative Technologist',
    template: '%s | Keigo Minamida',
  },
  description: 'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
  keywords: [
    "Keigo Minamida",
    "南田桂吾",
    "みなみだけいご",
    "東京大学",
    "University of Tokyo",
    "Ishiguro Laboratory",
    "石黒研究室",
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
    "UIST",
    "ROTA",
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
    description: "Keigo Minamida (南田桂吾) — Doctoral student at The University of Tokyo. Research in HCI, Augmented Humans, and Computer Vision. Portfolio of projects and creative works.",
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
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#B8A04A' },
    ],
  },
  manifest: '/manifest.json',
  referrer: "strict-origin-when-cross-origin",
  other: {
    "theme-color": "#0C0B0A",
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Keigo Minamida",
    "application-name": "Keigo Minamida Portfolio",
    "msapplication-TileColor": "#0C0B0A",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Theme flash prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured Data */}
        <SiteIdentityStructuredData />

        {/* Additional performance hints */}
        <link
          rel="preload"
          as="image"
          href="/images/agent/portfolio-agent-spritesheet.webp"
          type="image/webp"
        />
        <link rel="prefetch" href="/images/myface.jpg" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${geist.className} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <TranslationProvider>
          <ThemeProvider>
            <div className="min-h-screen overflow-x-hidden bg-[#0C0B0A] text-[#F2EFE9]">
              <SkipLink />
              <ScrollEnchantment />
              <Navigation />
              <main id="main-content" className="relative z-10 pt-[4.25rem] sm:pt-[4.5rem]">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <PortfolioAgent />
            </div>
          </ThemeProvider>
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}
