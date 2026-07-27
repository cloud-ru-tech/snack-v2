import { APPEARANCE, ButtonGroup, Size, VIEW } from '@ds/button';
import cn from 'classnames';
import { ReactNode } from 'react';

import { FOOTER_ACTIONS_ORIENTATION } from '../../constants';
import { SurfaceTokenSegment } from '../../context/overlaySurface';
import { BottomSheetActionButton, FooterActionsOrientation } from '../../types';
import styles from './styles.module.scss';

/** Идентификаторы слотов кнопок футера. */
export type FooterActionsTestIds = {
  approve: string;
  cancel: string;
  additional: string;
};

export type FooterActionsProps = {
  /** Основная кнопка (по умолчанию `view='filled'`, `appearance='primary'`). */
  approveButton?: BottomSheetActionButton;
  /** Кнопка отмены (по умолчанию `view='outline'`, `appearance='neutral'`). */
  cancelButton?: BottomSheetActionButton;
  /** Дополнительная (третья) кнопка (по умолчанию `view='simple'`, `appearance='neutral'`). */
  additionalButton?: BottomSheetActionButton;
  /**
   * Размер кнопок футера. Задаётся на уровне группы (как в `ButtonGroup`), не по кнопке —
   * в макетах все действия футера одного размера. Нужен потребителям с собственной осью
   * размера (календарные дропдауны: 24 / 32 / 40 при s / m / l); у modal, drawer и
   * bottom-sheet такой оси нет, и размер остаётся дефолтным.
   */
  size?: Size;
  /** Ориентация кнопок при ровно двух действиях. */
  footerActionsOrientation?: FooterActionsOrientation;
  /** Идентификаторы слотов конкретного компонента (`bottom-sheet` / `modal` / `drawer`). */
  testIds: FooterActionsTestIds;
  /** Доп. CSS-класс на `ButtonGroup` (поверх встроенной раскладки по числу действий). */
  actionsClassName?: string;
  /**
   * Поверхность overlay'я — определяет раскладку кнопок:
   * - `window` (desktop, дефолт): 1–2 кнопки компактно вправо, 3 — стопка (primary сверху).
   * - `bottomSheet` (mobile): 1 → вправо, 2 → space-between, 3 → стопка с инверсией (primary внизу).
   */
  surface?: SurfaceTokenSegment;
};

/**
 * Группа кнопок футера (approve / cancel / additional) с раскладкой по поверхности и числу действий.
 * Единый источник правды для `BottomSheet`, `Modal` и `Drawer` (adaptive-маппинг 1:1).
 * Возвращает `null`, если ни одной кнопки не передано.
 */
export function FooterActions({
  approveButton,
  cancelButton,
  additionalButton,
  size,
  footerActionsOrientation = FOOTER_ACTIONS_ORIENTATION.Horizontal,
  testIds,
  actionsClassName,
  surface = 'window',
}: FooterActionsProps): ReactNode {
  const actionCount = [approveButton, cancelButton, additionalButton].filter(Boolean).length;

  if (actionCount === 0) {
    return null;
  }

  const isMobile = surface === 'bottomSheet';
  const isVerticalActions = footerActionsOrientation === FOOTER_ACTIONS_ORIENTATION.Vertical || actionCount === 3;
  const hasTertiary = Boolean(additionalButton);

  // Раскладка кнопок футера зависит от поверхности:
  // - desktop (window): пара `cancel + approve` → компактно вправо (`compact`); пара с tertiary
  //   (`additional + approve`) → space-between, tertiary слева / primary справа (Figma
  //   `popupDropdownFooter` — календарные дропдауны); 3 → стопка, primary сверху (ButtonGroup default).
  // - mobile (bottomSheet): 1 → вправо (`single`); 2 → space-between (`break`); 3 → стопка, инверсия (`stackInverted`).
  const useBreak = !isVerticalActions && actionCount === 2 && (isMobile || (!isMobile && hasTertiary));
  const isSingle = isMobile && actionCount === 1;
  const isCompact = !isMobile && !isVerticalActions && !useBreak;
  const isStackInverted = isMobile && isVerticalActions;

  return (
    <ButtonGroup
      className={cn(
        styles.actions,
        isSingle && styles.single,
        isCompact && styles.compact,
        isStackInverted && styles.stackInverted,
        actionsClassName,
      )}
      size={size}
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
  );
}
