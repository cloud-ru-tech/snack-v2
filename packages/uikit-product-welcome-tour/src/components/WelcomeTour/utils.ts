import { Step } from 'react-joyride';

import { TOUR_STATUS } from '../../constants';
import { TourButton, TourLabels, TourStatus, TourStep } from '../../types';
import { DEFAULT_HINT_WIDTH } from './constants';
import { getUnionElement } from './spotlight';
import { prepareStep, resolveTargets } from './targets';

type ToJoyrideStepsParams = {
  steps: TourStep[];
  labels: TourLabels;
  componentLabels?: Partial<TourLabels>;
  buttons: TourButton[];
};

/**
 * Приводит статус движка к публичному `TourStatus`: наружу сообщаются только терминальные
 * `finished` и `skipped`, а каст пропустил бы любую строку.
 */
export function toTourStatus(status: string): TourStatus {
  const known: string[] = Object.values(TOUR_STATUS);

  return known.includes(status) ? (status as TourStatus) : TOUR_STATUS.Finished;
}

/** Схлопывает подписи кнопок: словарь locale → `labels` компонента → `labels` шага. */
export function resolveLabels(
  base: TourLabels,
  componentLabels?: Partial<TourLabels>,
  stepLabels?: Partial<TourLabels>,
): TourLabels {
  return { ...base, ...componentLabels, ...stepLabels };
}

/**
 * Переводит шаги публичного API в шаги react-joyride. Поля, которых у движка нет
 * (`subtitle`, разрешённые подписи, набор кнопок), уезжают в `step.data` — оттуда
 * их читает `TourHint`.
 */
export function toJoyrideSteps({ steps, labels, componentLabels, buttons }: ToJoyrideStepsParams): Step[] {
  return steps.map(
    ({
      target,
      title,
      subtitle,
      content,
      placement,
      width,
      spotlightTarget,
      spotlightPadding,
      labels: stepLabels,
      onBeforeShow,
    }) => ({
      // Со списком целей подсказка цепляется за «зеркальный» узел: раскрытый список
      // закрывается по клику мимо себя, то есть уже на `mousedown` по кнопке подсказки —
      // подсказка уезжала из-под курсора и клик пропадал.
      target: Array.isArray(spotlightTarget) ? () => getUnionElement() ?? resolveTargets(target)[0] ?? null : target,
      title,
      content,
      // Собственный геттер на каждый шаг: общий на всех движок считает одной и той же
      // целью и не пересчитывает вырез при смене шага.
      ...(spotlightTarget
        ? { spotlightTarget: Array.isArray(spotlightTarget) ? () => getUnionElement() : spotlightTarget }
        : {}),
      width: width ?? DEFAULT_HINT_WIDTH,
      // Ключ добавляется только когда значение задано: явный `undefined` перетирает дефолт
      // движка, и floater падает на `placement.startsWith(...)`.
      ...(placement ? { placement } : {}),
      ...(spotlightPadding !== undefined ? { spotlightPadding } : {}),
      // Скролл к цели и ожидание её готовности — на нас, движку они выключены: он
      // прокручивает страницу по своей формуле и показывает шаг, не дожидаясь цель.
      before: () => prepareStep(spotlightTarget ?? target, onBeforeShow),
      skipScroll: true,
      data: {
        subtitle,
        labels: resolveLabels(labels, componentLabels, stepLabels),
        buttons,
      },
    }),
  );
}
