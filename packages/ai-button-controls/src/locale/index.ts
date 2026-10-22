import { defineLocale, defineMessages } from '@ds/locale';

const AI_BUTTON_CONTROLS_MESSAGES = defineMessages({
  'en-GB': {
    left: 'Scroll left',
    right: 'Scroll right',
    down: 'Scroll down',
  },
  'ru-RU': {
    left: 'Прокрутить влево',
    right: 'Прокрутить вправо',
    down: 'Прокрутить вниз',
  },
});

export type AiButtonControlsMessages = (typeof AI_BUTTON_CONTROLS_MESSAGES)['en-GB'];

export const aiButtonControlsLocale = defineLocale('@ds/ai-button-controls', AI_BUTTON_CONTROLS_MESSAGES);
