import { createContext, CSSProperties, ForwardedRef, MouseEvent, ReactNode, useContext, useMemo } from 'react';

import { ITEM_PREFIXES } from '../../../constants';
import { ItemContentProps } from '../../../helperComponents';
import { Mode, Size } from '../../../types';
import { BaseItem, CommonGroupItem, FlattenItem, FocusFlattenItem, ItemId } from '../../Items';

export type ContentRenderProps = {
  id?: ItemId;
  content?: ItemContentProps | ReactNode;
  disabled?: boolean;
};

/**
 * Данные строки для кастомной оболочки (`itemRender`).
 * Поля айтема — `Pick` из `BaseItem`; остальное — runtime-контекст оболочки
 * (слоты, режим выбора, уровень вложенности). Логика клика/выбора остаётся в `BaseItem`.
 * Индикаторы выбора оболочка рисует сама по `selectionMode` / `checked` / `disabled`.
 */
export type ItemRenderProps = Pick<
  BaseItem,
  | 'id'
  | 'content'
  | 'beforeContent'
  | 'afterContent'
  | 'disabled'
  | 'inactive'
  | 'checked'
  | 'className'
  | 'itemRef'
  | 'onClick'
  | 'onMouseDown'
  | 'onKeyDown'
  | 'onFocus'
  | 'data-test-id'
> & {
  /**
   * Уже собранный контент: результат `contentRender`, либо дефолтный `ItemContent`,
   * либо обёртка над произвольным `content`. Кастомная оболочка может использовать его
   * как есть или пересобрать разметку из `content`.
   */
  contentNode: ReactNode;
  /**
   * `true`, если `contentNode` собран через `contentRender` (или это неструктурный
   * `content`). Тогда оболочка должна вставить `contentNode` как есть, а не
   * пересобирать текст из полей `content`.
   */
  contentFromRender?: boolean;
  dragHandle?: ReactNode;
  switchControl?: ReactNode;
  /** Сырая иконка шеврона — обёртку рисует оболочка */
  expandIcon?: ReactNode;
  /** Режим выбора списка (`none` / `single` / `multiple`) */
  selectionMode: Mode;
  open?: boolean;
  isParentNode?: boolean;
  size: Size;
  level: number;
  tabIndex: number;
  /** CSS-переменная `--level` и прочие инлайн-стили корня строки */
  style?: CSSProperties;
  onExpandIconClick?(e: MouseEvent<HTMLElement>): void;
};

/**
 * Данные заголовка группы для кастомной оболочки (`groupItemRender`).
 * Поля заголовка — `Pick` из `CommonGroupItem`; `selectButton` / `selectButtonNode` /
 * `size` / `level` — runtime-контекст (кнопка массового выбора и вложенность).
 */
export type GroupItemRenderProps = Pick<
  CommonGroupItem,
  'label' | 'beforeContent' | 'truncate' | 'groupVariant' | 'divider'
> & {
  /** Уже собранная кнопка массового выбора (если есть). */
  selectButtonNode?: ReactNode;
  selectButton?: {
    onClick?(e: MouseEvent<HTMLElement>): void;
    indeterminate?: boolean;
    checked?: boolean;
    itemRef?: ForwardedRef<HTMLElement>;
    label?: string;
  };
  size: Size;
  level: number;
};

export type PublicListContextType = {
  /** Размер списка */
  size?: Size;
  /** Отображать ли маркер у выбранного элемента списка */
  marker?: boolean;
  /**
   * Рендер функция основного контента айтема
   */
  contentRender?(props: ContentRenderProps): ReactNode;
  /**
   * Рендер-функция оболочки строки вместо дефолтной разметки `BaseItem`.
   * Не задана — строка рисуется как раньше. `itemWrapRender` по-прежнему оборачивает результат.
   */
  itemRender?(props: ItemRenderProps): ReactNode;
  /**
   * Рендер-функция заголовка группы вместо дефолтной разметки `Separator`.
   * Не задана — заголовок/разделитель рисуются как раньше.
   */
  groupItemRender?(props: GroupItemRenderProps): ReactNode;
  virtualized?: boolean;
};

export type PrivateListContextType = {
  flattenItems: Record<string, FlattenItem>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
  firstItemId?: ItemId;
};

type Child = {
  children: ReactNode;
};

type ListContextType = PublicListContextType & PrivateListContextType;

export const ListContext = createContext<ListContextType>({
  flattenItems: {},
  focusFlattenItems: {},
  firstItemId: ITEM_PREFIXES.default,
});

export function useNewListContext() {
  return useContext<ListContextType>(ListContext);
}

function extractListProps<T extends ListContextType>({
  size,
  marker,
  flattenItems,
  focusFlattenItems,
  contentRender,
  itemRender,
  groupItemRender,
  firstItemId,
  virtualized,
}: T) {
  return {
    size,
    marker,
    contentRender,
    itemRender,
    groupItemRender,
    flattenItems,
    focusFlattenItems,
    firstItemId,
    virtualized,
  };
}

export function NewListContextProvider({
  children,
  size,
  marker,
  flattenItems,
  focusFlattenItems,
  contentRender,
  itemRender,
  groupItemRender,
  firstItemId,
  virtualized,
}: ListContextType & Child) {
  const value = useMemo(
    () =>
      extractListProps({
        size,
        marker,
        flattenItems,
        focusFlattenItems,
        contentRender,
        itemRender,
        groupItemRender,
        firstItemId,
        virtualized,
      }),
    [
      size,
      marker,
      flattenItems,
      focusFlattenItems,
      contentRender,
      itemRender,
      groupItemRender,
      firstItemId,
      virtualized,
    ],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}
