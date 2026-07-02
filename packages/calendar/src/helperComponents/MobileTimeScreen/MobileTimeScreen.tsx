import { Ref } from 'react';

import { useCalendarContext, useTimeDrumHandlers } from '../../hooks';
import { Size } from '../../types';
import { TimePickerDrum, TimePickerDrumHandle } from '../TimePickerDrum';

export type MobileTimeScreenProps = {
  size: Size;
  /** Ref барабана — для форс-коммита незавершённого жеста при уходе с экрана (см. FF-8654, комментарий #2). */
  drumRef?: Ref<TimePickerDrumHandle>;
};

export function MobileTimeScreen({ size, drumRef }: MobileTimeScreenProps) {
  const { dateAndTime, onTimeChange, showSeconds, isDateFilled, locale } = useCalendarContext();

  const drumHandlers = useTimeDrumHandlers(dateAndTime, onTimeChange);

  const selectedDateLabel =
    isDateFilled() && dateAndTime
      ? new Date(dateAndTime.year ?? 0, dateAndTime.month ?? 0, dateAndTime.day ?? 0).toLocaleDateString(
          locale?.toString(),
          { day: 'numeric', month: 'long', year: 'numeric' },
        )
      : undefined;

  return (
    <TimePickerDrum
      ref={drumRef}
      size={size}
      showSeconds={showSeconds}
      selectedDateLabel={selectedDateLabel}
      hours={dateAndTime?.hours ?? 0}
      minutes={dateAndTime?.minutes ?? 0}
      seconds={dateAndTime?.seconds ?? 0}
      {...drumHandlers}
    />
  );
}
