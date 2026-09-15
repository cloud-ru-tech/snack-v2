import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/ExpandIconToggle',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

function ExpandIconToggleScenario() {
  const [open, setOpen] = useState<Array<string | number>>([]);
  const [route, setRoute] = useState('/');

  // Строка обёрнута в ссылку — так сайдбары подключают роутер (`next/link` и аналоги).
  // Собственный переход роутер отменяет, если клик уже обработан кем-то ниже по дереву
  // (`e.defaultPrevented`); `BaseItem` в режиме `toggleOn: 'expandIcon'` именно это и делает
  // на шевроне, поэтому раскрытие группы не уводит на роут.
  const asLink = (href: string) =>
    function wrapItem(node: ReactNode) {
      return (
        <a
          href={href}
          className={styles.itemLink}
          onClick={e => {
            if (e.defaultPrevented) {
              return;
            }

            e.preventDefault();
            setRoute(href);
          }}
        >
          {node}
        </a>
      );
    };

  const items: Item[] = [
    {
      id: 'guides',
      type: 'collapse',
      content: { label: 'Guides' },
      itemWrapRender: asLink('/guides'),
      items: [
        { id: 'guides-start', content: { label: 'Getting started' }, itemWrapRender: asLink('/guides/start') },
        { id: 'guides-faq', content: { label: 'FAQ' }, itemWrapRender: asLink('/guides/faq') },
      ],
    },
    {
      id: 'components',
      type: 'collapse',
      content: { label: 'Components' },
      itemWrapRender: asLink('/components'),
      items: [
        { id: 'components-button', content: { label: 'Button' }, itemWrapRender: asLink('/components/button') },
        { id: 'components-list', content: { label: 'List' }, itemWrapRender: asLink('/components/list') },
      ],
    },
    { id: 'changelog', content: { label: 'Changelog' }, itemWrapRender: asLink('/changelog') },
  ];

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Expand icon toggle</DemoTitle>
        <DemoHint>
          collapse.toggleOn=&apos;expandIcon&apos;: клик по строке уходит в ссылку, раскрытие переключает только
          шеврон.
        </DemoHint>
        <DemoHint data-test-id={TEST_IDS.list.expandIconToggleRoute}>Текущий роут: {route}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.expandIconToggleScenario}
              items={items}
              size='m'
              collapse={{ value: open, onChange: value => setOpen(value ?? []), toggleOn: 'expandIcon' }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const ExpandIconToggle: Story = {
  tags: ['dev', 'test'],
  render: () => <ExpandIconToggleScenario />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const route = canvas.getByTestId(TEST_IDS.list.expandIconToggleRoute);
    const expandIconOf = (id: string) =>
      within(canvas.getByTestId(`${INTERNAL_TEST_IDS.accordionItem}-${id}`)).getByTestId(
        INTERNAL_TEST_IDS.groupIndicator,
      );

    await step('row click navigates and leaves the group collapsed', async () => {
      await userEvent.click(canvas.getByTestId(`${INTERNAL_TEST_IDS.baseItem}_guides`));
      await expect(route).toHaveTextContent('/guides');
      await expect(canvas.queryByTestId(`${INTERNAL_TEST_IDS.baseItem}_guides-start`)).toBeNull();
    });

    await step('expand icon click expands the group without navigating', async () => {
      await userEvent.click(expandIconOf('components'));
      await expect(canvas.getByTestId(`${INTERNAL_TEST_IDS.baseItem}_components-button`)).toBeVisible();
      // Роут прежний: клик по шеврону не всплыл до строки и не ушёл в ссылку.
      await expect(route).toHaveTextContent('/guides');
    });

    await step('expand icon click collapses it back', async () => {
      await userEvent.click(expandIconOf('components'));
      await expect(canvas.queryByTestId(`${INTERNAL_TEST_IDS.baseItem}_components-button`)).toBeNull();
    });
  },
};
