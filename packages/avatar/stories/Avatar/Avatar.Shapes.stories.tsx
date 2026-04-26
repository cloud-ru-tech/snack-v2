import { Avatar, SHAPE, SIZE } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Shapes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Avatar name='Round Avatar' shape={SHAPE.Round} size={SIZE.L} />
      <Avatar name='Square Avatar' shape={SHAPE.Square} size={SIZE.L} />
    </div>
  ),
};
