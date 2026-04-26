import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

test.describe('Button — polymorphism', () => {
  test.describe('as="a"', () => {
    test('renders as anchor element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test' }));

      const tag = await getByTestId(BUTTON_TEST_ID).evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
    });

    test('has href attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test' }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('href', 'test');
    });

    test('target=_blank adds rel containing noopener', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', target: '_blank' }));

      const rel = await getByTestId(BUTTON_TEST_ID).getAttribute('rel');
      expect(rel).toContain('noopener');
    });

    test('disabled uses aria-disabled instead of native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', disabled: true }));

      const button = getByTestId(BUTTON_TEST_ID);
      await expect(button).toHaveAttribute('aria-disabled', 'true');

      const hasNativeDisabled = await button.evaluate(el => el.hasAttribute('disabled'));
      expect(hasNativeDisabled).toBe(false);
    });
  });
});
