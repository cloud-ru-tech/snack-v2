import { Meta, StoryObj } from '@storybook/react';

import { Checkbox, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Checkbox size={SIZE.XS} defaultChecked />
      <Checkbox size={SIZE.S} defaultChecked />
    </div>
  ),
};
