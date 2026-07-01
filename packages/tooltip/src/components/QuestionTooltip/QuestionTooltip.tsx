import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopQuestionTooltip } from '../../helperComponents/DesktopQuestionTooltip';
import { MobileQuestionTooltip } from '../../helperComponents/MobileQuestionTooltip';
import { QuestionTooltipProps } from './types';

/**
 * Адаптивный QuestionTooltip. Раскладку берёт из `AdaptiveProvider` (контекст): на `mobile` открывает
 * `tip` в `BottomSheet` по клику, иначе — desktop-тултип по «?». Публичный API единый; форс платформы —
 * через `<AdaptiveProvider layoutType=…>` / `withLayoutType` (см. `@ds/adaptive`), пропа `layoutType` нет.
 */
export function QuestionTooltip(props: QuestionTooltipProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileQuestionTooltip {...props} /> : <DesktopQuestionTooltip {...props} />;
}
