import type { Meta, StoryObj } from '@storybook/react';

import { Divider, type DividerProps, ORIENTATION } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<DividerProps>;

export const WithVerticalOrientation: Story = {
  tags: ['!dev', 'autodocs'],
  args: {
    orientation: ORIENTATION.Vertical,
    variant: 'regular',
  },
  render: args => (
    <div className={styles.verticalRowCompact}>
      <span className={styles.verticalRowCompactLabel}>Left</span>
      <div className={styles.verticalRowDividerCell}>
        <Divider {...args} />
      </div>
      <span className={styles.verticalRowCompactLabel}>Right</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальный разделитель между элементами в flex-контейнере.',
      },
    },
  },
};
