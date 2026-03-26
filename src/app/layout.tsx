// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CursorProvider } from '@/components/core/cursor/cursor-provider';
import { CursorFollower } from '@/components/core/cursor/cursor-follower';
import { SmoothScroll } from '@/components/core/smooth-scroll';
import { NoiseOverlay } from '@/components/core/noise-overlay';
import { Navigation } from '@/components/core/navigation';
import { Footer } from '@/components/core/footer';
import { ChatWidget } from '@/components/chat';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hossamhassan.dev'),
  title: {
    default: 'Hossam Hassan — MEARN Stack Developer',
    template: '%s | Hossam Hassan',
  },
  description:
    'Full-stack MEARN developer with 3+ years of experience building performant, accessible, and beautifully animated web applications with React, Next.js, Node.js, and MongoDB.',
  keywords: [
    'Hossam Hassan',
    'MEARN Stack',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Portfolio',
    'Web Developer',
    'Egypt',
  ],
  authors: [{ name: 'Hossam Hassan', url: 'https://hossamhassan.dev' }],
  creator: 'Hossam Hassan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hossamhassan.dev',
    title: 'Hossam Hassan — MEARN Stack Developer',
    description:
      'Full-stack developer crafting exceptional digital experiences.',
    siteName: 'Hossam Hassan Portfolio',
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hossam Hassan — MEARN Stack Developer',
    description:
      'Full-stack developer crafting exceptional digital experiences.',
    images: ['/og-image.webp'],
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
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hossam Hassan',
  url: 'https://hossamhassan.dev',
  email: 'hossamhassan112003@gmail.com',
  telephone: '+201022828316',
  jobTitle: 'MEARN Stack Developer',
  sameAs: [
    'https://github.com/hossamhassan',
    'https://linkedin.com/in/hossamhassan',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'TypeScript',
    'Tailwind CSS',
    'GSAP',
    'Three.js',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
>
  Skip to main content
</a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CursorProvider>
            <SmoothScroll>
              {/* Global layers */}
              <NoiseOverlay />
              <CursorFollower />
              <Navigation />

              {/* Page content */}
              <main id="main-content">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Chat widget */}
              <ChatWidget />
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}