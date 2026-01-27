import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => {
    // Оптимизированная матрица: ключевые размеры и появления
    const keySizes = [SIZE.S, SIZE.M, SIZE.L];
    const keyAppearances = [
      APPEARANCE.Neutral,
      APPEARANCE.Primary,
      APPEARANCE.Red,
      APPEARANCE.Blue,
    ];
    const shapes = Object.values(SHAPE);

    return (
      <div className={styles.container}>
        {shapes.map((shape, shapeIndex) => (
          <div key={shape}>
            {shapeIndex > 0 && <div className={styles.sectionSpacer} />}
            <div
              className={styles.sectionHeader}
              style={{ textTransform: 'capitalize', fontWeight: 600 }}
            >
              {shape} Shape
            </div>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellFirst}`}>
                    Appearance
                  </th>
                  {keySizes.map((size) => (
                    <th key={size} className={styles.tableHeaderCell}>
                      {size.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keyAppearances.map((appearance) => (
                  <tr key={appearance}>
                    <td className={`${styles.tableCell} ${styles.tableCellVariant}`}>
                      {appearance}
                    </td>
                    {keySizes.map((size) => (
                      <td key={size} className={styles.tableCell}>
                        <Avatar name="JD" size={size} shape={shape} appearance={appearance} />
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
