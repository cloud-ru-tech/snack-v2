'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

import { RevealSectionProps } from '../../types';
import styles from './styles.module.scss';

export function RevealSection({
  children,
  disabled = false,
  skipInitialViewport = false,
  duration = 650,
  delay = 0,
  offset = 28,
  easing = 'ease',
  rootMargin = '0px 0px -40px 0px',
  threshold = 0,
  className,
  style,
  ...rest
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealState, setRevealState] = useState<'pending' | 'hidden' | 'visible' | 'disabled'>(
    skipInitialViewport ? 'pending' : 'hidden',
  );

  useEffect(() => {
    const element = ref.current;

    if (!element || revealState === 'visible' || revealState === 'disabled') return;

    if (disabled || typeof IntersectionObserver === 'undefined') {
      setRevealState('disabled');
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (revealState === 'pending') {
          const entry = entries[entries.length - 1];
          if (!entry) return;

          setRevealState(entry.isIntersecting ? 'disabled' : 'hidden');
          if (entry.isIntersecting) observer.disconnect();
          return;
        }

        if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= observer.thresholds[0])) {
          setRevealState('visible');
          observer.disconnect();
        }
      },
      revealState === 'pending' ? { rootMargin: '0px', threshold: 0 } : { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disabled, revealState, rootMargin, threshold]);

  const shouldSkipTransition =
    disabled ||
    revealState === 'disabled' ||
    revealState === 'pending' ||
    (skipInitialViewport && revealState === 'hidden');

  const animationStyle: CSSProperties = {
    '--reveal-duration': `${duration}ms`,
    '--reveal-delay': `${delay}ms`,
    '--reveal-offset': `${offset}px`,
    '--reveal-easing': easing,
    ...style,
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={animationStyle}
      data-revealed={revealState !== 'hidden' || disabled}
      data-reveal-disabled={shouldSkipTransition || undefined}
    >
      {children}
    </div>
  );
}
