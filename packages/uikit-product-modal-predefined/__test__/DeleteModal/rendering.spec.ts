import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('DeleteModal — rendering', () => {
  test('opens confirmable delete modal', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmable: true, confirmText: 'vm-production-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.deleteModal)).toBeVisible();
    await expect(getByTestId(TEST_IDS.confirmInput)).toBeVisible();
  });
});
