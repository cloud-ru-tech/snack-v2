import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

const ROWS = 5;
const COLUMNS = 8;
const OPTIONS = {
  title: 'Загрузка CPU, %',
  height: 480,
  domain: [0, 100],
  axes: {
    xAxis: { label: 'Время', ticks: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'] },
    yAxis: { label: 'День', ticks: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  },
};

test.describe('HeatMapChart — rendering', () => {
  test('renders grid, title and legend', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.heatMapChart.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.heatMapChart.title)).toBeVisible();
    await expect(getByTestId(TEST_IDS.heatMapChart.cell)).toHaveCount(ROWS * COLUMNS);
    await expect(getByTestId(TEST_IDS.heatMapChart.legend)).toBeVisible();
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.heatMapChart.root);

    for (const position of ['top', 'bottom'] as const) {
      await test.step(`xAxis.position=${position}`, async () => {
        await setStoryArgs({
          options: { ...OPTIONS, axes: { ...OPTIONS.axes, xAxis: { ...OPTIONS.axes.xAxis, position } } },
        });
        await expect(root).toHaveAttribute('data-x-axis-position', position);
      });
    }

    await test.step('legend.show=false', async () => {
      await setStoryArgs({ options: { ...OPTIONS, legend: { show: false } } });
      await expect(getByTestId(TEST_IDS.heatMapChart.legend)).toHaveCount(0);
    });
  });
});
