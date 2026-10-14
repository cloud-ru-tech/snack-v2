import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';
export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.mama,
  label: COMPONENT_TEST_IDS.label,
  icon: COMPONENT_TEST_IDS.icon,
  loader: COMPONENT_TEST_IDS.loader,
  content: COMPONENT_TEST_IDS.content,
  logo: COMPONENT_TEST_IDS.logo,
} as const;
export const STORIES = {
  playground: { name: 'mama', group: 'buttongiga', story: 'playground' },
  visualMatrix: { name: 'mama', group: 'buttongiga', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = STORIES.playground,
): StorybookUrlOptions {
  return { ...ref, category: 'ai', props: { 'data-test-id': TEST_IDS.root, ...props } };
}
