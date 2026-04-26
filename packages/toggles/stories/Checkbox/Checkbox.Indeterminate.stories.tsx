import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../../src';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Indeterminate: Story = {
  tags: ['dev'],
  args: { indeterminateDefault: true },
};
