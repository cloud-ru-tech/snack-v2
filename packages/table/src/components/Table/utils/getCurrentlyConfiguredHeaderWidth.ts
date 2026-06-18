import { isBrowser } from '@ds/utils';

import { TEST_IDS } from '../../../constants';

export function getCurrentlyConfiguredHeaderWidth(id: string): number {
  if (isBrowser()) {
    const cell = document.querySelector(`[data-header-id="${id}"]`);
    const resizeHandler = cell?.querySelector(`[data-test-id="${TEST_IDS.headerResizeHandleMovingPart}"]`);

    if (cell) {
      const { width } = cell.getBoundingClientRect();

      if (resizeHandler) {
        const offset = Number.parseInt((resizeHandler as HTMLElement).style.getPropertyValue('--offset'), 10) || 0;

        return width + offset;
      }

      return width;
    }
  }

  return 0;
}
