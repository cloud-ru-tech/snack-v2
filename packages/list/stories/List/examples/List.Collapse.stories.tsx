import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Collapse',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

const items: Item[] = [
  {
    id: 'general',
    type: 'collapse',
    content: { label: 'General' },
    items: [
      { id: 'general-overview', content: { label: 'Overview' } },
      { id: 'general-analytics', content: { label: 'Analytics' } },
    ],
  },
  {
    id: 'billing',
    type: 'collapse',
    content: { label: 'Billing' },
    items: [
      { id: 'billing-invoices', content: { label: 'Invoices' } },
      {
        id: 'billing-methods',
        type: 'collapse',
        content: { label: 'Payment methods' },
        items: [
          { id: 'billing-card', content: { label: 'Card' } },
          { id: 'billing-wire', content: { label: 'Wire transfer' } },
        ],
      },
    ],
  },
  // Гетерогенная вложенность: обычная группа (Separator) с collapse-айтемом внутри —
  // самый глубокий бранч Item-union (group → collapse → leaf).
  {
    type: 'group',
    label: 'Workspace',
    groupVariant: 'subtitle',
    items: [
      {
        id: 'workspace-resources',
        type: 'collapse',
        content: { label: 'Resources' },
        items: [
          { id: 'workspace-servers', content: { label: 'Servers' } },
          { id: 'workspace-storage', content: { label: 'Storage' } },
        ],
      },
    ],
  },
  { id: 'settings', content: { label: 'Settings' } },
];

function CollapseScenario() {
  const [open, setOpen] = useState<Array<string | number>>(['general', 'workspace-resources']);
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Collapse</DemoTitle>
        <DemoHint>
          Controlled expand: click anywhere on a group row to toggle. Includes a group → collapse branch.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.collapseScenario}
              items={items}
              size='m'
              collapse={{ value: open, onChange: value => setOpen(value ?? []) }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Collapse: Story = {
  tags: ['dev', 'test'],
  render: () => <CollapseScenario />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.list.collapseScenario);
    // Раскрытие переключает клик по строке группы целиком (шеврон — только индикатор).
    // Тогглим billing открыть→закрыть: проверяем триггер и возвращаем стори в исходное
    // состояние (general/workspace раскрыты, billing свёрнут) — на него опираются e2e-спеки,
    // которые грузят эту же стори (play выполняется при загрузке).
    const billingRow = () =>
      root.querySelector(
        `[data-test-id="${INTERNAL_TEST_IDS.accordionItem}-billing"] [data-test-id="${INTERNAL_TEST_IDS.baseItem}_billing"]`,
      ) as HTMLElement;

    await step('row click opens the collapse branch', async () => {
      await userEvent.click(billingRow());
      await expect(canvas.getByTestId(`${INTERNAL_TEST_IDS.baseItem}_billing-invoices`)).toBeVisible();
    });

    await step('row click closes it back (restores initial state)', async () => {
      await userEvent.click(billingRow());
      await expect(canvas.queryByTestId(`${INTERNAL_TEST_IDS.baseItem}_billing-invoices`)).toBeNull();
    });
  },
};
