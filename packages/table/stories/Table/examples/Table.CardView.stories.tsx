import { DEFAULT_PAGE_SIZE, Table, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/CardView',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

const COMPONENT_TEST_IDS = TEST_IDS.component;

// Сегмент table-вида в переключателе dataView: id ставит
// @sbercloud/snack-v2-segment-control (`segmentTestId(value)` → `section-<value>`),
// значение сегмента — 'list' (DATA_VIEW_VALUE.List из @ds/toolbar).
// Синхронизируй при обновлении этих пакетов.
const TABLE_VIEW_SEGMENT_TEST_ID = 'section-list';

const columns = buildUserColumns({ withStatusColumn: true });

export const CardView: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      defaultView={VIEW.Cards}
      headlineId='name'
      rowSelection={{ enable: true, multiRow: true }}
      sorting={{}}
      outline
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // Droplist'ы @ds/list монтируются в портал за пределами canvasElement.
    const body = within(document.body);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await step('cards: рендерится страница карточек', async () => {
      // Пагинация активна: на первой странице DEFAULT_PAGE_SIZE карточек из 15 строк.
      const cards = within(root).getAllByTestId(COMPONENT_TEST_IDS.card);
      expect(cards).toHaveLength(DEFAULT_PAGE_SIZE);
    });

    await step('sort: droplist сортировки меняет порядок карточек', async () => {
      const firstCardTextBefore = within(root).getAllByTestId(COMPONENT_TEST_IDS.card)[0].textContent;

      await userEvent.click(within(root).getByTestId(COMPONENT_TEST_IDS.viewSort.droplistTrigger));
      await waitFor(() => expect(body.getByTestId(COMPONENT_TEST_IDS.viewSort.droplist)).toBeVisible());

      // Порядок опций повторяет порядок колонок (pinned-left → unpinned):
      // последняя — «Баланс»; сортировка по сумме переставляет первую карточку
      // (данные fixtures упорядочены по имени, по балансу порядок другой).
      const options = body.getAllByTestId(COMPONENT_TEST_IDS.viewSort.option);
      await userEvent.click(options[options.length - 1]);

      await waitFor(() => {
        const firstCard = within(root).getAllByTestId(COMPONENT_TEST_IDS.card)[0];
        expect(firstCard.textContent).not.toBe(firstCardTextBefore);
      });

      // Droplist не закрывается по клику на опцию — закрываем Escape'ом,
      // чтобы следующий шаг кликал по тулбару без открытого оверлея.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(body.queryByTestId(COMPONENT_TEST_IDS.viewSort.droplist)).toBeNull());
    });

    await step('view: сегмент-контрол переключает в table-вид и обратно', async () => {
      const dataView = canvas.getByTestId(TEST_IDS.toolbar.dataView);
      await userEvent.click(within(dataView).getByTestId(TABLE_VIEW_SEGMENT_TEST_ID));

      await waitFor(() => expect(within(root).getByTestId(COMPONENT_TEST_IDS.headerRow)).toBeVisible());

      // Возврат в cards: example демонстрирует карточный вид — story не должна
      // оставаться в table-виде после прогона play.
      await userEvent.click(within(dataView).getByTestId(TEST_IDS.toolbar.dataViewCardsSegment));
      await waitFor(() => expect(within(root).getAllByTestId(COMPONENT_TEST_IDS.card).length).toBeGreaterThan(0));
    });
  },
};
