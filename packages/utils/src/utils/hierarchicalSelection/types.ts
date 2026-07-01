export type GroupSelectionState = {
  allSelected: boolean;
  someSelected: boolean;
};

export type HierarchicalAncestor<TId extends string | number = string> = {
  id: TId;
  childIds: TId[];
};

export type GetNodeSelectionStateParams<TId extends string | number = string> = {
  nodeId: TId;
  childIds: TId[];
  selectedIds: TId[];
  includeParentsInValue: boolean;
};

export type ToggleHierarchicalSelectionParams<TId extends string | number = string> = {
  nodeId: TId;
  descendantIds: TId[];
  selectableDescendantIds?: TId[];
  childIds?: TId[];
  selectedIds: TId[];
  ancestors?: HierarchicalAncestor<TId>[];
  includeParentsInValue: boolean;
};
