/**
 * Встраивает новый порядок колонок из меню настроек в полный `columnOrder`.
 * Колонки вне меню (selection / rowActions) сохраняют свои слоты.
 */
export function mergeColumnOrderFromSettings(columnOrder: string[], settingsOrderedIds: string[]): string[] {
  const settingsSet = new Set(settingsOrderedIds);
  let nextSettingsIndex = 0;

  return columnOrder.map(id => {
    if (!settingsSet.has(id)) {
      return id;
    }

    const nextId = settingsOrderedIds[nextSettingsIndex];
    nextSettingsIndex += 1;

    return nextId ?? id;
  });
}
