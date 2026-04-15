import { Tooltip, TRIGGER } from '@design-system/tooltip';
import { DATA_SWIPE_DIRECTIONS_ATTRIBUTE } from '@design-system/utils';
import { type SliderProps as RCSliderProps } from 'rc-slider';
import { cloneElement, type HTMLAttributes, type ReactElement } from 'react';

import styles from './styles.module.scss';
import type { TipFormatter } from './types';

export function getSortedMarkValues(marks: NonNullable<RCSliderProps['marks']>): number[] {
  return Object.keys(marks)
    .map(k => Number(k))
    .filter(k => !Number.isNaN(k))
    .sort((a, b) => a - b);
}

export function snapToMarkIndex(domainValue: number, markValues: number[]): number {
  if (markValues.length === 0) {
    return 0;
  }
  const exact = markValues.indexOf(domainValue);
  if (exact >= 0) {
    return exact;
  }
  let bestIdx = 0;
  let bestDist = Infinity;
  markValues.forEach((mv, i) => {
    const dist = Math.abs(mv - domainValue);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });
  return bestIdx;
}

export function internalToDomain(internal: number, markValues: number[]): number {
  if (markValues.length === 0) {
    return internal;
  }
  const idx = Math.round(internal);
  const clamped = Math.max(0, Math.min(markValues.length - 1, idx));
  return markValues[clamped];
}

export function mapInternalToDomain(values: number | number[], isRange: boolean, markValues: number[]): number | number[] {
  if (isRange && Array.isArray(values)) {
    return values.map(v => internalToDomain(v, markValues));
  }
  return internalToDomain(values as number, markValues);
}

export function buildMarksByIndex(
  markValues: number[],
  marks: NonNullable<RCSliderProps['marks']>,
): NonNullable<RCSliderProps['marks']> {
  const out: NonNullable<RCSliderProps['marks']> = {};
  markValues.forEach((mv, i) => {
    const original = marks[mv];
    out[i] = original === undefined ? String(mv) : original;
  });
  return out;
}

export function mapDomainValueToEqualInternal(
  useEqual: boolean,
  range: boolean | undefined,
  domainValue: number | number[] | undefined,
  toInternal: (d: number) => number,
): number | number[] | undefined {
  if (!useEqual || domainValue === undefined) {
    return domainValue;
  }
  if (range && Array.isArray(domainValue)) {
    return domainValue.map(toInternal);
  }
  if (!range && typeof domainValue === 'number') {
    return toInternal(domainValue);
  }
  return domainValue;
}

const addSwipeAttribute = (node: ReactElement) =>
  cloneElement(node, {
    [DATA_SWIPE_DIRECTIONS_ATTRIBUTE]: 'Left Right',
  } as HTMLAttributes<HTMLElement>);

export function createTipHandleRender(
  tipFormatter: TipFormatter | undefined,
  valueToDomain: ((v: number) => number) | undefined,
): NonNullable<RCSliderProps['handleRender']> {
  return function tipHandleRender(node, handleProps) {
    const raw = handleProps.value;
    const display = valueToDomain ? valueToDomain(raw) : raw;
    return (
      <Tooltip
        className={styles.tipWrapper}
        disableSpanWrapper
        open={handleProps.dragging || undefined}
        tip={tipFormatter ? tipFormatter(display) : display}
        trigger={TRIGGER.HoverAndFocusVisible}
      >
        {addSwipeAttribute(node)}
      </Tooltip>
    );
  };
}

export const swipeOnlyHandleRender: NonNullable<RCSliderProps['handleRender']> = node => addSwipeAttribute(node);
