import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { APPEARANCE, COLOR, Counter, CounterProps, SIZE, VARIANT } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => {
    // Оптимизированная матрица: ключевые размеры, появления и варианты
    const keySizes = Object.values(SIZE);
    const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Red, APPEARANCE.Neutral];
    const keyVariants = Object.values(VARIANT);
    const colors = Object.values(COLOR);

    return (
      <div className={styles.visualMatrixContainer}>
        {colors.map((color, colorIndex) => (
          <div key={color}>
            {colorIndex > 0 && <div style={{ height: '32px' }} />}
            <div
              className={styles.visualMatrixTableCellVariant}
              style={{
                marginBottom: '16px',
                marginTop: colorIndex > 0 ? '32px' : '0',
                textTransform: 'capitalize',
              }}
            >
              {color} Color
            </div>
            <table className={styles.visualMatrixTable}>
              <thead className={styles.visualMatrixTableHeader}>
                <tr>
                  <th
                    className={`${styles.visualMatrixTableHeaderCell} ${styles.visualMatrixTableHeaderCellFirst}`}
                  >
                    Appearance
                  </th>
                  {keySizes.map((size) => (
                    <th key={size} className={styles.visualMatrixTableHeaderCell}>
                      {size.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keyAppearances.map((appearance) => (
                  <tr key={appearance}>
                    <td
                      className={`${styles.visualMatrixTableCell} ${styles.visualMatrixTableCellVariant}`}
                    >
                      {appearance}
                    </td>
                    {keySizes.map((size) => (
                      <td key={size} className={styles.visualMatrixTableCell}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          {keyVariants.map((variant) => {
                            let value = 9000;
                            if (variant === VARIANT.Count) {
                              value = 9;
                            } else if (variant === VARIANT.CountPlus) {
                              value = 15;
                            }
                            return (
                              <Counter
                                key={variant}
                                value={value}
                                size={size}
                                variant={variant}
                                appearance={appearance}
                                color={color}
                              />
                            );
                          })}
                        </div>
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
