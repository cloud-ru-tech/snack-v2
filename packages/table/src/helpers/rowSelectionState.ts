import { RowSelectionState } from '@tanstack/react-table';

export function selectedIdsToRowSelectionState(selectedIds: string[]): RowSelectionState {
  return selectedIds.reduce<RowSelectionState>((acc, id) => {
    acc[id] = true;

    return acc;
  }, {});
}

export function rowSelectionStateToSelectedIds(state: RowSelectionState): string[] {
  return Object.keys(state).filter(id => state[id]);
}
