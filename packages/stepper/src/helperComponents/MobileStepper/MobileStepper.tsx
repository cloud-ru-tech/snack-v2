import { useThemeClassnames } from '@ds/theme';
import { Typography } from '@ds/typography';
import cn from 'classnames';

import { StepperContext } from '../../context';
import { useStepperController } from '../../hooks/useStepperController';
import { StepperApi, StepperProps } from '../../types';
import { MobileStep } from '../MobileStep';
import styles from './styles.module.scss';

export function MobileStepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  validator,
  allowFreeNavigation = false,
  'data-test-id': testId,
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

  const currentStep = stepsView[currentStepIndex];

  // Фиксируем density, остальные оси (colorScheme/brand/…) наследуем из контекста темы.
  const themeClassName = useThemeClassnames({ density: 'comfort' });

  const stepper = (
    <div className={cn(themeClassName, styles.stepper, className)} data-test-id={testId}>
      <div className={styles.steps} style={{ gridTemplateColumns: `repeat(${stepsView.length}, 1fr)` }}>
        {stepsView.map((step, index) => (
          <MobileStep key={step.title + index} step={step} data-test-id={testId} />
        ))}
      </div>

      {currentStep && (
        <div className={styles.content}>
          <Typography variant='body' size='m' as='div' className={styles.title}>
            {currentStep.title}
          </Typography>

          {currentStep.description && (
            <Typography variant='body' size='s' as='div' className={styles.description}>
              {currentStep.description}
            </Typography>
          )}
        </div>
      )}
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

MobileStepper.displayName = 'MobileStepper';
