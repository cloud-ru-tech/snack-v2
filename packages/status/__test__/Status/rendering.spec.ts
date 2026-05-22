import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, STATUS_SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions live in stories Playground play. Full axis visual
// coverage lives in Status.VisualMatrix story snapshot.

const KEY_COMBOS = [
  { appearance: APPEARANCE.Neutral, size: STATUS_SIZE.XS },
  { appearance: APPEARANCE.Green, size: STATUS_SIZE.S },
  { appearance: APPEARANCE.Red, size: STATUS_SIZE.XS },
] as const;

test.describe('Status — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.status.root)).toBeVisible();
  });

  test('renders with custom label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Success' }));

    await expect(getByTestId(TEST_IDS.status.label)).toHaveText('Success');
  });

  for (const { appearance, size } of KEY_COMBOS) {
    test(`props propagate: ${appearance} + ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance, size }));
      const root = getByTestId(TEST_IDS.status.root);
      await expect(root).toHaveAttribute('data-appearance', appearance);
      await expect(root).toHaveAttribute('data-size', size);
    });
  }

  test('hasBackground propagates to data-has-background', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ hasBackground: true }));
    await expect(getByTestId(TEST_IDS.status.root)).toHaveAttribute('data-has-background', 'true');
  });

  test('loading forces neutral appearance', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true, appearance: APPEARANCE.Red }));
    await expect(getByTestId(TEST_IDS.status.root)).toHaveAttribute('data-appearance', APPEARANCE.Neutral);
  });
});
