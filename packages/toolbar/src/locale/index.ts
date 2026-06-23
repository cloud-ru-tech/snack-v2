import { defineLocale, defineMessages } from '@ds/locale';

const TOOLBAR_MESSAGES = defineMessages({
  'en-GB': {
    showFilters: 'Show filters',
    hideFilters: 'Hide filters',
    selected: 'Selected: {{count}}',
    selectedOf: 'Selected: {{count}} of {{total}}',
    selectedPrefix: 'Selected:',
    selectedCount: '{{count}}',
    selectedCountOf: '{{count}} of {{total}}',
    multipleActions: 'Multiple actions',
    refresh: 'Refresh',
    more: 'More',
  },
  'ru-RU': {
    showFilters: 'Показать фильтры',
    hideFilters: 'Скрыть фильтры',
    selected: 'Выбрано: {{count}}',
    selectedOf: 'Выбрано: {{count}} из {{total}}',
    selectedPrefix: 'Выбрано:',
    selectedCount: '{{count}}',
    selectedCountOf: '{{count}} из {{total}}',
    multipleActions: 'Массовые действия',
    refresh: 'Обновить',
    more: 'Ещё',
  },
});

export type ToolbarMessages = (typeof TOOLBAR_MESSAGES)['en-GB'];

/** locale компонента Toolbar: `toolbarLocale.useTranslations()` в коде, `toolbarLocale.extend(...)` в сервисе. */
export const toolbarLocale = defineLocale('@ds/toolbar', TOOLBAR_MESSAGES);
