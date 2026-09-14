import { defineLocale, defineMessages } from '@ds/locale';

const AI_FIELD_REQUEST_MESSAGES = defineMessages({
  'en-GB': {
    showMore: 'Show',
    showLess: 'Hide',
  },
  'ru-RU': {
    showMore: 'Показать',
    showLess: 'Скрыть',
  },
});

export type AiFieldRequestMessages = (typeof AI_FIELD_REQUEST_MESSAGES)['en-GB'];

export const aiFieldRequestLocale = defineLocale('@ds/ai-field-request', AI_FIELD_REQUEST_MESSAGES);
