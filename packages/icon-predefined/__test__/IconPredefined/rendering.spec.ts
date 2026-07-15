import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const KEY_COMBOS: ReadonlyArray<{
  size: (typeof SIZE)[keyof typeof SIZE];
  appearance: (typeof APPEARANCE)[keyof typeof APPEARANCE];
  shape: 'rounded' | 'squared';
}> = [
  { size: SIZE.M, appearance: APPEARANCE.Primary, shape: 'rounded' },
  { size: SIZE.L, appearance: APPEARANCE.Red, shape: 'squared' },
  { size: SIZE['5XL'], appearance: APPEARANCE.Blue, shape: 'rounded' },
];

test.describe('IconPredefined — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  for (const { size, appearance, shape } of KEY_COMBOS) {
    test(`props propagate: size=${size} appearance=${appearance} shape=${shape}`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions({ size, appearance, shape }));
      const root = getByTestId(TEST_IDS.root);
      await expect(root).toHaveAttribute('data-size', size);
      await expect(root).toHaveAttribute('data-appearance', appearance);
      await expect(root).toHaveAttribute('data-shape', shape);
    });
  }
});
