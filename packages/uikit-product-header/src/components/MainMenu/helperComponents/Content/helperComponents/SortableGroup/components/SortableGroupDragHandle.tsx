import { DragDropSVG } from '@ds/icons/interface/system';
import { stopEventPropagation } from '@ds/utils';

import { headerLocale } from '../../../../../../../locale';
import styles from '../styles.module.scss';

export function SortableGroupDragHandle() {
  const { t } = headerLocale.useTranslations();

  return (
    <button
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
