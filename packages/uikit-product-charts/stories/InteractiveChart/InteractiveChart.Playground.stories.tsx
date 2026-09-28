import { DRAW_STYLES, InteractiveChart, LINE_INTERPOLATIONS, PLOT_TYPES } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { LINE_DATA } from '../mockData';
import { TEST_IDS } from '../testIds';
import { LayeredChart, LayeredChartProps } from './LayeredChart';
import styles from './styles.module.scss';

const meta: Meta<LayeredChartProps> = {
  title: 'Uikit Product/Charts/InteractiveChart',
  component: InteractiveChart,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    data: LINE_DATA,
    type: PLOT_TYPES.Default,
    title: 'Запросы к API',
    drawStyle: DRAW_STYLES.Line,
    lineInterpolation: LINE_INTERPOLATIONS.Spline,
    width: 720,
    height: 360,
    'data-test-id': TEST_IDS.interactiveChart.root,
  },
  argTypes: {
    title: { name: '[Stories]: title', control: 'text' },
    width: { name: '[Stories]: width', control: 'number' },
    height: { name: '[Stories]: height', control: 'number' },
    drawStyle: {
      name: '[Stories]: drawStyle',
      control: 'select',
      options: Object.values(DRAW_STYLES),
      if: { arg: 'type', eq: PLOT_TYPES.Default },
    },
    lineInterpolation: {
      name: '[Stories]: lineInterpolation',
      control: 'select',
      options: Object.values(LINE_INTERPOLATIONS),
      if: { arg: 'drawStyle', eq: DRAW_STYLES.Line },
    },
    data: { table: { disable: true } },
    options: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<LayeredChartProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Выделение мышью и колесо — zoom, средняя кнопка — сдвиг по оси X, двойной клик — сброс. Серии собраны хуком
          useLayer.
        </DemoHint>
        <div className={styles.chart}>
          <LayeredChart {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByTestId(TEST_IDS.interactiveChart.plot)).toBeVisible();
  },
};
