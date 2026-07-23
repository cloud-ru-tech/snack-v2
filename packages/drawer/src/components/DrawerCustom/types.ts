import { BottomSheetCustomProps } from '@ds/bottom-sheet';
import { WithSupportProps } from '@ds/utils';
import { DrawerProps as RcDrawerProps } from '@rc-component/drawer';
import { PropsWithChildren, ReactElement } from 'react';

import { Position, Width } from '../../types';

export type DrawerCustomProps = WithSupportProps<
  PropsWithChildren<{
    /** Управление состоянием показан/не показан. */
    open: boolean;
    /** Колбэк закрытия */
    onClose(): void;
    /**
     * Отображение темной подложки
     * @default true
     */
    showBlackout?: boolean;
    /**
     * Расположение
     */
    position: Position;
    /**
     * Ширина (только при position: "left" | "right")
     * @default 's'
     */
    width?: Width | string | number;
    /**
     * Высота панели по контенту (только при `position: "top" | "bottom"`).
     * @default false
     */
    heightAuto?: boolean;
    /** CSS-класс для элемента с контентом */
    className?: string;
    /** CSS-класс для корневого элемента */
    rootClassName?: string;
    /** Смещение при открытии "вложенного" компонента */
    push?: RcDrawerProps['push'];
    /** Контейнер в котором будет рендерится Drawer. По-умолчанию - body */
    container?: string | HTMLElement;
    /** Вложенный Drawer */
    nestedDrawer?: ReactElement<Omit<DrawerCustomProps, 'resizable'>>;
    /** Закрывать дровер при перемещении по истории браузера */
    closeOnPopstate?: boolean;
    /** Футер */
    footer?: ReactElement;
    /** Отключить анимации
     * @default false
     */
    disableMotions?: boolean;
    /**
     * Ширина (только при position: "left" | "right")
     * @default 's'
     */
    resizable?: {
      /** Минимальная доступная ширина */
      min: number;
      /** Максимальная доступная ширина */
      max?: number;
      /** Ширина по умолчанию */
      default?: number;
      /** Колбэк на изменение размера */
      onResize?: (width: number) => void;
      /** Колбэк на окончание изменения размера */
      onResizeEnd?: (width: number) => void;
      /** Tooltip для элемента dragger */
      draggerTooltip?: string;
    };
  }>
> &
  // Только mobile: управляют sheet-поверхностью (на desktop игнорируются).
  Pick<BottomSheetCustomProps, 'snapPoints' | 'swipeEnabled' | 'safeArea'>;
