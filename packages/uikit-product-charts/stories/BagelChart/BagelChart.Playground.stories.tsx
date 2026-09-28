import { BagelChart } from '@ds/uikit-product-charts';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof BagelChart> = {
  title: 'Uikit Product/Charts/BagelChart',
  component: BagelChart,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    title: 'vCPU',
    value: 48,
    total: 128,
    'data-test-id': TEST_IDS.bagelChart.root,
  },
  // `title: ReactNode` docgen выводит в object-контрол; для демо достаточно строки.
  argTypes: { title: { control: 'text' } },
};

export default meta;
type Story = StoryObj<typeof BagelChart>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Цвет кольца зависит от заполненности: до 50% — зелёный, до 75% — жёлтый, выше — красный.</DemoHint>
        <div className={styles.chart}>
          <BagelChart {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.bagelChart.root)).toBeVisible();
  },
};
