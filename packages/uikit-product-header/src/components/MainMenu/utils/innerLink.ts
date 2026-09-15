import { InnerLink, LinksGroup } from '../types';

export function hasNestedItems(item: InnerLink): boolean {
  return Boolean(item.items?.some(child => !child.hidden));
}

/**
 * Рендерится ли карточка как подкатегория (заголовок {@link TitleClickable} + вложенная сетка).
 *
 * Решение зависит от `viewMode` (не указан — считается `'expandable'`):
 * - `'flat-link'` — никогда, карточка всегда обычная ссылка, даже если `items` заданы.
 * - `'group-title-only'` — всегда, даже без `items`: только заголовок, без раскрываемого тела
 *   и кнопки переключения — карточка ведёт себя как обычная ссылка.
 * - `'expandable'` — только при наличии реальных вложенных сервисов.
 */
export function isSubCategoryCard(item: InnerLink): boolean {
  const viewMode = item.viewMode ?? 'expanded';

  if (viewMode === 'flat-link') {
    return false;
  }

  if (viewMode === 'group-title-only') {
    return true;
  }

  return hasNestedItems(item);
}

export function flatInnerLinks(items: InnerLink[] = []): InnerLink[] {
  return items.flatMap(item => {
    if (item.hidden) {
      return [];
    }

    if (hasNestedItems(item)) {
      return [item, ...flatInnerLinks(item.items)];
    }

    return [item];
  });
}

export function getLinksGroupVisibleItemsCount(group: LinksGroup): number {
  return group.items.reduce((count, item) => {
    if (item.hidden) {
      return count;
    }

    if (hasNestedItems(item)) {
      return count + flatInnerLinks(item.items).length;
    }

    return count + 1;
  }, 0);
}

export function getSubCategoryId(groupId: string, serviceId: string): string {
  return `${groupId}__${serviceId}`;
}

export function getNestedServiceGroupId(groupId: string, serviceId: string): string {
  return `${groupId}/${serviceId}`;
}

export function findNestedInnerLinkParent(group: LinksGroup, leafId: string): InnerLink | undefined {
  return group.items.find(item => hasNestedItems(item) && item.items?.some(child => child.id === leafId));
}
