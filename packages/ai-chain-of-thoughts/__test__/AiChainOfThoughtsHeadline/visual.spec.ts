import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, freezeCssAnimations } from '#playwright-tooling/utils';

import { AI_CHAIN_OF_THOUGHTS_HEADLINE_STORIES, buildStoryOptions } from './helpers';

// Волна shimmer'а — бесконечная CSS-анимация. `animations: 'disabled'` её отменяет и уводит волну
// за кадр, поэтому снимаем с 'allow', предварительно остановив анимацию на фиксированной фазе.
const WAVE_SCREENSHOT_OPTS = {
  ...SCREENSHOT_DEFAULT_OPTS,
  animations: 'allow',
} as const;

/**
 * Фаза паузы между проходами: волна ушла за правый край, строка стоит на базовых тонах.
 * Матрица сравнивает `shimmer` включённым и выключенным, и сравнивать надо именно тона —
 * иначе строка с волной отличается от строки без неё целиком и регрессия в цвете тонет.
 * Сама волна снимается в матрице `@ds/ai-shimmer`, где она и живёт.
 */
const WAVE_PAUSE_MS = 4600;

test.describe('AiChainOfThoughtsHeadline — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_CHAIN_OF_THOUGHTS_HEADLINE_STORIES.visualMatrix));
    await waitForFonts();
    await freezeCssAnimations(page, WAVE_PAUSE_MS);
    await assertVisualMatrixSnapshot(page, 'visual-matrix.png', WAVE_SCREENSHOT_OPTS);
  });
});
