import { Editor } from '@tiptap/react';
import { RefObject } from 'react';

import { TOOLBAR_ITEM } from './constants';
import { LinkProps } from './helperComponents';
import {
  applyBlockToggle,
  applyHeading,
  applyImage,
  applyInlineToggle,
  applyLink,
  applyParagraph,
  applyTable,
  RawEdit,
} from './rawMarkdownCommands';
import { HeadingLevel, ToolbarItemId } from './types';

// Бэкенд-независимый интерфейс тулбара: в preview-режиме его реализует TipTap (WYSIWYG),
// в raw-режиме — трансформации markdown-исходника в textarea.
export type ToolbarApi = {
  /** Режим бэкенда: `wysiwyg` (TipTap, preview) либо `raw` (markdown-исходник в textarea). */
  mode: 'wysiwyg' | 'raw';
  focus(): void;
  /** Активна ли кнопка (checked-стейт). В raw-режиме — всегда false. */
  isActive(id: ToolbarItemId): boolean;
  /** Активен ли заголовок уровня `level` на текущей строке. В raw-режиме — false. */
  isHeadingActive(level: HeadingLevel): boolean;
  /** Toggle инлайн/блочной кнопки (bold…block-code). */
  toggle(id: ToolbarItemId): void;
  toggleHeading(level: HeadingLevel): void;
  setParagraph(): void;
  getLinkHref(): string | undefined;
  getLinkTitle(): string | undefined;
  setLink(props: LinkProps): void;
  insertImage(src: string, alt: string): void;
  insertTable(rows: number, cols: number): void;
  /** Подписка на изменение selection/контента — для перерисовки checked-стейтов. */
  subscribe(callback: () => void): () => void;
};

const WYSIWYG_MARK: Partial<Record<ToolbarItemId, string>> = {
  [TOOLBAR_ITEM.Bold]: 'bold',
  [TOOLBAR_ITEM.Italic]: 'italic',
  [TOOLBAR_ITEM.Strikethrough]: 'strike',
  [TOOLBAR_ITEM.InlineCode]: 'code',
  [TOOLBAR_ITEM.BulletList]: 'bulletList',
  [TOOLBAR_ITEM.OrderedList]: 'orderedList',
  [TOOLBAR_ITEM.BlockQuote]: 'blockquote',
  [TOOLBAR_ITEM.BlockCode]: 'codeBlock',
};

export function createWysiwygApi(editor: Editor): ToolbarApi {
  const toggleCommand: Partial<Record<ToolbarItemId, () => void>> = {
    [TOOLBAR_ITEM.Bold]: () => editor.chain().focus().toggleBold().run(),
    [TOOLBAR_ITEM.Italic]: () => editor.chain().focus().toggleItalic().run(),
    [TOOLBAR_ITEM.Strikethrough]: () => editor.chain().focus().toggleStrike().run(),
    [TOOLBAR_ITEM.InlineCode]: () => editor.chain().focus().toggleCode().run(),
    [TOOLBAR_ITEM.BulletList]: () => editor.chain().focus().toggleBulletList().run(),
    [TOOLBAR_ITEM.OrderedList]: () => editor.chain().focus().toggleOrderedList().run(),
    [TOOLBAR_ITEM.BlockQuote]: () => editor.chain().focus().toggleBlockquote().run(),
    [TOOLBAR_ITEM.BlockCode]: () => editor.chain().focus().toggleCodeBlock().run(),
  };

  return {
    mode: 'wysiwyg',
    focus: () => editor.chain().focus().run(),
    isActive: id => {
      const mark = WYSIWYG_MARK[id];
      return mark ? editor.isActive(mark) : false;
    },
    isHeadingActive: level => editor.isActive('heading', { level }),
    toggle: id => toggleCommand[id]?.(),
    toggleHeading: level => editor.chain().focus().toggleHeading({ level }).run(),
    setParagraph: () => editor.chain().focus().setParagraph().run(),
    getLinkHref: () => editor.getAttributes('link').href as string | undefined,
    // Видимый текст ссылки = выделенный текст (для префилла поля «текст ссылки»).
    getLinkTitle: () => {
      const { from, to } = editor.state.selection;
      return from === to ? undefined : editor.state.doc.textBetween(from, to);
    },
    setLink: ({ href, title }) => {
      if (!href) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      const chain = editor.chain().focus().extendMarkRange('link');

      // Нет выделения, но задан текст — вставляем текст-ссылку. Иначе оборачиваем выделение.
      if (editor.state.selection.empty && title) {
        chain.insertContent({ type: 'text', text: title, marks: [{ type: 'link', attrs: { href } }] }).run();
      } else {
        chain.setLink({ href }).run();
      }
    },
    insertImage: (src, alt) => editor.chain().focus().setImage({ src, alt }).run(),
    insertTable: (rows, cols) => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run(),
    subscribe: callback => {
      editor.on('selectionUpdate', callback);
      editor.on('transaction', callback);

      return () => {
        editor.off('selectionUpdate', callback);
        editor.off('transaction', callback);
      };
    },
  };
}

// Локализованные строки, которые raw-команды вставляют в markdown-исходник.
export type RawApiLabels = {
  /** Текст-заглушка ссылки, когда выделения нет. */
  linkText: string;
  /** Подпись колонки таблицы по 1-based индексу. */
  tableColumn(index: number): string;
};

export function createRawApi(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  commit: (edit: RawEdit) => void,
  labels: RawApiLabels,
): ToolbarApi {
  const run = (compute: (value: string, start: number, end: number) => RawEdit | null) => {
    const el = textareaRef.current;
    if (!el) return;
    const edit = compute(el.value, el.selectionStart, el.selectionEnd);
    if (edit) commit(edit);
  };

  return {
    mode: 'raw',
    focus: () => textareaRef.current?.focus(),
    // В raw-режиме разбор разметки под курсором не делаем — кнопки без checked-стейта.
    isActive: () => false,
    isHeadingActive: () => false,
    toggle: id =>
      run((value, start, end) => applyInlineToggle(id, value, start, end) ?? applyBlockToggle(id, value, start, end)),
    toggleHeading: level => run((value, start, end) => applyHeading(value, start, end, level)),
    setParagraph: () => run((value, start, end) => applyParagraph(value, start, end)),
    getLinkHref: () => undefined,
    getLinkTitle: () => undefined,
    // В raw-режиме ссылка вставляется как сырой markdown-шаблон `[текст](href)` прямо в textarea
    // (без модалки). href может быть пустым — пользователь дописывает URL в исходнике.
    setLink: ({ href, title }) => {
      run((value, start, end) => applyLink(value, start, end, href ?? '', title ?? '', labels.linkText));
    },
    insertImage: (src, alt) => run((value, start, end) => applyImage(value, start, end, src, alt)),
    insertTable: (rows, cols) =>
      run((value, start, end) => applyTable(value, start, end, rows, cols, labels.tableColumn)),
    subscribe: () => () => {},
  };
}
