import { TRIGGER } from '@ds/popover-private';
import { QuestionTooltip, QuestionTooltipProps } from '@ds/tooltip';
import { LayoutType } from '@ds/utils';

export type AdaptiveQuestionTooltipProps = QuestionTooltipProps & {
  layoutType?: LayoutType;
};

export function AdaptiveQuestionTooltip({ layoutType, trigger, ...rest }: AdaptiveQuestionTooltipProps) {
  const resolvedTrigger = trigger ?? (layoutType === 'mobile' ? TRIGGER.Click : TRIGGER.Hover);

  return <QuestionTooltip trigger={resolvedTrigger} {...rest} />;
}
