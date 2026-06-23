import { defineLocale, defineMessages } from '@ds/locale';

// Под-области пакета (`container`/`upload`/`systemEvent`) — вложенные ключи, не отдельные namespace'ы.
const TOASTER_MESSAGES = defineMessages({
  'en-GB': {
    container: {
      closeAll: 'Close all',
      expand: 'Expand',
      collapse: 'Collapse',
      showMore: 'Show more',
      showLess: 'Show less',
      notificationsRegion: 'Notifications',
    },
    upload: {
      title: {
        loading: 'Uploading',
        pause: 'Paused',
        error: 'Upload error',
        uploaded: 'Uploaded',
        errorUploaded: 'Uploaded with errors',
      },
      pause: 'Pause',
      play: 'Resume',
      retry: 'Retry',
      cancelAll: 'Cancel all',
    },
    systemEvent: {
      closeButton: 'Close notification',
    },
  },
  'ru-RU': {
    container: {
      closeAll: 'Закрыть все',
      expand: 'Развернуть',
      collapse: 'Свернуть',
      showMore: 'Показать все',
      showLess: 'Скрыть',
      notificationsRegion: 'Уведомления',
    },
    upload: {
      title: {
        loading: 'Загрузка',
        pause: 'Приостановлено',
        error: 'Ошибка загрузки',
        uploaded: 'Загружено',
        errorUploaded: 'Загружено с ошибками',
      },
      pause: 'Пауза',
      play: 'Продолжить',
      retry: 'Повторить',
      cancelAll: 'Отменить всё',
    },
    systemEvent: {
      closeButton: 'Закрыть уведомление',
    },
  },
});

export type ToasterMessages = (typeof TOASTER_MESSAGES)['en-GB'];

/** locale пакета тостов: `toasterLocale.useTranslations()` в коде, `toasterLocale.extend(...)` в сервисе. */
export const toasterLocale = defineLocale('@ds/toaster', TOASTER_MESSAGES);
