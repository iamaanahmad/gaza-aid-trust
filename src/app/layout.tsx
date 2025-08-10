import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import 'mapbox-gl/dist/mapbox-gl.css';
import { PT_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/language-context';
import { LanguageWrapper } from '@/components/layout/LanguageWrapper';
import { OfflineIndicator } from '@/components/OfflineIndicator';

export const metadata: Metadata = {
  title: 'Gaza Aid & Trust: Crisis Connect',
  description:
    'AI-powered triage and medical aid platform for Gaza crisis response. Real-time crisis alerts, medical aid connections, and community-driven trust system.',
  applicationName: 'Gaza Aid',
  authors: [{ name: 'Gaza Aid Team' }],
  generator: 'Next.js',
  keywords: ['gaza', 'aid', 'crisis', 'medical', 'triage', 'humanitarian', 'pwa'],
  referrer: 'origin-when-cross-origin',
  creator: 'Gaza Aid Team',
  publisher: 'Gaza Aid Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://gaza-aid-trust.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gaza-aid-trust.vercel.app',
    siteName: 'Gaza Aid & Trust',
    title: 'Gaza Aid & Trust: Crisis Connect',
    description: 'AI-powered triage and medical aid platform for Gaza crisis response',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Gaza Aid & Trust Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaza Aid & Trust: Crisis Connect',
    description: 'AI-powered triage and medical aid platform for Gaza crisis response',
    images: ['/android-chrome-512x512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Gaza Aid',
    startupImage: [
      {
        url: '/apple-touch-icon.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/android-chrome-192x192.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/android-chrome-512x512.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  category: 'humanitarian',
  classification: 'Medical Aid Platform',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Gaza Aid',
    'application-name': 'Gaza Aid',
    'msapplication-TileColor': '#87CEEB',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#87CEEB',
  },
};

const pt_sans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LanguageWrapper>
        <body className={`${pt_sans.variable} font-body antialiased min-h-screen bg-background flex flex-col`}>
          <OfflineIndicator />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </LanguageWrapper>
    </LanguageProvider>
  );
}
