import { Hint, SIZE, VALIDATION_STATE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Hint> = {
  title: 'Components/FieldDecorator/Hint',
  component: Hint,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    hint: 'Подсказка под полем',
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    length: { current: 12, max: 100 },
    'data-test-id': TEST_IDS.hint.root,
  },
};

export default meta;
type Story = StoryObj<typeof Hint>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Подсказка/ошибка со статус-иконкой и счётчиком длины.</DemoHint>
        <DemoActions align='start'>
          <Hint {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.hint.root)).toBeVisible();
  },
};
