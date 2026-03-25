import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Breadcrumbs, BreadcrumbsProps } from '../../src';
import { SIZE } from '../../src/constants';
import { longTrailItems, shortTrailItems } from './fixtures';
import styles from './styles.module.scss';

const meta: Meta<BreadcrumbsProps> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<BreadcrumbsProps>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Size × trail density'
      firstColumnHeader='Size'
      columnHeaders={['Short trail (wide)', 'Long trail (narrow)']}
      rows={sizes.map(size => ({
        variantLabel: size,
        cells: [
          <div key='wide' className={styles.wideCell}>
            <Breadcrumbs items={shortTrailItems} size={size} />
          </div>,
          <div key='narrow' className={styles.narrowCell}>
            <Breadcrumbs items={longTrailItems} size={size} />
          </div>,
        ],
      }))}
    />
  ),
};
