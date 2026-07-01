import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('ReleaseNotes — interaction', () => {
  test('next button advances to the last page', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    // On the first page the prev button is disabled and next is enabled.
    await expect(getByTestId(TEST_IDS.releaseNotesPrevButton)).toBeDisabled();
    await expect(getByTestId(TEST_IDS.releaseNotesNextButton)).toBeEnabled();

    await getByTestId(TEST_IDS.releaseNotesNextButton).click();

    // On the last page next is disabled and prev becomes enabled.
    await expect(getByTestId(TEST_IDS.releaseNotesNextButton)).toBeDisabled();
    await expect(getByTestId(TEST_IDS.releaseNotesPrevButton)).toBeEnabled();
  });

  test('read later closes release notes', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.releaseNotesReadLaterButton).click();

    await expect(getByTestId(TEST_IDS.releaseNotes)).not.toBeVisible();
  });
});
