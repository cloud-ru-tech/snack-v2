// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldTime (InteractionTest +
// Playwright-спеки). Component-level id'ы слотов (root/input/icon) живут в `@ds/fields::TEST_IDS`
// (src/constants.ts) — здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldTime: {
    // InteractionTest рендерит несколько FieldTime — отдельные корни, чтобы скоупить запросы.
    editableRoot: 'field-time-editable',
    requiredRoot: 'field-time-required',
    readonlyRoot: 'field-time-readonly',
  },
} as const;

/**
 * Стабильный `data-test-id` кнопки очистки из `useClearButton` (`@ds/input-private`).
 * В публичном `@ds/fields::TEST_IDS` его нет — кнопку рисует input-private.
 */
export const CLEAR_BUTTON_TEST_ID = 'button-clear-value';

/**
 * Test-id контента выпадающего time-picker'а (@ds/calendar `TimePickerDropdown`). В публичном
 * `@ds/fields::TEST_IDS` его нет — контент рисует календарь. FieldTime передаёт пикеру
 * `data-test-id={`${root}__picker`}`, а `getTestIdBuilder` строит контент как `content-${id}`,
 * поэтому для корня `field-time` контент — `content-field-time__picker`. Литерал дублируем
 * локально, потому что прямой импорт из @ds/calendar тянет CSS-modules и ломает playwright-compile.
 */
export const TIME_PICKER_CONTENT_TEST_ID = 'content-field-time__picker';

/**
 * Root выпадающего time-picker'а (popover-контейнер). Включает футер Current/Apply, который
 * лежит в `bottomBar` дропдауна сиблингом контента — по bbox контента он в кадр не попадает.
 */
export const TIME_PICKER_ROOT_TEST_ID = 'field-time__picker';
