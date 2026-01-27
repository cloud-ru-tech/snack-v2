import type { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import React, { Fragment } from 'react';

import { APPEARANCE, Counter, CounterProps, SIZE, VARIANT } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const VisualMatrix: Story = {
  tags: ['test', '!dev'],
  render: (args) => {
    const headerCellClassnames = cn(styles.cell, styles.headerCell);
    // Оптимизированная матрица: 2 sizes × 3 appearances × 3 variants = 18 вариантов
    const keySizes = Object.values(SIZE);
    const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Red, APPEARANCE.Neutral];
    const keyVariants = Object.values(VARIANT);

    return (
      <div className={styles.table}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        {keySizes.map((size, index) => (
          <div
            key={size}
            className={headerCellClassnames}
            style={{ gridColumnStart: index * 3 + 2, gridColumnEnd: index * 3 + 5 }}
          >
            {size}
          </div>
        ))}
        {keyVariants.map((variant) => (
          <div key={variant} className={headerCellClassnames}>
            {variant}
          </div>
        ))}
        {keyVariants.map((variant) => (
          <div key={variant} className={headerCellClassnames}>
            {variant}
          </div>
        ))}
        {keyAppearances.map((appearance) => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            {keyVariants.map((variant) => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.XS}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
            {keyVariants.map((variant) => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.S}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    );
  },
};
