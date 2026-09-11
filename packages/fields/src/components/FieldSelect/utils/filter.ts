import { FieldSelectItem } from '../types';
import { extractSearchText, WithIdContent } from './extract';

// Subsequence-fuzzy: символы запроса должны встречаться в строке в исходном порядке.
// Пример: query=`lge` matches `Large` (L → r → arg → e).
export function isFuzzyMatch(haystack: string, needle: string): boolean {
  if (!needle) {
    return true;
  }

  let i = 0;

  for (const ch of haystack) {
    if (ch === needle[i]) {
      i += 1;

      if (i === needle.length) {
        return true;
      }
    }
  }

  return false;
}

export function filterItems(items: FieldSelectItem[], query: string, fuzzy: boolean): FieldSelectItem[] {
  if (!query) {
    return items;
  }

  const q = query.toLowerCase();

  const matches = (item: FieldSelectItem): boolean => {
    const text = extractSearchText(item as WithIdContent).toLowerCase();

    return fuzzy ? isFuzzyMatch(text, q) : text.includes(q);
  };

  const walk = (list: FieldSelectItem[]): FieldSelectItem[] =>
    list.flatMap(item => {
      if ('items' in item && Array.isArray(item.items)) {
        const filteredChildren = walk(item.items as FieldSelectItem[]);

        return filteredChildren.length > 0 ? [{ ...item, items: filteredChildren } as FieldSelectItem] : [];
      }

      return matches(item) ? [item] : [];
    });

  return walk(items);
}
