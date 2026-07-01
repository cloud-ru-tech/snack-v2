import { ValueOf } from '@ds/utils';
import { ReactElement } from 'react';

import { STEP_STATE } from './constants';

export type StepState = ValueOf<typeof STEP_STATE>;

export type StepsValidator = (prevStepIndex: number, newStepIndex: number) => Promise<boolean>;

export type StepData = {
  title: string;
  description?: string;
};

export type StepViewData = StepData & {
  onClick?: () => void;
  state: StepState;
  number: number;
};

export type StepperApi = {
  stepper: ReactElement;
  goNext: (stepIndex?: number) => void;
  goPrev: (stepIndex?: number) => void;
  resetValidation: () => void;
  setValidator: (validator: StepsValidator) => void;
  isCompleted: boolean;
  currentStepIndex: number;
  stepCount: number;
};

/** Псевдоним `StepperApi` для обратной совместимости. */
export type StepperState = StepperApi;

/** Публичные пропсы адаптивного `Stepper` (единые для desktop/mobile поверхностей). */
export type StepperProps = {
  /** Массив шагов */
  steps: StepData[];
  /** Индекс текущего шага по-дефолту */
  defaultCurrentStepIndex?: number;
  /** Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. Возвращает Promise<boolean>: false → шаг помечается как Rejected. */
  validator?: StepsValidator;
  /** CSS-класс */
  className?: string;
  /**
   * Render function. Принимает `stepper` — JSX-элемент степпера, а также api:
   * `goNext`, `goPrev`, `resetValidation`, `setValidator`, `isCompleted`,
   * `currentStepIndex`, `stepCount`.
   */
  children: (params: StepperApi) => ReactElement;
  /** Колбек смены текущего степа */
  onChangeCurrentStep?: (newValue: number, prevValue: number) => void;
  /** Колбек изменения завершённости */
  onCompleteChange?: (isCompleted: boolean) => void;
  /** data-test-id */
  'data-test-id'?: string;
  /** Позволяет свободно переключаться между разными шагами без валидации */
  allowFreeNavigation?: boolean;
};
