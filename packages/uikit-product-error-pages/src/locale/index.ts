import { defineLocale, defineMessages } from '@ds/locale';

const ERROR_PAGE_MESSAGES = defineMessages({
  'en-GB': {
    frontendErrorTitle: 'Unexpected error',
    pageUnavailableTitle: 'Service unavailable',
    pageNotFoundTitle: 'Page not found',
    refreshButton: 'Refresh the page',
    actionRedirectTitle: 'Try starting from another page',
    supportCenterButton: 'Support Service',
    mainPageLink: 'Go to the main page',
    backLink: 'Go back',
    offlineTitle: 'No Internet Connection',
    offlineText: 'Check your internet connection and try refreshing the page',
    redirectTitle: 'The link will be removed',
    redirectText: 'The link is obsolete and will be removed soon. Go to the new link',
    redirectButton: 'Go to',
  },
  'ru-RU': {
    frontendErrorTitle: 'Непредвиденная ошибка',
    pageUnavailableTitle: 'Сервис недоступен',
    pageNotFoundTitle: 'Страница не найдена',
    refreshButton: 'Обновить страницу',
    actionRedirectTitle: 'Попробуйте начать с другой страницы',
    supportCenterButton: 'Служба поддержки',
    mainPageLink: 'На главную',
    backLink: 'Назад',
    offlineTitle: 'Нет подключения к Интернету',
    offlineText: 'Проверьте соединение с интернетом и попробуйте обновить страницу',
    redirectTitle: 'Ссылка будет удалена',
    redirectText: 'Эта ссылка устарела и скоро будет удалена. Перейдите по новой ссылке.',
    redirectButton: 'Перейти',
  },
});

/** Форма словаря — для типизации сервисных оверрайдов/новых языков. */
export type ErrorPagesMessages = (typeof ERROR_PAGE_MESSAGES)['en-GB'];

/** locale пакета ErrorPage: `errorPageLocale.useTranslations()` в коде, `errorPageLocale.extend(...)` в сервисе. */
export const errorPageLocale = defineLocale('@ds/uikit-product-error-pages', ERROR_PAGE_MESSAGES);
