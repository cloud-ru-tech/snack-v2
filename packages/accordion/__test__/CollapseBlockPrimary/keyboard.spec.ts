import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CHEVRON_TEST_ID, COLLAPSE_BLOCK_TEST_ID } from './helpers';

test.describe('CollapseBlockPrimary — keyboard', () => {
  test('chevron button is focusable via Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');

    await expect(getByTestId(CHEVRON_TEST_ID)).toBeFocused();
  });

  test('expands on Enter when chevron focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');
    await expect(getByTestId(CHEVRON_TEST_ID)).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
  });

  test('expands on Space when chevron focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');
    await expect(getByTestId(CHEVRON_TEST_ID)).toBeFocused();

    await page.keyboard.press('Space');

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
  });
});
