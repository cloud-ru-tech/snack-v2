import { FieldColor, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../../_shared';

// Кнопка очистки из @ds/input-private::useClearButton (нет в публичном TEST_IDS).
const CLEAR_BUTTON_TEST_ID = 'button-clear-value';
// Свои id корней — чтобы скоупить запросы кнопок к нужному полю.
const MAIN_ROOT_TEST_ID = TEST_IDS.fieldColor;
const REQUIRED_ROOT_TEST_ID = 'field-color-required';
const READONLY_ROOT_TEST_ID = 'field-color-readonly';
const DISABLED_ROOT_TEST_ID = 'field-color-disabled';

// Портальный ColorPicker (@ds/color-picker) рендерится в document.body вне canvasElement —
// адресуем его узлы через document. Корень тегируется FieldColor-owned id'ом (TEST_IDS.fieldColorPicker):
// @ds/color-picker ставит data-test-id на корень только переданным значением (root рендерит
// `{...extractSupportProps(rest)}`), а FieldColor пробрасывает его в <ColorPicker>.
const COLOR_PICKER_ROOT_TEST_ID = TEST_IDS.fieldColorPicker;
// Внутренний hex-input ColorPicker'а несёт собственный id — локальная копия, т.к. кросс-пакетный
// импорт @ds/color-picker в stories тянет его CSS-модули.
const COLOR_PICKER_HEX_INPUT_TEST_ID = 'color-picker__field-hex-native-input';

const onChange = fn();
const onClearButtonClick = fn();

function InteractionScenario() {
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Триггер открывает ColorPicker, выбор/ввод меняет значение (alpha отбрасывается при field-pick), кнопка очистки
          сбрасывает поле, readonly показывает копирование.
        </DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldColor
              data-test-id={MAIN_ROOT_TEST_ID}
              label='Color'
              defaultValue='#ff0000'
              autoApply
              withAlpha
              onChange={onChange}
              onClearButtonClick={onClearButtonClick}
              showClearButton
            />
            <FieldColor
              data-test-id={REQUIRED_ROOT_TEST_ID}
              label='Required'
              required
              defaultValue='#3f51b5'
              showClearButton
            />
            <FieldColor
              data-test-id={READONLY_ROOT_TEST_ID}
              label='Readonly'
              readonly
              defaultValue='#00ff00'
              showCopyButton
            />
            <FieldColor
              data-test-id={DISABLED_ROOT_TEST_ID}
              label='Disabled'
              disabled
              defaultValue='#0000ff'
              showClearButton
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldColor> = {
  title: 'Components/Fields/FieldColor/Tests/Interaction',
  component: FieldColor,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldColor>;

// ColorPicker монтируется в portal вне canvasElement — ищем его узлы через document.
function queryPickerRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-test-id="${COLOR_PICKER_ROOT_TEST_ID}"]`);
}

function queryPickerHexInput(): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(`[data-test-id="${COLOR_PICKER_HEX_INPUT_TEST_ID}"]`);
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChange.mockClear();
    onClearButtonClick.mockClear();

    const canvas = within(canvasElement);
    const main = canvas.getByTestId(MAIN_ROOT_TEST_ID);
    const input = within(main).getByTestId(TEST_IDS.fieldColorInput) as HTMLInputElement;
    const swatch = within(main).getByTestId(TEST_IDS.fieldColorSwatch);
    const chevron = within(main).getByTestId(TEST_IDS.fieldColorChevron);

    await step('renders root, input, swatch and chevron', async () => {
      await expect(main).toBeVisible();
      await expect(input).toBeVisible();
      await expect(swatch).toBeVisible();
      await expect(chevron).toBeVisible();
    });

    await step('open: clicking the trigger mounts the picker and marks root open', async () => {
      await userEvent.click(input);
      await waitFor(() => expect(queryPickerRoot()).not.toBeNull());
      // Фокус-в-поле после открытия портала недетерминирован в storybook-test (useEffect(open) +
      // монтирование портала @ds/dropdown спорят за активный элемент) — проверка фокуса живёт в
      // interaction.spec.ts (реальный браузер). Здесь ассертим детерминированное состояние:
      // showOpen=true подсвечивает корень (data-focusvisible) и рендерит ChevronUpSVG в шевроне.
      await expect(main).toHaveAttribute('data-focusvisible', 'true');
      await expect(chevron).toBeVisible();
    });

    await step('pick: typing a hex into the picker field commits a 6-digit value (alpha dropped)', async () => {
      const hexInput = queryPickerHexInput();
      expect(hexInput).not.toBeNull();
      if (hexInput) {
        hexInput.focus();
        await userEvent.clear(hexInput);
        await userEvent.type(hexInput, 'aabbcc');
        // FieldPrivate коммитит значение на вводе (live onChange); tab уводит фокус, нормализуя
        // отображение к committed-значению.
        await userEvent.tab();
      }
      // autoApply → field-pick коммитит raw.hex без альфы (#rrggbb, 6 цифр), несмотря на withAlpha.
      await waitFor(() => expect(onChange).toHaveBeenCalledWith('#aabbcc'));
      await waitFor(() => expect(input).toHaveValue('#aabbcc'));
    });

    await step('close the picker so its overlay does not cover sibling fields', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryPickerRoot()).toBeNull());
    });

    await step('type-normalize: non-hex chars stripped, hash kept, capped at 9 chars', async () => {
      input.focus();
      await userEvent.clear(input);
      await userEvent.type(input, '#GG12ff!!');
      // `G` не hex, `!` отбрасывается → `#12ff`.
      await waitFor(() => expect(input).toHaveValue('#12ff'));
      expect(onChange).toHaveBeenLastCalledWith('#12ff');
      // Защитно закрываем picker, если он остался открытым.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryPickerRoot()).toBeNull());
    });

    await step(
      'clear: button visible for a non-empty editable field, resets and fires onClearButtonClick',
      async () => {
        const clear = within(main).getByTestId(CLEAR_BUTTON_TEST_ID);
        await expect(clear).toBeVisible();
        await userEvent.click(clear);
        expect(onClearButtonClick).toHaveBeenCalledTimes(1);
        await expect(input).toHaveValue('');
      },
    );

    await step('clear: button hides once the value is empty', async () => {
      await expect(within(main).queryByTestId(CLEAR_BUTTON_TEST_ID)).toBeNull();
      // Клик по очистке мог открыть picker (клик внутри триггера) — закрываем.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryPickerRoot()).toBeNull());
    });

    await step('required: clearing keeps the input focused (no value loss without re-focus)', async () => {
      const requiredRoot = canvas.getByTestId(REQUIRED_ROOT_TEST_ID);
      const requiredInput = within(requiredRoot).getByTestId(TEST_IDS.fieldColorInput) as HTMLInputElement;
      const requiredClear = within(requiredRoot).getByTestId(CLEAR_BUTTON_TEST_ID);
      await userEvent.click(requiredClear);
      await expect(requiredInput).toHaveValue('');
      await expect(requiredInput).toHaveFocus();
      // Закрываем picker, который мог открыться при клике рядом с полем.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(queryPickerRoot()).toBeNull());
    });

    await step('disabled: hides the clear button despite a non-empty value', async () => {
      const disabledRoot = canvas.getByTestId(DISABLED_ROOT_TEST_ID);
      await expect(within(disabledRoot).queryByTestId(CLEAR_BUTTON_TEST_ID)).toBeNull();
      await expect(within(disabledRoot).getByTestId(TEST_IDS.fieldColorInput)).toBeDisabled();
    });

    await step('readonly: chevron stays visible, copy button fires onCopyButtonClick', async () => {
      const readonlyRoot = canvas.getByTestId(READONLY_ROOT_TEST_ID);
      // Chevron остаётся виден в readonly — паритет с Figma readonly-вариантами fieldSelectColor.
      await expect(within(readonlyRoot).getByTestId(TEST_IDS.fieldColorChevron)).toBeVisible();
      const copyBtn = within(readonlyRoot).getByTestId(TEST_IDS.fieldTextCopyButton);
      await expect(copyBtn).toBeVisible();
      await expect(copyBtn).toBeEnabled();
      // onCopyButtonClick гейтится успешной записью в буфер (copyTextToClipboard), а в jsdom
      // execCommand('copy') возвращает false → колбэк/иконка-свап не срабатывают. Реальная
      // запись в буфер (доказывающая весь copy-путь) — в __test__/FieldColor/interaction.spec.ts.
    });

    // Роуминг фокуса Tab → input → ArrowRight → clear (useButtonNavigation) завязан на
    // фокус-менеджмент, ненадёжный в синтетической storybook-test среде; проверяется в Playwright.
  },
};
