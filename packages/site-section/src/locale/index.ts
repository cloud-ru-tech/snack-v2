import { defineLocale, defineMessages } from '@ds/locale';

const SITE_SECTION_MESSAGES = defineMessages({
  'en-GB': { showMore: 'Show more' },
  'ru-RU': { showMore: 'Показать еще' },
});

export type SiteSectionMessages = (typeof SITE_SECTION_MESSAGES)['en-GB'];

/** locale пакета: `siteSectionLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const siteSectionLocale = defineLocale('@ds/site-section', SITE_SECTION_MESSAGES);
