import type { StorybookUrlOptions } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../src/helperComponents/TimePickerDrum/constants';

/** Сегмент URL: `components-calendar-time-picker-drum--<story>`. Синхронизировать с `title: 'Components/Calendar/Time Picker Drum'`. */
export const TIME_PICKER_DRUM_GROUP = 'calendar';

export const TIME_PICKER_DRUM_NAME = 'time-picker-drum';

export const TIME_PICKER_DRUM_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * Ключевые комбинации URL-args Playground: по одному представителю на ось `size` / `showSeconds`, плюс режим `options` (`customOptions` внутри сторис).
 * Не декартово произведение.
 */
export const TIME_PICKER_DRUM_KEY_COMBOS = [
  { size: SIZE.S, showSeconds: true, options: 'all' as const },
  { size: SIZE.M, showSeconds: false, options: 'all' as const },
  { size: SIZE.L, showSeconds: true, options: 'allowed' as const },
  { size: SIZE.M, showSeconds: true, options: 'min' as const },
] as const;

/**
 * Фиксированный момент для E2E: в Playground из `baseDate` берутся подпись даты и стартовые часы/минуты/секунды.
 * Без этого сторис использует `new Date()` — плывут визуальные снимки и любые проверки, завязанные на время.
 */
export const TIME_PICKER_DRUM_VISUAL_DATE_MS = Date.UTC(2026, 0, 8, 12, 0, 0);

/**
 * @param props аргументы Playground (`size`, `showSeconds`, `options`, `selectedDateLabelAt`, …). Поверх всегда накладывается стабильное `selectedDateLabelAt`, если не передать своё.
 * @param story экспорт сторис (`playground` | `visual-matrix`)
 */
export function buildTimePickerDrumOptions(
  props?: Record<string, unknown>,
  story: string = TIME_PICKER_DRUM_STORIES.playground,
): StorybookUrlOptions {
  const propsWithDefaults: Record<string, unknown> = {
    selectedDateLabelAt: TIME_PICKER_DRUM_VISUAL_DATE_MS,
    ...props,
  };

  return {
    name: TIME_PICKER_DRUM_NAME,
    group: TIME_PICKER_DRUM_GROUP,
    story,
    props: propsWithDefaults,
  };
}

export { TEST_IDS };
