import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, ORIENTATION, VARIANT } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  { variant: VARIANT.Regular, orientation: ORIENTATION.Horizontal },
  { variant: VARIANT.Thin, orientation: ORIENTATION.Vertical },
] as const;

test.describe('Divider — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('exposes role="separator"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('role', 'separator');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-divider-class' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-divider-class/);
    });
  });

  test.describe('props propagation', () => {
    for (const { variant, orientation } of KEY_COMBOS) {
      test(`variant=${variant} + orientation=${orientation}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ variant, orientation }));

        const divider = getByTestId(TEST_IDS.root);
        await expect(divider).toHaveAttribute('data-variant', variant);
        await expect(divider).toHaveAttribute('data-orientation', orientation);
        await expect(divider).toHaveAttribute('aria-orientation', orientation);
      });
    }

    test('appearance=invertNeutral', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance: APPEARANCE.InvertNeutral }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', APPEARANCE.InvertNeutral);
    });
  });
});
