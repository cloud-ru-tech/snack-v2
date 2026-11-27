import { defineLocale, defineMessages } from '@ds/locale';

const ACTIONS_MESSAGES = defineMessages({
  'en-GB': { more: 'More actions' },
  'ru-RU': { more: 'Другие действия' },
});

export type ActionsMessages = (typeof ACTIONS_MESSAGES)['en-GB'];
export const actionsLocale = defineLocale('@ds/uikit-product-actions', ACTIONS_MESSAGES);
