import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/ColumnsSettings',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const COMPONENT_TEST_IDS = TEST_IDS.component;

// Широкая таблица (≥20 колонок) с управлением через тулбар: сортировка по клику в
// заголовок, меню настроек колонок (показать/скрыть), drag-перетаскивание заголовков.
// withColumnSettings вешает per-column `columnSettings` (все 3 режима
// COLUMN_SETTINGS_MODE): email → DefaultTrue (в меню, включена), role →
// DefaultFalse (в меню, изначально скрыта), amount → Hidden (в меню не
// показывается, отрисована всегда). Колонка name без columnSettings — вне меню.
// wide добавляет ~16 колонок (отдел, город, тариф, менеджер, …), часть скрыта по
// умолчанию (DefaultFalse) — их видно в меню настроек.
const columns = buildUserColumns({
  withStatusColumn: true,
  withColumnSettings: true,
  withResizing: true,
  withDates: true,
  wide: true,
});

// Дефолтный data-test-id пункта меню настроек: `list__base-item_<columnId>`
// (BaseItem из @ds/list, id пункта = идентификатор колонки).
// Синхронизируй при обновлении пакета.
const settingsItemTestId = (columnId: string): string => `list__base-item_${columnId}`;

export const ColumnsSettings: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      // enableDrag включает переупорядочивание колонок перетаскиванием за заголовок.
      // HTML5 DnD ненадёжен в storybook-test — drag ассертится в Playwright
      // interaction.spec, здесь включён для живого примера.
      columnsSettings={{ enableSettingsMenu: true, enableDrag: true }}
      outline
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // Droplist меню настроек монтируется в портал за пределами canvasElement.
    const body = within(document.body);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await step('settings: меню настроек колонок открывается', async () => {
      await userEvent.click(within(root).getByTestId(COMPONENT_TEST_IDS.columnSettings.trigger));
      await waitFor(() => expect(body.getByTestId(COMPONENT_TEST_IDS.columnSettings.droplist)).toBeVisible());
    });

    await step('enable: включение колонки «Роль» добавляет header-cell', async () => {
      // role → DefaultFalse: изначально скрыта, в шапке 3 колонки (name, email, amount)
      const headerCellsBefore = within(root).getAllByTestId(COMPONENT_TEST_IDS.headerCell).length;

      await userEvent.click(body.getByTestId(settingsItemTestId('role')));

      await waitFor(() => {
        expect(within(root).getAllByTestId(COMPONENT_TEST_IDS.headerCell)).toHaveLength(headerCellsBefore + 1);
      });
    });

    await step('hidden: колонка с mode=hidden отсутствует в меню', async () => {
      // amount → Hidden: всегда отрисована, но пункта в меню нет
      expect(body.queryByTestId(settingsItemTestId('amount'))).toBeNull();
      expect(body.getByTestId(settingsItemTestId('email'))).toBeVisible();
    });
  },
};
