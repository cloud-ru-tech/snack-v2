import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

// Title — `Components/IconPredefined`; storybook генерит id `components-iconpredefined--<story>`
// (без дефиса внутри слова). Использовать `name: 'iconpredefined'`.
export const ICON_PREDEFINED_STORIES = {
  playground: { name: 'iconpredefined', story: 'playground' },
  visualMatrix: { name: 'iconpredefined', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ICON_PREDEFINED_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
