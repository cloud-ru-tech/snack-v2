import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PriceSummaryFigmaSurface } from '../PriceSummary/PriceSummaryStory';
import { TEST_IDS } from '../PriceSummary/testIds';
import { PLAYGROUND_DEFAULT_ARGS } from './constants';

const meta: Meta<typeof PriceSummarySmall> = {
  title: 'Uikit Product/PriceSummary/PriceSummarySmall',
  component: PriceSummarySmall,
  parameters: { layout: 'fullscreen' },
  args: {
    ...PLAYGROUND_DEFAULT_ARGS,
    'data-test-id': TEST_IDS.priceSummarySmall,
  },
  argTypes: {
    loading: { control: 'boolean' },
    dataError: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PriceSummarySmall>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Showcase по Figma `2909:8947`: метка «Итого», сумма и ссылка «Подробнее о стоимости».</DemoHint>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummarySmall {...args} />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.priceSummarySmall)).toBeVisible();
  },
};
