import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROMO_TAG_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('PromoTag — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ text: 'Super promo tag' }));

    await expect(getByTestId(TEST_IDS.root)).toHaveText('Super promo tag');
  });

  test('renders beforeContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ beforeContent: 'icon16Before', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.beforeNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.afterNode)).toBeHidden();
  });

  test('renders afterContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ afterContent: 'icon16After', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.afterNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.beforeNode)).toBeHidden();
  });

  test('renders both beforeContent and afterContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ beforeContent: 'icon16Before', afterContent: 'icon16After', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.beforeNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.afterNode)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { appearance, size, role } of PROMO_TAG_KEY_COMBOS) {
      test(`${appearance} + ${size} + ${role}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, size, role }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-appearance', appearance);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-role', role);
      });
    }
  });
});
