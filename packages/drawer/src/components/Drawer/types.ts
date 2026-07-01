import { BottomSheetActionButton, BottomSheetProps, FooterActionsOrientation } from '@ds/bottom-sheet';
import { WithSupportProps } from '@ds/utils';
import { ReactElement, ReactNode } from 'react';

import { DialogBodyProps, DialogHeaderProps } from '../../helperComponents';
import { DrawerCustomProps } from '../DrawerCustom';

/**
 * Адаптивный Drawer: desktop — боковая/верхняя/нижняя панель, `mobile` — `BottomSheet`.
 *
 * Только desktop: `position`, `width`, `heightAuto`, `nestedDrawer` (на mobile игнорируются).
 * Только mobile: `swipeEnabled`, `snapPoints`, `snapIndex`, `onSnapIndexChange`, `safeArea`
 * (на desktop-панели игнорируются — это анатомия `BottomSheet`).
 */
export type DrawerProps = WithSupportProps<
  Omit<DrawerCustomProps, 'nestedDrawer' | 'push'> &
    Pick<BottomSheetProps, 'swipeEnabled' | 'snapPoints' | 'snapIndex' | 'onSnapIndexChange' | 'safeArea'> &
    Pick<DialogHeaderProps, 'title' | 'slotAfterHeadline' | 'subtitle' | 'onBackButtonClick'> &
    Pick<DialogBodyProps, 'content'> & {
      /** CSS-класс */
      className?: string;
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
       * @default 'horizontal'
       */
      footerActionsOrientation?: FooterActionsOrientation;
      /** Небольшой текст под кнопками футера (дисклеймер, ссылка и т.п.). */
      disclaimer?: ReactNode;
      /** Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton` / `disclaimer`. */
      footer?: ReactNode;
      /** Вложенный Drawer */
      nestedDrawer?: ReactElement<DrawerProps>;
    }
>;
