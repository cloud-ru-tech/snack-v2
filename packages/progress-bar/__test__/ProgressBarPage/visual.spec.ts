import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForStableRender } from '#playwright-tooling/utils';

/** Полоса доходит до предела за ~50 кадров rAF; 500мс покоя гарантируют, что инкременты кончились. */
const PROGRESS_SETTLE_MS = 500;

import { buildStoryOptions, PROGRESS_BAR_PAGE_STORIES } from './helpers';

test.describe('ProgressBarPage — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PROGRESS_BAR_PAGE_STORIES.visualMatrix));
    await waitForFonts();
    // `inProgress` крутит nprogress: прогресс инкрементится по requestAnimationFrame,
    // пока не упрётся в предел. Снимок без ожидания ловит произвольную ширину полосы.
    await waitForStableRender(page.locator(STORYBOOK_ROOT_SELECTOR), { stableForMs: PROGRESS_SETTLE_MS });

    await assertVisualMatrixSnapshot(page);
  });
});
