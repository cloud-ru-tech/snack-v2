import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('BagelChart — rendering', () => {
  test('renders value and total', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ value: 48, total: 128 }));

    await expect(getByTestId(TEST_IDS.bagelChart.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.bagelChart.value)).toHaveText('48');
    await expect(getByTestId(TEST_IDS.bagelChart.total)).toHaveText('128');
  });

  test('data-level follows occupancy thresholds', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions({ total: 100 }));
    const root = getByTestId(TEST_IDS.bagelChart.root);

    for (const [value, level] of [
      [50, 'low'],
      [75, 'medium'],
      [76, 'high'],
    ] as const) {
      await test.step(`value=${value}% → ${level}`, async () => {
        await setStoryArgs({ value });
        await expect(root).toHaveAttribute('data-level', level);
      });
    }
  });
});
