import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { InfoGroup, InfoGroupProps } from '../../src';
import { TEST_IDS } from '../testIds';

type Row = { name: string; active: boolean; count: number };

const sample: Row = { name: 'Item', active: true, count: 3 };

const meta: Meta<InfoGroupProps<Row>> = {
  title: 'Uikit Product/InfoRow/InfoGroup',
  component: InfoGroup,
  parameters: { layout: 'fullscreen' },
  args: {
    data: sample,
    loading: false,
    columns: 'single',
    width: 'fixed',
    'data-test-id': TEST_IDS.infoGroup.root,
    items: [
      { label: 'Name', accessorKey: 'name' },
      { label: 'Active', accessorKey: 'active' },
      { label: 'Count', accessorKey: 'count' },
    ],
  },
  argTypes: {
    data: { control: 'object', description: 'Данные строк' },
    items: { table: { disable: true } },
    loading: { control: 'boolean' },
    columns: { control: 'radio', options: ['single', 'double'] },
    width: { control: 'radio', options: ['fixed', 'full'] },
    formatBoolean: { table: { disable: true } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<InfoGroupProps<Row>>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Группа InfoRow, собранная декларативно из items + data.</DemoHint>
        <DemoActions align='center'>
          <InfoGroup {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.infoGroup.root)).toBeVisible();
  },
};
