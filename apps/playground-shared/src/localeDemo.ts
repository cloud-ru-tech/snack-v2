import { defineLocale } from '@ds/locale';

/**
 * Демо-виджет со СВОИМ словарём — имитация компонента-пакета: строки co-located, `defineLocale`
 * отдаёт хук переводов и типизированный `extend` для сервисных оверрайдов/новых языков. Из коробки
 * только en-GB + ru-RU; немецкий добавляет хост через `greetingLocale.extend('de-DE', …)`.
 */
export const GREETING_MESSAGES = {
  'en-GB': {
    title: 'Localization cascade',
    hello: 'Hello, {{name}}!',
    note: 'Strings ship inside the package; the provider only carries the language.',
    langLabel: 'Active language',
  },
  'ru-RU': {
    title: 'Каскад локализации',
    hello: 'Привет, {{name}}!',
    note: 'Строки живут внутри пакета; провайдер несёт только язык.',
    langLabel: 'Активный язык',
  },
} as const;

export const greetingLocale = defineLocale('PlaygroundGreeting', GREETING_MESSAGES);
