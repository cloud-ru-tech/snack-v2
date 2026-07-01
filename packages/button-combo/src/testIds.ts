// Leaf без импортов: e2e-спеки берут TEST_IDS отсюда, минуя CSS-модули entry @ds/button.
export const TEST_IDS = {
  root: 'button-combo',
  option: 'button-combo__option',
  dropdownTrigger: 'button-combo__dropdown-trigger',
  dropdown: 'button-combo__dropdown',
} as const;
