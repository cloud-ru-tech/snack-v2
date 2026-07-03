import { FieldSlider, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// step=null + marks, чьи подписи (числа) не совпадают с ключами: ввод в текстовое поле
// снэпит к ближайшей метке-подписи на commit (Enter/blur).
const MARKS = { 10: '15', 50: '55', 90: '95' };

// Нелинейные значения с равномерным распределением (marksEqualSpacing): промежутки между
// 1·2·4·8·16·32 на шкале одинаковые, хотя сами значения растут в геометрической прогрессии.
const EQUAL_SPACING_MARKS = { 1: '1', 2: '2', 4: '4', 8: '8', 16: '16', 32: '32' };

function WithMarksDemo() {
  const [value, setValue] = useState(55);
  const [equalSpacingValue, setEqualSpacingValue] = useState(8);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Снэп к меткам</DemoTitle>
        <DemoHint>step=null + marks — ввод снэпит к ближайшей метке на Enter/blur.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.marksExampleRoot}
              label='Качество сжатия'
              min={0}
              max={100}
              step={null}
              marks={MARKS}
              value={value}
              onChange={v => setValue(v as number)}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>

      <DemoPanel width='narrow'>
        <DemoTitle>Равномерные метки (marksEqualSpacing)</DemoTitle>
        <DemoHint>Нелинейные значения 1·2·4·8·16·32 распределяются по шкале равными промежутками.</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.equalSpacingExampleRoot}
              label='Размер кластера'
              min={1}
              max={32}
              step={null}
              marks={EQUAL_SPACING_MARKS}
              marksEqualSpacing
              value={equalSpacingValue}
              onChange={v => setEqualSpacingValue(v as number)}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSlider> = {
  title: 'Components/Fields/FieldSlider/Examples/WithMarks',
  component: FieldSlider,
  parameters: { layout: 'fullscreen' },
  render: () => <WithMarksDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldSlider>;

export const WithMarks: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.marksExampleRoot);
    const input = within(root).getByTestId(TEST_IDS.fieldSliderInput);

    await step('renders the initial mark value', async () => {
      await expect(root).toBeVisible();
      await expect(input).toHaveValue('55');
    });

    await step('off-mark typing snaps to the nearest mark on Enter', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, '70');
      await userEvent.keyboard('{Enter}');
      // метки 15/55/95: 70 снэпит к 55.
      await expect(input).toHaveValue('55');
    });

    await step('equal-spacing slider renders its initial non-linear value', async () => {
      const equalSpacingRoot = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.equalSpacingExampleRoot);
      const equalSpacingInput = within(equalSpacingRoot).getByTestId(TEST_IDS.fieldSliderInput);
      await expect(equalSpacingRoot).toBeVisible();
      await expect(equalSpacingInput).toHaveValue('8');
    });
  },
};
