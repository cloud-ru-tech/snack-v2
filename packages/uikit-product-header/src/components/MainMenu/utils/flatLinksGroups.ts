import { InnerLink, LinksGroup } from '../types';
import { flatInnerLinks } from './innerLink';

export function flatLinksGroups(groups: LinksGroup[] = []): InnerLink[] {
  return groups.flatMap(({ items }) => flatInnerLinks(items));
}
