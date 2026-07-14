import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPanel, DemoTitle } from '#storybook/components';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { SAVED_STATE_ID, TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/SavedState',
  ...tableExampleMeta,
  parameters: { ...tableExampleMeta.parameters, controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Table>;

// savedState.resize (включён по умолчанию) пишет ширины под ключ `<id>`;
// savedState.columnSettings (требует явного true) — порядок колонок под
// `<id>_columnOrder` и набор видимых колонок под `<id>_columnSettings`.
// Порядок меняется drag'ом заголовка либо строки в меню настроек — оба пути
// доступны при columnsSettings.enableDrag.
const columns = buildUserColumns({ withStatusColumn: true, withResizing: true, withColumnSettings: true });

export const SavedState: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPanel width='wide'>
      <DemoTitle>SavedState</DemoTitle>
      <DemoHint>
        Ширина колонок после resize, их порядок после drag и набор видимых колонок сохраняются в localStorage и
        переживают перезагрузку.
      </DemoHint>
      <DemoActions align='start'>
        <Table
          outline
          data={SAMPLE_USERS}
          columnDefinitions={columns}
          columnsSettings={{ enableSettingsMenu: true, enableDrag: true }}
          pageSize={5}
          savedState={{ id: SAVED_STATE_ID, columnSettings: true }}
          data-test-id={TEST_IDS.table.root}
        />
      </DemoActions>
    </DemoPanel>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
