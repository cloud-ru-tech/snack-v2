import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';

import { buildUserColumns, makeUsers, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';
import styles from './styles.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/InfiniteScroll',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = buildUserColumns({ withStatusColumn: true });

// «Бэкенд»: полный детерминированный набор строк, отдаётся порциями по PAGE_LENGTH.
const ALL_USERS = makeUsers(60);
const PAGE_LENGTH = 15;
const LOAD_DELAY_MS = 400;

function InfiniteScrollTable() {
  const [items, setItems] = useState<User[]>(() => ALL_USERS.slice(0, PAGE_LENGTH));
  const [loading, setLoading] = useState(false);
  // Table рендерит под строками невидимый стаб в конце скролл-области и отдаёт
  // его в scrollRef — потребитель вешает на стаб IntersectionObserver.
  const scrollStubRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = scrollStubRef.current;

    if (!node || items.length >= ALL_USERS.length) {
      return undefined;
    }

    let timer: number | undefined;

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) {
        return;
      }

      // одна порция на пересечение: после загрузки эффект пересоздаст observer
      observer.disconnect();
      setLoading(true);
      timer = window.setTimeout(() => {
        setItems(ALL_USERS.slice(0, items.length + PAGE_LENGTH));
        setLoading(false);
      }, LOAD_DELAY_MS);
    });

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [items.length]);

  return (
    <div className={styles.scrollArea}>
      <Table
        data-test-id={TEST_IDS.table.root}
        data={items}
        columnDefinitions={columns}
        infiniteLoading
        loading={loading}
        scrollRef={scrollStubRef}
        outline
      />
    </div>
  );
}

export const InfiniteScroll: Story = {
  tags: ['dev', 'test'],
  render: () => <InfiniteScrollTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toBeVisible();
    // первая порция отрисована целиком: infinite-режим не пагинирует строки;
    // добор по скроллу — реальный браузерный сценарий, ассертится в Playwright
    expect(within(root).getAllByTestId(TEST_IDS.component.bodyRow)).toHaveLength(PAGE_LENGTH);
  },
};
