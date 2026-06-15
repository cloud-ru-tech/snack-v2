// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldText (WithDroplist,
// InteractionTest, keyboard-scene). Component-level id'ы слотов (root/input/copy/shell/…)
// живут в `@ds/fields::TEST_IDS` (src/constants.ts) — здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldText: {
    // Droplist-сцена (WithDroplist): корни полей и их слот-кнопки + адресуемые пункты списка.
    droplistBeforeRoot: 'field-text-droplist-before',
    droplistAfterRoot: 'field-text-droplist-after',
    droplistMultipleRoot: 'field-text-droplist-multiple',
    droplistBeforeButton: 'field-text-droplist-before-button',
    droplistAfterButton: 'field-text-droplist-after-button',
    droplistMultipleButton: 'field-text-droplist-multiple-button',
    droplistItem: 'field-text-droplist-item',
    // InteractionTest / keyboard-сцена: отдельные корни, чтобы скоупить запросы к нужному полю.
    editableRoot: 'field-text-editable',
    readonlyRoot: 'field-text-readonly',
    disabledRoot: 'field-text-disabled',
    prefixedReadonlyRoot: 'field-text-prefixed-readonly',
    blurGuardRoot: 'field-text-blur-guard',
    rovingSceneRoot: 'field-text-roving-scene',
  },
} as const;

/**
 * Стабильный `data-test-id` кнопки очистки из `useClearButton` (`@ds/input-private`).
 * В публичном `@ds/fields::TEST_IDS` его нет — кнопку рисует input-private.
 */
export const CLEAR_BUTTON_TEST_ID = 'button-clear-value';
