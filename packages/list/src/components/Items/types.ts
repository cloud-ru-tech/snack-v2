import { TruncateStringProps } from '@ds/truncate-string';
import { WithSupportProps } from '@ds/utils';
import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { ITEM_TYPE } from '../../constants';
import { ItemContentProps } from '../../helperComponents';
import { ItemType, ScrollProps } from '../../types';

/** Идентификатор элемента списка */
export type ItemId = string | number;

type ItemContent = ItemContentProps;

export type BaseItem = WithSupportProps<{
  /**
   * Слот до основного контента
   * @type ReactElement
   */
  beforeContent?: ReactNode;
  /**
   * Слот после основного контента
   * @type ReactElement
   */
  afterContent?: ReactNode;
  /**
   * Основной контент айтема
   */
  content?: ItemContent | ReactNode;
  /** Колбек обработки клика */
  onClick?(e: MouseEvent<HTMLElement>): void;
  /** Колбек обработки нажатия кнопки мыши */
  onMouseDown?(e: MouseEvent<HTMLElement>): void;
  /** Колбек обработки нажатия клавиши */
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  /** Колбек обработки фокуса */
  onFocus?(e: FocusEvent<HTMLElement>): void;
  /** Колбек обработки блюра */
  onBlur?(e: FocusEvent<HTMLElement>): void;
  /** Уникальный идентификатор */
  id?: ItemId;
  /** Флаг неактивности элемента */
  disabled?: boolean;
  /** Скрыть элемент из списка (не рендерится и исключается из навигации) */
  hidden?: boolean;
  /** Ссылка на DOM-элемент айтема */
  itemRef?: RefObject<HTMLElement>;
  /** CSS-класс */
  className?: string;
  /**
   * Флаг отображения отключения реакции на любое css состояние (hover/focus и тд)
   * <br>
   * Также элемент исключается из навигации с клавиатуры и не может быть выбран (selection)
   */
  inactive?: boolean;
  /**
   * Флаг отображения состояния выбранного элемента через switch
   */
  switch?: boolean;
  /**
   * Флаг отображения иконки у чекбоксов
   */
  showSwitchIcon?: boolean;
  /** Рендер-обёртка вокруг айтема (например, для проксирования в `Tooltip`/`Link`) */
  itemWrapRender?(item: ReactNode): ReactNode;
  /** Управляемое состояние выбранности айтема */
  checked?: boolean;
}>;

type BaseItemWithoutNonGroup = Omit<BaseItem, 'switch' | 'inactive'>;

export type Item = BaseItem | AccordionItem | NextListItem | GroupItem | GroupSelectItem;

export type AccordionItem = BaseItemWithoutNonGroup & {
  items: Item[];
  type: typeof ITEM_TYPE.Collapse;
};

export type NextListItem = BaseItemWithoutNonGroup &
  ScrollProps & {
    items: Item[];
    type: typeof ITEM_TYPE.NextList;

    /** Колбек смены состояния вложенного списка (открыт/закрыт) */
    onSublistOpenChanged?(open: boolean, id?: ItemId): void;

    /** Состояние загрузки вложенного списка — показывается спиннер вместо элементов */
    loading?: boolean;
    /** Загрузка вложенного списка завершилась ошибкой — показывается `errorDataState` */
    dataError?: boolean;
    /** Вложенный список отфильтрован — пустой результат показывает `noResultsState`, а не `noDataState` */
    dataFiltered?: boolean;

    /** Сторона, с которой раскрывается вложенный список относительно элемента */
    placement?: 'right-start' | 'left-start' | 'left' | 'right' | 'left-end' | 'right-end';
  };

type CommonGroupItem = {
  /** Заголовок группы */
  label?: string;
  /** Слот иконки слева от label. */
  beforeContent?: ReactNode;
  /** Настройки усечения длинного заголовка группы */
  truncate?: {
    variant?: TruncateStringProps['variant'];
  };
  /** Визуальный стиль заголовка группы */
  groupVariant?: 'subtitle' | 'subtitleTertiary';
  /** Скрыть группу из списка */
  hidden?: boolean;
  /** Показать разделитель над группой */
  divider?: boolean;
};

export type GroupItem = CommonGroupItem & {
  items: Item[];
  type: typeof ITEM_TYPE.Group;
};

export type GroupSelectItem = CommonGroupItem & {
  items: Item[];
  type: typeof ITEM_TYPE.GroupSelect;
  selectButtonLabel?: string;

  id?: ItemId;
  itemRef?: RefObject<HTMLElement>;
};

type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export type Flatten<T, K extends keyof T> = RequiredFields<T, K>;

export type CommonFlattenProps = {
  items: ItemId[];
  allChildIds: ItemId[];
};

export type FlattenBaseItem = Flatten<BaseItem, 'id'>;
export type FlattenNextListItem = Flatten<Omit<NextListItem, 'items'>, 'id'>;
export type FlattenGroupListItem = Omit<GroupItem, 'items'> & { id: ItemId };
export type FlattenGroupSelectListItem = Flatten<Omit<GroupSelectItem, 'items'>, 'id'>;
export type FlattenAccordionItem = Flatten<Omit<AccordionItem, 'items'>, 'id'>;

/**
 * Строка `List`/`Droplist` в режиме drag&drop-переупорядочивания (проп `onItemsReorder`) —
 * облегчённый аналог `BaseItem` без `type`-дискриминатора и без вложенности: не поддерживает
 * `collapse`/`group-select`/`next-list`. `id` обязателен (нужен `@dnd-kit` как identity
 * сортируемого элемента). Верхний уровень reorder-дерева описывает `ReorderItem` (строка или
 * группа с заголовком); переупорядочивание идёт только среди «братьев» — строк одного уровня
 * (внутри одной группы либо между строками без группы), перенос между группами не поддерживается,
 * см. `reorderReorderItems`.
 *
 * `disabled` блокирует выбор, `Switch` и клик, но **не** ручку перетаскивания — порядок можно менять и у
 * задизейбленных строк.
 */
export type SimpleItem = Flatten<BaseItem, 'id'>;

/**
 * Группа reorder-режима: заголовок (`label` и остальные поля `GroupItem`) + сортируемые строки
 * `items`. Строки переставляются **внутри** группы, а сама группа переставляется среди других
 * групп верхнего уровня (за ручку на заголовке) — поэтому у группы обязателен `id` (identity для
 * `@dnd-kit`). Вложенность ограничена одним уровнем: в `items` только листовые `SimpleItem`.
 */
export type SimpleGroupItem = CommonGroupItem & {
  /** Идентификатор группы — нужен `@dnd-kit` для переупорядочивания групп между собой. */
  id: ItemId;
  items: SimpleItem[];
  type: typeof ITEM_TYPE.Group;
};

/** Верхнеуровневый элемент reorder-дерева (`onItemsReorder`): строка или группа с заголовком. */
export type ReorderItem = SimpleItem | SimpleGroupItem;

export type FlattenSimpleItem = FlattenBaseItem & CommonFlattenProps;

export type FlattenItem =
  | FlattenBaseItem
  | ((
      FlattenNextListItem | FlattenGroupListItem | FlattenAccordionItem | FlattenGroupSelectListItem | FlattenSimpleItem
    ) &
      CommonFlattenProps);

export type FocusFlattenItem = {
  key: ItemId;
  id: ItemId;

  originalId: ItemId;
  parentId?: ItemId;

  itemRef?: RefObject<HTMLElement>;
  type?: ItemType;

  disabled?: boolean;
} & CommonFlattenProps;

export type ItemProps = Item;
export type BaseItemProps = BaseItem;
export type GroupItemProps = GroupItem;
export type NextListItemProps = NextListItem;
export type AccordionItemProps = AccordionItem;
export type GroupSelectItemProps = GroupSelectItem;
