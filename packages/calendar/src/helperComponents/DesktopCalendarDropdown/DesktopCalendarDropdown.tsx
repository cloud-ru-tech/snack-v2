import { Dropdown } from '@ds/dropdown';
import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { Calendar } from '../../components/Calendar';
import { CalendarDropdownProps } from '../../components/CalendarDropdown/CalendarDropdown';
import styles from '../../components/CalendarDropdown/styles.module.scss';
import { getTestIdBuilder } from '../../utils';
import { Footer } from '../Footer';

export function DesktopCalendarDropdown({
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
      <Calendar {...calendarProps} bottomSlot={<Footer inline onApply={handleFooterApply} onCurrent={onCurrent} />} />
    </div>
  );

  return (
    <Dropdown
      className={styles.dropdown}
      // Календарь сам управляет внутренними отступами (header/body/footer) — общий padding
      // dropdown-контейнера в макете отсутствует.
      bodyPadding={false}
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
