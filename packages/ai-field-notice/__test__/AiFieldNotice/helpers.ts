import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { ANIMATION_DELAY_INTERVAL, ANIMATION_HOVER_DELAY, TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

/** Длительность transition пункта описания — см. `.item` в
 * `src/components/AiFieldNoticeAnimatedDescription/styles.module.scss`. */
const DESCRIPTION_TRANSITION_MS = 700;

/** Сколько описание должно простоять неизменным, чтобы автосмена пунктов считалась завершённой:
 * шаг таймера плюс переход. Меньшее окно примет паузу между шагами за покой. */
export const DESCRIPTION_ROTATION_SETTLE_MS = ANIMATION_DELAY_INTERVAL + DESCRIPTION_TRANSITION_MS;

/** То же для hover: после наведения описание уезжает на hover-пункт с задержкой. */
export const DESCRIPTION_HOVER_SETTLE_MS = ANIMATION_HOVER_DELAY + DESCRIPTION_TRANSITION_MS;

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  queue: COMPONENT_TEST_IDS.queue,
  content: COMPONENT_TEST_IDS.content,
  banner: COMPONENT_TEST_IDS.banner,
  // Кросс-пакетный импорт в спеках запрещён, поэтому id баннера — литералы.
  // Синхронизируй с `TEST_IDS` из `@ds/ai-field-banner/src/constants`.
  bannerContent: 'ai-field-banner__content',
  bannerAction: 'ai-field-banner__action',
  bannerIcon: 'ai-field-banner__icon',
  bannerBottomContent: 'ai-field-banner__bottom-content',
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
