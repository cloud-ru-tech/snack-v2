import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('ReleaseNotesBottomSheet — keyboard', () => {
  test('Escape closes bottom sheet', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.releaseNotesBottomSheet)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.releaseNotesBottomSheet)).not.toBeVisible();
  });
});
