import { en_GB } from './en_GB';

export const ru_RU: typeof en_GB = {
  Calendar: {
    current: 'Сейчас',
    apply: 'Применить',
    time: 'Время',
    presets: 'Пресеты',
    prevPeriodMonth: 'Предыдущий месяц',
    nextPeriodMonth: 'Следующий месяц',
    prevPeriodYear: 'Предыдущий год',
    nextPeriodYear: 'Следующий год',
    prevPeriodDecade: 'Предыдущее десятилетие',
    nextPeriodDecade: 'Следующее десятилетие',
    defaultPresets: {
      lastWeek: 'Последние 7 дней',
      lastTwoWeeks: 'Последние 14 дней',
      lastMonth: 'Последние 30 дней',
      lastQuarter: 'Последние 90 дней',
      lastThird: 'Последние 120 дней',
      lastYear: 'Последний 1 год',
      lastTwoYears: 'Последние 2 года',
    },
  },
  Dropdown: {
    states: {
      notFound: {
        title: 'Не найдено',
        action: 'Перезагрузить',
      },
      noData: {
        title: 'Нет данных',
        action: 'Перезагрузить',
      },
      dataError: {
        title: 'Ошибка',
        action: 'Перезагрузить',
      },
    },
  },
  SearchPrivate: {
    placeholder: 'Поиск',
  },
  ToasterContainer: {
    closeAll: 'Закрыть все',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    showMore: 'Показать все',
    showLess: 'Скрыть',
    notificationsRegion: 'Уведомления',
  },
  ToastUpload: {
    title: {
      loading: 'Загрузка',
      pause: 'Приостановлено',
      error: 'Ошибка загрузки',
      uploaded: 'Загружено',
      errorUploaded: 'Загружено с ошибками',
    },
    pause: 'Пауза',
    play: 'Продолжить',
    retry: 'Повторить',
    cancelAll: 'Отменить всё',
  },
  ToastSystemEvent: {
    closeButton: 'Закрыть уведомление',
  },
  ColorPicker: {
    apply: 'Применить',
    cancel: 'Отмена',
    hex: 'Hex',
    r: 'Красный',
    g: 'Зелёный',
    b: 'Синий',
    h: 'Тон',
    s: 'Насыщенность',
    v: 'Яркость',
    alpha: 'Прозрачность',
  },
  AvatarDetail: {
    copy: 'Скопировать',
    copied: 'Скопировано',
    copyContactData: 'Скопировать контактные данные',
  },
  Widget: {
    dataErrorTitle: 'Не удалось получить данные',
    dataErrorDescription: 'Попробуйте обновить виджет',
    updateButtonLabel: 'Обновить',
  },
  Chips: {
    allLabel: 'Все',
    apply: 'Применить',
    cancel: 'Отмена',
    add: 'Добавить',
    clear: 'Сбросить',
    addButtonDisabledTip: 'Нет фильтров для добавления',
  },
  Quota: {
    quotas: 'Квоты',
    widgetTitle: {
      withoutProject: 'Квоты проекта',
      quotes: 'Квоты проекта «{{project}}»',
      noQuotes: 'Квоты проекта {{project}}',
    },
    widgetSubtitle: 'Остаток по квотам на текущий момент',
    increaseQuota: 'Увеличить квоту',
    cardAvailable: 'Доступно',
    cardRemaining: 'Остаток',
    tooltipAvailable: 'Доступно',
    tooltipUsed: 'Использовано',
    tooltipRemaining: 'Остаток',
    tooltipExhaustedHint: {
      first: 'Квота исчерпана.',
      second: 'Чтобы увеличить квоту, обратитесь к администратору квот или организации.',
    },
    errorText: 'Не удалось загрузить данные',
    errorButton: 'Обновить',
  },
};
