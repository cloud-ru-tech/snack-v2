import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, freezeCssAnimations } from '#playwright-tooling/utils';

import { AI_SHIMMER_STORIES, buildStoryOptions } from './helpers';

// Блик shimmer'а — бесконечная CSS-анимация. `animations: 'disabled'` её отменяет (блик уезжает
// в стартовую позицию за кадр), поэтому снимаем с 'allow', предварительно остановив анимацию
// на фиксированной фазе через `freezeCssAnimations`.
const SHIMMER_SCREENSHOT_OPTS = {
  ...SCREENSHOT_DEFAULT_OPTS,
  animations: 'allow',
} as const;

test.describe('AiShimmer — visual regression', () => {
  test.beforeEach(({ browserName }, testInfo) => {
    const currentRun = `${testInfo.project.name}:${browserName}`;
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only (current: ${currentRun})`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_SHIMMER_STORIES.visualMatrix));
    await waitForFonts();
    await freezeCssAnimations(page);
    await assertVisualMatrixSnapshot(page, 'visual-matrix.png', SHIMMER_SCREENSHOT_OPTS);
  });
});
