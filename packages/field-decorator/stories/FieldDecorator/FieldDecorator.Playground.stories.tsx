import { FieldDecorator, SIZE, VALIDATION_STATE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof FieldDecorator> = {
  title: 'Components/FieldDecorator/FieldDecorator',
  component: FieldDecorator,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.M,
    label: 'Заголовок поля',
    caption: 'Подпись',
    required: true,
    labelTooltip: { tip: 'Пояснение к заголовку' },
    hint: 'Подсказка под полем',
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    length: { current: 12, max: 100 },
    'data-test-id': TEST_IDS.fieldDecorator.root,
  },
};

export default meta;
type Story = StoryObj<typeof FieldDecorator>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Композиция Label + декорируемое поле + Hint.</DemoHint>
        <DemoActions align='start'>
          <FieldDecorator {...args}>
            <input className={styles.input} placeholder='Значение поля' />
          </FieldDecorator>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDecorator.root)).toBeVisible();
  },
};
