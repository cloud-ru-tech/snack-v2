import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/PlatformLogo/testIds';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'layout-header-legacy';

type PlatformLogoStoryRef = StoryRef & { category: string };

export const PLATFORM_LOGO_STORIES = {
  playground: { category: CATEGORY, group: GROUP, name: 'platform-logo', story: 'playground' },
  visualMatrix: { category: CATEGORY, group: GROUP, name: 'platform-logo', story: 'visual-matrix' },
} as const satisfies Record<string, PlatformLogoStoryRef>;

/** Ключевая выборка variant (+ compact). */
export const PLATFORM_LOGO_KEY_COMBOS = [
  { variant: 'evolution', compact: false },
  { variant: 'advanced', compact: false },
  { variant: 'partner', compact: false },
  { variant: 'marketplace', compact: true },
] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: PlatformLogoStoryRef = PLATFORM_LOGO_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
