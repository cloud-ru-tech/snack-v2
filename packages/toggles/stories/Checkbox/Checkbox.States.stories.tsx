import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const States: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.row}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox indeterminateDefault />
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
      <Checkbox loading />
    </div>
  ),
};
