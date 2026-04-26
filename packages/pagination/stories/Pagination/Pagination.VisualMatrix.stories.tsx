import { Pagination, PAGINATION_SIZE, VARIANT } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const sizes = [PAGINATION_SIZE.S, PAGINATION_SIZE.M] as const;
const variants = [VARIANT.Button, VARIANT.Link] as const;

const noop = () => {};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × Variant'
        firstColumnHeader='Size'
        columnHeaders={variants.map(v => v.toUpperCase())}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: variants.map(variant => (
            <Pagination key={`${size}-${variant}`} total={8} page={3} size={size} variant={variant} onChange={noop} />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Page positions (size=s, total=10)'
        firstColumnHeader='Current page'
        columnHeaders={['Pagination']}
        rows={[1, 5, 10].map(page => ({
          variantLabel: String(page),
          cells: [<Pagination key={page} total={10} page={page} onChange={noop} />],
        }))}
      />
    </div>
  ),
};
