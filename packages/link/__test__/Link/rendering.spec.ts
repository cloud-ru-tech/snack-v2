import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, LINK_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Link — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Hello link' }));

      await expect(getByTestId(TEST_IDS.root)).toContainText('Hello link');
    });

    test('applies className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-link' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-link/);
    });
  });

  test.describe('props propagation', () => {
    for (const { appearance, roleAppearance } of LINK_KEY_COMBOS) {
      test(`${appearance} + ${roleAppearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, roleAppearance }));

        const link = getByTestId(TEST_IDS.root);
        await expect(link).toHaveAttribute('data-appearance', appearance);
        await expect(link).toHaveAttribute('data-role-appearance', roleAppearance);
      });
    }

    test('underlined=true → data-underlined', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ underlined: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-underlined', 'true');
    });

    test('insideText=true → data-inside-text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ insideText: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-inside-text', 'true');
    });

    test('href is set on anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'https://example.com' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('href', 'https://example.com');
    });
  });
});
