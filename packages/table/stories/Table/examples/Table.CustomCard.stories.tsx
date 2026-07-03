import { Card, RADIUS, VIEW as CARD_VIEW } from '@ds/card';
import { APPEARANCE as STATUS_APPEARANCE, Status } from '@ds/status';
import { Table, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS, userStatusLabel } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';
import styles from './Table.CustomCard.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/CustomCard',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

const CUSTOM_CARD_TEST_ID = 'table-custom-card';

const columns = buildUserColumns({ withStatusColumn: true });

// Кастомная карточка строится напрямую из данных строки (row.original) — в проде
// потребитель пишет свою разметку. Status-цвет маппится из статуса пользователя.
const STATUS_TO_APPEARANCE: Record<string, (typeof STATUS_APPEARANCE)[keyof typeof STATUS_APPEARANCE]> = {
  active: STATUS_APPEARANCE.Green,
  pending: STATUS_APPEARANCE.Yellow,
  blocked: STATUS_APPEARANCE.Red,
  invited: STATUS_APPEARANCE.Blue,
};

export const CustomCard: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      defaultView={VIEW.Cards}
      headlineId='name'
      // Сетка в 2 колонки с перестроением по ширине контейнера.
      cardColumns={2}
      // renderCard заменяет дефолтную карточку: контекст даёт tanstack row/table
      // и defaultRender (готовый элемент дефолтной карточки).
      renderCard={({ row }) => {
        const user = row.original;

        return (
          <Card radius={RADIUS.S} view={CARD_VIEW.Outline} data-test-id={CUSTOM_CARD_TEST_ID}>
            <div className={styles.body}>
              <div className={styles.header}>
                <span className={styles.name}>{user.name}</span>
                <Status appearance={STATUS_TO_APPEARANCE[user.status]} label={userStatusLabel(user.status)} />
              </div>
              <span className={styles.meta}>{user.email}</span>
              <span className={styles.meta}>{user.role}</span>
            </div>
          </Card>
        );
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const cards = within(canvasElement).getAllByTestId(CUSTOM_CARD_TEST_ID);
    expect(cards.length).toBeGreaterThan(0);
  },
};
