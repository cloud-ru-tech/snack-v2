import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, waitForSettledInViewport } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, RECALL_MODAL_STORIES, STORY_TEST_IDS, VM_TRIGGER_TEST_ID } from './helpers';

test.describe('RecallModal — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('states', async ({ page, gotoStory, getByTestId, waitForFonts, remountStory }) => {
    const cells = [];

    await gotoStory(buildStoryOptions(undefined, RECALL_MODAL_STORIES.visualMatrix));
    await waitForFonts();

    for (const state of ['regular', 'confirmable', 'confirmableLong', 'loading']) {
      await remountStory();
      await getByTestId(VM_TRIGGER_TEST_ID(state)).click();
      await expect(getByTestId(TEST_IDS.recallModal)).toBeVisible();
      await waitForFonts();
      cells.push({ label: state, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open-mobile (bottom sheet surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, RECALL_MODAL_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const sheet = getByTestId(TEST_IDS.recallModal);
    await expect(sheet).toBeVisible();
    await waitForSettledInViewport(sheet);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
