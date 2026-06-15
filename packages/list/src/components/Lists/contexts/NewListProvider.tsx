import { createContext, ReactNode, useContext, useMemo } from 'react';

import { ITEM_PREFIXES } from '../../../constants';
import { ItemContentProps } from '../../../helperComponents';
import { Size } from '../../../types';
import { FlattenItem, FocusFlattenItem, ItemId } from '../../Items';

type ContentRenderProps = {
  id?: ItemId;
  content?: ItemContentProps | ReactNode;
  disabled?: boolean;
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
  firstItemId,
  virtualized,
}: T) {
  return { size, marker, contentRender, flattenItems, focusFlattenItems, firstItemId, virtualized };
}

export function NewListContextProvider({
  children,
  size,
  marker,
  flattenItems,
  focusFlattenItems,
  contentRender,
  firstItemId,
  virtualized,
}: ListContextType & Child) {
  const value = useMemo(
    () => extractListProps({ size, marker, flattenItems, focusFlattenItems, contentRender, firstItemId, virtualized }),
    [size, marker, flattenItems, focusFlattenItems, contentRender, firstItemId, virtualized],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}
