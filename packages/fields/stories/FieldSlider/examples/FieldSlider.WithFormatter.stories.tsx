import { FieldSlider, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../../_shared';
import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// textInputFormatter форматирует значение в текстовом поле, не меняя само значение:
// поле показывает «75 %», тогда как onChange/value оперируют числом 75.
function WithFormatterDemo() {
  const [value, setValue] = useState(75);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Кастомный formatter</DemoTitle>
        <DemoHint>textInputFormatter форматирует отображение («75 %»), значение остаётся числом ({value}).</DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldSlider
              data-test-id={STORY_TEST_IDS.fieldSlider.formatterExampleRoot}
              label='Громкость'
              min={0}
              max={100}
              step={5}
              postfix='%'
              textInputFormatter={v => `${v} %`}
              value={value}
              onChange={v => setValue(v as number)}
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSlider> = {
  title: 'Components/Fields/FieldSlider/Examples/WithFormatter',
  component: FieldSlider,
  parameters: { layout: 'fullscreen' },
  render: () => <WithFormatterDemo />,
};

export default meta;
type Story = StoryObj<typeof FieldSlider>;

export const WithFormatter: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(STORY_TEST_IDS.fieldSlider.formatterExampleRoot);
    const input = within(root).getByTestId(TEST_IDS.fieldSliderInput);

    await step('the formatter renders the display value while the value stays numeric', async () => {
      await expect(root).toBeVisible();
      await expect(input).toHaveValue('75 %');
    });
  },
};
