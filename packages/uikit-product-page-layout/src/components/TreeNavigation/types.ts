import { StatusProps } from '@ds/status';
import { TreeNodeId, TreeNodeProps } from '@ds/tree';
import { ReactNode } from 'react';

import { TreeNavigationMode } from '../../types';

export type TreeNavigationProps = {
  header: {
    /** Текст заголовка */
    title: string;
    /** Иконка */
    icon?: ReactNode;
    /** Текст описания */
    description?: string;
    /** Статус (цвет, иконка и т.п.) – любой тип, который принимает ваш <Status/> */
    status?: StatusProps;
    /** Раздел для действий */
    actions?: ReactNode;
  };
  menu: {
    /** Заголовок меню */
    menuTitle?: string;
    /** Данные для дерева меню */
    items: TreeNodeProps[];
    /** Управляемый режим: если передан, меню открывается как popover. */
    isMenuOpen?: boolean;
    /** Колбэк, вызываемый при попытке изменить состояние меню.
     *  В контролируемом режиме обязателен, в неконтролируемом – опционален.
     */
    onMenuToggle?(open: boolean): void;
    /** Открывать меню по умолчанию */
    defaultMenuOpened?: boolean;
    /** Позволяет отключить кнопку "Свернуть все" */
    enableShrinkMenuButton?: boolean;
    /** Открывать пункты меню по умолчанию */
    withDefaultOpenedMenuList?: boolean;
    /** Выбранный элемент меню  */
    selected?: TreeNodeId;
    /** Колбэк, вызываемый при попытке изменить состояние селекта. */
    onSelect?(selectedKey: TreeNodeId | undefined, node: TreeNodeProps): void;
  };
  /** Контентная часть страницы */
  content: ReactNode;
  /** Вариант отображения */
  mode: TreeNavigationMode;
  /** Класс для контейнера контентной части */
  contentClassName?: string;
};
