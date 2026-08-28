import { BottomSheetActionButton, BottomSheetProps, FooterActionsOrientation } from '@ds/bottom-sheet';
import { WithSupportProps } from '@ds/utils';
import { ReactElement, ReactNode, Ref } from 'react';

import { DialogBodyProps, DialogHeaderProps } from '../../helperComponents';
import { DrawerCustomProps } from '../DrawerCustom';

/**
 * Адаптивный Drawer: desktop — боковая/верхняя/нижняя панель, `mobile` — `BottomSheet`.
 *
 * Только desktop: `position`, `width`, `heightAuto`, `nestedDrawer` (на mobile игнорируются).
 * Только mobile: `swipeEnabled`, `snapPoints`, `snapIndex`, `onSnapIndexChange`, `safeArea`, `withDividers`
 * (на desktop-панели игнорируются — это анатомия `BottomSheet`).
 */
export type DrawerProps = WithSupportProps<
  Omit<DrawerCustomProps, 'nestedDrawer' | 'push' | 'resizable'> &
    Pick<BottomSheetProps, 'swipeEnabled' | 'snapPoints' | 'snapIndex' | 'onSnapIndexChange' | 'safeArea'> &
    Pick<DialogHeaderProps, 'title' | 'slotAfterTitle' | 'slotSecondTitle' | 'onBackButtonClick'> &
    Pick<DialogBodyProps, 'content'> & {
      /** Ссылка на скроллируемый контейнер контента (например, для дозагрузки по скроллу). */
      contentRef?: Ref<HTMLElement>;
      /** Только mobile: разделители между шапкой/контентом/футером sheet'а. @default false */
      withDividers?: boolean;
      /** Текстовая строка-подзаголовок под title. */
      subtitle?: ReactNode;
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
      /** Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton`. */
      footer?: ReactNode;
      /** Вложенный Drawer */
      nestedDrawer?: ReactElement<DrawerProps>;
    }
>;
