/**
 * Применяет diff к набору выбранных id.
 */
export function applySelectionDiff<TId extends string | number>(
  selectedIds: TId[],
  added: TId[],
  removed: TId[],
): TId[] {
  const result = new Set(selectedIds);

  for (const id of added) {
    result.add(id);
  }

  for (const id of removed) {
    result.delete(id);
  }

  return [...result];
}
