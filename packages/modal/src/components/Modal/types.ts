import { BottomSheetActionButton, FooterActionsOrientation } from '@ds/bottom-sheet';
import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DialogBodyProps, DialogHeaderProps } from '../../helperComponents';
import { ModalCustomProps } from '../ModalCustom';

/**
 * Адаптивный Modal: desktop — модальное окно, `mobile` — `BottomSheet`.
 *
 * Только desktop: `width`, `heightAuto`, `truncate` (на mobile игнорируются).
 * На mobile `mode` передаётся в `BottomSheet`: `aggressive` и `forced` размывают фон
 * и запрещают закрытие кликом по подложке; `forced` также отключает свайп.
 */
export type ModalProps = WithSupportProps<
  Pick<DialogHeaderProps, 'onBackButtonClick' | 'title' | 'slotAfterTitle' | 'subtitle' | 'truncate'> &
    Pick<DialogBodyProps, 'content'> &
    Pick<
      ModalCustomProps,
      'open' | 'onClose' | 'mode' | 'rootClassName' | 'width' | 'heightAuto' | 'container' | 'closeOnPopstate'
    > & {
      /** Медиа-контент */
      media?: ReactNode;
      /** Основная кнопка действия — пропсы `Button` (дефолт `view='filled'`, `appearance='primary'`). */
      approveButton?: BottomSheetActionButton;
      /** Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`). */
      cancelButton?: BottomSheetActionButton;
      /** Дополнительная (третья) кнопка — пропсы `Button` (дефолт `view='simple'`, `appearance='neutral'`). */
      additionalButton?: BottomSheetActionButton;
      /**
       * Ориентация кнопок футера. Применяется только при двух кнопках; игнорируется при заданном `footer`.
       * По умолчанию 'vertical' на mobile, 'horizontal' на desktop.
       */
      footerActionsOrientation?: FooterActionsOrientation;
      /** Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton`. */
      footer?: ReactNode;
      /** CSS-класс для окна */
      className?: string;
      /** Состояние загрузки: в теле показывается спиннер или `loadingState`, футер скрыт */
      loading?: boolean;
      /** Контент тела вместо спиннера при `loading` */
      loadingState?: ReactNode;
    }
>;
