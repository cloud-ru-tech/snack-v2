import { Button } from '@ds/button';
import { Action, Actions } from '@ds/uikit-product-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, LayoutScope } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const selected = fn();
const customSelected = fn();
const ids = TEST_IDS.staticActions;
const menuItems = [{ content: { label: 'Выбрать' }, onClick: selected, 'data-test-id': ids.menuItem }];
const items: Action[] = [
  {
    variant: 'droplist',
    button: { label: 'Действия', 'data-test-id': ids.droplist },
    list: { items: menuItems, closeDroplistOnItemClick: true },
    tooltip: { tip: <span data-test-id={ids.buttonTip}>Доступные действия</span> },
  },
  {
    variant: 'droplist',
    button: { buttonType: 'filled', label: 'Создать', 'data-test-id': ids.filledDroplist },
    list: { items: menuItems, closeDroplistOnItemClick: true },
  },
  {
    variant: 'kebab',
    button: { 'aria-label': 'Другие действия', 'data-test-id': ids.kebab },
    list: { items: menuItems, closeDroplistOnItemClick: true },
  },
  {
    variant: 'dropdown',
    label: 'Настройки',
    'data-test-id': ids.dropdown,
    items: menuItems,
    closeDroplistOnItemClick: true,
  },
  {
    variant: 'custom',
    tooltip: { tip: <span data-test-id={ids.customTip}>Кастомное действие</span> },
    render: () => ({
      default: <Button label='Проверить' data-test-id={ids.custom} onClick={customSelected} />,
      asListItem: { content: { label: 'Проверить' }, onClick: customSelected },
    }),
  },
];

const meta: Meta<typeof Actions> = {
  title: 'Uikit Product/Actions/Actions/Tests/StaticInteraction',
  component: Actions,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};
export default meta;

export const StaticInteractionTest: StoryObj<typeof Actions> = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <LayoutScope layoutType='desktop'>
          <Button label='Вне панели' data-test-id={ids.outside} />
          <Actions items={items} collapse={false} data-test-id={TEST_IDS.root} />
        </LayoutScope>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    selected.mockClear();
    customSelected.mockClear();
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await step('Составные действия открывают меню и вызывают callback пункта', async () => {
      const triggers = [ids.droplist, ids.filledDroplist, ids.kebab, ids.dropdown];
      for (const [index, trigger] of triggers.entries()) {
        await expect(canvas.getByTestId(trigger)).toBeVisible();
        await userEvent.click(canvas.getByTestId(trigger));
        await waitFor(() => expect(body.getByTestId(ids.menuItem)).toBeVisible());
        await userEvent.click(body.getByTestId(ids.menuItem));
        await expect(selected).toHaveBeenCalledTimes(index + 1);
        await waitFor(() => expect(body.queryByTestId(ids.menuItem)).not.toBeInTheDocument());
      }
    });
    await step('Подсказки доступны для обычного и кастомного действия', async () => {
      await userEvent.hover(canvas.getByTestId(ids.droplist));
      await waitFor(() => expect(body.getByTestId(ids.buttonTip)).toBeVisible());
      await userEvent.unhover(canvas.getByTestId(ids.droplist));
      await userEvent.hover(canvas.getByTestId(ids.custom));
      await waitFor(() => expect(body.getByTestId(ids.customTip)).toBeVisible());
      await userEvent.click(canvas.getByTestId(ids.custom));
      await expect(customSelected).toHaveBeenCalledOnce();
      await userEvent.unhover(canvas.getByTestId(ids.custom));
    });
  },
};
