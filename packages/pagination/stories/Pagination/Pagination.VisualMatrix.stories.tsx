import { Pagination, PAGINATION_SIZE, VARIANT } from '@ds/pagination';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Pagination',
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
  parameters: { controls: { disable: true } },
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

      <StoryTable
        sectionTitle='Truncated (maxLength=7, total=42)'
        firstColumnHeader='Current page'
        columnHeaders={['Pagination']}
        rows={[1, 12, 42].map(page => ({
          variantLabel: String(page),
          cells: [<Pagination key={page} total={42} page={page} maxLength={7} onChange={noop} />],
        }))}
      />

      <StoryTable
        sectionTitle='Variant × Truncation boundaries (maxLength=7, total=42)'
        firstColumnHeader='Variant'
        columnHeaders={['start (page 1)', 'middle (page 21)', 'end (page 42)']}
        rows={variants.map(variant => ({
          variantLabel: variant,
          cells: [1, 21, 42].map(page => (
            <Pagination
              key={`${variant}-${page}`}
              total={42}
              page={page}
              maxLength={7}
              variant={variant}
              onChange={noop}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Overflow (no truncation, total > maxLength)'
        firstColumnHeader='Total / maxLength'
        columnHeaders={['Pagination']}
        rows={[
          {
            variantLabel: 'total=15 / maxLength=15',
            cells: [<Pagination key='all' total={15} page={8} maxLength={15} onChange={noop} />],
          },
          {
            variantLabel: 'total=20 / maxLength=20',
            cells: [<Pagination key='wide' total={20} page={10} maxLength={20} onChange={noop} />],
          },
        ]}
      />
    </div>
  ),
};
