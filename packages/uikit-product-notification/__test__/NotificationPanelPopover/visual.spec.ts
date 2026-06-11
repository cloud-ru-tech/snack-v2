import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, DRAWER_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

test.describe('NotificationPanelPopover — visual regression', () => {
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
});
