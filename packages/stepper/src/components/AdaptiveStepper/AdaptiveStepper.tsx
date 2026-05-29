import { LayoutType } from '@ds/utils';

import { MobileStepper } from '../MobileStepper';
import { Stepper, StepperProps } from '../Stepper';

export type AdaptiveStepperProps = StepperProps & {
  /** Режим отображения: desktop (по-умолчанию) или mobile */
  layoutType: LayoutType;
};

export function AdaptiveStepper({ layoutType, ...props }: AdaptiveStepperProps) {
  return layoutType === 'mobile' ? <MobileStepper {...props} /> : <Stepper {...props} />;
}
