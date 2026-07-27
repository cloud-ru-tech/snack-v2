import { PLACEMENT, QuestionTooltip, QuestionTooltipProps, SIZE, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type StoryProps = QuestionTooltipProps;

function PlaygroundRender({ tip, ...rest }: StoryProps) {
  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>QuestionTooltip — иконка-триггер «?» для подсказок к полям форм. Наведите на «?».</DemoHint>
        <DemoActions align='center'>
          {/* tip оборачиваем в `<span data-test-id=...>` — гарантирует, что
              `data-test-id` оседает на видимом контенте подсказки. */}
          <QuestionTooltip {...rest} tip={<span data-test-id={TEST_IDS.questionTooltip.content}>{tip}</span>} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<StoryProps> = {
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
  argTypes: {
    tip: { control: 'text' },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Позиция popover',
    },
    trigger: {
      control: 'select',
      options: Object.values(TRIGGER),
      description: 'Способ открытия popover',
    },
    size: { control: 'radio', options: Object.values(SIZE) },
    triggerLabel: { control: 'text', description: 'aria-label триггера-иконки' },
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.questionTooltip.triggerOpen)).toBeVisible();
  },
};
