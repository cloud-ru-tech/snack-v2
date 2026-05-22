// Shared labels for ButtonGroup test fixtures + Playwright specs. Keep in one
// place так чтобы переименование лейбла не требовало синхронной правки в двух
// файлах.

export const BUTTON_GROUP_LABELS = {
  primary: 'Сохранить',
  secondary: 'Отмена',
  tertiary: 'Помощь',
  primaryCritical: 'Применить',
} as const;
