import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TITLE_CLICKABLE_TEST_ID } from './helpers';

test.describe('TitleClickable — polymorphism', () => {
  test.describe('default (as="a")', () => {
    test('renders as anchor with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'test' }));

      const root = getByTestId(TITLE_CLICKABLE_TEST_ID);
      const tag = await root.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(root).toHaveAttribute('href', 'test');
    });

    test('target=_blank adds rel="noopener noreferrer"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '/test', target: '_blank' }));

      const rel = await getByTestId(TITLE_CLICKABLE_TEST_ID).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    test('target!=_blank does not add rel', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '/test', target: '_self' }));

      const rel = await getByTestId(TITLE_CLICKABLE_TEST_ID).getAttribute('rel');
      expect(rel).toBeNull();
    });
  });

  test.describe('as="button"', () => {
    test('renders as button element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'button', href: undefined }));

      const tag = await getByTestId(TITLE_CLICKABLE_TEST_ID).evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('button');
    });

    test('does not add rel when as=button + target=_blank', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ as: 'button', href: undefined, target: '_blank' }));

      const rel = await getByTestId(TITLE_CLICKABLE_TEST_ID).getAttribute('rel');
      expect(rel).toBeNull();
    });
  });
});
