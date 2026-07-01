import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopStepper } from '../../helperComponents/DesktopStepper';
import { MobileStepper } from '../../helperComponents/MobileStepper';
import { StepperProps } from '../../types';

/**
 * Адаптивный Stepper. Раскладку берёт из `AdaptiveProvider` (контекст): на `mobile` рендерит
 * компактный мобильный индикатор, иначе — desktop-степпер. Публичный API единый; форс платформы —
 * через `<AdaptiveProvider layoutType=…>` / `withLayoutType` (см. `@ds/adaptive`), пропа `layoutType` нет.
 */
export function Stepper(props: StepperProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileStepper {...props} /> : <DesktopStepper {...props} />;
}

Stepper.displayName = 'Stepper';
