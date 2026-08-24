import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// TEST_IDS слотов подсказки приходят из `src/constants` через stories-обёртку —
// один источник строк для компонента, stories и spec'ов.
export { TEST_IDS } from '../../stories/WelcomeTour/testIds';

export const WELCOME_TOUR_STORIES = {
  playground: { name: 'welcometour', story: 'playground' },
  visualMatrix: { name: 'welcometour', story: 'visual-matrix' },
  // stories/WelcomeTour/examples/WelcomeTour.Controlled.stories.tsx
  controlled: { name: 'welcometour-examples-controlled', story: 'controlled' },
  // stories/WelcomeTour/tests/WelcomeTour.InteractionTest.stories.tsx
  interactionTest: { name: 'welcometour-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type WelcomeTourStoryProps = Record<string, unknown>;

/**
 * `data-test-id` в `props` не кладём: своего DOM-узла у `WelcomeTour` нет, атрибут
 * компонент не принимает. Слоты подсказки адресуются через `TEST_IDS`.
 */
export function buildStoryOptions(
  props?: WelcomeTourStoryProps,
  ref: StoryRef = WELCOME_TOUR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
  };
}
