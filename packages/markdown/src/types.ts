import { ValueOf, WithSupportProps } from '@ds/utils';
import { Components } from 'react-markdown';
import { PluggableList } from 'unified';

import { HEADING_LEVEL, TOOLBAR_ITEM } from './constants';

export type ToolbarItemId = ValueOf<typeof TOOLBAR_ITEM>;
export type HeadingLevel = ValueOf<typeof HEADING_LEVEL>;

export type MarkdownProps = WithSupportProps<{
  /** Markdown-исходник */
  value: string;
  /** Доп. remark-плагины */
  remarkPlugins?: PluggableList;
  /** Доп. rehype-плагины */
  rehypePlugins?: PluggableList;
  /** Override рендера элементов */
  components?: Components;
  /** По умолчанию true — сырой HTML вырезается */
  skipHtml?: boolean;
  /** Колбэк кнопки Copy на code-блоке */
  onCodeCopyClick?(code: string): void;
  /** CSS-класс корневого элемента. */
  className?: string;
}>;

export type MarkdownEditorProps = WithSupportProps<{
  /** Controlled markdown */
  value?: string;
  /** Uncontrolled */
  defaultValue?: string;
  /** Колбэк изменения markdown. Вызывается с дебаунсом `ON_CHANGE_DEBOUNCE_MS` после остановки ввода. */
  onChange?(markdown: string): void;
  /** Controlled preview-режим: показывает форматированный WYSIWYG с активным тулбаром. Выключен — редактирование «сырого» markdown-текста в textarea */
  preview?: boolean;
  /** Uncontrolled */
  defaultPreview?: boolean;
  /** Колбэк переключения Preview-тогла в шапке */
  onPreviewChange?(preview: boolean): void;
  /** Подпись в шапке справа. По умолчанию — `Markdown field`. `false` — без подписи. */
  label?: string | false;
  /** Текст тогла Preview в шапке. По умолчанию `Preview`. */
  previewLabel?: string;
  /** Скрыть шапку с тоглом Preview и подписью */
  hideHeader?: boolean;
  /** Placeholder пустого редактора. */
  placeholder?: string;
  /** Нативная проверка орфографии (`spellcheck`). По умолчанию `true`. */
  spellCheck?: boolean;
  /** Может ли пользователь менять размеры поля перетаскиванием уголка. По умолчанию `true`. */
  resizable?: boolean;
  /** Какие кнопки тулбара показать. false — без тулбара */
  toolbar?: false | ToolbarItemId[];
  /** CSS-класс корневого элемента. */
  className?: string;
}>;
