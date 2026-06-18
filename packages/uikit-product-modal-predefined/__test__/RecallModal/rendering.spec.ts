import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('RecallModal — rendering', () => {
  test('opens confirmable recall modal', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmable: true, confirmText: 'recall-operation-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.recallModal)).toBeVisible();
    await expect(getByTestId(TEST_IDS.confirmInput)).toBeVisible();
  });
});
