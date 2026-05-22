import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, COLOR, SIZE, VARIANT } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  { size: SIZE.XS, appearance: APPEARANCE.Primary, variant: VARIANT.Count, color: COLOR.Accent },
  { size: SIZE.S, appearance: APPEARANCE.Neutral, variant: VARIANT.CountPlus, color: COLOR.Decor },
  { size: SIZE.S, appearance: APPEARANCE.Critical, variant: VARIANT.CountK, color: COLOR.Accent },
] as const;

test.describe('Counter — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ value: 5 }));

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders value text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ value: 42 }));

      await expect(getByTestId(TEST_IDS.root)).toHaveText('42');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, appearance, variant, color } of KEY_COMBOS) {
      test(`${size} + ${appearance} + ${variant} + ${color}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ value: 1, size, appearance, variant, color }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-appearance', appearance);
        await expect(root).toHaveAttribute('data-variant', variant);
        await expect(root).toHaveAttribute('data-color', color);
      });
    }
  });
});
