import { InnerLink, LinksGroup } from '../types';
import { flatInnerLinks } from './innerLink';

export function flatLinksGroups(groups: LinksGroup[] = []): InnerLink[] {
  return groups.flatMap(({ items }) => flatInnerLinks(items));
}

/** Все видимые сервисы каталога по id (включая вложенные). Строится один раз на набор групп. */
export function buildServicesById(groups: LinksGroup[] = []): Map<string, InnerLink> {
  return new Map(flatLinksGroups(groups).map(service => [service.id, service]));
}
