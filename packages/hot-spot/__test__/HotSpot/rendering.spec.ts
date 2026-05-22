import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, HOT_SPOT_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('HotSpot — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders dot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.dot)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { appearance, placement } of HOT_SPOT_KEY_COMBOS) {
      test(`appearance=${appearance} + placement=${placement}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, placement }));

        await expect(getByTestId(TEST_IDS.dot)).toHaveAttribute('data-appearance', appearance);
        await expect(getByTestId(TEST_IDS.dotContainer)).toHaveAttribute('data-placement', placement);
      });
    }

    test('pulse=true → data-pulse on dot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ pulse: true }));

      await expect(getByTestId(TEST_IDS.dot)).toHaveAttribute('data-pulse', 'true');
    });
  });

  test.describe('states', () => {
    test('enabled=false → only children rendered, no dot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ enabled: false }));

      await expect(getByTestId(TEST_IDS.dot)).toHaveCount(0);
    });
  });
});
