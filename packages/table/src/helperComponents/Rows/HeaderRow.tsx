import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import cn from 'classnames';
import { CSSProperties } from 'react';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../constants';
import { useTableContext } from '../../contexts';
import { useHeaderGroups } from '../../hooks';
import { ColumnOrder } from '../../types';
import { HeaderCell } from '../Cells';
import { PinnedCells } from './PinnedCells';
import { Row, RowProps } from './Row';
import styles from './styles.module.scss';

type Props = Pick<RowProps, 'rowAutoHeight'> & {
  columnOrder: ColumnOrder;
  enableColumnsOrderSortByDrag?: boolean;
  /** Внешний sticky-host (stickyControls): не дублировать position: sticky на строке */
  suppressSticky?: boolean;
};

export function HeaderRow({ rowAutoHeight, columnOrder, enableColumnsOrderSortByDrag, suppressSticky }: Props) {
  const { leftPinned, unpinned, rightPinned } = useHeaderGroups();
  const { columnVirtualPadding, headerRowBackgroundColor } = useTableContext();

  const leftPinnedCells = leftPinned ? (
    <PinnedCells position={COLUMN_PIN_POSITION.Left}>
      {leftPinned.map(headerGroup =>
        headerGroup.headers.map(header =>
          header.isPlaceholder ? null : <HeaderCell key={header.id} header={header} rowAutoHeight={rowAutoHeight} />,
        ),
      )}
    </PinnedCells>
  ) : null;

  const centerCells = (
    <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
      {columnVirtualPadding && columnVirtualPadding.left > 0 && (
        <div aria-hidden style={{ width: columnVirtualPadding.left, flexShrink: 0 } as CSSProperties} />
      )}
      {unpinned.map(headerGroup =>
        headerGroup.headers.map(header => (
          <HeaderCell
            key={header.id}
            header={header}
            rowAutoHeight={rowAutoHeight}
            isDraggable={enableColumnsOrderSortByDrag && columnOrder.length > 1}
          />
        )),
      )}
      {columnVirtualPadding && columnVirtualPadding.right > 0 && (
        <div aria-hidden style={{ width: columnVirtualPadding.right, flexShrink: 0 } as CSSProperties} />
      )}
    </SortableContext>
  );

  const rightPinnedCells = rightPinned ? (
    <PinnedCells position={COLUMN_PIN_POSITION.Right}>
      {rightPinned.map(headerGroup =>
        headerGroup.headers.map(header =>
          header.isPlaceholder ? null : (
            <HeaderCell
              key={header.id}
              header={header}
              pinPosition={COLUMN_PIN_POSITION.Right}
              rowAutoHeight={rowAutoHeight}
            />
          ),
        ),
      )}
    </PinnedCells>
  ) : null;

  if (suppressSticky) {
    return (
      <Row
        className={cn(styles.tableHeader, styles.tableHeaderStatic, styles.tableHeaderMirrored)}
        data-test-id={TEST_IDS.headerRow}
        data-row-bg-appearance={headerRowBackgroundColor}
        rowAutoHeight={rowAutoHeight}
      >
        {leftPinnedCells}
        <div className={styles.headerScrollRegion}>
          <div className={styles.headerScrollTrack}>{centerCells}</div>
        </div>
        {rightPinnedCells}
      </Row>
    );
  }

  return (
    <Row
      className={styles.tableHeader}
      data-test-id={TEST_IDS.headerRow}
      data-row-bg-appearance={headerRowBackgroundColor}
      rowAutoHeight={rowAutoHeight}
    >
      {leftPinnedCells}
      {centerCells}
      {rightPinnedCells}
    </Row>
  );
}
