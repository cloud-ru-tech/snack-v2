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
} as const;
