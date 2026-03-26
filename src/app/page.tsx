// src/app/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Preloader } from '@/components/core/preloader';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HeroSection,
  PhilosophySection,
  ExpertiseSection,
  ShowcaseSection,
  JourneySection,
  ImpactSection,
  ConnectSection,
} from '@/components/sections/home';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    document.body.style.overflow = '';
  }, []);

  // Lock scroll during preloader
  React.useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoading]);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Main content — rendered immediately but hidden by preloader */}
      <div className={isLoading ? 'invisible' : 'visible'}>
        <HeroSection />

        {/* Spacer for visual breathing room */}
        <div className="h-[10vh]" />

        <PhilosophySection />
        <ExpertiseSection />
        <ShowcaseSection />
        <JourneySection />
        <ImpactSection />
        <ConnectSection />
      </div>
    </>
  );
}