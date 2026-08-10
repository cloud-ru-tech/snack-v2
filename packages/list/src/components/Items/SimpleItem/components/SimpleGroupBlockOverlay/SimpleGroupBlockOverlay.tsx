import { DragPreview } from '@ds/drag-and-drop';

import { TEST_IDS } from '../../../../../constants';
import { Separator } from '../../../../../helperComponents';
import { Size } from '../../../../../types';
import { FlattenSimpleItem } from '../../../types';
import styles from '../../styles.module.scss';
import { GroupHeaderContent } from '../../types';
import { OverlayDragHandle } from '../OverlayDragHandle';
import { SimpleItemOverlay } from '../SimpleItemOverlay';

export type SimpleGroupBlockOverlayProps = GroupHeaderContent & {
  /** Размер списка — заголовок повторяет левую раскладку строки (`padding-left` + ручка + `gap`). */
  size?: Size;
  /** Строки группы: копия блока рендерится целиком, вместе с ними. */
  rows: FlattenSimpleItem[];
};

/**
 * Статичная копия блока группы для `DragOverlay` (без `useSortable`): заголовок + строки группы.
 * Блок рендерится целиком, чтобы копия совпадала по размеру с перетаскиваемым блоком — `DragOverlay`
 * подгоняет обёртку под размеры активного узла (весь блок), поэтому одним заголовком её не заполнить.
 */
export function SimpleGroupBlockOverlay({ size, rows, ...separatorProps }: SimpleGroupBlockOverlayProps) {
  return (
    <DragPreview className={styles.dragPreview} data-test-id={TEST_IDS.dragOverlay}>
      <div>
        <div className={styles.groupHeader} data-size={size}>
          <OverlayDragHandle />
          <Separator {...separatorProps} />
        </div>
        {rows.map(row => (
          <SimpleItemOverlay key={row.id} {...row} bare />
        ))}
      </div>
    </DragPreview>
  );
}
