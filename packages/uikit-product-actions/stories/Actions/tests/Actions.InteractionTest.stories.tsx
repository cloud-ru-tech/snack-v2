import { Button } from '@ds/button';
import { Action, Actions, TEST_IDS as ACTION_TEST_IDS } from '@ds/uikit-product-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, LayoutScope } from '#storybook/components';

import { items } from '../items';
import { TEST_IDS } from '../testIds';

const selected = fn();
const blocked = fn();
function StatefulAction() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(value => value + 1);
  return <Button data-test-id={TEST_IDS.stateful} label={`Выбрано: ${count}`} onClick={handleClick} />;
}

function Interaction() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reversed, setReversed] = useState(false);
  const actions: Action[] = [
    { ...items[0], hidden },
    {
      id: 'stateful',
      variant: 'custom',
      render: () => ({
        default: <StatefulAction />,
        asListItem: { content: { label: 'Выбрать' }, onClick: selected, 'data-test-id': TEST_IDS.second },
      }),
    },
  ];
  const orderedActions = reversed ? [...actions].reverse() : actions;
  const handleLoad = () => setLoaded(true);
  const handleToggle = () => setHidden(value => !value);
  const handleReorder = () => setReversed(value => !value);
  return (
    <DemoPage>
      <DemoPanel>
        <LayoutScope layoutType='mobile'>
          <Button data-test-id={TEST_IDS.load} label='Загрузить действия' onClick={handleLoad} />
          <Button data-test-id={TEST_IDS.toggle} label='Скрыть первое действие' onClick={handleToggle} />
          <Button data-test-id={TEST_IDS.reorder} label='Переставить действия' onClick={handleReorder} />
          <Actions items={loaded ? orderedActions : []} data-test-id={TEST_IDS.root} />
          <Actions items={actions} maxVisibleItems={0} groupDividers={false} />
          <LayoutScope layoutType='desktop'>
            <Actions
              maxVisibleItems={0}
              moreButtonProps={{ 'data-test-id': TEST_IDS.contractTrigger }}
              items={[
                { as: 'a', href: '#actions', target: '_self', label: 'Ссылка', 'data-test-id': TEST_IDS.selfLink },
                {
                  variant: 'dropdown',
                  label: 'Отключено',
                  disabled: true,
                  items: [
                    {
                      content: { label: 'Недоступный пункт' },
                      onClick: blocked,
                      'data-test-id': TEST_IDS.disabledItem,
                    },
                  ],
                },
              ]}
            />
          </LayoutScope>
        </LayoutScope>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof Actions> = {
  title: 'Uikit Product/Actions/Actions/Tests/Interaction',
  component: Actions,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};
export default meta;
export const InteractionTest: StoryObj<typeof Actions> = {
  tags: ['test', 'dev'],
  render: () => <Interaction />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByTestId(TEST_IDS.root)).toBeNull();
    await userEvent.click(canvas.getByTestId(TEST_IDS.load));
    const row = within(canvas.getByTestId(TEST_IDS.root));
    await step('Состояние custom action сохраняется при скрытии соседей и перестановке', async () => {
      await userEvent.click(row.getByTestId(TEST_IDS.stateful));
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggle));
      await expect(row.getByTestId(TEST_IDS.stateful)).toHaveTextContent('Выбрано: 1');
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggle));
      await userEvent.click(canvas.getByTestId(TEST_IDS.reorder));
      await expect(row.getByTestId(TEST_IDS.stateful)).toHaveTextContent('Выбрано: 1');
    });
    await step('Custom action доступен из меню и вызывает callback', async () => {
      const trigger = canvas.getAllByTestId(ACTION_TEST_IDS.trigger).at(-1);
      if (!trigger) throw new Error('Кнопка меню не найдена');
      await userEvent.click(trigger);
      const body = within(canvasElement.ownerDocument.body);
      await waitFor(() => expect(body.getByTestId(TEST_IDS.second)).toBeVisible());
      await userEvent.click(body.getByTestId(TEST_IDS.second));
      await expect(selected).toHaveBeenCalledOnce();
    });
    await step('Desktop overflow сохраняет target ссылки и disabled составной кнопки', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.contractTrigger));
      const body = within(canvasElement.ownerDocument.body);
      await waitFor(() => expect(body.getByTestId(TEST_IDS.selfLink)).toBeVisible());
      await expect(body.getByTestId(TEST_IDS.selfLink).closest('a')).toHaveAttribute('target', '_self');
      const disabledItem = body.getByTestId(TEST_IDS.disabledItem);
      await expect(disabledItem.closest('[data-disabled]')).toHaveAttribute('data-disabled', 'true');
      await userEvent.click(disabledItem, { pointerEventsCheck: 0 });
      await expect(blocked).not.toHaveBeenCalled();
    });
  },
};
