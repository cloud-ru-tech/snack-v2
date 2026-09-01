import { isBrowser } from '@ds/utils';

import { TABLE_CSS_VARS } from '../../../constants';

/** Ширина видимой области таблицы из CSS-переменной обёртки (её пишет `useTableScroll`); 0 — замерить не удалось. */
export function getTableViewportWidth(headerId: string): number {
  if (isBrowser()) {
    const cell = document.querySelector(`[data-header-id="${headerId}"]`);

    if (cell) {
      return Number.parseFloat(getComputedStyle(cell).getPropertyValue(TABLE_CSS_VARS.viewportWidth)) || 0;
    }
  }

  return 0;
}
