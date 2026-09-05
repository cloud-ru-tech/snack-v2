import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, freezeCssAnimations } from '#playwright-tooling/utils';

import { AI_SHIMMER_STORIES, buildStoryOptions } from './helpers';

// Волна shimmer'а — бесконечная CSS-анимация. `animations: 'disabled'` её отменяет (волна уезжает
// в стартовую позицию за кадр), поэтому снимаем с 'allow', предварительно остановив анимацию
// на фиксированной фазе через `freezeCssAnimations`.
const SHIMMER_SCREENSHOT_OPTS = {
  ...SCREENSHOT_DEFAULT_OPTS,
  animations: 'allow',
} as const;

/**
 * Фаза, на которой волна стоит ровно посреди строки: при проходе 3000 мс от `-1.5 × W` до
 * `0.5 × W` и центре акцентной полосы на 54% её ширины центр приходится на 46% прохода.
 * Значение не зависит от ширины строки, поэтому одинаково годится для всех ячеек матрицы.
 */
const WAVE_MID_SWEEP_MS = 1400;

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
    await freezeCssAnimations(page, WAVE_MID_SWEEP_MS);
    await assertVisualMatrixSnapshot(page, 'visual-matrix.png', SHIMMER_SCREENSHOT_OPTS);
  });
});
