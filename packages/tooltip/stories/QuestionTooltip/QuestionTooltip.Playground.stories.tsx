import { PLACEMENT, QuestionTooltip, SIZE, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof QuestionTooltip> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
  parameters: { layout: 'fullscreen' },
  args: {
    tip: 'Подсказка о поле формы',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.Hover,
    size: SIZE.XS,
    triggerLabel: 'Подсказка',
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>QuestionTooltip — иконка-триггер для подсказок к полям форм. Наведите на «?» ниже.</DemoHint>
        <DemoActions align='center'>
          {/* tip оборачиваем в `<span data-test-id=...>` — гарантирует, что
              `data-test-id` оседает на видимом контенте тултипа. */}
          <QuestionTooltip {...args} tip={<span data-test-id={TEST_IDS.questionTooltip.content}>{args.tip}</span>} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  argTypes: {
    tip: { control: 'text' },
    placement: { control: 'select', options: Object.values(PLACEMENT) },
    trigger: { control: 'select', options: Object.values(TRIGGER) },
    size: { control: 'radio', options: Object.values(SIZE) },
    triggerLabel: { control: 'text', description: 'aria-label триггера-иконки' },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionTooltip>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    // QuestionTooltip рендерит свою кнопку-триггер без проксирования data-test-id —
    // адресуем через aria-label (исключение из правила getByTestId-only).
    await expect(within(canvasElement).getByRole('button', { name: 'Подсказка' })).toBeVisible();
  },
};
