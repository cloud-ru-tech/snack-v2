import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('ReleaseNotesBottomSheet — interaction', () => {
  test('next button changes page counter', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.releaseNotesNextButton).click();

    await expect(page.getByText('2 / 2')).toBeVisible();
  });

  test('read later closes bottom sheet', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.releaseNotesReadLaterButton).click();

    await expect(getByTestId(TEST_IDS.releaseNotesBottomSheet)).not.toBeVisible();
  });
});
