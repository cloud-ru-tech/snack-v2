import { Button } from '@ds/button';
import { FieldShell } from '@ds/fields';
import { CrossSVG } from '@ds/icons/interface/system';
import { Scroll } from '@ds/scroll';
import { Switch } from '@ds/toggles';
import { extractSupportProps, isBrowser, useDebounce, useValueControl } from '@ds/utils';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Image } from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { Markdown as MarkdownExtension } from '@tiptap/markdown';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import { ChangeEvent, FocusEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { ON_CHANGE_DEBOUNCE_MS, TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import { lowlight } from '../../lowlight';
import { RawEdit } from '../../rawMarkdownCommands';
import syntaxStyles from '../../styles/syntax.module.scss';
import { createRawApi, createWysiwygApi, ToolbarApi } from '../../toolbarApi';
import { MarkdownEditorProps } from '../../types';
import { DEFAULT_TOOLBAR, Toolbar } from '../Toolbar';
import styles from './styles.module.scss';

export function MarkdownEditor({
  value,
  defaultValue,
  onChange,
  preview,
  defaultPreview,
  onPreviewChange,
  label = 'Markdown field',
  previewLabel = 'Preview',
  hideHeader = false,
  placeholder,
  spellCheck = true,
  resizable = true,
  toolbar,
  className,
  'data-test-id': dataTestId = TEST_IDS.editor,
  ...rest
}: MarkdownEditorProps) {
  const supportProps = extractSupportProps(rest);
  const { t } = markdownLocale.useTranslations();

  // onChange не передаём в useValueControl: внутреннее значение обновляется сразу (uncontrolled
  // рендер, видимость clear), а наружу onChange уходит с дебаунсом ON_CHANGE_DEBOUNCE_MS.
  const [currentValue, setValue] = useValueControl<string>({ value, defaultValue });

  const latestMarkdown = useRef(currentValue ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);

  const emitChange = useDebounce(() => onChange?.(latestMarkdown.current), ON_CHANGE_DEBOUNCE_MS);

  const [previewMode, setPreview] = useValueControl<boolean>({
    value: preview,
    defaultValue: defaultPreview ?? false,
    onChange: onPreviewChange,
  });

  const [previewFocusVisible, setPreviewFocusVisible] = useState(false);
  const [previewHover, setPreviewHover] = useState(false);

  const extensions = useMemo<Parameters<typeof useEditor>[0]['extensions']>(
    () => [
      StarterKit.configure({
        codeBlock: false,
        link: { openOnClick: true },
      }),
      MarkdownExtension,
      Placeholder.configure({ placeholder: placeholder ?? '' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
      // Ресайз картинок не включаем: контент сериализуется в markdown (`![alt](src)`),
      // а синтаксис markdown не хранит ширину/высоту — размер всё равно терялся бы на round-trip.
      Image,
    ],
    [placeholder],
  );

  const editor = useEditor(
    {
      extensions,
      content: currentValue ?? '',
      // Начальное значение — markdown-строка, парсим её в rich-узлы (а не как HTML/text).
      contentType: 'markdown',
      immediatelyRender: false,
      onUpdate({ editor }) {
        const markdown = editor.getMarkdown();
        latestMarkdown.current = markdown;
        setValue(markdown);
        emitChange();
      },
    },
    [extensions],
  );

  useEffect(() => {
    if (!editor || value === undefined) {
      return;
    }
    // Во время ввода не перетираем контент (иначе курсор прыгает на конец) —
    // синхронизируем только внешние изменения value, пока редактор не в фокусе.
    if (editor.isFocused) {
      return;
    }

    if (editor.getMarkdown() === value) {
      return;
    }
    editor.commands.setContent(value, { contentType: 'markdown' });
  }, [editor, value]);

  useEffect(() => {
    // При переходе raw → preview подтягиваем в TipTap последний markdown,
    // набранный в textarea (latestMarkdown держит актуальное значение обоих режимов).
    if (!editor || !previewMode) {
      return;
    }

    const markdown = latestMarkdown.current;

    if (editor.getMarkdown() === markdown) {
      return;
    }

    editor.commands.setContent(markdown, { contentType: 'markdown' });
  }, [editor, previewMode]);

  // Toolbar форматирует WYSIWYG в preview-режиме; в raw-режиме (textarea) он виден, но
  // кнопки вставляют markdown-разметку. `toolbar === false` прячет тулбар целиком.
  const toolbarItems = toolbar === false ? null : (toolbar ?? DEFAULT_TOOLBAR);
  const showHeader = !hideHeader;
  const hasValue = Boolean(currentValue && currentValue.length > 0);

  const handleRawValueChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const markdown = e.target.value;
      latestMarkdown.current = markdown;
      setValue(markdown);
      emitChange();
    },
    [emitChange, setValue],
  );

  // Применяет результат raw-команды тулбара к textarea: новый текст + восстановление выделения.
  const applyRawEdit = useCallback(
    (edit: RawEdit) => {
      latestMarkdown.current = edit.text;
      setValue(edit.text);
      emitChange();

      // Восстанавливаем фокус и выделение после того, как React применит новое значение textarea.
      if (isBrowser()) {
        requestAnimationFrame(() => {
          const el = textareaRef.current;
          if (!el) {
            return;
          }

          el.focus();
          el.setSelectionRange(edit.selStart, edit.selEnd);
        });
      }
    },
    [setValue, emitChange],
  );

  // Тулбар работает в обоих режимах: WYSIWYG (TipTap) в preview, markdown-исходник (textarea) — в raw.
  const toolbarApi = useMemo<ToolbarApi | null>(() => {
    if (previewMode) {
      return editor ? createWysiwygApi(editor) : null;
    }

    return createRawApi(textareaRef, applyRawEdit, {
      linkText: t('linkText'),
      tableColumn: index => t('table.column', { index }),
    });
  }, [previewMode, editor, applyRawEdit, t]);

  const handleClearButtonClick = useCallback(() => {
    latestMarkdown.current = '';
    setValue('');
    emitChange();
    editor?.commands.clearContent(true);
    textareaRef.current?.focus();
  }, [editor, emitChange, setValue]);

  const handlePreviewFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
    setPreviewFocusVisible(event.target.matches(':focus-visible'));
  }, []);

  const handlePreviewBlur = useCallback(() => setPreviewFocusVisible(false), []);

  // Клик в пустую зону поля (ниже контента, когда поле растянуто ресайзом, но контент короткий)
  // переводит фокус в активный инпут и ставит курсор в конец — паритет с FieldTextArea, где
  // контент сам не заполняет всю высоту. Клики по самому инпуту/кнопкам/скроллбару не трогаем.
  const handleContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const textarea = textareaRef.current;
      const target = event.target as HTMLElement;

      // Клик по самому инпуту (textarea / WYSIWYG-контейнеру) обрабатывается нативно, фокус не форвардим.
      if (target === textarea || editorContentRef.current?.contains(target)) {
        return;
      }

      if (previewMode) {
        editor?.commands.focus('end');
        return;
      }

      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    },
    [previewMode, editor],
  );

  const toolbarNode =
    toolbarItems && toolbarApi ? (
      <div className={styles.toolbarSlot}>
        <Toolbar api={toolbarApi} items={toolbarItems} />
      </div>
    ) : undefined;

  return (
    <div
      {...supportProps}
      className={cn(styles.root, syntaxStyles.syntax, className)}
      data-test-id={dataTestId}
      data-preview={previewMode || undefined}
    >
      {showHeader && (
        <div className={styles.header} data-test-id={TEST_IDS.editorHeader}>
          <label className={styles.previewToggle}>
            <Switch size='s' checked={previewMode} onChange={setPreview} data-test-id={TEST_IDS.editorPreviewToggle} />

            <span className={styles.previewToggleLabel}>{previewLabel}</span>
          </label>

          {label && (
            <span className={styles.label} data-test-id={TEST_IDS.editorLabel}>
              {label}
            </span>
          )}
        </div>
      )}

      <FieldShell
        data-test-id={TEST_IDS.editorField}
        header={toolbarNode}
        focusVisible={previewFocusVisible}
        hover={previewHover}
        onMouseEnter={() => setPreviewHover(true)}
        onMouseLeave={() => setPreviewHover(false)}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.contentArea}
          onClick={handleContentClick}
          onFocus={handlePreviewFocus}
          onBlur={handlePreviewBlur}
        >
          <Scroll
            className={styles.resizeBox}
            size='s'
            resize={resizable ? 'vertical' : 'none'}
            overflow={{ x: 'hidden' }}
          >
            {previewMode ? (
              <EditorContent
                ref={editorContentRef}
                editor={editor}
                className={styles.content}
                data-test-id={TEST_IDS.editorContent}
                spellCheck={spellCheck}
              />
            ) : (
              <div className={styles.rawInputWrapper}>
                <TextareaAutosize
                  ref={textareaRef}
                  className={styles.rawInput}
                  data-test-id={TEST_IDS.editorRawInput}
                  value={currentValue ?? ''}
                  onChange={handleRawValueChange}
                  placeholder={placeholder}
                  spellCheck={spellCheck}
                />
              </div>
            )}
          </Scroll>

          {hasValue && (
            <div className={styles.postfix}>
              <Button
                view='function'
                appearance='neutral'
                size='m'
                icon={<CrossSVG />}
                data-test-id={TEST_IDS.editorClear}
                aria-label={t('clear')}
                onClick={handleClearButtonClick}
              />
            </div>
          )}
        </div>
      </FieldShell>
    </div>
  );
}
