import { APPEARANCE, ButtonGroup, VIEW } from '@ds/button';
import { ReactNode } from 'react';

import { FOOTER_ACTIONS_ORIENTATION } from '../constants';
import { BottomSheetActionButton, FooterActionsOrientation } from '../types';

/** Идентификаторы слотов футера, проставляемые на собранные кнопки и дисклеймер. */
export type FooterActionsTestIds = {
  approve: string;
  cancel: string;
  additional: string;
  disclaimer: string;
};

export type FooterActionsOptions = {
  /** Основная кнопка (по умолчанию `view='filled'`, `appearance='primary'`). */
  approveButton?: BottomSheetActionButton;
  /** Кнопка отмены (по умолчанию `view='outline'`, `appearance='neutral'`). */
  cancelButton?: BottomSheetActionButton;
  /** Дополнительная (третья) кнопка (по умолчанию `view='simple'`, `appearance='neutral'`). */
  additionalButton?: BottomSheetActionButton;
  /** Ориентация кнопок при ровно двух действиях. */
  footerActionsOrientation?: FooterActionsOrientation;
  /** Текст под кнопками. */
  disclaimer?: ReactNode;
  /** Идентификаторы слотов конкретного компонента (`bottom-sheet` / `modal` / `drawer`). */
  testIds: FooterActionsTestIds;
  /** CSS-класс обёртки дисклеймера — стилизуется в пакете-потребителе. */
  disclaimerClassName?: string;
  /** CSS-класс на `ButtonGroup` — для выравнивания (например, `align-self: flex-end` в modal/drawer). */
  actionsClassName?: string;
  /**
   * Раскладка горизонтальных кнопок: `'spread'` — ряд через space-between на всю ширину;
   * `'end'` — compact-ряд, прижатый вправо.
   * @default 'spread'
   */
  align?: 'spread' | 'end';
};

/**
 * Собирает содержимое футера (`ButtonGroup` из approve/cancel/additional + disclaimer) или `null`.
 * Единый источник правды для `BottomSheet`, `Modal` и `Drawer` (adaptive-маппинг 1:1).
 */
export function buildFooterActions({
  approveButton,
  cancelButton,
  additionalButton,
  footerActionsOrientation = FOOTER_ACTIONS_ORIENTATION.Horizontal,
  disclaimer,
  testIds,
  disclaimerClassName,
  actionsClassName,
  align = 'spread',
}: FooterActionsOptions): ReactNode {
  const actionCount = [approveButton, cancelButton, additionalButton].filter(Boolean).length;

  if (actionCount === 0 && disclaimer == null) {
    return null;
  }

  const isVerticalActions = footerActionsOrientation === FOOTER_ACTIONS_ORIENTATION.Vertical || actionCount !== 2;
  // `break` (space-between) — только для `spread`; в `end` кнопки прижаты вправо через actionsClassName.
  const useBreak = align === 'spread' && !isVerticalActions;

  return (
    <>
      {actionCount > 0 && (
        <ButtonGroup
          className={actionsClassName}
          vertical={isVerticalActions}
          break={useBreak}
          primaryAction={approveButton ? { ...approveButton, 'data-test-id': testIds.approve } : undefined}
          secondaryAction={
            cancelButton
              ? { view: VIEW.Outline, appearance: APPEARANCE.Neutral, ...cancelButton, 'data-test-id': testIds.cancel }
              : undefined
          }
          tertiaryAction={
            additionalButton
              ? {
                  view: VIEW.Simple,
                  appearance: APPEARANCE.Neutral,
                  ...additionalButton,
                  'data-test-id': testIds.additional,
                }
              : undefined
          }
        />
      )}
      {disclaimer != null && (
        <div className={disclaimerClassName} data-test-id={testIds.disclaimer}>
          {disclaimer}
        </div>
      )}
    </>
  );
}
