// src/utils/dom.ts

/**
 * Get element's position relative to viewport center
 */
export function getElementCenter(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(el: HTMLElement, offset: number = 0): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight - offset &&
    rect.bottom > offset &&
    rect.left < window.innerWidth - offset &&
    rect.right > offset
  );
}

/**
 * Get scroll percentage of an element through viewport
 */
export function getScrollProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const total = windowHeight + rect.height;
  const current = windowHeight - rect.top;
  return Math.max(0, Math.min(1, current / total));
}

/**
 * Preload an image
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}