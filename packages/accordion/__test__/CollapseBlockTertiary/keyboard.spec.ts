import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

test.describe('CollapseBlockTertiary — keyboard', () => {
  test('expands on Enter when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
  });

  test('expands on Space when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
  });
});
