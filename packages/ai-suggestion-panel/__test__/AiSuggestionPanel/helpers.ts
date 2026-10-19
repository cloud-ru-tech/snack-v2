import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const AI_SUGGESTION_PANEL_STORIES = {
  playground: { name: 'aisuggestionpanel', story: 'playground' },
  visualMatrix: { name: 'aisuggestionpanel', story: 'visual-matrix' },
  interactionTest: { name: 'aisuggestionpanel-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_SUGGESTION_PANEL_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    category: 'ai',
    props: { 'data-test-id': TEST_IDS.root, ...props },
    globals,
  };
}

/** Латиница: кириллица в URL-args не резолвится. */
export const ITEMS = [
  { value: 'alert-reason', label: 'Why did the alert fire?' },
  { value: 'vm-monitoring', label: 'How to set up monitoring for all VMs?' },
  { value: 'vm-traffic', label: 'Where to see VM traffic?' },
  { value: 'alert-vm-off', label: 'How to create an alert if the VM is off?' },
  { value: 'vm-metrics', label: 'Which problems do VM metrics show?' },
];
