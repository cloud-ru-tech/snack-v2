import { history, redo, undo } from '@tiptap/pm/history';
import { Node as PMNode } from '@tiptap/pm/model';
import { EditorState, NodeSelection, Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';
import { Editor, Extension, Mark, mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';

import { TEST_IDS } from '../../constants';
import { ActionListHandle } from '../../context';
import { SearchTrigger } from '../../types';
import { NODE_NAME } from '../../utils';
import { ChipView } from './ChipView';
import styles from './styles.module.scss';

const LEAF_PLACEHOLDER = '￼';
const SEARCH_PATTERN = new RegExp(`([/@])([^\\s/@${LEAF_PLACEHOLDER}]*)$`);
const CHIP_NODES: string[] = [NODE_NAME.Skill, NODE_NAME.Mention];

export const DocumentNode = Node.create({
  name: 'doc',
  topNode: true,
  content: 'paragraph+',
});

export const ParagraphNode = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',
  parseHTML: () => [{ tag: 'p' }],
  renderHTML: ({ HTMLAttributes }) => ['p', HTMLAttributes, 0],
});

export const TextNode = Node.create({
  name: 'text',
  group: 'inline',
});

/** Чип скилла: атомарный, параметры — обычный текст за ним (ISM-5). */
export const SkillNode = Node.create({
  name: NODE_NAME.Skill,
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  addAttributes: () => ({ id: { default: '' }, label: { default: '' }, paramsPlaceholder: { default: null } }),
  parseHTML: () => [{ tag: 'span[data-ai-skill]' }],
  renderHTML: ({ HTMLAttributes }) => ['span', mergeAttributes(HTMLAttributes, { 'data-ai-skill': '' })],
  addNodeView: () => ReactNodeViewRenderer(ChipView, { as: 'span' }),
});

export const MentionNode = Node.create({
  name: NODE_NAME.Mention,
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  addAttributes: () => ({ id: { default: '' }, label: { default: '' } }),
  parseHTML: () => [{ tag: 'span[data-ai-mention]' }],
  renderHTML: ({ HTMLAttributes }) => ['span', mergeAttributes(HTMLAttributes, { 'data-ai-mention': '' })],
  addNodeView: () => ReactNodeViewRenderer(ChipView, { as: 'span' }),
});

/** Знак `/` или `@` с запросом. Ставится и снимается плагином `SearchExtension`, руками не применяется. */
export const SearchMark = Mark.create({
  name: NODE_NAME.Search,
  inclusive: true,
  excludes: '_',
  parseHTML: () => [{ tag: 'span[data-ai-search]' }],
  renderHTML: ({ HTMLAttributes }) => [
    'span',
    mergeAttributes(HTMLAttributes, { 'data-ai-search': '', class: styles.searchMark }),
    0,
  ],
});

export const HistoryExtension = Extension.create({
  name: 'aiHistory',
  addProseMirrorPlugins: () => [history()],
  addKeyboardShortcuts() {
    return {
      'Mod-z': () => undo(this.editor.state, this.editor.view.dispatch),
      'Mod-Shift-z': () => redo(this.editor.state, this.editor.view.dispatch),
      'Mod-y': () => redo(this.editor.state, this.editor.view.dispatch),
    };
  },
});

type SearchMatch = { from: number; to: number; trigger: SearchTrigger; query: string };
type SearchPluginState = { dismissed: number[] };
type SearchPluginMeta = { dismiss: number };
type SearchPluginSpec = { isTriggerEnabled?(trigger: SearchTrigger): boolean };

const searchKey = new PluginKey<SearchPluginState>('aiSearch');

function findSearchMatch(state: EditorState): SearchMatch | null {
  const { selection } = state;
  if (!selection.empty) return null;

  const { $from } = selection;
  if ($from.node().type.name !== 'paragraph') return null;

  const textBefore = $from.node().textBetween(0, $from.parentOffset, undefined, LEAF_PLACEHOLDER);
  const match = SEARCH_PATTERN.exec(textBefore);
  if (!match) return null;

  const isTriggerEnabled = (searchKey.get(state)?.spec as SearchPluginSpec | undefined)?.isTriggerEnabled;
  if (isTriggerEnabled && !isTriggerEnabled(match[1] as SearchTrigger)) return null;

  const length = match[1].length + match[2].length;
  const from = $from.pos - length;
  const charBefore = textBefore[match.index - 1];
  const afterChip = CHIP_NODES.includes(state.doc.resolve(from).nodeBefore?.type.name ?? '');
  if (charBefore !== undefined && !/\s/.test(charBefore) && !afterChip) return null;

  return { from, to: $from.pos, trigger: match[1] as SearchTrigger, query: match[2] };
}

export function getActiveSearch(state: EditorState): SearchMatch | null {
  const match = findSearchMatch(state);
  if (!match) return null;
  return searchKey.getState(state)?.dismissed.includes(match.from) ? null : match;
}

export function clearActiveSearchQuery(view: EditorView) {
  const active = getActiveSearch(view.state);
  if (!active || !active.query) return;
  view.dispatch(view.state.tr.delete(active.from + 1, active.to));
}

export function dismissActiveSearch(view: EditorView) {
  const active = getActiveSearch(view.state);
  if (!active) return;
  view.dispatch(view.state.tr.setMeta(searchKey, { dismiss: active.from } satisfies SearchPluginMeta));
}

function getMarkedRange(doc: PMNode, markName: string): { from: number; to: number } | null {
  let range: { from: number; to: number } | null = null;

  doc.descendants((node, pos) => {
    if (node.isText && node.marks.some(mark => mark.type.name === markName)) {
      range = { from: range?.from ?? pos, to: pos + node.nodeSize };
    }
  });

  return range;
}

export type SearchExtensionOptions = {
  getPlaceholder(trigger: SearchTrigger): string;
  isTriggerEnabled(trigger: SearchTrigger): boolean;
};

function isChipNode(node: PMNode): boolean {
  return CHIP_NODES.includes(node.type.name);
}

/** Выделен чип целиком: он в состоянии Pressed и ждёт второго нажатия для удаления (ITC-6.4). */
function isChipSelection(state: EditorState): boolean {
  return state.selection instanceof NodeSelection && isChipNode(state.selection.node);
}

function selectChip(editor: Editor, pos: number): boolean {
  const { tr } = editor.state;
  editor.view.dispatch(tr.setSelection(NodeSelection.create(tr.doc, pos)));
  return true;
}

export type ChipExtensionOptions = {
  /** Подсказка параметров по умолчанию: для скилла с пустой строкой в `paramsPlaceholder`. */
  getParamsPlaceholder(): string;
};

/**
 * Чипы в тексте. Подсказка параметров встаёт сразу за чипом скилла, пока за ним в строке ничего нет (ISM-5).
 * Ввод при выделенном чипе снимает выделение и печатает за чипом, а не заменяет его (ITC-6.4).
 */
export const ChipExtension = Extension.create<ChipExtensionOptions>({
  name: 'aiChips',

  addOptions: () => ({
    getParamsPlaceholder: () => '',
  }),

  addProseMirrorPlugins() {
    const { getParamsPlaceholder } = this.options;

    return [
      new Plugin({
        props: {
          handleTextInput(view, _from, _to, text) {
            if (!isChipSelection(view.state)) return false;

            const end = view.state.selection.to;
            const tr = view.state.tr.insertText(text, end);
            view.dispatch(tr.setSelection(TextSelection.create(tr.doc, end + text.length)));
            return true;
          },
          decorations(state) {
            const hints: Decoration[] = [];

            state.doc.descendants((node, pos) => {
              if (node.type.name !== NODE_NAME.Skill) return true;

              const placeholder = node.attrs.paramsPlaceholder as string | null;
              const end = pos + node.nodeSize;
              if (placeholder === null || state.doc.resolve(end).nodeAfter) return false;

              const text = placeholder || getParamsPlaceholder();
              hints.push(
                Decoration.widget(
                  end,
                  view => {
                    const element = view.dom.ownerDocument.createElement('span');
                    element.className = styles.paramsHint;
                    element.textContent = text;
                    element.setAttribute('data-test-id', TEST_IDS.chipHint);
                    return element;
                  },
                  { side: 1, key: `params-hint:${text}` },
                ),
              );
              return false;
            });

            return hints.length > 0 ? DecorationSet.create(state.doc, hints) : null;
          },
        },
      }),
    ];
  },
});

export const SearchExtension = Extension.create<SearchExtensionOptions>({
  name: 'aiSearchExtension',

  addOptions: () => ({
    getPlaceholder: () => '',
    isTriggerEnabled: () => true,
  }),

  addProseMirrorPlugins() {
    const { getPlaceholder, isTriggerEnabled } = this.options;

    return [
      new Plugin<SearchPluginState>({
        key: searchKey,
        isTriggerEnabled,
        state: {
          init: () => ({ dismissed: [] }),
          apply(tr, value) {
            const meta = tr.getMeta(searchKey) as SearchPluginMeta | undefined;
            const dismissed =
              tr.docChanged && value.dismissed.length > 0
                ? value.dismissed.flatMap(pos => {
                    const result = tr.mapping.mapResult(pos);
                    return result.deleted ? [] : [result.pos];
                  })
                : value.dismissed;

            if (meta) return { dismissed: [...dismissed, meta.dismiss] };
            return dismissed === value.dismissed ? value : { dismissed };
          },
        },
        appendTransaction(_transactions, _oldState, newState) {
          const markType = newState.schema.marks[NODE_NAME.Search];
          const active = getActiveSearch(newState);
          const current = getMarkedRange(newState.doc, NODE_NAME.Search);

          if (active && current && active.from === current.from && active.to === current.to) return null;
          if (!active && !current) return null;

          const tr = newState.tr.removeMark(0, newState.doc.content.size, markType);
          if (active) {
            tr.addMark(active.from, active.to, markType.create());
          }
          return tr.setMeta('addToHistory', false);
        },
        props: {
          decorations(state) {
            // Подсказка поиска только у пустого запроса, за которым ничего нет: иначе ляжет поверх текста.
            const active = getActiveSearch(state);
            if (!active || active.query || state.doc.resolve(active.to).nodeAfter) return null;

            const widget = Decoration.widget(
              active.to,
              view => {
                const element = view.dom.ownerDocument.createElement('span');
                element.className = styles.searchPlaceholder;
                element.setAttribute('data-test-id', TEST_IDS.searchHint);
                element.textContent = getPlaceholder(active.trigger);
                return element;
              },
              { side: 1 },
            );
            return DecorationSet.create(state.doc, [widget]);
          },
        },
      }),
    ];
  },
});

export type InputKeymapOptions = {
  getActionList(): ActionListHandle | null;
  onSubmit(): void;
};

export const InputKeymap = Extension.create<InputKeymapOptions>({
  name: 'aiInputKeymap',

  addOptions: () => ({
    getActionList: () => null,
    onSubmit: () => undefined,
  }),

  addKeyboardShortcuts() {
    const editor = this.editor;
    const search = () => getActiveSearch(editor.state);

    return {
      Enter: () => {
        if (search()) {
          this.options.getActionList()?.selectFirst();
          return true;
        }

        this.options.onSubmit();
        return true;
      },
      'Shift-Enter': () => editor.commands.splitBlock(),
      ArrowDown: () => {
        const list = this.options.getActionList();
        if (!search() || !list) return false;
        list.focusFirst();
        return true;
      },
      ArrowUp: () => {
        const list = this.options.getActionList();
        if (!search() || !list) return false;
        list.focusLast();
        return true;
      },
      Escape: () => {
        const active = search();
        if (active) {
          this.options.getActionList()?.close();
          dismissActiveSearch(editor.view);
          return true;
        }

        return false;
      },
      // ITC-6.4: первое нажатие выделяет чип (Pressed), второе удаляет его целиком.
      Backspace: () => {
        const { selection } = editor.state;
        if (isChipSelection(editor.state)) return editor.commands.deleteSelection();
        if (!selection.empty) return false;

        const before = selection.$from.nodeBefore;
        return before && isChipNode(before) ? selectChip(editor, selection.from - before.nodeSize) : false;
      },
      Delete: () => {
        const { selection } = editor.state;
        if (isChipSelection(editor.state)) return editor.commands.deleteSelection();
        if (!selection.empty) return false;

        const after = selection.$from.nodeAfter;
        return after && isChipNode(after) ? selectChip(editor, selection.from) : false;
      },
    };
  },
});
