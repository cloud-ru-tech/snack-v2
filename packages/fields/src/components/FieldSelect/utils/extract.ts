import { ItemId } from '@ds/list';
import { Appearance as TagAppearance } from '@ds/tag';

export type WithIdContent = { id?: ItemId; content?: unknown; disabled?: boolean; appearance?: TagAppearance };

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

// Цвет тега выбранного значения (multiple) — паритет с легаси `option.appearance`.
// Проверка типа нужна и при типизированном поле: items часто приходят из ответа бэкенда.
export function extractAppearance(item?: WithIdContent): TagAppearance | undefined {
  return typeof item?.appearance === 'string' ? item.appearance : undefined;
}
