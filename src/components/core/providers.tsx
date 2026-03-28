'use client';
// src/components/core/providers.tsx
// ─── Client-side providers extracted from layout ───



import { type ReactNode, Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { SmoothScrollProvider } from '@/components/core/smooth-scroll';
import { CursorProvider } from '@/components/core/cursor/cursor-provider';
import dynamic from 'next/dynamic';

// Lazy load non-critical UI
const FloatingAppBar = dynamic(
  () => import('@/components/core/floating-app-bar'),
  { ssr: false }
);

const ChatWidget = dynamic(
  () => import('@/components/chat/chat-widget'),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <SmoothScrollProvider>
        <CursorProvider>
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>

          <Suspense fallback={null}>
            <FloatingAppBar />
          </Suspense>

          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </CursorProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}