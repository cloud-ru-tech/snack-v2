import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { LOADER_SIZE, Spinner, SpinnerProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<SpinnerProps>;

const sizes = Object.values(LOADER_SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellFirst}`}>Size</th>
            {sizes.map(size => (
              <th key={size} className={styles.tableHeaderCell}>
                {size.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`${styles.tableCell} ${styles.tableCellVariant}`}>Preview</td>
            {sizes.map(size => (
              <td key={size} className={styles.tableCell}>
                <Spinner size={size} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
