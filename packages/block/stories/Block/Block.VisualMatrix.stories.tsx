import { Block, BlockProps, SIZE, VARIANT } from '@ds/block';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
};

export default meta;

type StoryProps = BlockProps & {
  showBackground: boolean;
};

type Story = StoryObj<StoryProps>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyVariants = Object.values(VARIANT);

const Template: StoryFn<StoryProps> = ({ showBackground }: StoryProps) => (
  <div className={styles.externalWrapper} data-show-background={showBackground || undefined}>
    <StoryTable
      sectionTitle='Variant × Size'
      firstColumnHeader='Variant'
      columnHeaders={keySizes.map(s => s.toUpperCase())}
      rows={keyVariants.map(variant => ({
        variantLabel: variant,
        cells: keySizes.map(size => (
          <Block key={size} variant={variant} size={size}>
            <span className={styles.sampleContent}># slot content</span>
          </Block>
        )),
      }))}
    />
  </div>
);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  args: {
    showBackground: true,
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
  },
  render: Template,
};
