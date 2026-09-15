import { createContext, useContext } from 'react';

import { CollapseToggleOn } from '../../../types';
import { ItemId } from '../../Items';

export type CollapseLevelContextType = {
  level?: number;
};
export const CollapseLevelContext = createContext<CollapseLevelContextType>({});
export const useCollapseLevelContext = () => useContext(CollapseLevelContext);

export type CollapseContextType = {
  openCollapseItems?: ItemId[];
  toggleOpenCollapseItem?(id: ItemId): void;
  toggleOn?: CollapseToggleOn;
};
export const CollapseContext = createContext<CollapseContextType>({});
export const useCollapseContext = () => useContext(CollapseContext);

export type CollapseState = {
  value?: ItemId[];
  onChange?(value?: ItemId[]): void;
  defaultValue?: ItemId[];
  /**
   * Что переключает раскрытие вложенного списка:
   * <br> - `item` — клик по всей строке (по умолчанию),
   * <br> - `expandIcon` — только клик по шеврону; клик по строке остаётся потребителю
   * (например, когда `itemWrapRender` оборачивает строку в ссылку).
   *
   * Клавиатура (`Enter` / `Space` / `ArrowRight` на строке) раскрывает группу в обоих режимах.
   */
  toggleOn?: CollapseToggleOn;
};
