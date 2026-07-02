import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { DropdownProps } from '@ds/dropdown';
import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { DesktopTimePickerDropdown } from '../../helperComponents/DesktopTimePickerDropdown';
import { MobileTimePickerDropdown } from '../../helperComponents/MobileTimePickerDropdown';
import { TimePickerProps } from '../TimePicker';

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
 * Адаптивный выбор времени в триггере. На desktop открывается в popover (`@ds/dropdown`), на mobile —
 * в `@ds/bottom-sheet` с барабанным пикером (раскладка из `@ds/adaptive`; собственного пропа `layoutType` нет).
 * Пропы позиционирования popover на mobile игнорируются.
 */
export type TimePickerDropdownProps = WithSupportProps<
  TimePickerProps &
    DropdownBridgeProps & {
      /** Контент триггера открытия dropdown */
      children?: ReactNode;
      /** Закрыть dropdown после нажатия кнопки Apply */
      closeOnApply?: boolean;
      /** Колбек по нажатию Apply */
      onApply?(): void;
      /** Колбек по нажатию Current */
      onCurrent?(): void;
    }
>;

export function TimePickerDropdown(props: TimePickerDropdownProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? (
    <MobileTimePickerDropdown {...props} />
  ) : (
    <DesktopTimePickerDropdown {...props} />
  );
}
