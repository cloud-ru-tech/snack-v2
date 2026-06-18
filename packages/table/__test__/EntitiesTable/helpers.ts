import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { getPageNumberTestId } from '../../../pagination/src/constants';
import { COMFORT_DENSITY_GLOBALS, TEST_IDS } from '../ServerTable/helpers';

export { COMFORT_DENSITY_GLOBALS, getPageNumberTestId, TEST_IDS };

export const ENTITIES_TABLE_STORIES = {
  playground: { name: 'table-entitiestable', story: 'playground' },
  visualMatrix: { name: 'table-entitiestable', story: 'visual-matrix' },
  interactionTest: { name: 'table-entitiestable-tests-interactiontest', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export const ENTITIES_TABLE_KEY_COMBOS = [{ layoutType: 'desktop' as const }, { layoutType: 'mobile' as const }];

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ENTITIES_TABLE_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  const { layoutType, ...storyProps } = props ?? {};

  return {
    ...ref,
    props: {
      'data-test-id': TEST_IDS.serverTable.root,
      ...storyProps,
    },
    globals: {
      ...(layoutType !== undefined ? { layoutType } : {}),
      ...globals,
    },
  };
}
