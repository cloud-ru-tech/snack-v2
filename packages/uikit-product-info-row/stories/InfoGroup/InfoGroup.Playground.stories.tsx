import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { InfoGroup, InfoGroupProps } from '../../src';

type Row = { name: string; active: boolean; count: number };

const sample: Row = { name: 'Item', active: true, count: 3 };

const meta: Meta<InfoGroupProps<Row>> = {
  title: 'Uikit Product/InfoRow/InfoGroup',
  component: InfoGroup,
  parameters: { layout: 'padded' },
  args: {
    data: sample,
    loading: false,
    columns: 'single',
    width: 'fixed',
    'data-test-id': 'info-group',
    items: [
      { label: 'Name', accessorKey: 'name' },
      { label: 'Active', accessorKey: 'active' },
      { label: 'Count', accessorKey: 'count' },
    ],
  },
  argTypes: {
    data: { control: 'object', description: 'Данные строк' },
    items: { control: false },
    loading: { control: 'boolean' },
    columns: { control: 'radio', options: ['single', 'double'] },
    width: { control: 'radio', options: ['fixed', 'full'] },
    formatBoolean: { control: false },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<InfoGroupProps<Row>>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByTestId('info-group');
    await expect(within(root).getByText('Name', { exact: true })).toBeVisible();
  },
};
