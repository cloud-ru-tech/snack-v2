/** Обёртка упрощённого getRowId в сигнатуру Table */
export function wrapGetRowId<T extends object>(getRowId?: (row: T) => string) {
  if (!getRowId) {
    return undefined;
  }

  return (originalRow: T) => getRowId(originalRow);
}
