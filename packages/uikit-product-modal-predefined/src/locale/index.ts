import { defineLocale, defineMessages } from '@ds/locale';

const MODAL_PREDEFINED_MESSAGES = defineMessages({
  'en-GB': {
    deleteModal: {
      title: 'Delete {{objectType}}',
      fallbackTitle: 'Delete object',
      content: 'This action cannot be undone.',
      confirmLabel: 'To allow deletion, enter:',
      approve: 'Delete',
      cancel: 'Cancel',
    },
    recallModal: {
      title: 'Recall request',
      content: 'This action cannot be undone.',
      confirmLabel: 'To recall the request, enter:',
      approve: 'Recall request',
      cancel: 'Cancel',
    },
    confirm: {
      nameLabel: 'Enter name to confirm',
      textLabel: 'Enter text to confirm',
      namePlaceholder: 'Name',
      textPlaceholder: 'Text',
      error: 'The entered value does not match the confirmation text',
    },
    releaseNotes: {
      title: 'What is new',
      readLater: 'Read later',
      counter: '{{page}} of {{total}}',
      noDataTitle: 'No news yet',
      noDataDescription: 'Platform news will appear here soon',
      errorTitle: 'Could not get data',
      errorDescription: 'Try to reload the page',
      retry: 'Refresh',
    },
  },
  'ru-RU': {
    deleteModal: {
      title: 'Удаление {{objectType}}',
      fallbackTitle: 'Удалить объект',
      content: 'Это действие нельзя отменить.',
      confirmLabel: 'Чтобы разрешить удаление, введите:',
      approve: 'Удалить',
      cancel: 'Отмена',
    },
    recallModal: {
      title: 'Отзыв заявки',
      content: 'Это действие нельзя отменить.',
      confirmLabel: 'Чтобы отозвать заявку, введите:',
      approve: 'Отозвать заявку',
      cancel: 'Отмена',
    },
    confirm: {
      nameLabel: 'Введите название для подтверждения',
      textLabel: 'Введите текст для подтверждения',
      namePlaceholder: 'Введите название',
      textPlaceholder: 'Текст',
      error: 'Введенное значение не совпадает с текстом подтверждения',
    },
    releaseNotes: {
      title: 'Что нового',
      readLater: 'Ознакомиться позже',
      counter: '{{page}} из {{total}}',
      noDataTitle: 'Новостей пока нет',
      noDataDescription: 'Скоро здесь появятся новости платформы',
      errorTitle: 'Не удалось получить данные',
      errorDescription: 'Попробуйте перезагрузить страницу',
      retry: 'Обновить',
    },
  },
});

export type ModalPredefinedMessages = (typeof MODAL_PREDEFINED_MESSAGES)['en-GB'];

/** locale компонента ModalPredefined: `modalPredefinedLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const modalPredefinedLocale = defineLocale('@ds/uikit-product-modal-predefined', MODAL_PREDEFINED_MESSAGES);
