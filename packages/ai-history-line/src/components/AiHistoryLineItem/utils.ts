import { isBrowser } from '@ds/utils';
import { CSSProperties } from 'react';

import { TEST_IDS } from '../../constants';

const OFFSET_STEP = 0.1;

function isConcealed(element: HTMLElement, root: HTMLElement): boolean {
  if (element.closest('svg, [hidden]')) return true;

  let current: HTMLElement | null = element;

  while (current) {
    const computed = getComputedStyle(current);

    if (computed.display === 'none' || computed.visibility === 'hidden') {
      return true;
    }

    if (current === root) {
      return false;
    }

    current = current.parentElement;
  }

  return false;
}

function firstLineRect(root: HTMLElement): DOMRect | null {
  if (!isBrowser()) return null;

  const walker =
    isBrowser() &&
    document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const value = node.textContent ?? '';
        if (!value.trim()) return NodeFilter.FILTER_REJECT;

        const parent = node.parentElement;
        if (!parent || isConcealed(parent, root)) return NodeFilter.FILTER_REJECT;

        return NodeFilter.FILTER_ACCEPT;
      },
    });

  if (!walker) return null;

  const range = isBrowser() && document.createRange();
  if (!range) return null;

  let text = walker.nextNode();

  while (text) {
    range.selectNodeContents(text);

    for (const rect of range.getClientRects()) {
      if (rect.width > 0 && rect.height > 0) return rect;
    }

    text = walker.nextNode();
  }

  return null;
}

/** Смещение верха кружка 24×24 до центра первой строки тела. */
export function measureIndicatorOffset(item: HTMLElement, content: HTMLElement): number {
  const line = firstLineRect(content);
  const indicator = item.querySelector<HTMLElement>(`[data-test-id="${TEST_IDS.indicator}"]`);
  const indicatorSize = indicator?.getBoundingClientRect().height ?? 0;

  if (!line || indicatorSize <= 0) {
    return 0;
  }

  const center = line.top + line.height / 2 - item.getBoundingClientRect().top;
  const offset = Math.max(0, center - indicatorSize / 2);

  return Math.round(offset / OFFSET_STEP) * OFFSET_STEP;
}

export function resolveOffset(value: number | CSSProperties['height'] | undefined): string | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? `${value}px` : undefined;
  }

  if (typeof value !== 'string') return undefined;

  const offset = value.trim();
  const parsed = Number.parseFloat(offset);
  if (!offset || parsed === 0 || parsed < 0) return undefined;

  return offset;
}
