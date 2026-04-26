import { createContext, useContext } from 'react';

import { StepperApi } from './types';

const defaultApi: StepperApi = {
  stepper: <></>,
  stepCount: 0,
  isCompleted: false,
  currentStepIndex: 0,
  goNext() {},
  goPrev() {},
  resetValidation() {},
  setValidator() {},
};

export const StepperContext = createContext<StepperApi>(defaultApi);

export const useStepperApi = (): StepperApi => useContext(StepperContext);
