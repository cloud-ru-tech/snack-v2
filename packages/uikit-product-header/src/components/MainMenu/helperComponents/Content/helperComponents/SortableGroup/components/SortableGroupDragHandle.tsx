import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { DragDropSVG } from '@ds/icons/interface/system';
import { stopEventPropagation } from '@ds/utils';

import { headerLocale } from '../../../../../../../locale';
import styles from '../styles.module.scss';

export type SortableGroupDragHandleProps = {
  attributes?: DraggableAttributes;
  listeners?: DraggableSyntheticListeners;
};

export function SortableGroupDragHandle({ attributes, listeners }: SortableGroupDragHandleProps) {
  const { t } = headerLocale.useTranslations();

  return (
    <button
      {...attributes}
      {...listeners}
      type='button'
      className={styles.dragHandle}
      aria-label={t('dragGroup')}
      data-test-id='header__drawer-menu__group-card-drag-handle'
      onClick={stopEventPropagation}
    >
      <DragDropSVG size={24} />
    </button>
  );
}
