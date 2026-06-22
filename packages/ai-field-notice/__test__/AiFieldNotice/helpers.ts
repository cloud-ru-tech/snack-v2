import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export const TEST_IDS = {
  root: 'ai-field-notice',
  queue: 'ai-queue',
  banner: 'ai-field-notice__banner',
  bannerDescription: 'ai-field-banner__description',
  bannerAction: 'ai-field-banner__action',
  bannerIcon: 'ai-field-banner__icon',
  bannerAdditional: 'ai-field-banner__additional',
} as const;

export const AI_FIELD_NOTICE_STORIES = {
  playground: { name: 'aifieldnotice', story: 'playground' },
  visualMatrixScenarioSize: { name: 'aifieldnotice', story: 'visual-matrix-scenario-size' },
  interactionTest: { name: 'aifieldnotice-tests-interaction', story: 'interaction-test' },
  bannerOnly: { name: 'aifieldnotice-tests-interaction', story: 'banner-only' },
} as const satisfies Record<string, StoryRef>;

export type AiFieldNoticeStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiFieldNoticeStoryProps,
  ref: StoryRef = AI_FIELD_NOTICE_STORIES.playground,
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
