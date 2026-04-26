import { Meta, StoryObj } from '@storybook/react';

import { Favourite, FAVOURITE_ICON } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Favourite> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Favourite>;

export const Icons: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Favourite icon={FAVOURITE_ICON.Star} />
      <Favourite icon={FAVOURITE_ICON.Star} defaultChecked />
      <Favourite icon={FAVOURITE_ICON.Heart} />
      <Favourite icon={FAVOURITE_ICON.Heart} defaultChecked />
    </div>
  ),
};
