import { checkGroupSelection } from './checkGroupSelection';
import { getNodeSelectionState } from './getNodeSelectionState';
import { toggleHierarchicalSelection } from './toggleHierarchicalSelection';
import { GetNodeSelectionStateParams, ToggleHierarchicalSelectionParams } from './types';

export type HierarchicalSelectionConfig = {
  includeParentsInValue: boolean;
};

export type HierarchicalSelectionNodeParams<TId extends string | number = string> = Omit<
  GetNodeSelectionStateParams<TId>,
  'includeParentsInValue'
>;

export type HierarchicalSelectionToggleParams<TId extends string | number = string> = Omit<
  ToggleHierarchicalSelectionParams<TId>,
  'includeParentsInValue'
>;

/**
 * Создаёт набор обработчиков иерархического выбора с единым `includeParentsInValue`.
 */
export function createHierarchicalSelectionHandlers({ includeParentsInValue }: HierarchicalSelectionConfig) {
  return {
    getSelectionState<TId extends string | number>(params: HierarchicalSelectionNodeParams<TId>) {
      return getNodeSelectionState({ ...params, includeParentsInValue });
    },
    toggleSelection<TId extends string | number>(params: HierarchicalSelectionToggleParams<TId>) {
      return toggleHierarchicalSelection({ ...params, includeParentsInValue });
    },
    checkGroupSelection,
  };
}

export type HierarchicalSelectionHandlers = ReturnType<typeof createHierarchicalSelectionHandlers>;
