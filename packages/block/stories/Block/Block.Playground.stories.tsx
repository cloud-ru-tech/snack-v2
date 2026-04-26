import { Block, BlockProps, SIZE, VARIANT } from '@ds/block';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
  args: {
    size: SIZE.L,
    variant: VARIANT.Simple,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант',
    },
  },
};

export default meta;

type StoryProps = BlockProps & {
  showBackground: boolean;
  customText: string;
};

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({ showBackground, customText, ...args }: StoryProps) => (
  <div className={styles.externalWrapper} data-show-background={showBackground || undefined}>
    <Block {...args}>
      <span className={styles.sampleContent}>{customText}</span>
    </Block>
  </div>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    showBackground: true,
    size: SIZE.L,
    variant: VARIANT.Simple,
    customText: '# slot content',
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
    customText: {
      name: '[Stories]: Custom text',
    },
  },
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('# slot content')).toBeVisible();
  },
};
