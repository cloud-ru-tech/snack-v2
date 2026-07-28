import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { ANIMATION_DELAY_INTERVAL, ANIMATION_HOVER_DELAY } from '../../src/constants';

/** Длительность transition пункта описания — см. `.item` в
 * `src/components/AiFieldNoticeAnimatedDescription/styles.module.scss`. */
const DESCRIPTION_TRANSITION_MS = 700;

/** Сколько описание должно простоять неизменным, чтобы автосмена пунктов считалась завершённой:
 * шаг таймера плюс переход. Меньшее окно примет паузу между шагами за покой. */
export const DESCRIPTION_ROTATION_SETTLE_MS = ANIMATION_DELAY_INTERVAL + DESCRIPTION_TRANSITION_MS;

/** То же для hover: после наведения описание уезжает на hover-пункт с задержкой. */
export const DESCRIPTION_HOVER_SETTLE_MS = ANIMATION_HOVER_DELAY + DESCRIPTION_TRANSITION_MS;

export const TEST_IDS = {
  root: 'ai-field-notice',
  queue: 'ai-queue',
  description: 'ai-field-notice__description',
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
