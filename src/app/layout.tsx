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
  metadataBase: new URL('https://tshilidzi.org'),
  title: {
    default: 'Tshilidzi Development Trust | Youth Empowerment Zimbabwe',
    template: '%s | Tshilidzi Development Trust'
  },
  description: 'Tshilidzi Development Trust empowers Zimbabwean youth through education, skills development, and community programs. Building futures across Zimbabwe.',
  keywords: ['youth empowerment Zimbabwe', 'NGO Zimbabwe', 'education nonprofit Zimbabwe', 'community development Zimbabwe', 'Tshilidzi Development Trust', 'youth skills Zimbabwe'],
  authors: [{ name: 'Tshilidzi Development Trust' }],
  creator: 'Tshilidzi Development Trust',
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: 'https://tshilidzi.org',
    title: 'Tshilidzi Development Trust | Youth Empowerment Zimbabwe',
    description: 'Tshilidzi Development Trust empowers Zimbabwean youth through education, skills development, and community programs. Building futures across Zimbabwe.',
    siteName: 'Tshilidzi Development Trust',
    images: [
      {
        url: '/branding.png',
        width: 1200,
        height: 630,
        alt: 'Tshilidzi Development Trust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tshilidzi Development Trust',
    description: 'Tshilidzi Development Trust empowers Zimbabwean youth through education, skills development, and community programs. Building futures across Zimbabwe.',
    images: ['/branding.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
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
