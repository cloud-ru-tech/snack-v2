import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

const OPTIONS = { title: 'Расходы по сервисам', legendTitle: 'Сервисы' };

test.describe('PieChart — rendering', () => {
  test('renders segments and both legends', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.pieChart.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.pieChart.segment)).toHaveCount(6);
    await expect(getByTestId(TEST_IDS.pieChart.legend)).toBeVisible();
    await expect(getByTestId(TEST_IDS.pieChart.aggregatedLegend)).toBeVisible();
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.pieChart.root);

    for (const typographySize of ['s', 'l'] as const) {
      await test.step(`typographySize=${typographySize}`, async () => {
        await setStoryArgs({ options: { ...OPTIONS, typographySize } });
        await expect(root).toHaveAttribute('data-size', typographySize);
      });
    }

    await test.step('without aggregatedLegend', async () => {
      await setStoryArgs({ showAggregatedLegend: false });
      await expect(getByTestId(TEST_IDS.pieChart.aggregatedLegend)).toHaveCount(0);
    });
  });
});
