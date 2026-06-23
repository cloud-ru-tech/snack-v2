import { extractSupportProps, useLayoutEffect } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ROOT_WIDTH,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_WEIGHT,
  END_HEIGHT_EXTRA,
  fontMetricsForTypography,
  TEST_IDS,
} from './constants';
import styles from './styles.module.scss';
import { AiShimmerProps } from './types';

export function AiShimmer({
  text,
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  weight = DEFAULT_WEIGHT,
  iconMask,
  iconSize = DEFAULT_ICON_SIZE,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiShimmerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fallbackHeight = fontMetricsForTypography(variant, size, weight).lineHeight;
  const [contentHeight, setContentHeight] = useState(fallbackHeight);
  const [lineWidth, setLineWidth] = useState(DEFAULT_ROOT_WIDTH);

  const hasIcon = Boolean(iconMask);

  const measureLayout = useCallback(() => {
    const textNode = textRef.current;

    if (textNode) {
      const measuredContentHeight = Math.ceil(textNode.getBoundingClientRect().height);
      setContentHeight(prev => (Math.abs(prev - measuredContentHeight) > 0.5 ? measuredContentHeight : prev));
    }

    const rootNode = rootRef.current;

    if (rootNode) {
      const measuredWidth = Math.ceil(rootNode.getBoundingClientRect().width);
      setLineWidth(prev => (measuredWidth > 0 && Math.abs(prev - measuredWidth) > 0.5 ? measuredWidth : prev));
    }
  }, []);

  useLayoutEffect(() => {
    setContentHeight(fallbackHeight);
    measureLayout();

    const frameId = requestAnimationFrame(() => {
      measureLayout();
    });

    return () => cancelAnimationFrame(frameId);
  }, [fallbackHeight, measureLayout, size, text, variant, weight]);

  useEffect(() => {
    const textNode = textRef.current;
    const parentNode = textRef.current?.parentElement ?? null;

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => measureLayout());

    if (textNode) {
      observer.observe(textNode);
    }

    if (parentNode) {
      observer.observe(parentNode);
    }

    return () => observer.disconnect();
  }, [measureLayout]);

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

  const spreadStartHeight = Math.max(contentHeight, fallbackHeight);
  const spreadEndHeight = spreadStartHeight + END_HEIGHT_EXTRA;

  const rootStyle = useMemo(
    (): CSSProperties => ({
      '--ai-shimmer-spread-start-height': `${spreadStartHeight}px`,
      '--ai-shimmer-spread-end-height': `${spreadEndHeight}px`,
      ...(hasIcon && {
        '--ai-shimmer-icon-size': `${iconSize}px`,
        '--ai-shimmer-line-width': `${lineWidth}px`,
      }),
    }),
    [hasIcon, iconSize, lineWidth, spreadEndHeight, spreadStartHeight],
  );

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      style={rootStyle}
      data-variant={variant}
      data-size={size}
      data-weight={weight}
      data-has-icon={hasIcon || undefined}
      data-test-id={dataTestId}
      {...extractSupportProps(rest)}
    >
      <span ref={textRef} className={cn(styles.text, styles.textGhost)} data-test-id={TEST_IDS.text}>
        {hasIcon && <span className={styles.lead} aria-hidden />}
        {text}
      </span>
      <span className={styles.shimmer} data-test-id={TEST_IDS.shimmer} aria-hidden>
        <span className={cn(styles.text, styles.shimmerText)} data-test-id={TEST_IDS.spread}>
          {hasIcon && (
            <span
              className={cn(styles.lead, styles.shimmerIcon)}
              style={{ maskImage: iconMask, WebkitMaskImage: iconMask }}
              data-test-id={TEST_IDS.icon}
            />
          )}
          {text}
        </span>
      </span>
    </div>
  );
}
