import { FieldDecorator, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../_shared';
import styles from './stories.module.scss';

const meta: Meta<typeof FieldDecorator> = {
  title: 'Components/Fields/FieldDecorator',
  component: FieldDecorator,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Label',
    caption: 'Caption',
    hint: 'Hint text',
    error: '',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    disabled: false,
    readonly: false,
    length: { current: 12, max: 100 },
    labelTooltip: undefined,
    'data-test-id': TEST_IDS.fieldDecorator,
    children: <div className={styles.narrow}>Field content</div>,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    labelTooltip: {
      control: 'select',
      options: ['none', 'short'],
      mapping: {
        none: undefined,
        short: { tip: 'Подсказка к заголовку' },
      },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    innerRef: { table: { disable: true } },
    labelFor: { table: { disable: true } },
  },
  render: args => (
    <PortalContextProvider>
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Низкоуровневая обёртка для полей: label / caption / hint / error / length / required.</DemoHint>
          <DemoActions block>
            <ResizableWrapper>
              <FieldDecorator {...args} />
            </ResizableWrapper>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    </PortalContextProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof FieldDecorator>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDecorator)).toBeVisible();
  },
};
