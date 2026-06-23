import { defineLocale, defineMessages } from '@ds/locale';

const WIDGET_MESSAGES = defineMessages({
  'en-GB': {
    dataErrorTitle: 'Could not load data',
    dataErrorDescription: 'Try to refresh the widget',
    updateButtonLabel: 'Update',
  },
  'ru-RU': {
    dataErrorTitle: 'Не удалось получить данные',
    dataErrorDescription: 'Попробуйте обновить виджет',
    updateButtonLabel: 'Обновить',
  },
});

export type WidgetMessages = (typeof WIDGET_MESSAGES)['en-GB'];

/** locale компонента Widget: `widgetLocale.useTranslations()` в коде, `widgetLocale.extend(...)` в сервисе. */
export const widgetLocale = defineLocale('@ds/uikit-product-widget', WIDGET_MESSAGES);
