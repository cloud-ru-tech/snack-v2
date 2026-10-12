import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('TitleClickable — polymorphism', () => {
  test.describe('default (as="a")', () => {
    test('renders as anchor with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'test' }));

      const root = getByTestId(TEST_IDS.root);
      const tag = await root.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(root).toHaveAttribute('href', 'test');
    });

    test('target=_blank adds rel="noopener noreferrer"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '/test', target: '_blank' }));

      const root = getByTestId(TEST_IDS.root);
      await expect(root).toHaveAttribute('target', '_blank');
      await expect(root).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('target!=_blank does not add rel', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '/test', target: '_self' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('target', '_self');

      await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('rel');
    });
  });

  test.describe('as="button"', () => {
    test('renders as button element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'button', href: undefined }));

      const tag = await getByTestId(TEST_IDS.root).evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('button');
    });

    test('does not add rel when as=button + target=_blank', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'button', href: undefined, target: '_blank' }));

      await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('rel');
    });
  });
});
