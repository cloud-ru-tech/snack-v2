import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  icon: COMPONENT_TEST_IDS.icon,
  description: COMPONENT_TEST_IDS.description,
  action: COMPONENT_TEST_IDS.action,
  additional: COMPONENT_TEST_IDS.additional,
} as const;

export const AI_FIELD_BANNER_STORIES = {
  playground: { name: 'aifieldbanner', story: 'playground' },
  visualMatrixTypeSize: { name: 'aifieldbanner', story: 'visual-matrix-type-size' },
  visualMatrixSlots: { name: 'aifieldbanner', story: 'visual-matrix-slots' },
  interactionTest: { name: 'aifieldbanner-tests-interaction', story: 'interaction-test' },
  withoutIcon: { name: 'aifieldbanner-tests-interaction', story: 'without-icon' },
  withoutAction: { name: 'aifieldbanner-tests-interaction', story: 'without-action' },
} as const satisfies Record<string, StoryRef>;

export type AiFieldBannerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiFieldBannerStoryProps,
  ref: StoryRef = AI_FIELD_BANNER_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
