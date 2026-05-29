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

/** Alias для обратной совместимости с `@snack-uikit/stepper`. */
export type StepperState = StepperApi;
