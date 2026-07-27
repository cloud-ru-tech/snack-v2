import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForSettledInViewport } from '#playwright-tooling/utils';

import { buildStoryOptions, ERROR_PAGE_STORIES, ERROR_PAGE_TEST_ID, TEST_IDS } from './helpers';

// Ширины подобраны под брейкпоинты styles.module.scss: > 1023 / 768–1023 / ≤ 767.
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
} as const;

test.describe('ErrorPage — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, ERROR_PAGE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Playground рендерит компонент `position: fixed; inset: 0`, поэтому кадр = весь вьюпорт.
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    test(`responsive layout — ${name}`, async ({ page, gotoStory, getByTestId, waitForFonts }) => {
      await page.setViewportSize(viewport);
      await gotoStory(buildStoryOptions());
      await waitForFonts();

      await getByTestId(ERROR_PAGE_TEST_ID).waitFor();

      // На mobile иллюстрация скрыта — стабилизируем по корню, иначе по её ужимающемуся bbox.
      const stabilizeTarget = name === 'mobile' ? ERROR_PAGE_TEST_ID : TEST_IDS.illustration;
      await waitForSettledInViewport(getByTestId(stabilizeTarget));

      expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
        `responsive-${name}.png`,
        MATCH_SNAPSHOT_DEFAULT_OPTS,
      );
    });
  }
});
