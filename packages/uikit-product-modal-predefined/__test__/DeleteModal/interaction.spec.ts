import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

test.describe('DeleteModal — interaction', () => {
  test('invalid confirm keeps modal open and focuses input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmable: true, confirmText: 'vm-production-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.approveButton).click();

    await expect(getByTestId(TEST_IDS.deleteModal)).toBeVisible();
    await expect(getByTestId(TEST_IDS.confirmInput).locator('input')).toBeFocused();
  });

  test('valid confirm closes modal through onDelete(onClose)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ confirmable: true, confirmText: 'vm-production-01' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(TEST_IDS.confirmInput).locator('input').fill('vm-production-01');
    await getByTestId(TEST_IDS.approveButton).click();

    await expect(getByTestId(TEST_IDS.deleteModal)).not.toBeVisible();
  });
});
