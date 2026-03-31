import { WithSupportProps } from '@design-system/utils';
import { DrawerProps as RcDrawerProps } from 'rc-drawer';
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
     * При `position: "left" | "right"` не используется — поведение и ширина задаются только `width` (`'s' | 'm' | 'l'` или число/строка).
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
    nestedDrawer?: ReactElement<DrawerCustomProps>;
    /** Закрывать дровер при перемещении по истории браузера */
    closeOnPopstate?: boolean;
    /** Футер */
    footer?: ReactElement;
  }>
>;
