import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, DRAWER_TRIGGER_TEST_ID, STORIES, TEST_IDS } from './helpers';

test.describe('NotificationPanel — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('open (right, width=s)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(DRAWER_TRIGGER_TEST_ID).click();
    await waitForStableBbox(page.getByTestId(TEST_IDS.panel.title));
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile: панель свапается с desktop-drawer на BottomSheet (адаптивный surface). Форсим раскладку
  // тулбар-глобалом `layoutType='mobile'` + mobile viewport; снимок — весь viewport (full-overlay).
  test('open mobile (bottom sheet surface)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(DRAWER_TRIGGER_TEST_ID).click();
    await waitForStableBbox(page.getByTestId(TEST_IDS.panel.title));
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
