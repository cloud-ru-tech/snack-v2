import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  CALENDAR_DROPDOWN_CONTENT_TEST_ID,
  FIELD_DATE_STORIES,
  STORY_TEST_IDS,
  TEST_IDS,
} from './helpers';

test.describe('FieldDate — interaction', () => {
  test('single mode: clicking the calendar icon opens the picker (aria-expanded=true)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldDate);
    await expect(root).toBeVisible();

    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    // Только одиночный input несёт aria-expanded (range-инпуты — нет).
    await expect(root.getByTestId(TEST_IDS.fieldDateInput)).toHaveAttribute('aria-expanded', 'true');
  });

  test('single mode: typing 8 digits fills the segment mask and renders the committed date', async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    // Ввод даты в single-инпут — ключевое поведение поля; в синтетической storybook-test среде
    // оно ненадёжно (фокус открывает календарь), поэтому проверяется здесь, в реальном chrome.
    await gotoStory(buildStoryOptions());
    const input = getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateInput);

    await input.click();
    await page.keyboard.type('15032026');
    await expect(input).toHaveValue('15.03.2026');
  });

  test('single mode: typing a full date commits onChange (parent state switches)', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    // Закрывает дохлый mock onChangeSingle из InteractionTest-сцены: реальный click+pressSequentially
    // в chrome доводит сегментный движок до коммита (8 цифр → валидная дата), и controlled value
    // parent'а переключается. Раньше mock объявлялся, прокидывался и mockClear'ился, но не
    // ассертился ни в play, ни здесь — коммит single-даты оставался непокрытым.
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const singleRoot = getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const input = singleRoot.getByTestId(TEST_IDS.fieldDateInput);

    // Play InteractionTest открывает range-календарь — без Escape ввод в single обрывается
    // на половине маски (focus/клавиши уходят в чужой portal).
    await page.keyboard.press('Escape');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);

    await input.click();
    await input.pressSequentially('15032026');
    // Коммит даты держит отформатированное значение в input'е (controlled value из parent state).
    await expect(input).toHaveValue('15.03.2026');
  });

  // (Single-mode segment-engine clamp/rollback по невалидным дням — внутреннее поведение
  // useSegmentedMask @ds/calendar, покрыто его unit-тестами; на уровне FieldDate проверяем
  // happy-path коммит выше. Range formatMask clamp/auto-prefix покрыт в InteractionTest::play.)

  test('range mode: clicking the from-input mounts the calendar dropdown (no aria-expanded)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-range' }));
    const root = getByTestId(TEST_IDS.fieldDate);
    const fromInput = root.getByTestId(TEST_IDS.fieldDateInputFrom);

    // Range-инпуты не имеют aria-expanded; критерий открытия — смонтированный портальный контент.
    // Открытие — click-триггер Dropdown (open-on-focus убран: первый клик открывал и тут же
    // закрывал календарь из-за конфликта focus-open с click-toggle).
    await expect(fromInput).not.toHaveAttribute('aria-expanded');
    await fromInput.click();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
  });

  test('wide field keeps the calendar left-aligned when it flips above the trigger', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.outsideClickWide));
    const root = getByTestId(TEST_IDS.fieldDate);
    const calendar = getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID);

    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(calendar).toBeVisible();

    const [rootBox, calendarBox] = await Promise.all([root.boundingBox(), calendar.boundingBox()]);
    if (!rootBox || !calendarBox) {
      throw new Error('FieldDate or calendar bounding box is unavailable');
    }

    expect(calendarBox.y + calendarBox.height).toBeLessThanOrEqual(rootBox.y + 1);
    expect(Math.abs(calendarBox.x - rootBox.x)).toBeLessThanOrEqual(1);
  });

  test('clicking beside the visible calendar closes the dropdown', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.outsideClickWide));
    const root = getByTestId(TEST_IDS.fieldDate);
    const calendar = getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID);

    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(calendar).toBeVisible();

    const calendarBox = await calendar.boundingBox();
    if (!calendarBox) {
      throw new Error('Calendar bounding box is unavailable');
    }

    const rootBox = await root.boundingBox();
    if (!rootBox) {
      throw new Error('FieldDate bounding box is unavailable');
    }

    // Точка находится справа от видимого календаря, но внутри горизонтальной ширины FieldDate —
    // это ровно широкая прозрачная область из приложения-потребителя.
    const clickX = calendarBox.x + calendarBox.width + 16;
    expect(clickX).toBeLessThan(rootBox.x + rootBox.width);
    await page.mouse.click(clickX, calendarBox.y + calendarBox.height / 2);
    await expect(calendar).toHaveCount(0);
  });
});

// onCopyButtonClick / реальная запись в буфер для FieldDate не e2e-тестируется здесь: copy-кнопка
// readonly-поля в реальном chrome не доходит до actionable click в этой сцене (timeout). Сам
// copy-путь (copyTextToClipboard + read-back) идентичен FieldText/FieldSecure, где он покрыт
// рабочими clipboard-спеками; видимость copy-кнопки FieldDate — в InteractionTest::play. Дохлый
// mock onCopy из play удалён, так что ложного «покрытия» нет.
