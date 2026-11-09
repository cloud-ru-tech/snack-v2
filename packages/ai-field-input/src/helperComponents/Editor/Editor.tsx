import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { BAR_HIDE_STRATEGY, Scroll, SIZE as SCROLL_SIZE } from '@ds/scroll';
import { EditorContent, useEditor } from '@tiptap/react';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

import { SEARCH_TRIGGER } from '../../constants';
import { EditorHandle, useAiFieldInputContext } from '../../context';
import { aiFieldInputLocale } from '../../locale';
import { AiFieldInputSearchPlaceholder, AiFieldInputValue, SearchTrigger } from '../../types';
import { docToSegments, isValueEmpty, segmentsToDoc, serializeSegments } from '../../utils';
import { EditorViewContext } from './context';
import {
  ChipExtension,
  clearActiveSearchQuery,
  dismissActiveSearch,
  DocumentNode,
  HistoryExtension,
  InputKeymap,
  MentionNode,
  ParagraphNode,
  SearchExtension,
  SearchMark,
  SkillNode,
  TextNode,
} from './extensions';
import styles from './styles.module.scss';
import {
  buildChipMeta,
  buildEditorAttributes,
  getSearchChipIndex,
  insertChipAtCaret,
  restoreCaretAfterReplace,
} from './utils';

export type EditorProps = {
  value: AiFieldInputValue;
  onChange(value: AiFieldInputValue): void;
  onSubmit(value: AiFieldInputValue): void;
  placeholder?: string;
  searchPlaceholder?: AiFieldInputSearchPlaceholder;
  searchTriggers: SearchTrigger[];
  disabled: boolean;
  /** Поле в состоянии ошибки: `aria-invalid`. */
  invalid: boolean;
  /** `id` строки ошибки для `aria-describedby`. */
  describedBy?: string;
  handleRef: MutableRefObject<EditorHandle | null>;
};

export function Editor({
  value,
  onChange,
  onSubmit,
  placeholder,
  searchPlaceholder,
  searchTriggers,
  disabled,
  invalid,
  describedBy,
  handleRef,
}: EditorProps) {
  const { t } = aiFieldInputLocale.useTranslations();
  const { layoutType } = useAdaptiveLayout();
  const { getActionList } = useAiFieldInputContext();

  const valueRef = useRef(value);
  const lastEmittedRef = useRef(serializeSegments(value));
  const onChangeRef = useRef(onChange);
  const onSubmitRef = useRef(onSubmit);
  const getActionListRef = useRef(getActionList);
  const getSearchPlaceholderRef = useRef<(trigger: SearchTrigger) => string>(() => '');
  const searchTriggersRef = useRef(searchTriggers);
  const wasFocusedRef = useRef(false);
  const getParamsPlaceholderRef = useRef<() => string>(() => '');

  onChangeRef.current = onChange;
  onSubmitRef.current = onSubmit;
  getActionListRef.current = getActionList;
  searchTriggersRef.current = searchTriggers;
  getSearchPlaceholderRef.current = trigger =>
    (trigger === SEARCH_TRIGGER.Skill ? searchPlaceholder?.skill : searchPlaceholder?.mention) ??
    t('searchPlaceholder');
  getParamsPlaceholderRef.current = () => t('skillParamsPlaceholder');

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    content: segmentsToDoc(value),
    extensions: [
      DocumentNode,
      ParagraphNode,
      TextNode,
      SkillNode,
      MentionNode,
      SearchMark,
      ChipExtension.configure({ getParamsPlaceholder: () => getParamsPlaceholderRef.current() }),
      HistoryExtension,
      SearchExtension.configure({
        getPlaceholder: trigger => getSearchPlaceholderRef.current(trigger),
        isTriggerEnabled: trigger => searchTriggersRef.current.includes(trigger),
      }),
      InputKeymap.configure({
        getActionList: () => getActionListRef.current?.() ?? null,
        onSubmit: () => onSubmitRef.current(valueRef.current),
      }),
    ],
    editorProps: {
      attributes: buildEditorAttributes({ className: styles.content, placeholder, invalid, describedBy }),
    },
    onFocus: () => {
      wasFocusedRef.current = true;
    },
    onUpdate: ({ editor: instance }) => {
      const next = docToSegments(instance.getJSON());
      lastEmittedRef.current = serializeSegments(next);
      valueRef.current = next;
      onChangeRef.current(next);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const serialized = serializeSegments(value);
    if (serialized === lastEmittedRef.current) {
      valueRef.current = value;
      return;
    }

    const searchIndex = getSearchChipIndex(valueRef.current);
    lastEmittedRef.current = serialized;
    valueRef.current = value;

    // Вне коммита React: чипы TipTap рисует через flushSync, а внутри эффекта он запрещён.
    queueMicrotask(() => {
      if (editor.isDestroyed || valueRef.current !== value) return;

      editor.commands.setContent(segmentsToDoc(value), { emitUpdate: false });

      if (searchIndex >= 0 && getSearchChipIndex(value) < 0) {
        restoreCaretAfterReplace(editor, searchIndex);
      }
    });
  }, [editor, value]);

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    editor.setOptions({
      editorProps: {
        attributes: buildEditorAttributes({ className: styles.content, placeholder, invalid, describedBy }),
      },
    });
  }, [editor, placeholder, invalid, describedBy]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) return;

    handleRef.current = {
      focus: () => editor.commands.focus(),
      insertText: text => editor.commands.insertContent(text),
      dismissSearch: () => dismissActiveSearch(editor.view),
      clearSearchQuery: () => clearActiveSearchQuery(editor.view),
      contains: node => editor.view.dom.contains(node),
      insertChip: chip => insertChipAtCaret(editor, chip, !wasFocusedRef.current),
    };

    return () => {
      handleRef.current = null;
    };
  }, [editor, handleRef]);

  const viewContext = useMemo(
    () => ({
      chips: buildChipMeta(value),
      removeLabel: t('removeChip'),
    }),
    [value, t],
  );

  return (
    <EditorViewContext.Provider value={viewContext}>
      <div
        className={styles.root}
        data-disabled={disabled || undefined}
        data-mobile={isMobileLayout(layoutType) || undefined}
      >
        {placeholder && isValueEmpty(value) && (
          <span className={styles.placeholder} aria-hidden>
            {placeholder}
          </span>
        )}
        <Scroll className={styles.scroll} size={SCROLL_SIZE.S} barHideStrategy={BAR_HIDE_STRATEGY.Never}>
          <EditorContent editor={editor} />
        </Scroll>
      </div>
    </EditorViewContext.Provider>
  );
}
