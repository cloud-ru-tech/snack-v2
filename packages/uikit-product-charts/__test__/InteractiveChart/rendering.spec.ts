import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('InteractiveChart — rendering', () => {
  test('props propagation: type', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.interactiveChart.root);

    for (const type of ['default', 'boxPlot'] as const) {
      await test.step(`type=${type}`, async () => {
        await setStoryArgs({ type });
        await expect(root).toHaveAttribute('data-type', type);
        await expect(getByTestId(TEST_IDS.interactiveChart.overlay)).toBeVisible();
      });
    }
  });
});
