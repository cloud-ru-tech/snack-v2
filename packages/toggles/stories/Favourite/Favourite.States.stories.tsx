import { Meta, StoryObj } from '@storybook/react';

import { Favourite } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Favourite> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Favourite>;

export const States: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Favourite />
      <Favourite defaultChecked />
      <Favourite disabled />
      <Favourite disabled defaultChecked />
      <Favourite loading />
    </div>
  ),
};
