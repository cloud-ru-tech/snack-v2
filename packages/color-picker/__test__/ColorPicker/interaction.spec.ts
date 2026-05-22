import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, segmentTestId, TEST_IDS } from './helpers';

test.describe('ColorPicker — interaction', () => {
  test('switching to RGB segment renders R/G/B fields', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ availableModes: ['hex', 'rgb', 'hsv'] }));
    await getByTestId(segmentTestId('rgb')).click();
    await expect(getByTestId(TEST_IDS.fieldR)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldG)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldB)).toBeVisible();
  });

  test('Cancel reverts edits back to the controlled value', async ({ gotoStory, getByTestId }) => {
    // Playground default value = #389f74. Меняем hex → жмём Cancel → ожидаем откат.
    await gotoStory(buildStoryOptions({ autoApply: false, availableModes: ['hex'], value: '#389f74' }));
    const input = getByTestId(TEST_IDS.fieldHex).locator('input');
    await expect(input).toHaveValue('389f74');

    await input.fill('ff0000');
    await input.blur();
    await expect(input).toHaveValue('ff0000');

    await getByTestId(TEST_IDS.cancel).click();
    await expect(input).toHaveValue('389f74');
  });
});
