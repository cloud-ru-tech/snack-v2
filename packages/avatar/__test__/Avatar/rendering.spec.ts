import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, SHAPE, SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral checks (abbreviation, image fallback, long names) live in
// stories/Avatar/tests/Avatar.InteractionTest.stories.tsx::play and run via
// `pnpm test:stories`. Visual axis sweeps live in VisualMatrix snapshot.
// Playwright keeps only smoke render + props propagation sampling.

const KEY_COMBOS: ReadonlyArray<{
  size: (typeof SIZE)[keyof typeof SIZE];
  shape: (typeof SHAPE)[keyof typeof SHAPE];
  appearance: (typeof APPEARANCE)[keyof typeof APPEARANCE];
}> = [
  { size: SIZE.Xs, shape: SHAPE.Round, appearance: APPEARANCE.Neutral },
  { size: SIZE.M, shape: SHAPE.Square, appearance: APPEARANCE.Primary },
  { size: SIZE.L, shape: SHAPE.Round, appearance: APPEARANCE.Red },
];

test.describe('Avatar — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  for (const { size, shape, appearance } of KEY_COMBOS) {
    test(`props propagate: size=${size} shape=${shape} appearance=${appearance}`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions({ size, shape, appearance }));
      const root = getByTestId(TEST_IDS.root);
      await expect(root).toHaveAttribute('data-size', size);
      await expect(root).toHaveAttribute('data-shape', shape);
      await expect(root).toHaveAttribute('data-appearance', appearance);
    });
  }

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-avatar-class' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-avatar-class/);
  });
});
