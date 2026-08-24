import { Step } from 'react-joyride';

import { TOUR_STATUS } from '../../constants';
import { TourButton, TourLabels, TourStatus, TourStep } from '../../types';

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
 * Приводит статус движка к публичному `TourStatus`: наружу сообщаются только терминальные
 * `finished` и `skipped`, а каст пропустил бы любую строку. `tour:end` приходит только с
 * этими двумя статусами, поэтому незнакомое значение трактуем как штатное завершение.
 */
export function toTourStatus(status: string): TourStatus {
  const known: string[] = Object.values(TOUR_STATUS);

  return known.includes(status) ? (status as TourStatus) : TOUR_STATUS.Finished;
}

/**
 * Схлопывает подписи кнопок: словарь locale → `labels` компонента → `labels` шага.
 * Каждый следующий уровень переопределяет предыдущий по ключу.
 */
export function resolveLabels(
  base: TourLabels,
  componentLabels?: Partial<TourLabels>,
  stepLabels?: Partial<TourLabels>,
): TourLabels {
  return { ...base, ...componentLabels, ...stepLabels };
}

type ToJoyrideStepsParams = {
  steps: TourStep[];
  labels: TourLabels;
  componentLabels?: Partial<TourLabels>;
  buttons: TourButton[];
};

/**
 * Переводит шаги публичного API в шаги react-joyride. Поля, которых у движка нет
 * (`subtitle`, разрешённые подписи, набор кнопок), уезжают в `step.data` — оттуда
 * их читает `TourHint`.
 */
export function toJoyrideSteps({ steps, labels, componentLabels, buttons }: ToJoyrideStepsParams): Step[] {
  return steps.map(({ target, title, subtitle, content, placement, labels: stepLabels }) => ({
    target,
    title,
    content,
    // Ключ добавляется только когда значение задано: движок мержит шаг с дефолтными
    // опциями, и явный `placement: undefined` перетирает дефолт — floater падает
    // на `placement.startsWith(...)`.
    ...(placement ? { placement } : {}),
    data: {
      subtitle,
      labels: resolveLabels(labels, componentLabels, stepLabels),
      buttons,
    },
  }));
}
