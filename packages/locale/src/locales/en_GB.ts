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
  ToasterContainer: {
    closeAll: 'Close all',
    expand: 'Expand',
    collapse: 'Collapse',
    showMore: 'Show more',
    showLess: 'Show less',
    notificationsRegion: 'Notifications',
  },
  ToastUpload: {
    title: {
      loading: 'Uploading',
      pause: 'Paused',
      error: 'Upload error',
      uploaded: 'Uploaded',
      errorUploaded: 'Uploaded with errors',
    },
    pause: 'Pause',
    play: 'Resume',
    retry: 'Retry',
    cancelAll: 'Cancel all',
  },
  ToastSystemEvent: {
    closeButton: 'Close notification',
  },
  ColorPicker: {
    apply: 'Apply',
    cancel: 'Cancel',
    hex: 'Hex',
    r: 'Red',
    g: 'Green',
    b: 'Blue',
    h: 'Hue',
    s: 'Saturation',
    v: 'Value',
    alpha: 'Alpha',
  },
  AvatarDetail: {
    copy: 'Copy',
    copied: 'Copied',
    copyContactData: 'Copy contact data',
  },
  Chips: {
    allLabel: 'All',
    apply: 'Apply',
    cancel: 'Cancel',
    add: 'Add',
    clear: 'Clear',
    addButtonDisabledTip: 'No filters available to add',
  },
  Quota: {
    quotas: 'Quotas',
    widgetTitle: {
      withoutProject: 'Project quotas',
      quotes: 'Project quotas «{{project}}»',
      noQuotes: 'Project quotas {{project}}',
    },
    widgetSubtitle: 'Current quota balance',
    increaseQuota: 'Increase quota',
    cardAvailable: 'Available',
    cardRemaining: 'Remaining',
    tooltipAvailable: 'Available',
    tooltipUsed: 'Used',
    tooltipRemaining: 'Remaining',
    tooltipExhaustedHint: {
      first: 'Quota exhausted.',
      second: 'To increase the quota, contact the quota or organization administrator.',
    },
    errorText: 'Failed to load data',
    errorButton: 'Refresh',
  },
} satisfies Dictionary;
