import { Button } from '@ds/button';
import { FieldColor, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../../_shared';

// Контролируемые open + value: потребитель сам ведёт оба стейта через onOpenChange + onChange.
// Этот контракт не выражается uncontrolled-args Playground'а (там open живёт во внутреннем
// useState, value — в useValueControl от defaultValue), поэтому отдельный пример.
const TOGGLE_BUTTON_TEST_ID = 'field-color-controlled-toggle';

// Портальный ColorPicker рендерится в document.body вне canvasElement. Корень адресуем через
// FieldColor-owned id: @ds/color-picker тегирует root только переданным data-test-id, а FieldColor
// пробрасывает в <ColorPicker> TEST_IDS.fieldColorPicker.
const COLOR_PICKER_ROOT_TEST_ID = TEST_IDS.fieldColorPicker;

function queryPickerRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-test-id="${COLOR_PICKER_ROOT_TEST_ID}"]`);
}

function ControlledColor() {
  const [value, setValue] = useState('#1976d2');
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Controlled value + open</DemoTitle>
        <DemoHint>
          Родитель держит value и open в useState. Кнопка открывает палитру программно, выбор цвета меняет value.
        </DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <Button
              data-test-id={TOGGLE_BUTTON_TEST_ID}
              label={open ? 'Close picker' : 'Open picker'}
              appearance='neutral'
              view='outline'
              onClick={() => setOpen(prev => !prev)}
            />
            <FieldColor
              data-test-id={TEST_IDS.fieldColor}
              label='Accent color'
              value={value}
              onChange={setValue}
              open={open}
              onOpenChange={setOpen}
              autoApply
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldColor> = {
  title: 'Components/Fields/FieldColor/Examples/Controlled',
  component: FieldColor,
  parameters: { layout: 'fullscreen' },
  render: () => <ControlledColor />,
};

export default meta;
type Story = StoryObj<typeof FieldColor>;

export const Controlled: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByTestId(TOGGLE_BUTTON_TEST_ID);
    const root = canvas.getByTestId(TEST_IDS.fieldColor);
    const input = within(root).getByTestId(TEST_IDS.fieldColorInput) as HTMLInputElement;

    await step('renders the field with the controlled initial value', async () => {
      await expect(root).toBeVisible();
      await expect(input).toHaveValue('#1976d2');
    });

    await step('external button opens the picker (controlled open)', async () => {
      await userEvent.click(toggle);
      await waitFor(() => expect(queryPickerRoot()).not.toBeNull());
    });

    await step('controlled open propagates to the trigger button label', async () => {
      // Открытие выше перевело контролируемый `open` в true → лейбл кнопки стал «Close picker».
      // Обратный клик гоняет outside-click + onClick одновременно (гонка), поэтому закрытие
      // через ту же кнопку проверяется в e2e; здесь — надёжный сигнал, что open долетел до UI.
      await expect(toggle).toHaveTextContent('Close picker');
    });
  },
};
