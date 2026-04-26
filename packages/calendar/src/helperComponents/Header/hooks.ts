import { VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { getMonthName } from '../../utils';

export function usePeriodName(): string {
  const { viewDate, viewMode, locale } = useCalendarContext();

  switch (viewMode) {
    case VIEW_MODE.Month: {
      const year = viewDate.getFullYear();
      return `${getMonthName(viewDate, locale)} ${year}`;
    }
    case VIEW_MODE.Year:
      return viewDate.getFullYear().toString();
    case VIEW_MODE.Decade: {
      const decadeStart = viewDate.getFullYear();
      return `${decadeStart}-${decadeStart + 9}`;
    }
    default:
      return '';
  }
}
