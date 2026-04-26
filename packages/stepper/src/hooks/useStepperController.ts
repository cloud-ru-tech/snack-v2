import { useCallback, useEffect, useMemo, useState } from 'react';

import { STEP_STATE } from '../constants';
import { StepData, StepState, StepsValidator, StepViewData } from '../types';

const DEFAULT_VALIDATOR: StepsValidator = async () => true;

export type UseStepperControllerParams = {
  steps: StepData[];
  defaultCurrentStepIndex?: number;
  validator?: StepsValidator;
  onChangeCurrentStep?: (newValue: number, prevValue: number) => void;
  onCompleteChange?: (isCompleted: boolean) => void;
};

export type UseStepperControllerResult = {
  stepsView: StepViewData[];
  currentStepIndex: number;
  currentStepState: StepState;
  isCompleted: boolean;
  stepCount: number;
  goNext: (stepIndex?: number) => void;
  goPrev: (stepIndex?: number) => void;
  resetValidation: () => void;
  setValidator: (validator: StepsValidator) => void;
};

/**
 * Общий контроллер состояния шагов — используется одинаково в Stepper и
 * MobileStepper. Порт из @snack-uikit/stepper без изменений поведения.
 */
export function useStepperController({
  steps,
  defaultCurrentStepIndex = 0,
  validator: validatorProp = DEFAULT_VALIDATOR,
  onChangeCurrentStep,
  onCompleteChange,
}: UseStepperControllerParams): UseStepperControllerResult {
  const isCompletedByDefault = defaultCurrentStepIndex === steps.length - 1;
  const [currentStepState, setCurrentStepState] = useState<StepState>(
    isCompletedByDefault ? STEP_STATE.Completed : STEP_STATE.Current,
  );
  const [currentStepIndex, setCurrentStepIndexValue] = useState(defaultCurrentStepIndex);
  const [isCompleted, setIsCompleted] = useState(isCompletedByDefault);
  const [stepsValidator, setStepsValidator] = useState<{ value: StepsValidator }>();

  useEffect(() => {
    onCompleteChange?.(isCompleted);
  }, [isCompleted, onCompleteChange]);

  const setCurrentStepIndex = useCallback(
    (newValue: number) => {
      setCurrentStepIndexValue(prevValue => {
        if (prevValue !== newValue) {
          onChangeCurrentStep?.(newValue, prevValue);
        }
        return newValue;
      });
    },
    [onChangeCurrentStep],
  );

  const goNext = useCallback(
    (newStepIndexUnsafety: number = currentStepIndex + 1) => {
      if (currentStepIndex >= steps.length || isCompleted || newStepIndexUnsafety <= currentStepIndex) {
        return;
      }

      const newStepIndex = Math.min(steps.length - 1, newStepIndexUnsafety);

      setCurrentStepState(STEP_STATE.Loading);

      const validator = stepsValidator?.value || validatorProp;

      validator(currentStepIndex, newStepIndex)
        .catch(() => false)
        .then(isValid => {
          if (!isValid) {
            setCurrentStepState(STEP_STATE.Rejected);
            return;
          }

          if (currentStepIndex === steps.length - 1) {
            setCurrentStepState(STEP_STATE.Completed);
            setIsCompleted(true);
          } else {
            setCurrentStepIndex(newStepIndex);
            setCurrentStepState(STEP_STATE.Current);
          }
        });
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex, steps.length, stepsValidator?.value, validatorProp],
  );

  const goPrev = useCallback(
    (index: number = currentStepIndex - 1) => {
      if (currentStepIndex === 0 || index < 0 || index > currentStepIndex) {
        return;
      }

      if (index === currentStepIndex && !isCompleted) {
        return;
      }

      if (isCompleted) {
        setIsCompleted(false);
      }

      setCurrentStepIndex(index);
      setCurrentStepState(STEP_STATE.Current);
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex],
  );

  const stepsView: StepViewData[] = useMemo(
    () =>
      steps.map((step, index) => {
        const number = index + 1;

        if (index < currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Completed, onClick: () => goPrev(index) };
        }

        if (index === currentStepIndex) {
          return {
            ...step,
            number,
            state: currentStepState,
            onClick: isCompleted ? () => goPrev(index) : undefined,
          };
        }

        if (index - 1 === currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Waiting, onClick: () => goNext() };
        }

        return { ...step, number, state: STEP_STATE.Waiting };
      }),
    [steps, currentStepIndex, goPrev, currentStepState, isCompleted, goNext],
  );

  const resetValidation = useCallback(() => {
    if (currentStepState === STEP_STATE.Rejected) {
      setCurrentStepState(STEP_STATE.Current);
    }
  }, [currentStepState]);

  const setValidator = useCallback((validator: StepsValidator) => {
    setStepsValidator({ value: validator });
  }, []);

  return {
    stepsView,
    currentStepIndex,
    currentStepState,
    isCompleted,
    stepCount: steps.length,
    goNext,
    goPrev,
    resetValidation,
    setValidator,
  };
}
