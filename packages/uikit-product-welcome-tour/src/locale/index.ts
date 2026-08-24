import { defineLocale, defineMessages } from '@ds/locale';

const WELCOME_TOUR_MESSAGES = defineMessages({
  'en-GB': {
    next: 'Next',
    back: 'Back',
    finish: 'Finish',
    close: 'Close',
    progress: 'Step {{current}} of {{total}}',
  },
  'ru-RU': {
    next: 'Далее',
    back: 'Назад',
    finish: 'Завершить',
    close: 'Закрыть',
    progress: 'Шаг {{current}} из {{total}}',
  },
});

/** Форма словаря — для типизации сервисных оверрайдов/новых языков. */
export type WelcomeTourMessages = (typeof WELCOME_TOUR_MESSAGES)['en-GB'];

/** locale пакета WelcomeTour: `welcomeTourLocale.useTranslations()` в коде, `welcomeTourLocale.extend(...)` в сервисе. */
export const welcomeTourLocale = defineLocale('@ds/uikit-product-welcome-tour', WELCOME_TOUR_MESSAGES);
