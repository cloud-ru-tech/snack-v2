import { defineLocale, defineMessages } from '@ds/locale';

const AI_CHAIN_OF_THOUGHTS_MESSAGES = defineMessages({
  'en-GB': {
    inProgress: 'Thinking',
    done: 'Thought',
    broken:
      'The response stream was interrupted. The agent keeps working — the full answer will appear once it is ready.',
    durationDays: 'd',
    durationHours: 'h',
    durationMinutes: 'm',
    durationSeconds: 's',
  },
  'ru-RU': {
    inProgress: 'Размышляю',
    done: 'Размышлял',
    broken: 'Трансляция ответа прервалась. Агент продолжает работу. Ответ появится целиком, когда будет готов.',
    durationDays: 'д',
    durationHours: 'ч',
    durationMinutes: 'м',
    durationSeconds: 'с',
  },
});

export type AiChainOfThoughtsMessages = (typeof AI_CHAIN_OF_THOUGHTS_MESSAGES)['en-GB'];

/** locale пакета: `aiChainOfThoughtsLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const aiChainOfThoughtsLocale = defineLocale('@ds/ai-chain-of-thoughts', AI_CHAIN_OF_THOUGHTS_MESSAGES);
