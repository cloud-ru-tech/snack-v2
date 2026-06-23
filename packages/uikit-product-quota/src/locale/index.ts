import { defineLocale, defineMessages } from '@ds/locale';

const QUOTA_MESSAGES = defineMessages({
  'en-GB': {
    quotas: 'Quotas',
    widgetTitle: {
      withoutProject: 'Project quotas',
      quotes: 'Project quotas «{{project}}»',
      noQuotes: 'Project quotas {{project}}',
    },
    widgetSubtitle: 'Current quota balance',
    increaseQuota: 'Increase quota',
    cardAvailable: 'Available',
    cardRemaining: 'Remaining',
    tooltipAvailable: 'Available',
    tooltipUsed: 'Used',
    tooltipRemaining: 'Remaining',
    tooltipExhaustedHint: {
      first: 'Quota exhausted.',
      second: 'To increase the quota, contact the quota or organization administrator.',
    },
    errorText: 'Failed to load data',
    errorButton: 'Refresh',
  },
  'ru-RU': {
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
});

export type QuotaMessages = (typeof QUOTA_MESSAGES)['en-GB'];

/** locale компонента Quota: `quotaLocale.useTranslations()` в коде, `quotaLocale.extend(...)` в сервисе. */
export const quotaLocale = defineLocale('@ds/uikit-product-quota', QUOTA_MESSAGES);
