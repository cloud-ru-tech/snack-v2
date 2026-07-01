import { useMemo } from 'react';

import {
  createHierarchicalSelectionHandlers,
  HierarchicalSelectionConfig,
} from '../utils/hierarchicalSelection/createHierarchicalSelectionHandlers';

/**
 * Возвращает стабильные обработчики иерархического выбора с единым `includeParentsInValue`.
 */
export function useHierarchicalSelection({ includeParentsInValue }: HierarchicalSelectionConfig) {
  return useMemo(() => createHierarchicalSelectionHandlers({ includeParentsInValue }), [includeParentsInValue]);
}
