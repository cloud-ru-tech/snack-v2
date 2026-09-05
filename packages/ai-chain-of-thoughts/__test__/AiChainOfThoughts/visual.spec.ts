import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, freezeCssAnimations } from '#playwright-tooling/utils';

import { AI_CHAIN_OF_THOUGHTS_STORIES, buildStoryOptions } from './helpers';

// Волна shimmer'а в заголовке — бесконечная CSS-анимация, см. комментарий в спеке Headline.
const WAVE_SCREENSHOT_OPTS = {
  ...SCREENSHOT_DEFAULT_OPTS,
  animations: 'allow',
} as const;

/** Фаза паузы между проходами — та же, что в спеке Headline: сравниваем базовые тона. */
const WAVE_PAUSE_MS = 4600;

test.describe('AiChainOfThoughts — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_CHAIN_OF_THOUGHTS_STORIES.visualMatrix));
    await waitForFonts();
    await freezeCssAnimations(page, WAVE_PAUSE_MS);
    await assertVisualMatrixSnapshot(page, 'visual-matrix.png', WAVE_SCREENSHOT_OPTS);
  });
});
