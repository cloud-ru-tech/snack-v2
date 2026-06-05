import { FiltersState } from '@ds/chips';

import { ToolbarBulkActionProps, ToolbarProps } from './types';

export function extractBulkActionsProps({
  onCheck,
  checked,
  indeterminate,
  bulkActions = [],
  selectedCount,
  totalCount,
  showBulkCheckbox,
}: ToolbarBulkActionProps) {
  return {
    onCheck,
    checked,
    indeterminate,
    actions: bulkActions,
    selectedCount,
    totalCount,
    showBulkCheckbox,
  };
}

const BULK_TOOLBAR_PROP_KEYS = [
  'bulkActions',
  'onCheck',
  'checked',
  'indeterminate',
  'selectedCount',
  'totalCount',
  'showBulkCheckbox',
] as const satisfies readonly (keyof ToolbarBulkActionProps)[];

export function isBulkActionsProps<TState extends FiltersState>(
  props: Partial<ToolbarProps<TState>>,
): props is ToolbarBulkActionProps {
  return BULK_TOOLBAR_PROP_KEYS.some(key => props[key] !== undefined);
}
