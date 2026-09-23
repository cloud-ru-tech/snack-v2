import { defineLocale, defineMessages } from '@ds/locale';

const LAYOUT_MESSAGES = defineMessages({
  'en-GB': {
    noAccessTitle: 'Access restricted',
    noAccessDescription:
      'You do not have permission to view this content.{{newline}}To get access, contact your organization or project administrator.',
  },
  'ru-RU': {
    noAccessTitle: 'Доступ ограничен',
    noAccessDescription:
      'У вас нет прав для просмотра этого контента.{{newline}}Для получения доступа обратитесь к администратору организации или проекта.',
  },
});

export type LayoutMessages = (typeof LAYOUT_MESSAGES)['en-GB'];

/** locale пакета Layout: `layoutLocale.useTranslations()` в коде, `layoutLocale.extend(...)` в сервисе. */
export const layoutLocale = defineLocale('@ds/uikit-product-layout', LAYOUT_MESSAGES);
