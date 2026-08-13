import { Size } from '@ds/field-decorator';
import { ItemId, ItemProps } from '@ds/list';
import { Appearance as TagAppearance, Size as TagSize } from '@ds/tag';

import { SELECTION_MODE } from './constants';
import { FieldSelectMultipleProps, FieldSelectProps } from './types';

export const TAG_SIZE_MAP: Record<Size, TagSize> = { s: 'xs', m: 'xs', l: 's' };

export type WithIdContent = { id?: ItemId; content?: unknown; disabled?: boolean; appearance?: unknown };

export function extractLabel(item: WithIdContent): string {
  const { content, id } = item;

  if (!content) {
    return String(id ?? '');
  }

  if (typeof content === 'string' || typeof content === 'number') {
    return String(content);
  }

  if (typeof content === 'object' && content !== null && 'label' in content) {
    return String((content as { label: unknown }).label);
  }

  return String(id ?? '');
}

// Текст для поиска: лейбл (option) + caption + description — паритет с легаси `useSearch`,
// который матчил запрос по всем трём полям контента, а не только по лейблу.
export function extractSearchText(item: WithIdContent): string {
  const parts = [extractLabel(item)];
  const { content } = item;

  if (content && typeof content === 'object') {
    const c = content as { caption?: unknown; description?: unknown };

    if (typeof c.caption === 'string') {
      parts.push(c.caption);
    }

    if (typeof c.description === 'string') {
      parts.push(c.description);
    }
  }

  return parts.join(' ');
}

// Цвет чипа выбранного значения (multiple) — паритет с легаси `option.appearance`.
// Берётся с самого item'а (additive: потребитель задаёт `appearance` на элементе items).
export function extractAppearance(item?: WithIdContent): TagAppearance | undefined {
  const a = item?.appearance;

  return typeof a === 'string' ? (a as TagAppearance) : undefined;
}

export function flatten(items: ItemProps[]): WithIdContent[] {
  const out: WithIdContent[] = [];

  for (const item of items) {
    out.push(item as WithIdContent);

    if ('items' in item && Array.isArray(item.items)) {
      out.push(...flatten(item.items as ItemProps[]));
    }
  }

  return out;
}

export function findItem(items: ItemProps[], id: ItemId): WithIdContent | undefined {
  for (const item of flatten(items)) {
    if (item.id === id) {
      return item;
    }
  }

  return undefined;
}

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

export function filterItems(items: ItemProps[], query: string, fuzzy: boolean): ItemProps[] {
  if (!query) {
    return items;
  }

  const q = query.toLowerCase();

  const matches = (item: ItemProps): boolean => {
    const text = extractSearchText(item as WithIdContent).toLowerCase();

    return fuzzy ? isFuzzyMatch(text, q) : text.includes(q);
  };

  const walk = (list: ItemProps[]): ItemProps[] =>
    list.flatMap(item => {
      if ('items' in item && Array.isArray(item.items)) {
        const filteredChildren = walk(item.items as ItemProps[]);

        return filteredChildren.length > 0 ? [{ ...item, items: filteredChildren } as ItemProps] : [];
      }

      return matches(item) ? [item] : [];
    });

  return walk(items);
}

export function isMultiple(props: FieldSelectProps): props is FieldSelectMultipleProps {
  return props.selection === SELECTION_MODE.Multiple;
}
