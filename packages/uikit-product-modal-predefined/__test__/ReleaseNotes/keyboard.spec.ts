import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('ReleaseNotes — keyboard', () => {
  test('Escape closes release notes', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.releaseNotes)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.releaseNotes)).not.toBeVisible();
  });
});
