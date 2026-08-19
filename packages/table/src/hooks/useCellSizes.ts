import { CSS, Transform } from '@dnd-kit/utilities';
import { Cell, Header } from '@tanstack/react-table';
import { CSSProperties, useMemo } from 'react';

import { TABLE_COLUMN_CSS_VARS } from '../constants';

type CellSizesOptions = {
  isDraggable?: boolean;
  transform?: Transform | null;
};

export function useCellSizes<TData>(
  element: Cell<TData, unknown> | Header<TData, unknown>,
  options?: CellSizesOptions,
): CSSProperties {
  const column = element.column;
  const transform = options?.transform ?? null;

  const minWidth = column.columnDef.minSize;
  const maxWidth = column.columnDef.maxSize;
  const width = `var(${TABLE_COLUMN_CSS_VARS.size(column.id)})`;
  const flexShrink = `var(${TABLE_COLUMN_CSS_VARS.flex(column.id)})`;
  const isHeaderCell = 'headerGroup' in element;

  return useMemo(() => {
    const styles: CSSProperties = {
      minWidth,
      width,
      maxWidth,
      flexShrink,
    };

    if (options?.isDraggable) {
      styles.position = 'relative';
      styles.transform = CSS.Translate.toString(transform);

      if (isHeaderCell) {
        styles.whiteSpace = 'nowrap';
      }
    }

    return styles;
  }, [options?.isDraggable, flexShrink, isHeaderCell, maxWidth, minWidth, transform, width]);
}
