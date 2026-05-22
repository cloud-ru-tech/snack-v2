import { Block, BlockProps, SIZE, VARIANT } from '@ds/block';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
};

export default meta;

type Story = StoryObj<BlockProps>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyVariants = Object.values(VARIANT);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.externalWrapper}>
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
  ),
};
