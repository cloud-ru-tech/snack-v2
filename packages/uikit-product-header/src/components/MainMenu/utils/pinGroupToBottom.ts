import { LinksGroup } from '../types';

export function pinGroupToBottom(groups: LinksGroup[], adminGroupIds: string | string[]): LinksGroup[] {
  const ids = Array.isArray(adminGroupIds) ? adminGroupIds : [adminGroupIds];

  if (ids.length === 0) {
    return groups;
  }

  const adminIdSet = new Set(ids);
  const adminGroups = ids
    .map(id => groups.find(group => group.id === id))
    .filter((group): group is LinksGroup => Boolean(group));
  const otherGroups = groups.filter(group => !adminIdSet.has(group.id));

  return [...otherGroups, ...adminGroups];
}
