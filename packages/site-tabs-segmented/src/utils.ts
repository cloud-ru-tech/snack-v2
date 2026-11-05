import { TabsSegmentedItem } from './types';

/** Значение первой доступной вкладки — выбор по умолчанию. */
export function getFirstEnabledValue(items: TabsSegmentedItem[]): string | undefined {
  return items.find(item => !item.disabled)?.value;
}

/**
 * Индекс вкладки, на которую переходит фокус по клавише, среди доступных вкладок (по кругу).
 * `undefined` — клавиша не навигационная.
 */
export function getNextFocusIndex(key: string, currentIndex: number, count: number): number | undefined {
  if (count === 0) {
    return undefined;
  }

  switch (key) {
    case 'ArrowRight':
      return (currentIndex + 1) % count;
    case 'ArrowLeft':
      return (currentIndex - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return undefined;
  }
}
