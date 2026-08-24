import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

const HEADER_CATEGORY = 'uikit-product';
const HEADER_GROUP = 'header';

type HeaderStoryRef = StoryRef & { category: string };

export const HEADER_LAYOUT_STORIES = {
  playground: {
    category: HEADER_CATEGORY,
    group: HEADER_GROUP,
    name: 'headerlayout',
    story: 'playground',
  },
  visualMatrix: {
    category: HEADER_CATEGORY,
    group: HEADER_GROUP,
    name: 'headerlayout',
    story: 'visual-matrix',
  },
} as const satisfies Record<string, HeaderStoryRef>;

export function buildHeaderLayoutStoryOptions(
  props?: Record<string, unknown>,
  ref: HeaderStoryRef = HEADER_LAYOUT_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props,
  };
}
