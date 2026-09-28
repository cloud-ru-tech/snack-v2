import { PieChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PIE_AGGREGATED_LEGEND, PIE_DATA } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const onAggregatedLegendItemClick = fn();

const meta: Meta<typeof PieChart> = {
  title: 'Uikit Product/Charts/PieChart/Tests/Interaction',
  component: PieChart,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
  args: {
    data: PIE_DATA,
    options: { title: 'Расходы по сервисам', legendTitle: 'Сервисы' },
    aggregatedLegend: { title: 'Группы', data: PIE_AGGREGATED_LEGEND, onAggregatedLegendItemClick },
    onPieSegmentClick: fn(),
    onLegendItemClick: fn(),
    'data-test-id': TEST_IDS.pieChart.root,
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по сегменту и пунктам обеих легенд вызывает колбэки с данными пункта.</DemoHint>
        <div className={styles.chart}>
          <PieChart {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('hover: сегмент увеличивается', async () => {
      const [segment] = canvas.getAllByTestId(TEST_IDS.pieChart.segment);
      await userEvent.hover(segment);
      await expect(segment).toHaveAttribute('data-hovered', 'true');
      await userEvent.unhover(segment);
      await expect(segment).not.toHaveAttribute('data-hovered');
    });

    await step('click: сегмент → onPieSegmentClick', async () => {
      const segments = canvas.getAllByTestId(TEST_IDS.pieChart.segment);
      await userEvent.pointer({ keys: '[MouseLeft>]', target: segments[1] });
      await userEvent.pointer({ keys: '[/MouseLeft]', target: segments[1] });
      await expect(args.onPieSegmentClick).toHaveBeenCalledWith(PIE_DATA[1]);
    });

    await step('click: пункт легенды → onLegendItemClick', async () => {
      const legend = within(canvas.getByTestId(TEST_IDS.pieChart.legend));
      const [firstItem] = legend.getAllByTestId(TEST_IDS.pieChart.legendItem);
      await userEvent.click(within(firstItem).getByTestId(TEST_IDS.pieChart.legendLink));
      await expect(args.onLegendItemClick).toHaveBeenCalledWith(expect.objectContaining({ id: PIE_DATA[0].id }));
    });

    await step('click: пункт агрегированной легенды → onAggregatedLegendItemClick', async () => {
      const legend = within(canvas.getByTestId(TEST_IDS.pieChart.aggregatedLegend));
      const [firstItem] = legend.getAllByTestId(TEST_IDS.pieChart.aggregatedLegendItem);
      await userEvent.click(within(firstItem).getByTestId(TEST_IDS.pieChart.legendLink));
      await expect(onAggregatedLegendItemClick).toHaveBeenCalledWith(PIE_AGGREGATED_LEGEND[0]);
    });
  },
};
