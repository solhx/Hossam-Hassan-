// src/app/layout.tsx
// ─── Root Layout: Server Component with Client Providers ───

import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/core/providers';
import './globals.css';

// ─── Font Optimization: Self-hosted, subset, swap ───
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,   // Secondary font, don't preload
  fallback: ['Fira Code', 'monospace'],
});

// ─── Enhanced Metadata ───
export const metadata: Metadata = {
  metadataBase: new URL('https://hossamhassan.dev'),
  title: {
    default: 'Hossam Hassan — Full Stack Developer',
    template: '%s | Hossam Hassan',
  },
  description:
    'Full Stack MERN Developer with 3+ years of experience building high-performance web applications. Expert in React, Next.js, Node.js, and TypeScript.',
  keywords: [
    'Hossam Hassan',
    'Full Stack Developer',
    'MERN Stack',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'Portfolio',
    'Web Developer',
    'Frontend Engineer',
  ],
  authors: [{ name: 'Hossam Hassan', url: 'https://hossamhassan.dev' }],
  creator: 'Hossam Hassan',
  publisher: 'Hossam Hassan',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hossamhassan.dev',
    siteName: 'Hossam Hassan Portfolio',
    title: 'Hossam Hassan — Full Stack Developer',
    description:
      'Full Stack MERN Developer crafting high-performance web experiences with React, Next.js, and TypeScript.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hossam Hassan — Full Stack Developer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hossam Hassan — Full Stack Developer',
    description:
      'Full Stack MERN Developer crafting high-performance web experiences.',
    images: ['/og-image.png'],
    creator: '@hossamhassan',
  },
  alternates: {
    canonical: 'https://hossamhassan.dev',
  },
  other: {
    'msapplication-TileColor': '#059669',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f0d' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ─── JSON-LD Structured Data ───
function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hossam Hassan',
    url: 'https://hossamhassan.dev',
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack MERN Developer with 3+ years of experience.',
    sameAs: [
      'https://github.com/hossamhassan',
      'https://linkedin.com/in/hossamhassan',
    ],
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB',
      'Express.js', 'Tailwind CSS', 'JavaScript',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>

        {/* Noise overlay for cinematic texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Analytics (lazy-loaded) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}