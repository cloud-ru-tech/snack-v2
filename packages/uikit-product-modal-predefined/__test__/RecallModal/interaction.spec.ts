import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('RecallModal — interaction', () => {
  test('invalid confirm keeps modal open and focuses input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmText: 'recall-operation-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.approveButton).click();

    await expect(getByTestId(TEST_IDS.recallModal)).toBeVisible();
    await expect(getByTestId(TEST_IDS.confirmInput).locator('input')).toBeFocused();
  });

  test('valid confirm closes modal through onRecall(onClose)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmText: 'recall-operation-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.confirmInput).locator('input').fill('recall-operation-01');
    await getByTestId(TEST_IDS.approveButton).click();

    await expect(getByTestId(TEST_IDS.recallModal)).not.toBeVisible();
  });
});
