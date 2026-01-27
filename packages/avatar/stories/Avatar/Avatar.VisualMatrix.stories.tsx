import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from '../../src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const VisualMatrix: Story = {
  tags: ['test', '!dev'],
  render: () => {
    // Оптимизированная матрица: 3 sizes × 4 appearances × 2 shapes = 24 варианта
    const keySizes = [SIZE.S, SIZE.M, SIZE.L];
    const keyAppearances = [
      APPEARANCE.Neutral,
      APPEARANCE.Primary,
      APPEARANCE.Red,
      APPEARANCE.Blue,
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {keySizes.map((size) => (
          <div
            key={size}
            style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <div style={{ minWidth: 80, fontSize: 12, color: '#666' }}>{size}</div>
            {keyAppearances.map((appearance) => (
              <div
                key={appearance}
                style={{ display: 'flex', gap: 8, alignItems: 'center', flexDirection: 'column' }}
              >
                <Avatar name="JD" size={size} shape={SHAPE.Round} appearance={appearance} />
                <Avatar name="JD" size={size} shape={SHAPE.Square} appearance={appearance} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
