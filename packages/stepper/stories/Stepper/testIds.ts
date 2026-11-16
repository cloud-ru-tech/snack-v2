export const TEST_IDS = {
  root: 'stepper',
  next: 'stepper-next',
  prev: 'stepper-prev',
  /** Корень wrapper'а examples-stories (BasicFlow, …) — для визуального
   * кадрирования вокруг всей композиции (Stepper + buttons). */
  example: 'stepper-example',
  /** Кнопка-круг шага (все шаги несут один id; целься `.nth(i)`).
   * Компонент строит его как `${root}_element-step` (см. src/constants stepSuffix). */
  step: 'stepper_element-step',
  /** Степперы секции «Long text» VisualMatrix — проверка обрезки длинного текста шага. */
  longText: {
    desktop: {
      root: 'stepper-long-text-desktop',
      step: 'stepper-long-text-desktop_element-step',
      title: 'stepper-long-text-desktop_element-title',
      description: 'stepper-long-text-desktop_element-description',
    },
    mobile: {
      root: 'stepper-long-text-mobile',
      title: 'stepper-long-text-mobile_element-title',
      description: 'stepper-long-text-mobile_element-description',
    },
  },
} as const;
