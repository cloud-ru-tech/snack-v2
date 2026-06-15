import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  CALENDAR_DROPDOWN_CONTENT_TEST_ID,
  FIELD_DATE_STORIES,
  STORY_TEST_IDS,
  TEST_IDS,
} from './helpers';

// Grid-internal стрелочная навигация (день↔день, неделя↔неделя) — ответственность @ds/calendar.
// FieldDate отвечает только за handoff фокуса в сетку и возврат/закрытие — это и проверяем.
test.describe('FieldDate — keyboard', () => {
  test('single: ArrowDown on the focused input keeps the calendar open (keyboard nav)', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const single = getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const input = single.getByTestId(TEST_IDS.fieldDateInput);

    // Открываем кликом по иконке (детерминированный путь, см. Escape-тест). ArrowDown с фокуса
    // на инпуте уходит в сетку календаря (@ds/calendar) и не закрывает дропдаун — это и проверяем.
    await single.getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    await input.focus();
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
  });

  test('single: Escape on the focused input closes the calendar', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const single = getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const input = single.getByTestId(TEST_IDS.fieldDateInput);

    // Открываем кликом по иконке (без handoff фокуса в сетку — он только на ArrowDown),
    // чтобы Escape детерминированно прошёл через сегментный handleKeyDown поля.
    await single.getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    await input.focus();
    await page.keyboard.press('Escape');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('range: ArrowDown opens the calendar (focus alone does not) and Escape closes it', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const rangeRoot = getByTestId(STORY_TEST_IDS.fieldDate.rangeRoot);
    const fromInput = rangeRoot.getByTestId(TEST_IDS.fieldDateInputFrom);

    // Открытие — за click-триггером Dropdown и ArrowDown (легаси-паритет): open-on-focus
    // конфликтовал с click-toggle (первый клик открывал и тут же закрывал календарь).
    await fromInput.focus();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);

    // ArrowDown открывает календарь и передаёт фокус в его сетку (handoff).
    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await expect(fromInput).not.toBeFocused();

    // Range-ветка Escape: handleInputKeyDown закрывает дропдаун при open=true.
    await fromInput.focus();
    await page.keyboard.press('Escape');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);
  });

  test('single: selecting a date with Enter closes the calendar and returns focus to the input', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const single = getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const input = single.getByTestId(TEST_IDS.fieldDateInput);

    // Клик открывает календарь (click-триггер), ArrowDown передаёт фокус в него (handoff).
    await input.click();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(input).not.toBeFocused();

    // Из хедера навигации ArrowDown уводит на ячейку сетки, Enter выбирает дату:
    // mode=date закрывает календарь и возвращает фокус в инпут (легаси handleSelectDate).
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);
    await expect(input).toBeFocused();
    await expect(input).not.toHaveValue('');
  });

  test('single: ArrowRight from the last segment roves focus to clear, ArrowLeft returns', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const single = getByTestId(STORY_TEST_IDS.fieldDate.singleRoot);
    const input = single.getByTestId(TEST_IDS.fieldDateInput);
    const clear = single.getByTestId(TEST_IDS.fieldDateClear);

    await input.click();
    await input.pressSequentially('15032026');
    // После коммита каретка в конце значения — ArrowRight роуит фокус на clear (roving tabindex).
    await input.press('ArrowRight');
    await expect(clear).toBeFocused();
    await expect(clear).toHaveAttribute('tabindex', '0');

    await clear.press('ArrowLeft');
    await expect(input).toBeFocused();
  });

  test('readonly: ArrowRight from the input roves focus to the copy button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.interactionTest));
    const readonly = getByTestId(STORY_TEST_IDS.fieldDate.readonlyRoot);
    const input = readonly.getByTestId(TEST_IDS.fieldDateInput);
    const copy = readonly.getByTestId(TEST_IDS.fieldDateCopy);

    // readonly: cursor-проверка nav замыкается по readonly-флагу — ArrowRight сразу уводит на copy.
    await input.focus();
    await input.press('ArrowRight');
    await expect(copy).toBeFocused();

    await copy.press('ArrowLeft');
    await expect(input).toBeFocused();
  });
});
