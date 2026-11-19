import { useEffect, useMemo, useState } from 'react';

import { SearchState } from '../../../types';
import { Item } from '../../Items';

const MIN_SEARCH_OPTIONS = 10;

function countSearchOptions(items: Item[] = []): number {
  return items.reduce((count, item) => {
    if (item.hidden) return count;
    return count + ('items' in item ? countSearchOptions(item.items) : 1);
  }, 0);
}

export function useDroplistSearch(
  search: SearchState | undefined,
  alwaysShowSearch: boolean | undefined,
  open: boolean,
  items: Item[],
  pinTop?: Item[],
  pinBottom?: Item[],
): SearchState | undefined {
  const enabled = Boolean(search);
  const eligible = useMemo(
    () =>
      enabled &&
      (alwaysShowSearch ||
        countSearchOptions(items) + countSearchOptions(pinTop) + countSearchOptions(pinBottom) >= MIN_SEARCH_OPTIONS),
    [enabled, alwaysShowSearch, items, pinTop, pinBottom],
  );
  // Сохраняем поле до закрытия списка, даже когда фильтрация оставила ноль совпадений.
  const [keepSearchOpen, setKeepSearchOpen] = useState(false);
  useEffect(() => {
    if (!open || !enabled) setKeepSearchOpen(false);
    else if (eligible) setKeepSearchOpen(true);
  }, [open, enabled, eligible]);

  return eligible || keepSearchOpen || search?.value ? search : undefined;
}
