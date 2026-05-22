import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, STATUS_INDICATOR_SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions live in stories Playground play. Full axis visual
// coverage lives in StatusIndicator.VisualMatrix story snapshot.

const KEY_COMBOS = [
  { appearance: APPEARANCE.Neutral, size: STATUS_INDICATOR_SIZE.XXXXS },
  { appearance: APPEARANCE.Green, size: STATUS_INDICATOR_SIZE.S },
  { appearance: APPEARANCE.Red, size: STATUS_INDICATOR_SIZE.XS },
] as const;

test.describe('StatusIndicator — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.statusIndicator.root)).toBeVisible();
  });

  for (const { appearance, size } of KEY_COMBOS) {
    test(`props propagate: ${appearance} + ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance, size }));
      const root = getByTestId(TEST_IDS.statusIndicator.root);
      await expect(root).toHaveAttribute('data-appearance', appearance);
      await expect(root).toHaveAttribute('data-size', size);
    });
  }
});
