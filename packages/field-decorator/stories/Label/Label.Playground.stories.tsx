import { Label, SIZE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Label> = {
  title: 'Components/FieldDecorator/Label',
  component: Label,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    label: 'Заголовок поля',
    caption: 'Подпись',
    required: true,
    labelTooltip: { tip: 'Пояснение к заголовку' },
    'data-test-id': TEST_IDS.label.root,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Строка заголовка поля: label, знак обязательности, question-tooltip и подпись.</DemoHint>
        <DemoActions align='start'>
          <Label {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.label.root)).toBeVisible();
  },
};
