import { useContext } from 'react';

import { CalendarContext } from '../helperComponents';

export function useCalendarContext() {
  return useContext(CalendarContext);
}
