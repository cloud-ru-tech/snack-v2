import { DATE_MODE, FieldDate, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

// onChangeSingle / onCopy дохлыми mock'ами здесь не объявляются: коммит single-даты и реальная
// запись в буфер не доводятся синтетической storybook-test средой (программный focus открывает
// календарь, clipboard недоступен). Эти поведения ассертятся в реальном chrome —
// __test__/FieldDate/interaction.spec.ts (typing→commit, clamp 35→31, clipboard read-back).
const onChangeRange = fn();

function InteractionScenario() {
  const [single, setSingle] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Single (date)</DemoTitle>
        <DemoHint>Сегментный движок: авто-переход, откат невалидного дня, маска при фокусе.</DemoHint>
        <DemoActions align='center'>
          <FieldDate
            data-test-id={STORY_TEST_IDS.fieldDate.singleRoot}
            label='Дата'
            value={single}
            onChange={setSingle}
          />
        </DemoActions>
        <DemoTitle>Range (date-range)</DemoTitle>
        <DemoHint>Движок formatMask: авто-ноль и clamp; onChange только когда обе даты валидны.</DemoHint>
        <DemoActions align='center'>
          <FieldDate
            data-test-id={STORY_TEST_IDS.fieldDate.rangeRoot}
            label='Период'
            mode={DATE_MODE.DateRange}
            value={range}
            onChange={next => {
              onChangeRange(next);
              setRange(next);
            }}
          />
        </DemoActions>
        <DemoTitle>Readonly + copy</DemoTitle>
        <DemoHint>readonly показывает кнопку копирования и скрывает очистку.</DemoHint>
        <DemoActions align='center'>
          <FieldDate
            data-test-id={STORY_TEST_IDS.fieldDate.readonlyRoot}
            label='Только чтение'
            readonly
            defaultValue={new Date(2026, 4, 17)}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldDate> = {
  title: 'Components/Fields/FieldDate/Tests/Interaction',
  component: FieldDate,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionScenario />,
};

export default meta;
type Story = StoryObj<typeof FieldDate>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    onChangeRange.mockClear();
    const canvas = within(canvasElement);

    const singleRoot = canvas.getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const single = within(singleRoot);
    const input = single.getByTestId<HTMLInputElement>(TEST_IDS.fieldDateInput);

    await step('renders root and masked input', async () => {
      await expect(singleRoot).toBeVisible();
      await expect(input).toBeVisible();
    });

    await step('input advertises the RU segment mask as its placeholder', async () => {
      // ДД.ММ.ГГГГ — это placeholder-атрибут input'а, а не value пустого поля: у пустого input'а
      // value === ''. value заполняется маской движком (ensureMask) только при фокусе/вводе.
      await expect(input).toHaveAttribute('placeholder', 'ДД.ММ.ГГГГ');
    });

    // Сегментный движок single-инпута (engage-mask по фокусу, ←/→ по сегментам, Backspace,
    // blur-сброс, ввод полной даты с коммитом, clamp дня) завязан на программный focus, который
    // в синтетической storybook-test среде не триггерит onFocus→ensureMask. Эти поведения
    // ассертятся в реальном chrome — __test__/FieldDate/interaction.spec.ts: typing→commit
    // (15032026 → 15.03.2026), single-mode clamp (35 → 31). Здесь оставляем надёжные проверки:
    // placeholder (выше), range formatMask через реальный click+type (ниже) и readonly-copy.

    await step('range renders two masked inputs (from / to) with RU placeholders', async () => {
      const rangeRoot = canvas.getByTestId(STORY_TEST_IDS.fieldDate.rangeRoot);
      const fromInput = within(rangeRoot).getByTestId<HTMLInputElement>(TEST_IDS.fieldDateInputFrom);
      const toInput = within(rangeRoot).getByTestId<HTMLInputElement>(TEST_IDS.fieldDateInputTo);
      await expect(fromInput).toBeVisible();
      await expect(toInput).toBeVisible();
      await expect(fromInput).toHaveAttribute('placeholder', 'ДД.ММ.ГГГГ');
      await expect(toInput).toHaveAttribute('placeholder', 'ДД.ММ.ГГГГ');
    });

    await step('range formatMask auto-prefixes a single high digit (5 → 05) on the from-input', async () => {
      const rangeRoot = canvas.getByTestId(STORY_TEST_IDS.fieldDate.rangeRoot);
      const fromInput = within(rangeRoot).getByTestId<HTMLInputElement>(TEST_IDS.fieldDateInputFrom);
      onChangeRange.mockClear();
      await userEvent.click(fromInput);
      await userEvent.type(fromInput, '5');
      // Авто-ноль: «5» не может начинать день (> 3), трактуется как единицы → 05.
      await waitFor(() => expect(fromInput.value).toBe('05'));
      // Один частично заполненный край — onChange не эмитится (bothValid gate).
      expect(onChangeRange).not.toHaveBeenCalled();
    });

    await step('range formatMask clamps a full segment over its max (day 35 → 31)', async () => {
      const rangeRoot = canvas.getByTestId(STORY_TEST_IDS.fieldDate.rangeRoot);
      const fromInput = within(rangeRoot).getByTestId<HTMLInputElement>(TEST_IDS.fieldDateInputFrom);
      await userEvent.clear(fromInput);
      await userEvent.click(fromInput);
      // День 35 не превышает «десятки» (3 ≤ 3), но полные 35 > 31 → прижимается к верхней границе.
      await userEvent.type(fromInput, '35');
      await waitFor(() => expect(fromInput.value).toBe('31'));
    });

    await step('readonly shows the copy button and hides clear', async () => {
      // DOM-контракт readonly-режима: copy-кнопка показана (showCopy = readonly + hasValue),
      // clear-кнопка скрыта. Реальная запись в буфер + read-back («17.05.2026») покрыты в
      // __test__/FieldDate/interaction.spec.ts (clipboard-доступ есть только в реальном chrome);
      // здесь не дублируем тавтологичным повторным toBeVisible.
      const readonlyRoot = canvas.getByTestId(STORY_TEST_IDS.fieldDate.readonlyRoot);
      const copyButton = within(readonlyRoot).getByTestId(TEST_IDS.fieldDateCopy);
      await expect(copyButton).toBeVisible();
      await expect(within(readonlyRoot).queryByTestId(TEST_IDS.fieldDateClear)).toBeNull();
    });

    // Range-шаги выше открывают календарь кликом по from-input и оставляют фокус в поле.
    // Без cleanup e2e на этой же стори ловит второй portal с тем же data-test-id
    // (strict mode), перехват клавиш и «залипший» фокус — см. FieldDate keyboard/interaction.
    await step('cleanup: close calendar portal and blur', async () => {
      await userEvent.keyboard('{Escape}');
      (document.activeElement as HTMLElement | null)?.blur?.();
    });
  },
};

export const OutsideClickWide: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage style={{ placeItems: 'end center' }}>
      <DemoPanel width='wide'>
        <DemoTitle>Outside click (wide field)</DemoTitle>
        <DemoHint>Широкое поле воспроизводит свободную область справа от календаря.</DemoHint>
        <DemoActions block>
          <FieldDate data-test-id={TEST_IDS.fieldDate} label='Дата' />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  },
};
