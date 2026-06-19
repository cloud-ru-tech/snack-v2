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

    test('tooltip trigger click — promo tag remains visible', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          variant: VARIANTS.Connecting,
          tooltip: { trigger: 'click' },
        }),
      );

      await expect(getByTestId(TEST_IDS.promoTag)).toBeVisible();
    });
  });
});
