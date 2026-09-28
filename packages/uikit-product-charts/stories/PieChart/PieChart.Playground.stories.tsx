import { PieChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PIE_AGGREGATED_LEGEND, PIE_DATA } from '../mockData';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

type StoryProps = Parameters<typeof PieChart>[0] & { showAggregatedLegend: boolean };

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/Charts/PieChart',
  component: PieChart,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    data: PIE_DATA,
    options: {
      title: 'Расходы по сервисам',
      legendTitle: 'Сервисы',
      typographySize: 'l',
    },
    showAggregatedLegend: true,
    'data-test-id': TEST_IDS.pieChart.root,
  },
  argTypes: {
    showAggregatedLegend: { name: '[Stories]: showAggregatedLegend', control: 'boolean' },
    aggregatedLegend: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showAggregatedLegend, ...args }) => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Наведите на сегмент, чтобы увидеть подпись и значение в центре диаграммы.</DemoHint>
        <div className={styles.chart}>
          <PieChart
            {...args}
            aggregatedLegend={
              showAggregatedLegend ? { title: 'Группы', data: PIE_AGGREGATED_LEGEND } : args.aggregatedLegend
            }
          />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pieChart.root)).toBeVisible();
  },
};
