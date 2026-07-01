import { Size } from '../../types';
import { TooltipProps } from '../Tooltip';

/**
 * Адаптивный QuestionTooltip: desktop — popover по иконке «?», `mobile` — `tip` в `BottomSheet` по клику.
 *
 * Только desktop: `placement`, `trigger`, `offset`, `hoverDelayOpen`, `hoverDelayClose`, `triggerRef`,
 * `disableSpanWrapper`, `fallbackPlacements`, `disableMaxWidth` (на mobile игнорируются).
 * `tooltipClassname` применяется на обеих поверхностях (на desktop — к popover, на mobile — к контенту `BottomSheet`).
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
