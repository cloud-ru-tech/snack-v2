import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CARD_TEST_ID } from './helpers';

test.describe('Card — interaction', () => {
  test('click: card receives pointer click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const card = getByTestId(CARD_TEST_ID);
    await card.click();

    await expect(card).toBeVisible();
  });

  test('focus: Tab moves focus onto the card root', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const card = getByTestId(CARD_TEST_ID);
    await expect(card).toHaveAttribute('tabindex', '0');

    await page.keyboard.press('Tab');
    await expect(card).toBeFocused();
  });
});
