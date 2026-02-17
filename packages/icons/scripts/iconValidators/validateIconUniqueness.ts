import { Validator } from './types';

/** Check uniqueness within the same group (path prefix before first /). */
export const validateIconUniqueness: Validator = {
  error: `duplicated icon within group, please remove it`,
  validate: ({ icon, allIcons }) => {
    const iconGroup = icon.path.split('/')[0];
    const sameGroup = allIcons.filter(i => i.path.startsWith(iconGroup + '/'));
    return sameGroup.filter(({ content }) => content === icon.content).length === 1;
  },
};
