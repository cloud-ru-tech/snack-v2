import { VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { DecadeView } from '../DecadeView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';

export function CalendarBody() {
  const { viewMode } = useCalendarContext();

  switch (viewMode) {
    case VIEW_MODE.Decade:
      return <DecadeView />;
    case VIEW_MODE.Year:
      return <YearView />;
    case VIEW_MODE.Month:
    default:
      return <MonthView />;
  }
}
