import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions } from './helpers';

test.describe('AiHistoryLineRequest — rendering', () => {
  test('keeps the separator only when both values exist', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const metadata = getByTestId(TEST_IDS.requestMetadata);
    await expect(metadata).toHaveCount(3);
    await expect(metadata.nth(0).locator('span')).toHaveCount(1);
    await expect(metadata.nth(1).locator('span')).toHaveCount(1);
    await expect(metadata.nth(2).locator('span')).toHaveCount(3);
    await expect(metadata.nth(0)).not.toContainText('·');
    await expect(metadata.nth(1)).not.toContainText('·');
    await expect(metadata.nth(2)).toContainText('·');
    await expect(metadata.nth(2)).toHaveCSS('gap', '8px');
  });
});
