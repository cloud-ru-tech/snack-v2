import { FieldSlider, FieldSliderProps, SIZE, TEST_IDS, VALIDATION_STATE } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

type StoryProps = FieldSliderProps & {
  /** Story-only: показать метки на шкале (`marks` — объект, не сериализуемый control). */
  showMarks: boolean;
  /** Story-only: применить `textInputFormatter` (функция, не сериализуемый control). */
  useFormatter: boolean;
  /** Story-only: показать иконку-постфикс (`postfixIcon` — ReactNode, не сериализуемый control). */
  showPostfixIcon: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Fields/FieldSlider',
  component: FieldSlider,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Volume',
    caption: '',
    hint: 'Hint text',
    error: '',
    size: SIZE.M,
    validationState: VALIDATION_STATE.Default,
    showHintIcon: true,
    required: false,
    background: true,
    disabled: false,
    readonly: false,
    range: false,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    showScaleBar: true,
    unbindInputFromMarks: false,
    postfix: '%',
    showMarks: false,
    useFormatter: false,
    showPostfixIcon: false,
    'data-test-id': TEST_IDS.fieldSlider,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    validationState: { control: 'select', options: Object.values(VALIDATION_STATE) },
    showMarks: { name: '[Stories]: showMarks', control: 'boolean' },
    useFormatter: { name: '[Stories]: useFormatter', control: 'boolean' },
    showPostfixIcon: { name: '[Stories]: showPostfixIcon', control: 'boolean' },
    // Слоты/функции выставляются story-only-тогглами выше — прячем сырые пропсы из панели.
    marks: { table: { disable: true } },
    textInputFormatter: { table: { disable: true } },
    postfixIcon: { table: { disable: true } },
    // uncontrolled-режим: значением владеет компонент, value скрыт из панели.
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  render: ({ showMarks, useFormatter, showPostfixIcon, ...args }) => {
    const marks = showMarks ? { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' } : undefined;
    const textInputFormatter = useFormatter ? (v: number) => `${v} %` : undefined;
    const postfixIcon = showPostfixIcon ? <PlaceholderSVG /> : undefined;

    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Слайдер с числовым input&apos;ом, шкалой и uncontrolled-value (defaultValue).</DemoHint>
          <DemoActions block>
            <DemoResizable width='narrow'>
              <FieldSlider {...args} marks={marks} textInputFormatter={textInputFormatter} postfixIcon={postfixIcon} />
            </DemoResizable>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSlider)).toBeVisible();
  },
};
