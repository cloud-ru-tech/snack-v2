import { InnerLink, LinksGroup } from '../types';

export function hasNestedItems(item: InnerLink): boolean {
  return Boolean(item.items?.some(child => !child.hidden));
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
