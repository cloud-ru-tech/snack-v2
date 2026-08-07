import { expect, test } from '#playwright-tooling/fixtures';

import { PREVIEW_CONTEXT, VARIANTS } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('PromoTagPredefined — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.promoTag)).toBeVisible();
    });

    test('renders connecting label (en locale)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Connecting,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toContainText('Connecting');
    });

    test('default variant — no tooltip content', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Default,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toBeVisible();
      await expect(getByTestId(TEST_IDS.promoTag)).toContainText('Default');
      await expect(page.getByTestId(TEST_IDS.tooltipContent)).toHaveCount(0);
    });
  });

  test.describe('props propagation', () => {
    test('preview + functional → blue appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Preview,
          context: PREVIEW_CONTEXT.Functional,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toHaveAttribute('data-appearance', 'blue');
    });

    test('partner → orange appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Partner,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toHaveAttribute('data-appearance', 'orange');
    });

    test('freeTier → blue appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.FreeTier,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toHaveAttribute('data-appearance', 'blue');
    });

    test('soon + custom tip → violet appearance and tip content', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Soon,
          tooltipTip: 'Available in Q3',
          requiresCustomTip: true,
          tooltip: { trigger: 'click', open: true },
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toHaveAttribute('data-appearance', 'violet');
      await expect(getByTestId(TEST_IDS.tooltipContent)).toContainText('Available in Q3');
    });

    test('soon without tip → violet appearance, no tooltip content', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Soon,
          tooltipTip: '',
          requiresCustomTip: true,
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toHaveAttribute('data-appearance', 'violet');
      await expect(getByTestId(TEST_IDS.promoTag)).toContainText('Soon');
      await expect(page.getByTestId(TEST_IDS.tooltipContent)).toHaveCount(0);
    });

    test('tooltip trigger click — promo tag remains visible', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Connecting,
          tooltip: { trigger: 'click' },
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toBeVisible();
    });

    test('connecting — tip contains support link', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Connecting,
          tooltip: { trigger: 'click', open: true },
        }),
      );

      await expect(getByTestId(TEST_IDS.tooltipContent)).toBeVisible();
      await expect(getByTestId(TEST_IDS.supportLink)).toBeVisible();
    });
  });
});
