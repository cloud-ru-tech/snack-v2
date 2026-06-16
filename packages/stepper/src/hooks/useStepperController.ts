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
  allowFreeNavigation: boolean;
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
  allowFreeNavigation,
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

  const moveToStep = useCallback(
    (stepIndex: number) => {
      if (isCompleted) {
        setIsCompleted(false);
      }

      setCurrentStepIndex(stepIndex);
      setCurrentStepState(STEP_STATE.Current);
    },
    [isCompleted, setCurrentStepIndex],
  );

  const goToStep = useCallback(
    (newStepIndex: number) => {
      if (newStepIndex < 0 || newStepIndex >= steps.length) {
        return;
      }

      if (newStepIndex === currentStepIndex) {
        return;
      }

      moveToStep(newStepIndex);
    },
    [currentStepIndex, steps, moveToStep],
  );

  const goPrev = useCallback(
    (index: number = currentStepIndex - 1) => {
      if (currentStepIndex === 0 || index < 0 || index > currentStepIndex) {
        return;
      }

      if (index === currentStepIndex && !isCompleted) {
        return;
      }

      moveToStep(index);
    },
    [currentStepIndex, isCompleted, moveToStep],
  );

  const getStepOnClick = useCallback(
    (stepIndex: number) => {
      if (allowFreeNavigation) {
        return () => goToStep(stepIndex);
      }

      if (stepIndex < currentStepIndex || (stepIndex === currentStepIndex && isCompleted)) {
        return () => goPrev(stepIndex);
      }

      if (stepIndex === currentStepIndex + 1) {
        return () => goNext();
      }

      return undefined;
    },
    [allowFreeNavigation, currentStepIndex, goNext, goPrev, goToStep, isCompleted],
  );

  const stepsView: StepViewData[] = useMemo(
    () =>
      steps.map((step, index) => {
        const number = index + 1;
        let state: StepState = STEP_STATE.Waiting;

        if (index < currentStepIndex) {
          state = STEP_STATE.Completed;
        } else if (index === currentStepIndex) {
          state = currentStepState;
        }

        return {
          ...step,
          number,
          state,
          onClick: getStepOnClick(index),
        };
      }),
    [steps, currentStepIndex, currentStepState, getStepOnClick],
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
