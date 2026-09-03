import { ReactNode } from 'react';

import { TourButton, TourLabels } from '../../types';

/**
 * Полезная нагрузка, которую компонент кладёт в `step.data` движка: поля, которых нет
 * в API react-joyride, и уже разрешённые подписи кнопок. Внутренний контракт между
 * `toJoyrideSteps` и `TourHint` — наружу из пакета не экспортируется.
 */
export type TourStepData = {
  /** Подзаголовок шага. */
  subtitle?: ReactNode;
  /** Подписи кнопок после схлопывания locale → компонент → шаг. */
  labels: TourLabels;
  /** Набор кнопок подсказки. */
  buttons: TourButton[];
  /** Показывать ли индикатор прогресса. */
  showStepIndicator: boolean;
};
