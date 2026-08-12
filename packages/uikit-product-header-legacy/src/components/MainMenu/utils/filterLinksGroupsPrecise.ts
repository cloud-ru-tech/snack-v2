import { InnerLink, LinksGroup } from '../types';
import { matchSearchString } from './search';

function matchesGroup(group: LinksGroup, searchValue: string): boolean {
  return Boolean(group.label && matchSearchString(group.label.text, searchValue));
}

function matchesItem(item: InnerLink, searchValue: string): boolean {
  return matchSearchString(item.label, searchValue);
}

export function filterLinksGroupsPrecise(searchValue: string, links: LinksGroup[]): LinksGroup[] {
  if (!searchValue || links.length < 1) {
    return links;
  }

  return links.reduce((result, group) => {
    if (matchesGroup(group, searchValue)) {
      result.push(group);
      return result;
    }

    const items = group.items.filter(item => matchesItem(item, searchValue));

    if (items.length > 0) {
      result.push({ ...group, items });
    }

    return result;
  }, [] as LinksGroup[]);
}
