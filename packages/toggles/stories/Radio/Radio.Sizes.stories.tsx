import { Meta, StoryObj } from '@storybook/react';

import { Radio, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Radio size={SIZE.XS} defaultChecked />
      <Radio size={SIZE.S} defaultChecked />
    </div>
  ),
};
