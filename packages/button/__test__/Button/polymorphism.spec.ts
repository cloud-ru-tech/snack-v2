import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Button — polymorphism', () => {
  test.describe('as="a"', () => {
    test('renders as anchor element with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test' }));

      const button = getByTestId(TEST_IDS.button.root);
      const tag = await button.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(button).toHaveAttribute('href', 'test');
    });

    test('target=_blank injects rel="noopener noreferrer"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', target: '_blank' }));

      const button = getByTestId(TEST_IDS.button.root);
      await expect(button).toHaveAttribute('target', '_blank');
      const rel = await button.getAttribute('rel');
      expect(rel).toContain('noopener');
    });

    test('disabled uses aria-disabled instead of native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'a', href: 'test', disabled: true }));

      const button = getByTestId(TEST_IDS.button.root);
      await expect(button).toHaveAttribute('aria-disabled', 'true');

      const hasNativeDisabled = await button.evaluate(el => el.hasAttribute('disabled'));
      expect(hasNativeDisabled).toBe(false);
    });
  });
});
