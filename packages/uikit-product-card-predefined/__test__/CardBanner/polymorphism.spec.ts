import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CARD_BANNER_STORIES, TEST_IDS } from './helpers';

test.describe('CardBanner — polymorphism', () => {
  test.describe('as="a"', () => {
    test('renders as anchor element with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test-path' }));
      const card = getByTestId(TEST_IDS.cardBanner);
      const tag = await card.evaluate((el: Element) => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(card).toHaveAttribute('href', 'test-path');
    });

    test('target="_blank" injects rel containing noopener', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, CARD_BANNER_STORIES.polymorphic));
      const card = getByTestId(TEST_IDS.cardBanner);
      await expect(card).toHaveAttribute('target', '_blank');
      const rel = await card.getAttribute('rel');
      expect(rel).toContain('noopener');
    });
  });

  test.describe('as="button"', () => {
    test('renders as button element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'button' }));
      const card = getByTestId(TEST_IDS.cardBanner);
      const tag = await card.evaluate((el: Element) => el.tagName.toLowerCase());
      expect(tag).toBe('button');
    });
  });
});
