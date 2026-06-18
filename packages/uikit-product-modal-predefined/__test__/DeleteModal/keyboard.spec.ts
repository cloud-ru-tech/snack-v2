import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('DeleteModal — keyboard', () => {
  test('Escape closes regular modal', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.deleteModal)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.deleteModal)).not.toBeVisible();
  });

  test('Escape does not close forced modal', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'forced' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await page.keyboard.press('Escape');

    await expect(getByTestId(TEST_IDS.deleteModal)).toBeVisible();
  });
});
