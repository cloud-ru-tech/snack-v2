import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Слоты сами проставляют `data-test-id` из `src/constants.ts` — импорт из src (не из entry `@ds/popup-private`,
// который тянет CSS-модули, несовместимые с playwright-compile).
import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const POPUP_HEADER_STORIES = {
  playground: { name: 'popupheader', group: 'popupprivate', story: 'playground' },
  visualMatrix: { name: 'popupheader', group: 'popupprivate', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = POPUP_HEADER_STORIES.playground,
): StorybookUrlOptions {
  return { name: ref.name, group: ref.group, story: ref.story, props };
}
