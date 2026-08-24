import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CARD_SERVICE_INFO_STORIES, TEST_IDS } from './helpers';

test.describe('CardServiceInfo — polymorphism', () => {
  test('as="a" renders anchor with href', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_SERVICE_INFO_STORIES.polymorphic));
    const card = getByTestId(TEST_IDS.cardServiceInfo);
    const tag = await card.evaluate((el: Element) => el.tagName.toLowerCase());
    expect(tag).toBe('a');
    await expect(card).toHaveAttribute('href', 'https://cloud.ru');
  });

  test('as="a" + disabled → aria-disabled="true"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ as: 'a', href: 'test-path', disabled: true }));
    await expect(getByTestId(TEST_IDS.cardServiceInfo)).toHaveAttribute('aria-disabled', 'true');
  });
});
