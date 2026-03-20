import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tshilidzi-a2712.web.app'), // Production URL
  title: {
    default: 'Tshilidzi Development Trust | Emprowering Zimbabwe',
    template: '%s | Tshilidzi Development Trust'
  },
  description: 'Empowering youth and women, reducing poverty, and building climate resilience in Zimbabwe. Join us in making a difference.',
  keywords: ['Development Trust', 'Zimbabwe', 'Youth Empowerment', 'Climate Resilience', 'Poverty Reduction', 'NGO', 'Non-profit'],
  authors: [{ name: 'Tshilidzi Development Trust' }],
  creator: 'Tshilidzi Development Trust',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tshilidzi-a2712.web.app',
    title: 'Tshilidzi Development Trust | Development & Empowerment',
    description: 'Empowering youth and women, reducing poverty, and building climate resilience in Zimbabwe.',
    siteName: 'Tshilidzi Development Trust',
    images: [
      {
        url: '/branding.png', // Fallback to logo or specific OG image if available
        width: 1200,
        height: 630,
        alt: 'Tshilidzi Development Trust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tshilidzi Development Trust',
    description: 'Empowering youth and women, reducing poverty, and building climate resilience in Zimbabwe.',
    images: ['/branding.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '_woAG4f0RBCSuhlS2NlWdad36CUffTeVbC7Zfr-aHWc', // User provided token
    // yandex: 'yandex_verification_token',
    // yahoo: 'yahoo_verification_token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <SettingsProvider>
            <JsonLd />
            <Header />
            <main style={{ minHeight: 'calc(100vh - var(--header-height) - 300px)' }}>
              {children}
            </main>
            <Footer />
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
