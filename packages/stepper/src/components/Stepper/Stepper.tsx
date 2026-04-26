import cn from 'classnames';
import { ReactElement } from 'react';

import { StepperContext } from '../../context';
import { DesktopStep } from '../../helperComponents';
import { useStepperController } from '../../hooks/useStepperController';
import { StepData, StepperApi, StepsValidator } from '../../types';
import styles from './styles.module.scss';

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
};

export function Stepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  validator,
  'data-test-id': testId,
}: StepperProps) {
  const { stepsView, currentStepIndex, isCompleted, stepCount, goNext, goPrev, resetValidation, setValidator } =
    useStepperController({
      steps,
      defaultCurrentStepIndex,
      validator,
      onChangeCurrentStep,
      onCompleteChange,
    });

  const stepper = (
    <div className={cn(styles.stepper, className)} data-test-id={testId}>
      {stepsView.map((step, index) => (
        <DesktopStep
          key={step.title + index}
          step={step}
          data-test-id={testId}
          hideTailLine={index === steps.length - 1}
        />
      ))}
    </div>
  );

  const stepperApi: StepperApi = {
    goNext,
    goPrev,
    currentStepIndex,
    isCompleted,
    resetValidation,
    stepCount,
    stepper,
    setValidator,
  };

  return <StepperContext.Provider value={stepperApi}>{children(stepperApi)}</StepperContext.Provider>;
}
