import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { StepperContext } from '../../context';
import { useStepperController } from '../../hooks/useStepperController';
import { StepperApi, StepperProps } from '../../types';
import { getTestIdBuilder } from '../../utils';
import { MobileStep } from '../MobileStep';
import styles from './styles.module.scss';

const getTitleTestId = getTestIdBuilder(TEST_IDS.titleSuffix);
const getDescriptionTestId = getTestIdBuilder(TEST_IDS.descriptionSuffix);

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

  const stepper = (
    <div className={cn(styles.stepper, className)} data-test-id={testId}>
      <div className={styles.steps} style={{ gridTemplateColumns: `repeat(${stepsView.length}, 1fr)` }}>
        {stepsView.map((step, index) => (
          <MobileStep key={step.title + index} step={step} data-test-id={testId} />
        ))}
      </div>

      {currentStep && (
        <div className={styles.content}>
          <Typography variant='body' size='m' as='div' className={styles.title}>
            <TruncateString text={currentStep.title} data-test-id={getTitleTestId(testId)} />
          </Typography>

          {currentStep.description && (
            <Typography variant='body' size='s' as='div' className={styles.description}>
              <TruncateString text={currentStep.description} maxLines={2} data-test-id={getDescriptionTestId(testId)} />
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
