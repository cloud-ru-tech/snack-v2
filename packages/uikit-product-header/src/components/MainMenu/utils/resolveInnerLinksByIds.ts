import { InnerLink } from '../types';

export function resolveInnerLinksByIds(ids: string[], servicesById: ReadonlyMap<string, InnerLink>): InnerLink[] {
  if (!ids.length) {
    return [];
  }

  return ids.map(id => servicesById.get(id)).filter((item): item is InnerLink => Boolean(item));
}
