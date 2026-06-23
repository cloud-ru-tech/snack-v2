import { defineLocale, defineMessages } from '@ds/locale';

const MARKDOWN_MESSAGES = defineMessages({
  'en-GB': {
    toolbar: {
      heading: 'Heading',
      bold: 'Bold',
      italic: 'Italic',
      strikethrough: 'Strikethrough',
      link: 'Link',
      inlineCode: 'Inline code',
      bulletList: 'Bullet list',
      orderedList: 'Ordered list',
      blockQuote: 'Block quote',
      blockCode: 'Block code',
      table: 'Table',
      image: 'Image',
      more: 'More',
    },
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied',
    add: 'Add',
    cancel: 'Cancel',
    link: {
      title: 'Add link',
      titleField: {
        label: 'Text',
        placeholder: 'Link text',
      },
      urlField: {
        label: 'URL',
        placeholder: 'https://',
      },
    },
    image: {
      title: 'Add image',
      url: 'URL',
      alt: 'Alt text',
      placeholder: 'https://',
    },
    table: {
      pickSize: 'Pick size',
      insert: 'Insert {{rows}} × {{cols}} table',
      column: 'Column {{index}}',
      customize: 'Customize table',
      columns: 'Columns',
      rows: 'Rows',
    },
    linkText: 'link text',
  },
  'ru-RU': {
    toolbar: {
      heading: 'Заголовок',
      bold: 'Жирный',
      italic: 'Курсив',
      strikethrough: 'Зачёркнутый',
      link: 'Ссылка',
      inlineCode: 'Строчный код',
      bulletList: 'Маркированный список',
      orderedList: 'Нумерованный список',
      blockQuote: 'Цитата',
      blockCode: 'Блок кода',
      table: 'Таблица',
      image: 'Картинка',
      more: 'Ещё',
    },
    clear: 'Очистить',
    copy: 'Скопировать',
    copied: 'Скопировано',
    add: 'Добавить',
    cancel: 'Отмена',
    link: {
      title: 'Добавить ссылку',
      titleField: {
        label: 'Текст',
        placeholder: 'Текст ссылки',
      },
      urlField: {
        label: 'URL',
        placeholder: 'https://',
      },
    },
    image: {
      title: 'Добавить изображение',
      url: 'URL',
      alt: 'Альтернативный текст',
      placeholder: 'https://',
    },
    table: {
      pickSize: 'Выберите размер',
      insert: 'Вставить таблицу {{rows}} × {{cols}}',
      column: 'Колонка {{index}}',
      customize: 'Настроить таблицу',
      columns: 'Столбцы',
      rows: 'Строки',
    },
    linkText: 'текст ссылки',
  },
});

export type MarkdownMessages = (typeof MARKDOWN_MESSAGES)['en-GB'];

/** locale компонента Markdown: `markdownLocale.useTranslations()` в коде, `markdownLocale.extend(...)` в сервисе. */
export const markdownLocale = defineLocale('@ds/markdown', MARKDOWN_MESSAGES);
