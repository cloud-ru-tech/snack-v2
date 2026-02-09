import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import loaderReadme from '../../README.md?raw';
import { Sun, SUN_SIZE, SunProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<SunProps> = {
  title: 'Components/Loader/Sun',
  component: Sun,
  parameters: {
    readme: { content: loaderReadme },
  },
};

export default meta;
type Story = StoryObj<SunProps>;

const sizes = Object.values(SUN_SIZE);

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
                <Sun size={size} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
