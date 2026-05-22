import { Dropdown, DropdownProps } from '@ds/dropdown';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useCallback, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Footer } from '../../helperComponents';
import { getTestIdBuilder } from '../../utils';
import { Calendar, CalendarProps } from '../Calendar';
import styles from './styles.module.scss';

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

export function CalendarDropdown({
  children,
  closeOnApply = false,
  onApply,
  onCurrent,
  open: openProp,
  onOpenChange,
  triggerClassName,
  trigger = 'click',
  placement = 'bottom-start',
  hoverDelayOpen,
  hoverDelayClose,
  closeOnEscapeKey,
  triggerClickByKeys,
  triggerRef,
  outsideClick,
  fallbackPlacements,
  disableSpanWrapper,
  closeOnPopstate,
  className,
  'data-test-id': testId,
  ...calendarProps
}: CalendarDropdownProps) {
  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const handleFooterApply = useCallback(() => {
    onApply?.();

    if (closeOnApply) {
      setOpen(false);
    }
  }, [closeOnApply, onApply, setOpen]);

  const content = (
    <div className={cn(styles.calendarDropdownContent, className)} data-test-id={getTestId('content')}>
      <Calendar {...calendarProps} bottomSlot={<Footer onApply={handleFooterApply} onCurrent={onCurrent} />} />
    </div>
  );

  return (
    <Dropdown
      className={styles.dropdown}
      data-test-id={testId}
      triggerClassName={triggerClassName}
      trigger={trigger}
      placement={placement}
      hoverDelayOpen={hoverDelayOpen}
      hoverDelayClose={hoverDelayClose}
      closeOnEscapeKey={closeOnEscapeKey}
      triggerClickByKeys={triggerClickByKeys}
      triggerRef={triggerRef}
      outsideClick={outsideClick}
      fallbackPlacements={fallbackPlacements}
      disableSpanWrapper={disableSpanWrapper}
      closeOnPopstate={closeOnPopstate}
      open={open}
      onOpenChange={setOpen}
      content={content}
      widthStrategy='gte'
    >
      {children}
    </Dropdown>
  );
}
