import Fuse from 'fuse.js';

import { FUZZY_SEARCH_THRESHOLD, SEARCH_GROUPS_ACCESSOR } from '../constants';
import { InnerLink, LinksGroup } from '../types';
import { findNestedInnerLinkParent, flatInnerLinks, hasNestedItems } from './innerLink';
import { toggleLayout } from './search';

const prepareItemAccessorKey = (groupId: string, alias: string): string => `${groupId}-${alias}`;

type ItemsMap = Record<string, InnerLink>;

function createItemsMap(links: LinksGroup[]): ItemsMap {
  const itemsMap: ItemsMap = {};

  links.forEach(group => {
    flatInnerLinks(group.items).forEach(item => {
      item.aliases.forEach(alias => {
        const key = prepareItemAccessorKey(group.id, alias);
        itemsMap[key] = item;
      });
    });
  });

  return itemsMap;
}

function appendFilteredGroupItem(
  group: LinksGroup,
  itemsInnerMap: Record<string, InnerLink>,
  items: InnerLink[],
  item: InnerLink,
) {
  if (!itemsInnerMap[item.id]) {
    itemsInnerMap[item.id] = item;
    items.push(item);
  }
}

function appendNestedLeafMatch(
  group: LinksGroup,
  itemsInnerMap: Record<string, InnerLink>,
  items: InnerLink[],
  leafItem: InnerLink,
) {
  const parent = findNestedInnerLinkParent(group, leafItem.id);

  if (!parent) {
    appendFilteredGroupItem(group, itemsInnerMap, items, leafItem);
    return;
  }

  const existingParent = itemsInnerMap[parent.id];

  if (existingParent) {
    const hasLeaf = existingParent.items?.some(item => item.id === leafItem.id);

    if (!hasLeaf) {
      const nextParent = {
        ...existingParent,
        items: [...(existingParent.items ?? []), leafItem],
      };
      itemsInnerMap[parent.id] = nextParent;

      const parentIndex = items.findIndex(item => item.id === parent.id);
      if (parentIndex !== -1) {
        items[parentIndex] = nextParent;
      }
    }

    return;
  }

  itemsInnerMap[parent.id] = {
    ...parent,
    items: [leafItem],
  };
  items.push(itemsInnerMap[parent.id]);
}

function isGroupLabelMatch(matchKey: string | undefined): boolean {
  return (
    matchKey === SEARCH_GROUPS_ACCESSOR.GroupLabelText ||
    matchKey === SEARCH_GROUPS_ACCESSOR.GroupId ||
    matchKey === SEARCH_GROUPS_ACCESSOR.GroupAliases
  );
}

export function filterLinksGroupsFuzzy(searchValue: string, links: LinksGroup[]): LinksGroup[] {
  if (!searchValue) {
    return links;
  }

  const itemsMap = createItemsMap(links);
  const linksFuse = new Fuse(links, {
    keys: Object.values(SEARCH_GROUPS_ACCESSOR),
    includeMatches: true,
    threshold: FUZZY_SEARCH_THRESHOLD,
  });

  let fuseSearchResults = linksFuse.search(searchValue);

  if (fuseSearchResults.length < 1) {
    const fixedLayoutValue = toggleLayout(searchValue);
    fuseSearchResults = linksFuse.search(fixedLayoutValue);
  }

  return fuseSearchResults.reduce((accResult, fuseResult) => {
    if (!fuseResult.matches) {
      return accResult;
    }

    const isMatchByGroup = fuseResult.matches.some(match => isGroupLabelMatch(match.key));

    if (isMatchByGroup) {
      accResult.push(fuseResult.item);
      return accResult;
    }

    const group = fuseResult.item;
    const originalGroupIndex = fuseResult.refIndex;
    const itemsInnerMap: Record<string, InnerLink> = {};
    const items: InnerLink[] = [];

    fuseResult.matches.forEach(match => {
      if (match.refIndex === undefined) {
        return;
      }

      switch (match.key) {
        case SEARCH_GROUPS_ACCESSOR.ItemLabelText:
        case SEARCH_GROUPS_ACCESSOR.ItemId: {
          const item = links[originalGroupIndex].items[match.refIndex];

          if (item && !item.hidden) {
            if (hasNestedItems(item)) {
              appendFilteredGroupItem(group, itemsInnerMap, items, item);
            } else {
              appendNestedLeafMatch(group, itemsInnerMap, items, item);
            }
          }

          break;
        }

        case SEARCH_GROUPS_ACCESSOR.ItemNestedLabelText:
        case SEARCH_GROUPS_ACCESSOR.ItemNestedId: {
          // Fuse `refIndex` для `items.items.*` — индекс во вложенном массиве (или «плоский» по всем
          // nested), а не индекс родителя в `group.items`. Ищем leaf по value среди всех родителей.
          const nestedItem = links[originalGroupIndex].items
            .flatMap(parent => parent.items ?? [])
            .find(child =>
              match.key === SEARCH_GROUPS_ACCESSOR.ItemNestedLabelText
                ? child.label === match.value
                : child.id === match.value,
            );

          if (nestedItem && !nestedItem.hidden) {
            appendNestedLeafMatch(group, itemsInnerMap, items, nestedItem);
          }

          break;
        }

        case SEARCH_GROUPS_ACCESSOR.ItemNestedAliases: {
          if (!match.value) {
            break;
          }

          const groupId = fuseResult.item.id;
          const alias = match.value;
          const key = prepareItemAccessorKey(groupId, alias);
          const item = itemsMap[key];

          if (item) {
            appendNestedLeafMatch(group, itemsInnerMap, items, item);
          }

          break;
        }

        case SEARCH_GROUPS_ACCESSOR.ItemAliases: {
          if (!match.value) {
            break;
          }

          const groupId = fuseResult.item.id;
          const alias = match.value;
          const key = prepareItemAccessorKey(groupId, alias);
          const item = itemsMap[key];

          if (item) {
            appendNestedLeafMatch(group, itemsInnerMap, items, item);
          }

          break;
        }

        case SEARCH_GROUPS_ACCESSOR.GroupLabelText:
        case SEARCH_GROUPS_ACCESSOR.GroupId:
        default:
          return;
      }
    });

    if (items.length > 0) {
      accResult.push({
        ...group,
        items,
      });
    }

    return accResult;
  }, [] as LinksGroup[]);
}
