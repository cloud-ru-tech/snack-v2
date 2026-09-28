import { DRAW_STYLES, InteractiveChart, PLOT_TYPES } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { LINE_DATA } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import { LayeredChart, LayeredChartProps } from '../LayeredChart';

const meta: Meta<LayeredChartProps> = {
  title: 'Uikit Product/Charts/InteractiveChart/Tests/Interaction',
  component: InteractiveChart,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
  args: {
    data: LINE_DATA,
    type: PLOT_TYPES.BoxPlot,
    drawStyle: DRAW_STYLES.Line,
    title: 'Распределение по корзинам',
    width: 640,
    height: 360,
    'data-test-id': TEST_IDS.interactiveChart.root,
  },
};

export default meta;
type Story = StoryObj<LayeredChartProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='fluid'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          В box plot легенда uPlot работает как тултип: появляется при наведении и скрывается при уходе.
        </DemoHint>
        <LayeredChart {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const overlay = await canvas.findByTestId(TEST_IDS.interactiveChart.overlay);
    const tooltip = canvas.getByTestId(TEST_IDS.interactiveChart.tooltip);

    await step('initial: тултип скрыт', async () => {
      await expect(tooltip).not.toBeVisible();
    });

    await step('hover: тултип появляется', async () => {
      await userEvent.hover(overlay);
      await waitFor(() => expect(tooltip).toBeVisible());
    });

    await step('unhover: тултип скрывается', async () => {
      await userEvent.unhover(overlay);
      await waitFor(() => expect(tooltip).not.toBeVisible());
    });
  },
};
