import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SIZE, Typography, TypographyProps, VARIANT, WEIGHT } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => {
    const variants = Object.values(VARIANT);
    const sizes = Object.values(SIZE);
    const weights = Object.values(WEIGHT);

    return (
      <div className={styles.container}>
        {weights.map(weight => (
          <div key={weight}>
            <Typography
              variant={VARIANT.headline}
              size={SIZE.m}
              weight={weight}
              className={styles.sectionHeader}
              style={{ marginTop: '32px' }}
            >
              {weight.charAt(0).toUpperCase() + weight.slice(1)} Weight
            </Typography>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellFirst}`}>Variant</th>
                  {sizes.map(size => (
                    <th key={size} className={styles.tableHeaderCell}>
                      {size.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map(variant => (
                  <tr key={variant}>
                    <td className={`${styles.tableCell} ${styles.tableCellVariant}`}>{variant}</td>
                    {sizes.map(size => (
                      <td key={size} className={styles.tableCell}>
                        <Typography variant={variant} size={size} weight={weight}>
                          {variant.charAt(0).toUpperCase() + variant.slice(1)} {size.toUpperCase()}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
};
