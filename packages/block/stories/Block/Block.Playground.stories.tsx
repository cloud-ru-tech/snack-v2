import { Block, BlockProps, SIZE, VARIANT } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
  args: {
    size: SIZE.L,
    variant: VARIANT.Simple,
    backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    'data-test-id': 'block',
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
    backgroundPredefined: {
      control: 'select',
      options: Object.values(BACKGROUND_PREDEFINED_FILL),
      description: 'Слой backgroundPredefined + acrylic (`BACKGROUND_PREDEFINED_FILL`).',
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
    'data-test-id': 'block',
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
    await expect(within(canvasElement).getByTestId('block')).toBeVisible();
  },
};
