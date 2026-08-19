import { Modifier } from '@dnd-kit/core';
import { isBrowser } from '@ds/utils';

import { TEST_IDS } from '../../../constants';

function getHeaderCellTop(columnId: string): number | undefined {
  if (isBrowser()) {
    const headerCell = document.querySelector(
      `[data-test-id="${TEST_IDS.headerCell}"][data-header-id="${CSS.escape(columnId)}"]`,
    );

    return headerCell?.getBoundingClientRect().top;
  }

  return undefined;
}

/**
 * Копию тянет наверх к шапке: `useSortable` вызывают и ячейки тела с тем же id колонки,
 * поэтому dnd-kit считает активным узлом последнюю из них и якорит оверлей по её строке.
 */
export const alignOverlayToHeader: Modifier = ({ transform, active, activeNodeRect }) => {
  const columnId = active?.id;

  if (!columnId || !activeNodeRect) {
    return transform;
  }

  const headerTop = getHeaderCellTop(String(columnId));

  if (headerTop === undefined) {
    return transform;
  }

  return { ...transform, y: transform.y + headerTop - activeNodeRect.top };
};
