import { DragDropSVG } from '@ds/icons/interface/system';
import { ButtonHTMLAttributes } from 'react';

import { TEST_IDS } from '../../../../../constants';
import { listLocale } from '../../../../../locale';
import styles from '../../styles.module.scss';

/**
 * Ручка drag&drop строки/заголовка reorder-режима: кнопка с иконкой, `aria-label` и `data-test-id`.
 * Живой вариант получает sortable-пропы `@dnd-kit` (`attributes`/`listeners`, `onMouseDown`/`onClick`,
 * `NO_DRAG_ATTRIBUTE`) через `...rest`; статичная копия для `DragOverlay` — `OverlayDragHandle`.
 */
export function DragHandle(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { t } = listLocale.useTranslations();

  return (
    <button
      type='button'
      aria-label={t('list.dragHandle')}
      data-test-id={TEST_IDS.dragHandle}
      className={styles.dragHandle}
      {...props}
    >
      <DragDropSVG />
    </button>
  );
}
