import { FieldSlider, FieldSliderProps, TEST_IDS } from '@ds/fields';
import { TEST_IDS as SLIDER_TEST_IDS } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// Метки вне сетки шага с числовыми подписями ≠ ключам: snapAndCommit идёт по веткам меток
// (key !== label ⇒ hasMarksEqualToValues=false ⇒ снэп к ближайшему parseFloat(label)).
const OFF_GRID_MARKS = { 10: '15', 50: '55', 90: '95' };

function InteractionScenario(args: FieldSliderProps) {
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Числовой uncontrolled-слайдер (commit по blur/Enter, снэп к шагу, reject нечислового ввода, ArrowRight по
          ручке), range-слайдер (readonly input min – max, ввод — no-op), снэп к меткам и unbindInputFromMarks.
        </DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.numericRoot}
              label='Volume'
              min={0}
              max={100}
              step={10}
              defaultValue={50}
              onChange={args.onChange}
            />
          </DemoResizable>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.rangeRoot}
              label='Price range'
              range
              min={0}
              max={100}
              step={1}
              defaultValue={[20, 80]}
            />
          </DemoResizable>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.marksRoot}
              label='Quality'
              min={0}
              max={100}
              step={null}
              marks={OFF_GRID_MARKS}
              defaultValue={55}
            />
          </DemoResizable>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.unboundRoot}
              label='Quality (unbound)'
              min={0}
              max={100}
              step={null}
              marks={OFF_GRID_MARKS}
              unbindInputFromMarks
              defaultValue={55}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSlider> = {
  title: 'Components/Fields/FieldSlider/Tests/Interaction',
  component: FieldSlider,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onChange: fn() },
  render: args => <InteractionScenario {...args} />,
};

export default meta;
type Story = StoryObj<typeof FieldSlider>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const numericRoot = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.numericRoot);
    const rangeRoot = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.rangeRoot);
    const marksRoot = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.marksRoot);
    const unboundRoot = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.unboundRoot);

    const numericInput = within(numericRoot).getByTestId(TEST_IDS.fieldSliderInput);
    // Фокусируемая ручка rc-slider несёт собственный data-test-id (slider__handle) от @ds/slider —
    // это нужный узел для клавиатуры (rc-slider слушает keyCode/which именно на ней).
    const numericHandle = within(numericRoot).getByTestId(SLIDER_TEST_IDS.handle);
    const rangeInput = within(rangeRoot).getByTestId(TEST_IDS.fieldSliderInput);
    const marksInput = within(marksRoot).getByTestId(TEST_IDS.fieldSliderInput);
    const unboundInput = within(unboundRoot).getByTestId(TEST_IDS.fieldSliderInput);

    await step('renders input and handle with the initial value', async () => {
      await expect(numericInput).toBeVisible();
      await expect(numericHandle).toBeVisible();
      await expect(numericInput).toHaveValue('50');
    });

    await step('typing then Enter commits the value snapped to the step grid', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      await userEvent.clear(numericInput);
      await userEvent.type(numericInput, '37');
      await userEvent.keyboard('{Enter}');
      // step=10: 37 снэпит к ближайшему допустимому 40.
      await expect(numericInput).toHaveValue('40');
      await expect(args.onChange).toHaveBeenCalledWith(40);
    });

    await step('blur commits the value (snap to step)', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      numericInput.focus();
      await userEvent.clear(numericInput);
      await userEvent.type(numericInput, '23');
      // userEvent.tab() уводит фокус с поля и даёт надёжный синтетический blur
      // (raw numericInput.blur() в storybook-test не всегда доводит React-onBlur).
      await userEvent.tab();
      // 23 снэпит к 20; blur — явный commit, onChange вызывается всегда (контракт «blur = commit»).
      await expect(numericInput).toHaveValue('20');
      await expect(args.onChange).toHaveBeenCalledWith(20);
    });

    await step('out-of-range typing clamps to max on commit', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      await userEvent.clear(numericInput);
      await userEvent.type(numericInput, '999');
      await userEvent.keyboard('{Enter}');
      await expect(numericInput).toHaveValue('100');
      await expect(args.onChange).toHaveBeenCalledWith(100);
    });

    await step('non-numeric keystroke is rejected (input rejects letters, no onChange)', async () => {
      (args.onChange as ReturnType<typeof fn>).mockClear();
      await userEvent.clear(numericInput);
      await userEvent.type(numericInput, 'abc');
      // handleInputChange отклоняет нечисловой ввод — буквы не попадают в поле.
      await expect(numericInput).toHaveValue('');
      await expect(args.onChange).not.toHaveBeenCalled();
    });

    await step('ArrowRight on the focusable handle moves the value and fires onChange', async () => {
      // Возвращаем значение в середину диапазона — ArrowRight на max (100) не двигал бы ручку.
      await userEvent.clear(numericInput);
      await userEvent.type(numericInput, '50');
      await userEvent.keyboard('{Enter}');
      (args.onChange as ReturnType<typeof fn>).mockClear();
      // rc-slider читает keyCode/which на самой ручке; программный focus не активирует
      // focus-visible tracker — потому низкоуровневый fireEvent.keyDown, не userEvent.keyboard.
      numericHandle.focus();
      fireEvent.keyDown(numericHandle, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
      await expect(args.onChange).toHaveBeenCalled();
    });

    await step('range input is readonly and shows the formatted min – max', async () => {
      await expect(rangeInput).toHaveValue('20 – 80');
      await expect(rangeInput).toHaveAttribute('readonly');
    });

    await step('typing into a range input is a no-op (value unchanged)', async () => {
      await userEvent.type(rangeInput, '5');
      await expect(rangeInput).toHaveValue('20 – 80');
    });

    await step('off-mark typing snaps to the nearest mark on Enter', async () => {
      await userEvent.clear(marksInput);
      await userEvent.type(marksInput, '60');
      await userEvent.keyboard('{Enter}');
      // метки-подписи 15/55/95: 60 снэпит к 55.
      await expect(marksInput).toHaveValue('55');
    });

    await step('unbindInputFromMarks keeps the off-mark value (step=null, no snap)', async () => {
      await userEvent.clear(unboundInput);
      await userEvent.type(unboundInput, '63');
      await userEvent.keyboard('{Enter}');
      await expect(unboundInput).toHaveValue('63');
    });
  },
};
