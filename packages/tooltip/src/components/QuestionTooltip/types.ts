import { Size } from '../../types';
import { TooltipProps } from '../Tooltip';

/**
 * QuestionTooltip: иконка «?» с тултипом-popover. Поверхность одна на всех раскладках.
 * `tooltipClassname` применяется к контейнеру подсказки.
 */
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
