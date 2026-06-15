// Story-level data-test-id, повторяющиеся в 2+ файлах stories FieldSlider (InteractionTest +
// examples/Range/WithMarks/WithFormatter). Component-level id'ы слотов (root/input/handle/field)
// живут в `@ds/fields::TEST_IDS` (src/constants.ts) — здесь только то, что ставит сама story.
export const TEST_IDS = {
  fieldSlider: {
    // InteractionTest рендерит несколько FieldSlider — отдельные корни, чтобы скоупить запросы.
    numericRoot: 'field-slider-numeric',
    rangeRoot: 'field-slider-range',
    marksRoot: 'field-slider-marks',
    unboundRoot: 'field-slider-unbound',
    // examples: корни сценариев Range / WithMarks / WithFormatter.
    rangeExampleRoot: 'field-slider-range-example',
    marksExampleRoot: 'field-slider-marks-example',
    equalSpacingExampleRoot: 'field-slider-equal-spacing-example',
    formatterExampleRoot: 'field-slider-formatter-example',
  },
} as const;
