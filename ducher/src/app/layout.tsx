import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

import { LoadingScreen } from '@/components/common/loading-screen';
import { ThemeProvider } from '@/components/common/theme-provider';
import { FloatingActions } from '@/components/common/whatsapp-fab';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { brand, seo } from '@/content/business';
import { buildSchema } from '@/lib/schema';

import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  category: 'shopping',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: seo.locale,
    url: brand.siteUrl,
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    // A imagem vem de src/app/opengraph-image.tsx (convenção de arquivo do
    // Next), que gera um PNG real em build.
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#141110' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // JSON-LD gerado a partir do arquivo de conteúdo, não de string solta.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <Navbar />
          <main id="conteudo">{children}</main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
