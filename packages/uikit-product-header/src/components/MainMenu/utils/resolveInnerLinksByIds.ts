import { InnerLink, LinksGroup } from '../types';
import { flatLinksGroups } from './flatLinksGroups';

export function resolveInnerLinksByIds(ids: string[], groups: LinksGroup[]): InnerLink[] {
  if (!ids.length) {
    return [];
  }

  const itemsById = new Map(flatLinksGroups(groups).map(item => [item.id, item]));

  return ids.map(id => itemsById.get(id)).filter((item): item is InnerLink => Boolean(item));
}
