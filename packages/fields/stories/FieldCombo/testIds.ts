// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldCombo (WithDroplist,
// InteractionTest, keyboard-scene). Component-level id'ы слотов (root/input/copy/shell/…)
// живут в `@ds/fields::TEST_IDS` (src/constants.ts) — здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldCombo: {
    // Droplist-сцена (WithDroplist): корни полей и их слот-кнопки + адресуемые пункты списка.
    droplistBeforeRoot: 'field-combo-droplist-before',
    droplistAfterRoot: 'field-combo-droplist-after',
    droplistMultipleRoot: 'field-combo-droplist-multiple',
    droplistBeforeButton: 'field-combo-droplist-before-button',
    droplistAfterButton: 'field-combo-droplist-after-button',
    droplistMultipleButton: 'field-combo-droplist-multiple-button',
    droplistItem: 'field-combo-droplist-item',
    // InteractionTest / keyboard-сцена: отдельные корни, чтобы скоупить запросы к нужному полю.
    editableRoot: 'field-combo-editable',
    readonlyRoot: 'field-combo-readonly',
    disabledRoot: 'field-combo-disabled',
    prefixedReadonlyRoot: 'field-combo-prefixed-readonly',
    blurGuardRoot: 'field-combo-blur-guard',
    rovingSceneRoot: 'field-combo-roving-scene',
  },
} as const;

/**
 * Стабильный `data-test-id` кнопки очистки из `useClearButton` (`@ds/input-private`).
 * В публичном `@ds/fields::TEST_IDS` его нет — кнопку рисует input-private.
 */
export const CLEAR_BUTTON_TEST_ID = 'button-clear-value';
