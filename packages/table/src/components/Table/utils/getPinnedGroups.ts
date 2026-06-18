import { ColumnDefinition } from '../../../types';

export type PinnedGroupsState<TData extends object> = {
  left: ColumnDefinition<TData>[];
  right: ColumnDefinition<TData>[];
  unpinned: ColumnDefinition<TData>[];
};

/**
 * Отвечает за распределение columnDefinitions по возможным pinned группам. Возвращает PinnedGroupsState
 * @function getPinnedGroups
 */
export function getPinnedGroups<TData extends object>(
  columnDefinitions: ColumnDefinition<TData>[],
): PinnedGroupsState<TData> {
  return columnDefinitions.reduce<PinnedGroupsState<TData>>(
    (accPinnedState, colDef) => {
      switch ('pinned' in colDef ? colDef.pinned : undefined) {
        case 'left':
          accPinnedState.left.push(colDef);
          break;
        case 'right':
          accPinnedState.right.push(colDef);
          break;
        default:
          accPinnedState.unpinned.push(colDef);
      }

      return accPinnedState;
    },
    {
      left: [],
      right: [],
      unpinned: [],
    },
  );
}
