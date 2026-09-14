import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  title: COMPONENT_TEST_IDS.title,
  content: COMPONENT_TEST_IDS.content,
  expand: COMPONENT_TEST_IDS.expand,
  primaryAction: COMPONENT_TEST_IDS.primaryAction,
  secondaryAction: COMPONENT_TEST_IDS.secondaryAction,
  hint: COMPONENT_TEST_IDS.hint,
  card: COMPONENT_TEST_IDS.card,
  constrainedParent: 'ai-field-request-constrained-parent',
} as const;

export const AI_FIELD_REQUEST_STORIES = {
  playground: { name: 'aifieldrequest', story: 'playground' },
  visualMatrix: { name: 'aifieldrequest', story: 'visual-matrix' },
  interactionTest: { name: 'aifieldrequest-tests-interaction', story: 'interaction-test' },
  shortContent: { name: 'aifieldrequest-tests-interaction', story: 'short-content' },
  loading: { name: 'aifieldrequest-tests-interaction', story: 'loading' },
  controlledOpen: { name: 'aifieldrequest-tests-interaction', story: 'controlled-open' },
  constrainedHeight: { name: 'aifieldrequest-tests-interaction', story: 'constrained-height' },
} as const satisfies Record<string, StoryRef>;

export type AiFieldRequestStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiFieldRequestStoryProps,
  ref: StoryRef = AI_FIELD_REQUEST_STORIES.playground,
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
