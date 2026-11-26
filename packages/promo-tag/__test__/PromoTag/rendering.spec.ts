import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROMO_TAG_KEY_COMBOS, PROMO_TAG_STORIES, TEST_IDS } from './helpers';

test.describe('PromoTag — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Super promo tag' }));

    await expect(getByTestId(TEST_IDS.root)).toHaveText('Super promo tag');
  });

  for (const variant of ['end', 'middle']) {
    test(`shows the full label for ${variant} truncation`, async ({ gotoStory, getByTestId, page }) => {
      const label = 'Специальное предложение для новых клиентов';
      await gotoStory(buildStoryOptions({ label, 'truncate.variant': variant }, PROMO_TAG_STORIES.withTruncate));

      await getByTestId(TEST_IDS.root).hover();
      await expect(page.getByRole('tooltip')).toHaveText(label);
    });
  }

  test('configures truncation in the playground', async ({ gotoStory, getByTestId, page }) => {
    const label = 'Special promotional offer for new customers';
    await gotoStory(buildStoryOptions({ label, enableTruncate: true, variant: 'middle', tooltipPlacement: 'bottom' }));

    await getByTestId(TEST_IDS.root).hover();
    await expect(page.getByRole('tooltip')).toHaveText(label);
  });

  for (const props of [{ clickable: true }, { as: 'a', href: 'promo' }]) {
    test(`truncates the ${props.clickable ? 'button' : 'link'} without a tooltip`, async ({
      gotoStory,
      getByTestId,
      page,
    }) => {
      const label = 'Special promotional offer for new customers';
      await gotoStory(buildStoryOptions({ ...props, label, enableTruncate: true, variant: 'middle' }));
      const root = getByTestId(TEST_IDS.root);
      await expect(root).toHaveRole(props.clickable ? 'button' : 'link');
      await expect(root).toHaveAccessibleName(label);
      await expect(root.getByText(/Special.*\.\.\..*customers/)).toBeVisible();
      await root.hover();
      await expect(page.getByRole('tooltip')).toHaveCount(0);
    });
  }

  test('renders beforeContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ beforeContent: 'iconBefore', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.beforeNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.afterNode)).toBeHidden();
  });

  test('renders afterContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ afterContent: 'iconAfter', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.afterNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.beforeNode)).toBeHidden();
  });

  test('renders both beforeContent and afterContent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ beforeContent: 'iconBefore', afterContent: 'iconAfter', size: 'xs' }));

    await expect(getByTestId(TEST_IDS.beforeNode)).toBeVisible();
    await expect(getByTestId(TEST_IDS.afterNode)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { appearance, size, roleAppearance } of PROMO_TAG_KEY_COMBOS) {
      test(`${appearance} + ${size} + ${roleAppearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, size, roleAppearance }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-appearance', appearance);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-role-appearance', roleAppearance);
      });
    }
  });
});
