import cn from 'classnames';

import { StepperContext } from '../../context';
import { useStepperController } from '../../hooks/useStepperController';
import { StepperApi, StepperProps } from '../../types';
import { DesktopStep } from '../DesktopStep';
import styles from './styles.module.scss';

export function DesktopStepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  validator,
  'data-test-id': testId,
  allowFreeNavigation = false,
}: StepperProps) {
  const { stepsView, currentStepIndex, isCompleted, stepCount, goNext, goPrev, resetValidation, setValidator } =
    useStepperController({
      steps,
      defaultCurrentStepIndex,
      validator,
      onChangeCurrentStep,
      onCompleteChange,
      allowFreeNavigation,
    });

  const stepper = (
    <div className={cn(styles.stepper, className)} data-test-id={testId}>
      {stepsView.map((step, index) => (
        <DesktopStep key={step.title + index} step={step} data-test-id={testId} />
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

DesktopStepper.displayName = 'DesktopStepper';
