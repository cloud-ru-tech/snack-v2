// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldDate (InteractionTest,
// keyboard-сцена) и в Playwright-спеках. Component-level id'ы слотов
// (root/input/from/to/clear/copy/calendar) живут в `@ds/fields::TEST_IDS` (src/constants.ts).
export const TEST_IDS = {
  fieldDate: {
    // InteractionTest рендерит несколько FieldDate — отдельные корни, чтобы скоупить запросы.
    singleRoot: 'field-date-single',
    rangeRoot: 'field-date-range',
    readonlyRoot: 'field-date-readonly',
  },
} as const;

// Test-id выпадающего календаря. CalendarDropdown (@ds/calendar) строит контент-узел как
// `content-<id>` от переданного ему `data-test-id`. FieldDate передаёт `TEST_IDS.fieldDateCalendarDropdown`
// (`field-date__calendar-dropdown`), поэтому реальный контент открытого календаря — это
// `content-field-date__calendar-dropdown`. Литерал дублируем локально: прямой импорт из @ds/fields/@ds/calendar
// тянет CSS-modules и ломает playwright-compile.
export const CALENDAR_DROPDOWN_CONTENT_TEST_ID = 'content-field-date__calendar-dropdown';
export const CALENDAR_ITEM_TEST_ID = 'calendar-item';
