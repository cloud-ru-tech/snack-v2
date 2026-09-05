import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ROOT_WIDTH,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_WEIGHT,
  TEST_IDS,
  WAVE_GRADIENT,
  WAVE_STOPS,
  waveStopColor,
} from './constants';
import styles from './styles.module.scss';
import { AiShimmerProps } from './types';

export function AiShimmer({
  text,
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  weight = DEFAULT_WEIGHT,
  icon,
  iconMask,
  iconSize = DEFAULT_ICON_SIZE,
  slotAfter,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiShimmerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const [lineWidth, setLineWidth] = useState(DEFAULT_ROOT_WIDTH);
  const [slotOffset, setSlotOffset] = useState(0);
  const gradientId = useId();
  const maskId = useId();

  const hasIconNode = icon != null && icon !== false;
  const hasIcon = hasIconNode || Boolean(iconMask);
  const hasSlotAfter = slotAfter != null && slotAfter !== false;

  // Волна задана в пикселях строки, поэтому ширину и отступ слота нужно замерить.
  const measureLayout = useCallback(() => {
    const rootNode = rootRef.current;

    if (!rootNode) {
      return;
    }

    const rootRect = rootNode.getBoundingClientRect();
    const measuredWidth = Math.ceil(rootRect.width);
    setLineWidth(prev => (measuredWidth > 0 && Math.abs(prev - measuredWidth) > 0.5 ? measuredWidth : prev));

    const slotNode = slotRef.current;

    if (slotNode) {
      const measuredOffset = slotNode.getBoundingClientRect().left - rootRect.left;
      setSlotOffset(prev => (Math.abs(prev - measuredOffset) > 0.5 ? measuredOffset : prev));
    }
  }, []);

  useEffect(() => {
    measureLayout();

    const rootNode = rootRef.current;

    if (typeof ResizeObserver === 'undefined' || !rootNode) {
      return undefined;
    }

    const observer = new ResizeObserver(() => measureLayout());
    observer.observe(rootNode);

    const slotNode = slotRef.current;

    if (slotNode) {
      observer.observe(slotNode);
    }

    return () => observer.disconnect();
  }, [measureLayout, hasSlotAfter]);

  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts?.ready) {
      return undefined;
    }

    let cancelled = false;

    document.fonts.ready
      .then(() => {
        if (!cancelled) {
          measureLayout();
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [measureLayout, size, text, variant, weight]);

  const rootStyle = useMemo(
    (): CSSProperties => ({
      '--ai-shimmer-wave-gradient': WAVE_GRADIENT,
      '--ai-shimmer-wave-width': `${2 * lineWidth}px`,
      ...(hasIcon && { '--ai-shimmer-icon-size': `${iconSize}px` }),
      ...(hasSlotAfter && { '--ai-shimmer-slot-offset': `${slotOffset}px` }),
    }),
    [hasIcon, hasSlotAfter, iconSize, lineWidth, slotOffset],
  );

  let lead = null;

  if (hasIconNode) {
    lead = (
      <svg className={styles.leadIcon} data-test-id={TEST_IDS.icon} aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1='0' y1='0' x2='1' y2='0'>
            {WAVE_STOPS.map(stop => (
              <stop key={stop.offset} offset={stop.offset} stopColor={waveStopColor(stop)} stopOpacity={stop.opacity} />
            ))}
          </linearGradient>
          <mask id={maskId} className={styles.leadMask} maskUnits='userSpaceOnUse' x='0' y='0' width='100%' height='100%'>
            {icon}
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <rect className={styles.leadBase} width='100%' height='100%' />
          <rect className={styles.leadWave} height='100%' fill={`url(#${gradientId})`} />
        </g>
      </svg>
    );
  } else if (iconMask) {
    lead = (
      <span
        className={styles.lead}
        style={{ maskImage: iconMask, WebkitMaskImage: iconMask }}
        data-test-id={TEST_IDS.icon}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      style={rootStyle}
      data-variant={variant}
      data-size={size}
      data-weight={weight}
      data-has-icon={hasIcon || undefined}
      data-has-slot={hasSlotAfter || undefined}
      data-test-id={dataTestId}
      {...extractSupportProps(rest)}
    >
      <span ref={textRef} className={styles.text} data-test-id={TEST_IDS.text}>
        {lead}
        {text}
      </span>
      {hasSlotAfter && (
        <span ref={slotRef} className={styles.slot} data-test-id={TEST_IDS.slot}>
          {slotAfter}
        </span>
      )}
    </div>
  );
}
