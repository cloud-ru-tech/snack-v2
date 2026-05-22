/**
 * Stories-level data-test-id для toggles. Один источник истины для stories
 * (Playground/VisualMatrix/InteractionTest/examples) и для E2E helpers.
 *
 * Если у компонента есть нативный input внутри (Checkbox/Radio/Switch/Favourite),
 * `nativeInput` адресует <input>, `root` — span-обёртку.
 */
export const TEST_IDS = {
  checkbox: { root: 'checkbox', nativeInput: 'checkbox-native-input' },
  radio: { root: 'radio', nativeInput: 'radio-native-input' },
  switch: { root: 'switch', nativeInput: 'switch-native-input' },
  favourite: { root: 'favourite', nativeInput: 'favourite-native-input' },
  toggleGroup: { root: 'toggle-group' },
  /** id'шники Radio в test/example stories (Radio.Group). */
  radioGroup: { a: 'radio-a', b: 'radio-b' },
} as const;
