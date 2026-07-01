import { QuestionSpriteSVG } from '@ds/icons';
import { TRIGGER } from '@ds/popover-private';
import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import styles from '../../components/QuestionTooltip/styles.module.scss';
import { QuestionTooltipProps } from '../../components/QuestionTooltip/types';
import { Tooltip } from '../../components/Tooltip';
import { SIZE, TEST_IDS } from '../../constants';
import { getIconSize } from '../../utils';

/**
 * Desktop-поверхность QuestionTooltip: иконка «?» + тултип-popover (`Tooltip`).
 * Internal — наружу не реэкспортится; рендерится адаптивным `QuestionTooltip` по контексту раскладки.
 */
export function DesktopQuestionTooltip({
  tip,
  triggerLabel = 'Подсказка',
  trigger = TRIGGER.Hover,
  className,
  tooltipClassname,
  open,
  onOpenChange,
  tabIndex = 0,
  size = SIZE.XS,
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
      >
        <QuestionSpriteSVG size={getIconSize(size)} />
      </button>
    </Tooltip>
  );
}
