import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPanel, DemoTitle } from '#storybook/components';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { SAVED_STATE_ID, TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/SavedState',
  component: Table,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const SavedState: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPanel width='wide'>
      <DemoTitle>SavedState</DemoTitle>
      <DemoHint>Ширина колонок после resize сохраняется в localStorage и переживает перезагрузку.</DemoHint>
      <DemoActions align='start'>
        <Table
          outline
          data={SAMPLE_USERS}
          columnDefinitions={buildUserColumns({ withStatusColumn: true, withResizing: true })}
          pageSize={5}
          savedState={{ id: SAVED_STATE_ID }}
          data-test-id={TEST_IDS.table.root}
        />
      </DemoActions>
    </DemoPanel>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
