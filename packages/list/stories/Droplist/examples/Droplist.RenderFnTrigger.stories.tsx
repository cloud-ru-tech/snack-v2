import { Button } from '@ds/button';
import { Droplist, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const items: Item[] = [
  { id: 'overview', content: { label: 'Overview' } },
  { id: 'analytics', content: { label: 'Analytics' } },
  { id: 'billing', content: { label: 'Billing' } },
];

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist/Examples/RenderFnTrigger',
  component: Droplist,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Droplist>;

// children как render-функция `({ onKeyDown }) => ReactNode`. Для произвольного триггера
// потребитель ОБЯЗАН прокинуть `onKeyDown` в свой элемент — иначе клавиатурное открытие
// (ArrowDown/Enter с фокуса на триггере) не работает (auto-capture отключён для function-children).
export const RenderFnTrigger: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Render-function trigger</DemoTitle>
        <DemoHint>children — функция; onKeyDown прокинут в кастомный триггер для клавиатурного открытия.</DemoHint>
        <DemoActions align='center'>
          <Droplist items={items} size='m' placement='bottom-start' trigger='click'>
            {({ onKeyDown }) => (
              <Button
                data-test-id={TEST_IDS.droplist.renderFnTrigger}
                label='Custom trigger'
                view='outline'
                appearance='neutral'
                size='m'
                onKeyDown={onKeyDown}
              />
            )}
          </Droplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.droplist.renderFnTrigger)).toBeVisible();
  },
};
