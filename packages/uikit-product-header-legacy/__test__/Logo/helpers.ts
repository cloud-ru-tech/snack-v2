import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Logo/testIds';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'layout-header-legacy';

type LogoStoryRef = StoryRef & { category: string };

export const LOGO_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'logo', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'logo', story: 'visual-matrix' },
} as const satisfies Record<string, LogoStoryRef>;

/** Ключевые mode (1 представитель на значение оси). */
export const LOGO_KEY_COMBOS = [{ mode: 'prod' }, { mode: 'develop' }, { mode: 'stage' }, { mode: 'hybrid' }] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: LogoStoryRef = LOGO_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      href: '#',
      ...props,
    },
  };
}
