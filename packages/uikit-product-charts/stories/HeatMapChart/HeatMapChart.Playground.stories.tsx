import { HeatMapChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HEAT_MAP_DATA, HEAT_MAP_DOMAIN, HEAT_MAP_X_TICKS, HEAT_MAP_Y_TICKS } from '../mockData';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof HeatMapChart> = {
  title: 'Uikit Product/Charts/HeatMapChart',
  component: HeatMapChart,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    data: HEAT_MAP_DATA,
    options: {
      title: 'Загрузка CPU, %',
      height: 480,
      domain: HEAT_MAP_DOMAIN,
      formatter: value => `${value}%`,
      axes: {
        xAxis: { label: 'Время', ticks: HEAT_MAP_X_TICKS, position: 'bottom' },
        yAxis: { label: 'День', ticks: HEAT_MAP_Y_TICKS },
      },
      legend: { show: true },
    },
    'data-test-id': TEST_IDS.heatMapChart.root,
  },
};

export default meta;
type Story = StoryObj<typeof HeatMapChart>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Цвет ячейки — линейная шкала по `domain`, цвет текста подбирается по контрасту с фоном.</DemoHint>
        <div className={styles.chart}>
          <HeatMapChart {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.heatMapChart.root)).toBeVisible();
  },
};
