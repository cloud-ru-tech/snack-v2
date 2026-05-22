import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Tests/Interaction',
  component: Dropdown,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    'data-test-id': TEST_IDS.root,
    onOpenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Открытие Dropdown по клику, выбор пункта, закрытие через Escape.'}</DemoHint>
        <DemoActions align='center'>
          <Dropdown
            {...args}
            trigger='click'
            content={
              <ul data-test-id={TEST_IDS.content} className={styles.list}>
                <li data-test-id={TEST_IDS.item} className={styles.listItem}>
                  Москва
                </li>
                <li className={styles.listItem}>Санкт-Петербург</li>
                <li className={styles.listItem}>Казань</li>
              </ul>
            }
          >
            <Button data-test-id={TEST_IDS.triggerOpen} label='Открыть' view='outline' appearance='neutral' />
          </Dropdown>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByTestId(TEST_IDS.triggerOpen);

    await step('click: opens dropdown content via portal', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(body.getByTestId(TEST_IDS.content)).toBeVisible());
      // Dropdown зовёт callback с (open, event, reason) — проверяем первый аргумент.
      expect(args.onOpenChange).toHaveBeenCalled();
      expect((args.onOpenChange as ReturnType<typeof fn>).mock.calls[0][0]).toBe(true);
    });

    await step('click on item: keeps callback consumer aware (no crash)', async () => {
      const item = body.getByTestId(TEST_IDS.item);
      await userEvent.click(item);
      // Items are inert in this story — клик не должен ронять; контент остаётся.
      await expect(body.getByTestId(TEST_IDS.content)).toBeVisible();
    });

    await step('keyboard: Escape closes dropdown', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.content)).toBeNull());
      const calls = (args.onOpenChange as ReturnType<typeof fn>).mock.calls;
      expect(calls.at(-1)?.[0]).toBe(false);
    });

    await step('click: re-opens dropdown after Escape', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(body.getByTestId(TEST_IDS.content)).toBeVisible());
    });
  },
};
