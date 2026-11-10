import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TAG_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Tag — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tag.root)).toBeVisible();
    });

    test('label is rendered', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'My label' }));

      await expect(getByTestId(TEST_IDS.tag.root)).toContainText('My label');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, appearance } of TAG_KEY_COMBOS) {
      test(`${appearance} + ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, appearance }));

        const root = getByTestId(TEST_IDS.tag.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test('shows the supplied tooltip on hover', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ tooltipText: 'Role inherited from group' }));

    await getByTestId(TEST_IDS.tag.root).hover();

    await expect(page.getByRole('tooltip')).toHaveText('Role inherited from group');
    await page.mouse.move(0, 0);
    await expect(page.getByRole('tooltip')).not.toBeVisible();
  });

  test.describe('states', () => {
    test('disabled tag renders', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.tag.root)).toBeVisible();
    });
  });
});
