// src/app/page.tsx
// ─── Home Page: Composes all sections ───

import { Suspense } from 'react';
import { Preloader } from '@/components/core/preloader';
import { HeroSection } from '@/components/sections/home/hero-section';
import { ExpertiseSection } from '@/components/sections/home/expertise-section';
import { ShowcaseSection } from '@/components/sections/home/showcase-section';
import { PhilosophySection } from '@/components/sections/home/philosophy-section';
import { ExperienceSection } from '@/components/sections/home/experience-section';
import { ContactSection } from '@/components/sections/home/contact-us-section';
import { Footer } from '@/components/core/footer';
import { SectionDivider } from '@/components/ui/section-divider';

export default function HomePage() {
  return (
    <>

      <Preloader />

      {/* Skip to content link (A11y) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-card-sm focus:bg-green-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      <article>
        {/* ─── Hero: Full viewport cinematic intro ─── */}
        <HeroSection />

        <SectionDivider variant="gradient" />

        {/* ─── Philosophy: Dev approach / values ─── */}
        <Suspense fallback={<SectionSkeleton />}>
          <PhilosophySection />
        </Suspense>

        <SectionDivider variant="dots" />

        {/* ─── Expertise: Tech stack & skills ─── */}
        <Suspense fallback={<SectionSkeleton />}>
          <ExpertiseSection />
        </Suspense>

        <SectionDivider variant="line" />

        {/* ─── Showcase: Featured projects ─── */}
        <Suspense fallback={<SectionSkeleton />}>
          <ShowcaseSection />
        </Suspense>

        <SectionDivider variant="gradient" />

        {/* ─── Experience: Timeline ─── */}
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceSection />
        </Suspense>

        <SectionDivider variant="dots" />

        {/* ─── Contact: CTA + form ─── */}
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </article>

      <Footer />
    </>
  );
}

// ─── Section loading skeleton ───
function SectionSkeleton() {
  return (
    <div
      className="section-container flex min-h-[50vh] items-center justify-center"
      aria-busy="true"
      aria-label="Loading section"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-48 animate-pulse rounded-card-sm bg-surface-tertiary" />
        <div className="h-4 w-72 animate-pulse rounded-card-sm bg-surface-tertiary" />
        <div className="h-4 w-60 animate-pulse rounded-card-sm bg-surface-tertiary" />
      </div>
    </div>
  );
}