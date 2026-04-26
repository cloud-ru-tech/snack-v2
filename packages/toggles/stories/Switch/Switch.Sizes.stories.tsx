import { Meta, StoryObj } from '@storybook/react';

import { SIZE, Switch } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Switch> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Sizes: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Switch size={SIZE.XS} defaultChecked />
      <Switch size={SIZE.S} defaultChecked />
    </div>
  ),
};
