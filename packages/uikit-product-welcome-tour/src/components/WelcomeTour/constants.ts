/**
 * Геометрия для react-joyride. Движок считает позиции и рисует стрелку инлайн-стилями,
 * поэтому нужны числа, а не CSS-переменные. Рядом с каждым значением — переменная
 * мастера `onboarding` (3295:3217).
 */
export const TOUR_GEOMETRY = {
  /** `sn/popover/anatomy/privatePopover/pointer/width` */
  arrowBase: 12,
  /** `sn/popover/anatomy/privatePopover/pointer/height` */
  arrowSize: 6,
  /** `sn/popover/anatomy/privatePopover/offset` */
  offset: 4,
  /** `sn/density/radius/2xs` */
  spotlightRadius: 4,
} as const;

/**
 * Цветовые токены передаются в react-joyride CSS-переменными: JS-энтрипоинт
 * `@ds/figma-variables` (`build/ts/styles.js`) непригоден — это CJS-файл в пакете
 * с `"type": "module"`, у него нет ни именованных экспортов, ни default.
 */
const cssVar = (name: string) => `var(--${name})`;

export const TOUR_COLORS = {
  /** `sn/theme/color/blackout` */
  overlay: cssVar('sn-theme-color-blackout'),
  /** `sn/theme/color/neutral/background2Level` */
  arrow: cssVar('sn-theme-color-neutral-background2Level'),
  /** `sn/theme/color/available/version/textMain` */
  text: cssVar('sn-theme-color-available-version-textMain'),
} as const;

/**
 * Ширина подсказки по умолчанию. Дублирует `max-width` из её стилей: движок считает
 * позицию по своему `width` (его дефолт — 380), и без синхронизации подсказка шире
 * расчётной уезжает за край экрана.
 */
export const DEFAULT_HINT_WIDTH = 480;

/** Класс затемнения у react-joyride: отличить его от подсказки в общем портале больше нечем. */
export const OVERLAY_CLASS_NAME = 'react-joyride__overlay';

/** События, по которым закрываются слои страницы: floating-ui слушает `pointerdown`, прочие — `mousedown` и `click`. */
export const OVERLAY_PRESS_EVENTS = ['pointerdown', 'mousedown', 'click'] as const;
