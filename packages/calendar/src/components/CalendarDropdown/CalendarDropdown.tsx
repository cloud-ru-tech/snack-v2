import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { DropdownProps } from '@ds/dropdown';
import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DesktopCalendarDropdown } from '../../helperComponents/DesktopCalendarDropdown';
import { MobileCalendarDropdown } from '../../helperComponents/MobileCalendarDropdown';
import { CalendarProps } from '../Calendar';

type DropdownBridgeProps = Pick<
  DropdownProps,
  | 'triggerClassName'
  | 'trigger'
  | 'placement'
  | 'hoverDelayOpen'
  | 'hoverDelayClose'
  | 'closeOnEscapeKey'
  | 'triggerClickByKeys'
  | 'triggerRef'
  | 'outsideClick'
  | 'fallbackPlacements'
  | 'disableSpanWrapper'
  | 'closeOnPopstate'
  | 'open'
  | 'onOpenChange'
>;

/**
 * Адаптивный календарь в триггере. На desktop открывается в popover (`@ds/dropdown`), на mobile —
 * в `@ds/bottom-sheet` (раскладка берётся из `@ds/adaptive`; собственного пропа `layoutType` нет).
 * Пропы позиционирования popover (`placement`, `fallbackPlacements`, `triggerRef`, …) на mobile игнорируются.
 */
export type CalendarDropdownProps = WithSupportProps<
  CalendarProps &
    DropdownBridgeProps & {
      /** Элемент открытия dropdown (триггер). */
      children?: ReactNode;
      /** Закрыть dropdown после нажатия Apply. */
      closeOnApply?: boolean;
      /** Колбек после подтверждения в футере. */
      onApply?(): void;
      /** Колбек по кнопке Current в футере. */
      onCurrent?(): void;
    }
>;

export function CalendarDropdown(props: CalendarDropdownProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileCalendarDropdown {...props} /> : <DesktopCalendarDropdown {...props} />;
}
