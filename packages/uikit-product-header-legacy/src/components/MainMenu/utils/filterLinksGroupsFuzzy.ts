import Fuse from 'fuse.js';

import { FUZZY_SEARCH_THRESHOLD, SearchGroupsAccessor } from '../searchConstants';
import { InnerLink, LinksGroup } from '../types';
import { toggleLayout } from './search';

const prepareItemAccessorKey = (groupId: string, alias: string): string => `${groupId}-${alias}`;

type ItemsMap = Record<string, InnerLink>;

function createItemsMap(links: LinksGroup[]): ItemsMap {
  const itemsMap: ItemsMap = {};

  links.forEach(group => {
    group.items.forEach(item => {
      item.aliases.forEach(alias => {
        const key = prepareItemAccessorKey(group.id, alias);
        itemsMap[key] = item;
      });
    });
  });

  return itemsMap;
}

function isGroupLabelMatch(matchKey: string | undefined): boolean {
  return (
    matchKey === SearchGroupsAccessor.GroupLabelText ||
    matchKey === SearchGroupsAccessor.GroupId ||
    matchKey === SearchGroupsAccessor.GroupAliases
  );
}

export function filterLinksGroupsFuzzy(searchValue: string, links: LinksGroup[]): LinksGroup[] {
  if (!searchValue) {
    return links;
  }

  const itemsMap = createItemsMap(links);
  const linksFuse = new Fuse(links, {
    keys: Object.values(SearchGroupsAccessor),
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
        case SearchGroupsAccessor.ItemLabelText:
        case SearchGroupsAccessor.ItemId: {
          const item = links[originalGroupIndex].items[match.refIndex];

          if (item && !itemsInnerMap[item.id]) {
            itemsInnerMap[item.id] = item;
            items.push(item);
          }

          break;
        }

        case SearchGroupsAccessor.ItemAliases: {
          if (!match.value) {
            break;
          }

          const groupId = fuseResult.item.id;
          const alias = match.value;
          const key = prepareItemAccessorKey(groupId, alias);
          const item = itemsMap[key];

          if (item && !itemsInnerMap[item.id]) {
            itemsInnerMap[item.id] = item;
            items.push(item);
          }

          break;
        }

        case SearchGroupsAccessor.GroupLabelText:
        case SearchGroupsAccessor.GroupId:
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
