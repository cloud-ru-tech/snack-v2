import { GIGA_MASK_IMAGE } from '@ds/ai-icon-giga';
import { AiShimmer, DEFAULT_SIZE, DEFAULT_VARIANT, DEFAULT_WEIGHT, SIZE, VARIANT, WEIGHT } from '@ds/ai-shimmer';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiShimmer> = {
  title: 'Ai/AiShimmer',
  component: AiShimmer,
  parameters: { layout: 'fullscreen' },
  args: {
    text: 'Officia cillum labore enim eiusmod exercitation ullamco occaecat utminim consequat labore occaecat est.',
    variant: DEFAULT_VARIANT,
    size: DEFAULT_SIZE,
    weight: DEFAULT_WEIGHT,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    text: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    weight: {
      control: 'select',
      options: Object.values(WEIGHT),
    },
    iconMask: {
      control: 'select',
      options: ['none', 'giga'],
      mapping: { none: undefined, giga: GIGA_MASK_IMAGE },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AiShimmer>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>AiShimmer с кастомным текстом и анимацией shimmer.</DemoHint>
        <DemoActions align='center' block>
          <div className={styles.preview}>
            <AiShimmer {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
