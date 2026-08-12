import { LinksGroup } from '../types';

export function pinAdminGroupToBottom(groups: LinksGroup[], adminGroupId: string): LinksGroup[] {
  const adminIndex = groups.findIndex(group => group.id === adminGroupId);

  if (adminIndex === -1) {
    return groups;
  }

  const adminGroup = groups[adminIndex];

  return [...groups.slice(0, adminIndex), ...groups.slice(adminIndex + 1), adminGroup];
}
