import { Meta, StoryObj } from '@storybook/react';

import { Switch } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Switch> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const States: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
      <Switch loading />
      <Switch loading defaultChecked />
    </div>
  ),
};
