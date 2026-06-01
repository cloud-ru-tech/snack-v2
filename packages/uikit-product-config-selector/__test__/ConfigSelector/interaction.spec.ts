import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CONFIG_SELECTOR_STORIES, TEST_IDS } from './helpers';

test.describe('ConfigSelector — interaction', () => {
  // hover по tooltip-порталу нестабилен в storybook-play (см. test-environment-pitfalls),
  // поэтому ветка available+availableTip (checked:false → tooltip открывается) проверяется здесь.
  test('hover on available chip shows availableTip', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, CONFIG_SELECTOR_STORIES.interactionTest));

    await getByTestId(TEST_IDS.availableRoot).hover();
    await expect(getByTestId(TEST_IDS.availableTip)).toBeVisible();

    await page.mouse.move(0, 0);
    await expect(getByTestId(TEST_IDS.availableTip)).toBeHidden();
  });
});
