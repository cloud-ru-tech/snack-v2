import { defineLocale, defineMessages } from '@ds/locale';

const AI_FIELD_INPUT_MESSAGES = defineMessages({
  'en-GB': {
    disclaimer: 'The agent can make mistakes. Please double-check responses',
    searchPlaceholder: 'Type a name',
    skillParamsPlaceholder: '<skill parameters>',
    removeChip: 'Remove',
    send: 'Send',
    stop: 'Stop generation',
    plus: 'Add',
    settings: 'Settings',
    voice: 'Voice input',
    context: 'Context usage',
    scrollDown: 'Scroll to the latest message',
    menuSearch: 'Search',
    back: 'Back',
    nothingFound: 'Nothing found',
  },
  'ru-RU': {
    disclaimer: 'Агент может ошибаться. Рекомендуем проверять ответы',
    searchPlaceholder: 'Введите название',
    skillParamsPlaceholder: '<skill parameters>',
    removeChip: 'Удалить',
    send: 'Отправить',
    stop: 'Остановить генерацию',
    plus: 'Добавить',
    settings: 'Настройки',
    voice: 'Голосовой ввод',
    context: 'Заполнение контекста',
    scrollDown: 'К последнему сообщению',
    menuSearch: 'Поиск',
    back: 'Назад',
    nothingFound: 'Ничего не найдено',
  },
});

export type AiFieldInputMessages = (typeof AI_FIELD_INPUT_MESSAGES)['en-GB'];

export const aiFieldInputLocale = defineLocale('@ds/ai-field-input', AI_FIELD_INPUT_MESSAGES);
