import { Meta, StoryObj } from '@storybook/react';

import { Radio } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const States: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Radio />
      <Radio defaultChecked />
      <Radio disabled />
      <Radio disabled defaultChecked />
      <Radio loading />
    </div>
  ),
};
