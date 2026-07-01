import { ButtonCombo, Item, TEST_IDS } from '@ds/button-combo';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const ITEM_TEST_IDS = {
  create: 'button-combo-item-create',
  duplicate: 'button-combo-item-duplicate',
} as const;

const items: Item[] = [
  { id: 'create', label: 'Создать', onClick: fn(), 'data-test-id': ITEM_TEST_IDS.create },
  { id: 'duplicate', label: 'Дублировать', onClick: fn(), 'data-test-id': ITEM_TEST_IDS.duplicate },
];

const meta: Meta<typeof ButtonCombo> = {
  title: 'Components/ButtonCombo/Tests/Interaction',
  component: ButtonCombo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    items,
    defaultValue: 'create',
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonCombo>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Открытие списка, выбор действия меняет основную кнопку, клик по ней вызывает onClick выбранного действия.
        </DemoHint>
        <ButtonCombo {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // items дроплиста — в портале вне canvasElement.
    const portal = within(document.body);
    const option = canvas.getByTestId(TEST_IDS.option);
    const trigger = canvas.getByTestId(TEST_IDS.dropdownTrigger);

    await step('initial: основная кнопка показывает defaultValue', async () => {
      await expect(option).toHaveTextContent('Создать');
    });

    await step('click: chevron раскрывает список', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(portal.getByTestId(ITEM_TEST_IDS.duplicate)).toBeVisible());
    });

    await step('click: выбор пункта меняет label основной кнопки', async () => {
      await userEvent.click(portal.getByTestId(ITEM_TEST_IDS.duplicate));
      await waitFor(() => expect(option).toHaveTextContent('Дублировать'));
    });

    await step('click: основная кнопка вызывает onClick выбранного действия', async () => {
      await userEvent.click(option);
      expect(items[1].onClick).toHaveBeenCalledTimes(1);
    });
  },
};
