import { DragPreview } from '@ds/drag-and-drop';

import { TEST_IDS } from '../../../../../constants';
import { BaseItem } from '../../../BaseItem';
import { FlattenSimpleItem } from '../../../types';
import styles from '../../styles.module.scss';
import { OverlayDragHandle } from '../OverlayDragHandle';

export type SimpleItemOverlayProps = FlattenSimpleItem & {
  /**
   * Строка внутри копии блока группы (`SimpleGroupBlockOverlay`): поверхность и тень несёт сам
   * блок, поэтому у строки их не дублируем.
   */
  bare?: boolean;
};

/**
 * Презентационная копия строки для `DragOverlay` (`@dnd-kit`). Рендерится в портале над всей
 * страницей и едет за курсором, поэтому строку не режет `overflow: hidden` контейнера `List`
 * (см. [visual-regression] клиппинг). В отличие от `SimpleItem`, не вызывает `useSortable` —
 * это неинтерактивный снимок: ручка и содержимое статичны, перетаскивание ведёт исходная строка.
 */
export function SimpleItemOverlay({ bare, ...item }: SimpleItemOverlayProps) {
  const row = <BaseItem {...item} dragHandle={<OverlayDragHandle />} />;

  if (bare) return row;

  return (
    <DragPreview className={styles.dragPreview} data-test-id={TEST_IDS.dragOverlay}>
      {row}
    </DragPreview>
  );
}
