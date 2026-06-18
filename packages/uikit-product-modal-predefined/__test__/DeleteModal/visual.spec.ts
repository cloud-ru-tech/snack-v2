import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, DELETE_MODAL_STORIES, VM_TRIGGER_TEST_ID } from './helpers';

test.describe('DeleteModal — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('states', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const cells = [];

    for (const state of ['regular', 'confirmable', 'deleting']) {
      await gotoStory(buildStoryOptions(undefined, DELETE_MODAL_STORIES.visualMatrix));
      await getByTestId(VM_TRIGGER_TEST_ID(state)).click();
      await expect(getByTestId(TEST_IDS.deleteModal)).toBeVisible();
      await waitForFonts();
      cells.push({ label: state, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
