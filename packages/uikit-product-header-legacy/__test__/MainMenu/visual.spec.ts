import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForSettledInViewport } from '#playwright-tooling/utils';

import { buildStoryOptions, MAIN_MENU_STORIES, TEST_IDS } from './helpers';

test.describe('MainMenu — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('open drawer (desktop)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.trigger).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.right));
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open drawer (mobile)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, MAIN_MENU_STORIES.withSampleContent, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.trigger).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.drawerMobile));
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
