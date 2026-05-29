export type QuotaItem = {
  /** Название квоты */
  name: string;
  /** Лимит квоты */
  limit: number;
  /** Потребление квоты */
  usage: number;
  /** Остаток квоты */
  remains: number;
  /** Единица измерения квоты */
  unitDisplayName: string;
};

export type QuotaWidgetPropsBase = {
  /** Список квот для отображения */
  quotas: QuotaItem[];
  /** Флаг отключения сортировки квот */
  disableSorting?: boolean;
  /** Флаг загрузки квот */
  isLoading: boolean;
  /** Флаг ошибки при загрузке квот */
  isError: boolean;
  /** Колбек на обновление списка квот при ошибке */
  onRefresh: () => void;
  /** Название проекта, по которому отображаются квоты */
  projectName: string;
  /** Флаг наличия прав на редактирование квот */
  canEditQuota: boolean;
  /** Флаг скрытия кнопки увеличения квоты */
  hideIncreaseQuotaButton?: boolean;
  /** Колбек нажатия на кнопку увеличения квот */
  onIncreaseQuotaClick?: () => void;
  /** Колбек открытия виджета квот */
  onWidgetOpen?: () => void;
};
