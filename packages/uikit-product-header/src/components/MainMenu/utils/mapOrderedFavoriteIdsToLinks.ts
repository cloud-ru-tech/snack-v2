import { InnerLink } from '../types';

export function mapOrderedFavoriteIdsToLinks(
  orderedIds: string[],
  currentFavorites: InnerLink[],
  catalog: Map<string, InnerLink>,
): InnerLink[] {
  const currentById = new Map(currentFavorites.map(service => [service.id, service]));

  return orderedIds
    .map(id => currentById.get(id) ?? catalog.get(id))
    .filter((service): service is InnerLink => Boolean(service));
}
