// src/components/ui/section-heading.tsx
'use client';

import React from 'react';
import { SplitText } from './animated-text/split-text';

interface SectionHeadingProps {
  overline: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`mb-16 max-w-3xl ${alignClass} ${className}`}>
      <SplitText
        as="span"
        className="section-overline text-overline mb-4 block"
        type="chars"
        animation="fade-in"
        staggerAmount={0.02}
      >
        {overline}
      </SplitText>

      <SplitText
        as="h2"
        className="section-title text-display-lg"
        type="words"
        animation="reveal-up"
      >
        {title}
      </SplitText>

      {description && (
        <SplitText
          as="p"
          className="section-description mt-6 text-lg leading-relaxed"
          type="words"
          animation="fade-in"
          staggerAmount={0.02}
          delay={0.3}
        >
          {description}
        </SplitText>
      )}
    </div>
  );
}