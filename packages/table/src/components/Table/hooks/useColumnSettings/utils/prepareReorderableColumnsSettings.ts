import { BaseItemProps, SimpleItem } from '@ds/list';

import { PinnedGroupsState } from '../../../utils/getPinnedGroups';
import { createColumnsSettingsGroupOptions } from './createColumnsSettingsOption';

export type ReorderableColumnsSettings = {
  /** Закреплённые слева — без drag-ручки, только видимость. */
  pinTop: BaseItemProps[];
  /** Незакреплённые — `onItemsReorder`, порядок синхронизируется с таблицей. */
  items: SimpleItem[];
  /** Закреплённые справа — без drag-ручки, только видимость. */
  pinBottom: BaseItemProps[];
};

type PrepareReorderableColumnsSettingsProps<TData extends object> = {
  pinnedGroups: PinnedGroupsState<TData>;
  columnOrder: string[];
};

/**
 * Список колонок для меню настроек в режиме `columnsSettings.enableDrag`: незакреплённые
 * строки — `SimpleItem[]` под `Droplist.onItemsReorder`, pinned — в `pinTop`/`pinBottom`
 * (без ручки, порядок закрепления не меняется). Неактивные — disabled.
 */
export function prepareReorderableColumnsSettings<TData extends object>({
  pinnedGroups,
  columnOrder,
}: PrepareReorderableColumnsSettingsProps<TData>): ReorderableColumnsSettings {
  return {
    pinTop: createColumnsSettingsGroupOptions(pinnedGroups.left, columnOrder),
    items: createColumnsSettingsGroupOptions(pinnedGroups.unpinned, columnOrder),
    pinBottom: createColumnsSettingsGroupOptions(pinnedGroups.right, columnOrder),
  };
}
