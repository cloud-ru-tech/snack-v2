import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CARD_TEST_ID } from './helpers';

// `as` prop позволяет рендерить Card как `<a>` (или кастомный компонент, например
// `Link` из react-router-dom). Поведенческие проверки клика/клавиатуры покрыты в
// Card.InteractionTest::play; здесь — runtime-атрибуты, которые ставит браузер при
// реальном рендере anchor'а.

test.describe('Card — polymorphism', () => {
  test.describe("as='a'", () => {
    test('renders as anchor element with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test' }));
      const card = getByTestId(CARD_TEST_ID);
      const tag = await card.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(card).toHaveAttribute('href', 'test');
    });

    test("target='_blank' injects rel='noopener noreferrer'", async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', target: '_blank' }));
      const card = getByTestId(CARD_TEST_ID);
      await expect(card).toHaveAttribute('target', '_blank');
      const rel = await card.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    test('disabled anchor uses aria-disabled instead of native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', disabled: true }));
      const card = getByTestId(CARD_TEST_ID);
      await expect(card).toHaveAttribute('aria-disabled', 'true');
      const hasNativeDisabled = await card.evaluate(el => el.hasAttribute('disabled'));
      expect(hasNativeDisabled).toBe(false);
      // tabIndex=-1 на disabled anchor'е, чтобы клавиатура его не достигала.
      await expect(card).toHaveAttribute('tabindex', '-1');
    });
  });
});
