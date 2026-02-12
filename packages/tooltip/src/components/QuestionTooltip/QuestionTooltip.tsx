import { PLACEMENT, PopoverPrivateProps, TRIGGER } from '@design-system/popover-private';
import { ReactNode } from 'react';

import { Tooltip } from '../Tooltip';
import styles from './styles.module.scss';

export type QuestionTooltipProps = {
  /** Содержимое тултипа (текст или разметка) */
  content: ReactNode;
  /** Задержка открытия по ховеру (мс) */
  hoverDelayOpen?: number;
  /** Задержка закрытия по ховеру (мс) */
  hoverDelayClose?: number;
  /** Доступное имя для иконки-триггера */
  triggerLabel?: string;
} & Pick<Partial<PopoverPrivateProps>, 'placement' | 'trigger' | 'offset'>;

// Иконка «?» по Figma: размер 16 (sn/adaptive/size/icon/xs), цвет textMain.
function QuestionIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.387 2.084 C 4.999 2.328,2.946 4.048,2.285 6.360 C 1.326 9.715,3.449 13.171,6.880 13.838 C 10.089 14.461,13.212 12.343,13.838 9.120 C 14.461 5.912,12.342 2.788,9.120 2.162 C 8.577 2.057,7.934 2.028,7.387 2.084 M8.706 3.336 C 10.088 3.544,11.326 4.373,12.048 5.576 C 12.354 6.086,12.572 6.698,12.669 7.320 C 12.712 7.595,12.712 8.405,12.669 8.680 C 12.507 9.716,12.057 10.609,11.333 11.333 C 10.609 12.057,9.716 12.507,8.680 12.669 C 8.405 12.712,7.595 12.712,7.320 12.669 C 6.284 12.507,5.391 12.057,4.667 11.333 C 3.943 10.609,3.493 9.716,3.331 8.680 C 3.288 8.405,3.288 7.595,3.331 7.320 C 3.493 6.284,3.943 5.391,4.667 4.667 C 5.474 3.859,6.478 3.399,7.653 3.296 C 7.840 3.280,8.497 3.305,8.706 3.336 M7.514 4.762 C 7.046 4.847,6.674 5.038,6.357 5.357 C 6.022 5.694,5.783 6.200,5.738 6.666 L 5.717 6.880 6.335 6.880 L 6.953 6.880 6.968 6.734 C 7.001 6.411,7.255 6.104,7.569 6.007 C 7.778 5.942,8.204 5.943,8.398 6.009 C 8.720 6.117,8.945 6.332,9.017 6.600 C 9.033 6.658,9.041 6.821,9.035 6.960 C 9.016 7.378,8.987 7.422,8.252 8.147 C 7.910 8.484,7.569 8.842,7.494 8.943 C 7.264 9.252,7.120 9.584,7.085 9.887 L 7.072 10.000 7.682 10.000 L 8.293 10.000 8.333 9.904 C 8.401 9.741,8.521 9.606,9.134 9.000 C 9.460 8.677,9.775 8.347,9.834 8.265 C 9.976 8.068,10.115 7.787,10.185 7.559 C 10.291 7.208,10.298 6.657,10.201 6.280 C 10.143 6.056,9.971 5.723,9.814 5.531 C 9.317 4.924,8.369 4.607,7.514 4.762 M7.093 11.160 L 7.093 11.653 7.707 11.653 L 8.320 11.653 8.320 11.160 L 8.320 10.667 7.707 10.667 L 7.093 10.667 7.093 11.160 '
        stroke='none'
        fillRule='evenodd'
        fill='currentColor'
      ></path>
    </svg>
  );
}

/**
 * QuestionTooltip — тултип с триггером-иконкой «вопрос».
 * Переиспользует компонент Tooltip, добавляя стандартный триггер в виде иконки.
 */
export function QuestionTooltip({
  content,
  placement = PLACEMENT.Top,
  trigger = TRIGGER.HoverAndFocusVisible,
  hoverDelayOpen = 0,
  hoverDelayClose = 0,
  offset = 4,
  triggerLabel = 'Подсказка',
}: QuestionTooltipProps) {
  return (
    <Tooltip
      content={content}
      placement={placement}
      trigger={trigger}
      hoverDelayOpen={hoverDelayOpen}
      hoverDelayClose={hoverDelayClose}
      offset={offset}
      triggerClassName={styles.questionTooltipTrigger}
    >
      <button className={styles.button} type='button' aria-label={triggerLabel}>
        <QuestionIcon />
      </button>
    </Tooltip>
  );
}
