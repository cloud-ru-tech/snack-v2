import { HeatMapChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HEAT_MAP_DATA, HEAT_MAP_DOMAIN, HEAT_MAP_X_TICKS, HEAT_MAP_Y_TICKS } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof HeatMapChart> = {
  title: 'Uikit Product/Charts/HeatMapChart/Examples/CustomCell',
  component: HeatMapChart,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof HeatMapChart>;

const PEAK_LOAD = 80;

function formatPercent(value: number) {
  return `${value}%`;
}

function renderCell(_x: number, _y: number, value: number) {
  return <span className={styles.customCell}>{value >= PEAK_LOAD ? `▲ ${formatPercent(value)}` : ''}</span>;
}

export const CustomCell: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>CustomCell</DemoTitle>
        <DemoHint>`cellRender` полностью заменяет содержимое ячейки: здесь подписаны только пиковые значения.</DemoHint>
        <div className={styles.chart}>
          <HeatMapChart
            data-test-id={TEST_IDS.heatMapChart.root}
            data={HEAT_MAP_DATA}
            options={{
              title: 'Пиковая нагрузка',
              height: 360,
              domain: HEAT_MAP_DOMAIN,
              cellRender: renderCell,
              axes: { xAxis: { ticks: HEAT_MAP_X_TICKS }, yAxis: { ticks: HEAT_MAP_Y_TICKS } },
            }}
          />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const cells = within(canvasElement).getAllByTestId(TEST_IDS.heatMapChart.cell);
    await expect(cells).toHaveLength(HEAT_MAP_DATA.length * HEAT_MAP_DATA[0].length);
  },
};
