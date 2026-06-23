import { defineLocale, defineMessages } from '@ds/locale';

const LAYOUT_MESSAGES = defineMessages({
  'en-GB': {
    noAccessTitle: 'Access restricted',
    noAccessSubtitle: 'You do not have permission to view this content.',
    noAccessText: 'To get access, contact your organization or project administrator.',
  },
  'ru-RU': {
    noAccessTitle: 'Доступ ограничен',
    noAccessSubtitle: 'У вас нет прав для просмотра этого контента.',
    noAccessText: 'Для получения доступа обратитесь к администратору организации или проекта.',
  },
});

export type LayoutMessages = (typeof LAYOUT_MESSAGES)['en-GB'];

/** locale пакета Layout: `layoutLocale.useTranslations()` в коде, `layoutLocale.extend(...)` в сервисе. */
export const layoutLocale = defineLocale('@ds/uikit-product-layout', LAYOUT_MESSAGES);
