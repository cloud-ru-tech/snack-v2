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
    content: { option: 'General' },
    items: [
      { id: 'general-overview', content: { option: 'Overview' } },
      { id: 'general-analytics', content: { option: 'Analytics' } },
    ],
  },
  {
    id: 'billing',
    type: 'collapse',
    content: { option: 'Billing' },
    items: [
      { id: 'billing-invoices', content: { option: 'Invoices' } },
      {
        id: 'billing-methods',
        type: 'collapse',
        content: { option: 'Payment methods' },
        items: [
          { id: 'billing-card', content: { option: 'Card' } },
          { id: 'billing-wire', content: { option: 'Wire transfer' } },
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
        content: { option: 'Resources' },
        items: [
          { id: 'workspace-servers', content: { option: 'Servers' } },
          { id: 'workspace-storage', content: { option: 'Storage' } },
        ],
      },
    ],
  },
  { id: 'settings', content: { option: 'Settings' } },
];

function CollapseScenario() {
  const [open, setOpen] = useState<Array<string | number>>(['general', 'workspace-resources']);
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Collapse</DemoTitle>
        <DemoHint>Controlled expand: click the chevron trigger to toggle. Includes a group → collapse branch.</DemoHint>
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
    // Раскрытие переключает явная кнопка-триггер `groupIndicator` (шеврон), а не клик по строке.
    // Тогглим billing открыть→закрыть: проверяем триггер и возвращаем стори в исходное
    // состояние (general/workspace раскрыты, billing свёрнут) — на него опираются e2e-спеки,
    // которые грузят эту же стори (play выполняется при загрузке).
    const billingTrigger = () =>
      root.querySelector(
        `[data-test-id="${INTERNAL_TEST_IDS.accordionItem}-billing"] [data-test-id="${INTERNAL_TEST_IDS.groupIndicator}"]`,
      ) as HTMLElement;

    await step('chevron trigger opens the collapse branch', async () => {
      await userEvent.click(billingTrigger());
      await expect(canvas.getByTestId(`${INTERNAL_TEST_IDS.baseItem}_billing-invoices`)).toBeVisible();
    });

    await step('chevron trigger closes it back (restores initial state)', async () => {
      await userEvent.click(billingTrigger());
      await expect(canvas.queryByTestId(`${INTERNAL_TEST_IDS.baseItem}_billing-invoices`)).toBeNull();
    });
  },
};
