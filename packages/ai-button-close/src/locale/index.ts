import { defineLocale, defineMessages } from '@ds/locale';

const AI_BUTTON_CLOSE_MESSAGES = defineMessages({
  'en-GB': {
    close: 'Close',
  },
  'ru-RU': {
    close: 'Закрыть',
  },
});

export type AiButtonCloseMessages = (typeof AI_BUTTON_CLOSE_MESSAGES)['en-GB'];

export const aiButtonCloseLocale = defineLocale('@ds/ai-button-close', AI_BUTTON_CLOSE_MESSAGES);
