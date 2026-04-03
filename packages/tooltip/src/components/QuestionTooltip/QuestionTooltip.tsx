import { QuestionSpriteSVG } from '@design-system/icons';
import { TRIGGER } from '@design-system/popover-private';
import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import { SIZE } from '../../constants';
import { Size } from '../../types';
import { getIconSize } from '../../utils';
import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './styles.module.scss';

export type QuestionTooltipProps = TooltipProps & {
  /** CSS-класс контейнера подсказки */
  tooltipClassname?: string;
  /** Доступное имя для иконки-триггера */
  triggerLabel?: string;
  /** Tab index для кнопки-триггера */
  tabIndex?: number;
  /**
   * Размер
   * @default xs
   */
  size?: Size;
};

/**
 * QuestionTooltip — тултип с триггером-иконкой «вопрос».
 * Переиспользует компонент Tooltip, добавляя стандартный триггер в виде иконки.
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
      >
        <QuestionSpriteSVG size={getIconSize(size)} />
      </button>
    </Tooltip>
  );
}
