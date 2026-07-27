import { QuestionSVG } from '@ds/icons/interface/system';
import { TRIGGER } from '@ds/popover-private';
import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { RefObject } from 'react';

import { SIZE, TEST_IDS } from '../../constants';
import { getIconSize } from '../../utils';
import { Tooltip } from '../Tooltip';
import styles from './styles.module.scss';
import { QuestionTooltipProps } from './types';

/**
 * QuestionTooltip — иконка «?» с тултипом-popover для подсказок к полям форм.
 * Поверхность одна на всех раскладках (по договорённости с дизайном mobile не свапается на BottomSheet).
 */
export function QuestionTooltip({
  tip,
  triggerLabel = 'Подсказка',
  trigger = TRIGGER.Hover,
  className,
  tooltipClassname,
  open,
  onOpenChange,
  tabIndex = 0,
  size = SIZE.XS,
  triggerRef,
  ...rest
}: QuestionTooltipProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

  return (
    <Tooltip
      tip={tip}
      className={tooltipClassname}
      triggerClassName={styles.questionTooltipTrigger}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
      {...rest}
    >
      <button
        type='button'
        aria-label={triggerLabel}
        data-opened={isOpen}
        data-trigger={trigger}
        tabIndex={tabIndex}
        className={cn(styles.button, className)}
        data-size={size}
        data-test-id={TEST_IDS.questionTooltip.triggerOpen}
        // Ref ведёт на саму кнопку, а не на span-обёртку popover'а: потребителю
        // нужен настоящий триггер (позиционирование, фокус).
        ref={triggerRef as RefObject<HTMLButtonElement>}
      >
        <QuestionSVG size={getIconSize(size)} />
      </button>
    </Tooltip>
  );
}
