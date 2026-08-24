import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

const HEADER_CATEGORY = 'uikit-product';
const HEADER_GROUP = 'header';

type HeaderStoryRef = StoryRef & { category: string };

export const USER_MENU_STORIES = {
  playground: {
    category: HEADER_CATEGORY,
    group: HEADER_GROUP,
    name: 'usermenu',
    story: 'playground',
  },
  visualMatrix: {
    category: HEADER_CATEGORY,
    group: HEADER_GROUP,
    name: 'usermenu',
    story: 'visual-matrix',
  },
} as const satisfies Record<string, HeaderStoryRef>;

export function buildUserMenuStoryOptions(
  props?: Record<string, unknown>,
  ref: HeaderStoryRef = USER_MENU_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { ...props },
    globals,
  };
}
