import { FieldSlider, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// range — controlled-режим с number[]: две ручки слайдера ведёт родитель через useState.
// Текстовое поле в этом режиме всегда readonly и показывает 'min – max'.
function RangeDemo() {
  const [value, setValue] = useState<number[]>([20, 80]);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Range (диапазон)</DemoTitle>
        <DemoHint>Две ручки, controlled number[]. Текстовое поле readonly, формат «min – max».</DemoHint>
        <DemoActions align='center'>
          <DemoResizable width='narrow'>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.rangeExampleRoot}
              label='Диапазон цены'
              hint='₽/мес.'
              range
              min={0}
              max={100}
              step={1}
              postfix='₽'
              value={value}
              onChange={v => setValue(v as number[])}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSlider> = {
  title: 'Components/Fields/FieldSlider/Examples/Range',
  component: FieldSlider,
  parameters: { layout: 'fullscreen' },
  render: () => <RangeDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldSlider>;

export const Range: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.rangeExampleRoot);
    const input = within(root).getByTestId(TEST_IDS.fieldSliderInput);

    await step('range text field is readonly and shows the formatted min – max', async () => {
      await expect(root).toBeVisible();
      await expect(input).toHaveValue('20 – 80');
      await expect(input).toHaveAttribute('readonly');
    });
  },
};
