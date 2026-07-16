import { Button } from '@ds/button';
import { Droplist, ItemProps as Item, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const items: Item[] = [
  { id: 'a', content: { label: 'Overview' } },
  { id: 'b', content: { label: 'Analytics' } },
  { id: 'c', content: { label: 'Billing' } },
];

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist/Tests/Interaction',
  component: Droplist,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Droplist interaction</DemoTitle>
        <DemoHint>Multiple-select остаётся открытым; closeDroplistOnItemClick закрывает и возвращает фокус.</DemoHint>
        <DemoActions align='center'>
          <Droplist items={items} size='m' placement='bottom-start' trigger='click' selection={{ mode: 'multiple' }}>
            <Button
              data-test-id={TEST_IDS.droplist.triggerOpen}
              label='Open (multiple)'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
          <Droplist
            items={items}
            size='m'
            placement='bottom-start'
            trigger='click'
            closeDroplistOnItemClick
            selection={{ mode: 'single' }}
          >
            <Button
              data-test-id={TEST_IDS.droplist.triggerCloseOnClick}
              label='Open (close on click)'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof Droplist>;

// Список рендерится в портале (document.body), вне canvasElement: item'ы адресуем через document.
const queryItems = () => document.querySelectorAll<HTMLElement>(`[data-test-id^="${INTERNAL_TEST_IDS.baseItem}_"]`);
const itemId = (id: string) => `${INTERNAL_TEST_IDS.baseItem}_${id}`;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // Портальный список монтируется в document.body — адресуем item'ы через document.
    const portal = within(document.body);
    const triggerMultiple = canvas.getByTestId(TEST_IDS.droplist.triggerOpen);
    const triggerCloseOnClick = canvas.getByTestId(TEST_IDS.droplist.triggerCloseOnClick);

    await step('renders both triggers', async () => {
      await expect(triggerMultiple).toBeVisible();
      await expect(triggerCloseOnClick).toBeVisible();
    });

    await step('click: trigger opens droplist with all items (portal)', async () => {
      await userEvent.click(triggerMultiple);
      await waitFor(() => expect(queryItems().length).toBe(items.length));
    });

    await step('multiple: clicking two items checks both and keeps the droplist open', async () => {
      await userEvent.click(portal.getByTestId(itemId('a')));
      await userEvent.click(portal.getByTestId(itemId('b')));
      await waitFor(() => {
        expect(portal.getByTestId(itemId('a'))).toHaveAttribute('data-checked', 'true');
        expect(portal.getByTestId(itemId('b'))).toHaveAttribute('data-checked', 'true');
      });
      // multiple-режим не закрывается по клику на item.
      expect(queryItems().length).toBe(items.length);
    });

    await step('keyboard: Escape closes the multiple droplist', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryItems().length).toBe(0));
    });

    await step('closeDroplistOnItemClick: single-mode click closes the droplist', async () => {
      // Возврат фокуса на триггер (closeDroplist → triggerEl.focus()) ненадёжен в синтетической
      // среде storybook-test — проверяется в Playwright (Droplist/keyboard.spec).
      await userEvent.click(triggerCloseOnClick);
      await waitFor(() => expect(queryItems().length).toBe(items.length));
      await userEvent.click(portal.getByTestId(itemId('a')));
      await waitFor(() => expect(queryItems().length).toBe(0));
    });
  },
};
