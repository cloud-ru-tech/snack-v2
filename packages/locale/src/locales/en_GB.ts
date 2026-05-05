import { Dictionary } from '../types';

export const en_GB = {
  Calendar: {
    current: 'Current',
    apply: 'Apply',
    time: 'Time',
    presets: 'Presets',
    prevPeriodMonth: 'Previous month',
    nextPeriodMonth: 'Next month',
    prevPeriodYear: 'Previous year',
    nextPeriodYear: 'Next year',
    prevPeriodDecade: 'Previous decade',
    nextPeriodDecade: 'Next decade',
    defaultPresets: {
      lastWeek: 'Last 7 days',
      lastTwoWeeks: 'Last 14 days',
      lastMonth: 'Last 30 days',
      lastQuarter: 'Last 90 days',
      lastThird: 'Last 120 days',
      lastYear: 'Last 1 year',
      lastTwoYears: 'Last 2 years',
    },
  },
  Dropdown: {
    states: {
      notFound: {
        title: 'Not Found',
        action: 'Update',
      },
      noData: {
        title: 'No data',
        action: 'Update',
      },
      dataError: {
        title: 'Data error',
        action: 'Update',
      },
    },
  },
  SearchPrivate: {
    placeholder: 'Search',
  },
} satisfies Dictionary;
