/** Поверхность формы создания опции: модальное окно или дровер. */
export const CREATE_LAYOUT_TYPE = {
  Modal: 'modal',
  Drawer: 'drawer',
} as const;

/** Права пользователя на чтение/создание опций. */
export const PERMISSION = {
  /** Поле недоступно. */
  None: 'none',
  /** Поле активно, создание опции недоступно. */
  CanRead: 'canRead',
  /** Полный доступ: чтение и создание. */
  CanCreate: 'canCreate',
} as const;
