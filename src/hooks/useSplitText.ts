// src/hooks/useSplitText.ts
'use client';

import { useRef, useEffect, useCallback } from 'react';

export type SplitType = 'chars' | 'words' | 'lines';

interface SplitResult {
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
  lines: HTMLDivElement[];
}

/**
 * Custom hook that splits text content into individual chars/words/lines
 * for granular GSAP animation control.
 * 
 * Alternative to GSAP SplitText (no Club license needed).
 */
export function useSplitText(
  types: SplitType[] = ['chars', 'words']
) {
  const elementRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitResult>({ chars: [], words: [], lines: [] });
  const isSplit = useRef(false);

  const split = useCallback(() => {
    const el = elementRef.current;
    if (!el || isSplit.current) return;

    const text = el.textContent || '';
    el.innerHTML = '';

    const chars: HTMLSpanElement[] = [];
    const words: HTMLSpanElement[] = [];

    const wordTexts = text.split(/\s+/);

    wordTexts.forEach((word, wordIndex) => {
      // Create word wrapper
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('split-word');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';

      if (types.includes('chars')) {
        // Split into characters
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.classList.add('split-char');
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = word;
        wordSpan.style.willChange = 'transform, opacity';
      }

      el.appendChild(wordSpan);
      words.push(wordSpan);

      // Add space between words
      if (wordIndex < wordTexts.length - 1) {
        const space = document.createTextNode('\u00A0');
        el.appendChild(space);
      }
    });

    splitRef.current = { chars, words, lines: [] };
    isSplit.current = true;
  }, [types]);

  const revert = useCallback(() => {
    const el = elementRef.current;
    if (!el || !isSplit.current) return;

    const originalText = splitRef.current.words
      .map((w) => w.textContent)
      .join(' ');
    el.textContent = originalText;
    splitRef.current = { chars: [], words: [], lines: [] };
    isSplit.current = false;
  }, []);

  useEffect(() => {
    split();
    return () => revert();
  }, [split, revert]);

  return {
    ref: elementRef,
    chars: splitRef.current.chars,
    words: splitRef.current.words,
    lines: splitRef.current.lines,
    split,
    revert,
  };
}