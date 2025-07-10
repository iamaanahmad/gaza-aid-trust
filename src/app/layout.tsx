import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import 'mapbox-gl/dist/mapbox-gl.css';
import { PT_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/language-context';
import { LanguageWrapper } from '@/components/layout/LanguageWrapper';

export const metadata: Metadata = {
  title: 'Gaza Aid & Trust: Crisis Connect',
  description:
    'A community-powered crisis map and aid platform for Gaza. Built for the "Hack for Gaza" hackathon.',
  icons: {
    icon: '/favicon.ico',
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </LanguageWrapper>
    </LanguageProvider>
  );
}
