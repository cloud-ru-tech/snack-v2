import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('ReleaseNotesModal — rendering', () => {
  test('opens release notes modal with data state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.releaseNotesModal)).toBeVisible();
    await expect(getByTestId(TEST_IDS.releaseNotesItem).first()).toBeVisible();
  });
});
