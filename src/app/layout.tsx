import { TranslationProvider } from '../contexts/TranslationContext'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Keigo Minamida | 南田桂吾 - Portfolio",
  description: "Welcome to Keigo Minamida (南田桂吾)'s portfolio website. Explore my work, projects, and professional experience. ポートフォリオサイトへようこそ。",
  keywords: [
    "Keigo Minamida",
    "南田桂吾",
    "portfolio",
    "ポートフォリオ",
    "web developer",
    "software engineer",
    "researcher",
    "ウェブ開発者",
    "ソフトウェアエンジニア",
    "研究者",
  ],
  authors: [{ name: "Keigo Minamida", url: "https://your-domain.com" }],
  creator: "Keigo Minamida",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
    title: "Keigo Minamida | 南田桂吾 - Portfolio",
    description: "Welcome to Keigo Minamida (南田桂吾)'s portfolio website. Explore my work, projects, and professional experience. ポートフォリオサイトへようこそ。",
    siteName: "Keigo Minamida Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keigo Minamida | 南田桂吾 - Portfolio",
    description: "Welcome to Keigo Minamida (南田桂吾)'s portfolio website. Explore my work, projects, and professional experience.",
    creator: "@YourTwitterHandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    languages: {
      'en-US': '/en',
      'ja-JP': '/ja',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}