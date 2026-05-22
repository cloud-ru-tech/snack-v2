import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'fullscreen' },
  args: {
    tip: 'Подсказка о кнопке',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.HoverAndFocusVisible,
    disableMaxWidth: false,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Наведите или сфокусируйтесь на триггере ниже. Тип ({args.trigger}) и позиция — из Controls.</DemoHint>
        <DemoActions align='center'>
          {/* tip оборачиваем в `<span data-test-id=...>` — это гарантирует, что
              `data-test-id` оседает на видимом контенте тултипа (rest props
              Tooltip-а Storybook'ом могут не пробрасываться при args-spread,
              если argTypes их docgen-фильтрует). */}
          <Tooltip {...args} tip={<span data-test-id={TEST_IDS.tooltip.content}>{args.tip}</span>}>
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Наведите на меня'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  argTypes: {
    tip: { control: 'text', description: 'Содержимое подсказки' },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Позиция относительно триггера',
    },
    trigger: {
      control: 'select',
      options: Object.values(TRIGGER),
      description: 'Что открывает тултип',
    },
    disableMaxWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tooltip.triggerOpen)).toBeVisible();
  },
};
