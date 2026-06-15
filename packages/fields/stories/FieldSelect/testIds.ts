// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldSelect (InteractionTest,
// Open + open-* siblings) и/или в specs. Component-level id'ы слотов (root/input/chips/clear/copy)
// живут в `@ds/fields::TEST_IDS` (src/constants.ts) — здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldSelect: {
    // InteractionTest: отдельные корни, чтобы скоупить запросы к нужному полю.
    singleRoot: 'field-select-single',
    singleCreatableRoot: 'field-select-single-creatable',
    multipleRoot: 'field-select-multiple',
    multipleCreatableRoot: 'field-select-multiple-creatable',
    disabledChipRoot: 'field-select-disabled-chip',
    readonlyRoot: 'field-select-readonly',
  },
} as const;
