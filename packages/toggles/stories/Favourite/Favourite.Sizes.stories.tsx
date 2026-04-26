import { Meta, StoryObj } from '@storybook/react';

import { Favourite, FAVOURITE_ICON, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Favourite> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Favourite>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Favourite size={SIZE.XS} icon={FAVOURITE_ICON.Star} defaultChecked />
      <Favourite size={SIZE.S} icon={FAVOURITE_ICON.Star} defaultChecked />
    </div>
  ),
};
