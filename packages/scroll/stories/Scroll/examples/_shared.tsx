import { within } from 'storybook/test';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

export const longContent = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 40 }, (_, i) => (
      <div key={i} className={styles.playgroundLine}>
        Line {i + 1}
      </div>
    ))}
  </div>
);

export const VERTICAL_SCROLLBAR_SELECTOR = '.os-scrollbar-vertical, .os-scrollbar';
export const VISIBLE_CLASS = 'os-scrollbar-visible';

export function getHost(canvasElement: HTMLElement): HTMLElement {
  return within(canvasElement).getByTestId(TEST_IDS.root);
}

export function getVerticalScrollbar(host: HTMLElement): HTMLElement | null {
  const all = host.querySelectorAll<HTMLElement>(VERTICAL_SCROLLBAR_SELECTOR);
  for (const el of all) {
    if (el.classList.contains('os-scrollbar-horizontal')) continue;
    return el;
  }
  return null;
}
