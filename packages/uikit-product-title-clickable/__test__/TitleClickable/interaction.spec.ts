import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TITLE_CLICKABLE_TEST_ID } from './helpers';

test.describe('TitleClickable — interaction', () => {
  test('is clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TITLE_CLICKABLE_TEST_ID);
    await expect(root).toBeVisible();
    await root.click();
    await expect(root).toBeVisible();
  });

  test('hover on container does not throw', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TITLE_CLICKABLE_TEST_ID);
    await root.hover();
    await expect(root).toBeVisible();
  });
});
