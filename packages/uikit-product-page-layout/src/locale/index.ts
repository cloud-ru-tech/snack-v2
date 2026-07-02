import { defineLocale, defineMessages } from '@ds/locale';

/**
 * Строки `@ds/uikit-product-page-layout`. Тип-истина ключей — рядом с компонентом.
 * `defineMessages` требует одинаковый набор ключей во всех языках: забыл ключ в одном — ошибка компиляции.
 */
const PAGE_LAYOUT_MESSAGES = defineMessages({
  'en-GB': {
    PageForm: {
      continue: 'Continue',
      create: 'Create',
      save: 'Save',
      rent: 'Rent',
      send: 'Send',
      restore: 'Restore',
      add: 'Add',
      cancel: 'Cancel',
      back: 'Back',
    },
    PageSidebar: {
      backTo: 'Back to',
      searchByServices: 'Search by services',
      closeSearch: 'Close search',
      openSearch: 'Open search',
    },
    TreeNavigation: {
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
    },
  },
  'ru-RU': {
    PageForm: {
      continue: 'Продолжить',
      create: 'Создать',
      save: 'Сохранить',
      rent: 'Арендовать',
      send: 'Отправить',
      restore: 'Восстановить',
      add: 'Добавить',
      cancel: 'Отмена',
      back: 'Назад',
    },
    PageSidebar: {
      backTo: 'Назад в',
      searchByServices: 'Поиск по разделам',
      closeSearch: 'Закрыть поиск',
      openSearch: 'Открыть поиск',
    },
    TreeNavigation: {
      closeMenu: 'Закрыть меню',
      openMenu: 'Открыть меню',
      collapseAll: 'Свернуть все',
      expandAll: 'Развернуть все',
    },
  },
});

/** Форма словаря PageLayout — для типизации сервисных оверрайдов/новых языков. */
export type PageLayoutMessages = (typeof PAGE_LAYOUT_MESSAGES)['en-GB'];

/** locale компонента PageLayout: `pageLayoutLocale.useTranslations()` в коде, `pageLayoutLocale.extend(...)` в сервисе. */
export const pageLayoutLocale = defineLocale('@ds/uikit-product-page-layout', PAGE_LAYOUT_MESSAGES);
