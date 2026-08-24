import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForSettledInViewport } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';
import { buildUserMenuStoryOptions, USER_MENU_STORIES } from './helpers';

test.describe('UserMenu — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildUserMenuStoryOptions(undefined, USER_MENU_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Droplist рендерится в portal — снимаем весь viewport, а не корень story.
  test('open droplist (desktop)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildUserMenuStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.userMenu.button).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.userMenu.root));
    // Курсор остаётся над триггером и подсвечивает его state-layer — уводим в угол.
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open droplist (mobile)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildUserMenuStoryOptions(undefined, USER_MENU_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.userMenu.button).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.userMenu.root));
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
