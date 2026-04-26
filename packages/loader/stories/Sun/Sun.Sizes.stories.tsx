import { Sun, SUN_SIZE } from '@ds/loader';
import { Meta, StoryObj } from '@storybook/react';

import styles from './Sun.Sizes.module.scss';

const meta: Meta<typeof Sun> = {
  title: 'Components/Loader/Sun',
  component: Sun,
};

export default meta;
type Story = StoryObj<typeof Sun>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      {Object.values(SUN_SIZE).map(size => (
        <Sun key={size} size={size} />
      ))}
    </div>
  ),
};
