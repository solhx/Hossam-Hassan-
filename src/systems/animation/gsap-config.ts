// src/systems/animation/gsap-config.ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // If you have Club license
import { CustomEase } from 'gsap/CustomEase';

// Register all plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // If you have GSAP Club/Business:
  // gsap.registerPlugin(SplitText);

  // Global GSAP defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // Custom eases for premium feel
  CustomEase.create('smooth', '0.23, 1, 0.32, 1');        // Main ease
  CustomEase.create('snappy', '0.16, 1, 0.3, 1');         // Quick and snappy
  CustomEase.create('cinematic', '0.77, 0, 0.175, 1');    // Dramatic
  CustomEase.create('bounce-out', '0.34, 1.56, 0.64, 1'); // Playful
  CustomEase.create('expo-out', '0.19, 1, 0.22, 1');      // Expo feel

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    start: 'top 85%',
  });

  // Refresh on load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}

export { gsap, ScrollTrigger };