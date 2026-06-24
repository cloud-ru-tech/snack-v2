import { useThemeClassnames } from '@ds/theme';
import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ReactElement } from 'react';

import { StepperContext } from '../../context';
import { MobileStep } from '../../helperComponents';
import { useStepperController } from '../../hooks/useStepperController';
import { StepData, StepperApi, StepsValidator } from '../../types';
import styles from './styles.module.scss';

export type MobileStepperProps = {
  /** Массив шагов */
  steps: StepData[];
  /** Индекс текущего шага по-дефолту */
  defaultCurrentStepIndex?: number;
  /** Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым — индекс нового шага. */
  validator?: StepsValidator;
  /** CSS-класс */
  className?: string;
  /**
   * Render function. Принимает `stepper` и api:
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
}: MobileStepperProps) {
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
