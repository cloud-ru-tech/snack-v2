import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, ERROR_PAGE_STORIES } from './helpers';

test.describe('ErrorPage — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Брейкпоинты компонента — @container, то есть считаются от его собственной ширины.
  // Раскладки desktop / tablet / mobile снимаются секцией «Container width» матрицы
  // (ячейки 1248 / 834 / 360), поэтому отдельных прогонов с setViewportSize не нужно.
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, ERROR_PAGE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
