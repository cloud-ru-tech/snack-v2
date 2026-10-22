import { defineLocale, defineMessages } from '@ds/locale';

const AI_ATTACHMENT_MESSAGES = defineMessages({
  'en-GB': {
    retry: 'Retry',
    remove: 'Remove attachment',
  },
  'ru-RU': {
    retry: 'Повторить',
    remove: 'Удалить вложение',
  },
});

export type AiAttachmentMessages = (typeof AI_ATTACHMENT_MESSAGES)['en-GB'];

export const aiAttachmentLocale = defineLocale('@ds/ai-attachment', AI_ATTACHMENT_MESSAGES);
