import { Node as PMNode } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';

import { SEGMENT_TYPE } from '../../constants';
import { AiFieldInputMentionSegment, AiFieldInputSkillSegment, AiFieldInputValue } from '../../types';
import { getChipMetaKey, NODE_NAME, segmentsToDoc } from '../../utils';
import { ChipMeta } from './context';

const CHIP_NODES: string[] = [NODE_NAME.Skill, NODE_NAME.Mention];

export function buildChipMeta(value: AiFieldInputValue): Map<string, ChipMeta> {
  const map = new Map<string, ChipMeta>();

  value.forEach(segment => {
    if (segment.type === SEGMENT_TYPE.Skill || segment.type === SEGMENT_TYPE.Mention) {
      map.set(getChipMetaKey(segment.type, segment.id), { icon: segment.icon, tooltip: segment.tooltip });
    }
  });

  return map;
}

/** Сколько чипов (skill / mention) стоит перед сегментом `search`, или -1, если поиска нет. */
export function getSearchChipIndex(value: AiFieldInputValue): number {
  const searchIndex = value.findIndex(segment => segment.type === SEGMENT_TYPE.Search);
  if (searchIndex < 0) return -1;
  return value
    .slice(0, searchIndex)
    .filter(segment => segment.type === SEGMENT_TYPE.Skill || segment.type === SEGMENT_TYPE.Mention).length;
}

/** После внешней замены сегмента `search` ставит каретку сразу за вставленным чипом. */
export function restoreCaretAfterReplace(editor: Editor, chipIndex: number) {
  let current = -1;
  let target: { node: PMNode; pos: number } | null = null;

  editor.state.doc.descendants((node, pos) => {
    if (target) return false;
    if (CHIP_NODES.includes(node.type.name)) {
      current += 1;
      if (current === chipIndex) {
        target = { node, pos };
      }
      return false;
    }
    return true;
  });

  const found = target as { node: PMNode; pos: number } | null;
  if (!found) {
    editor.commands.focus('end');
    return;
  }

  const position = found.pos + found.node.nodeSize;

  const { tr } = editor.state;
  editor.view.dispatch(tr.setSelection(TextSelection.create(tr.doc, position)));
  editor.view.focus();
}

/**
 * Вставляет чип в позицию курсора или в конец текста; перед ним — пробел, если вплотную стоит текст.
 * Каретка встаёт сразу за чипом.
 */
export function insertChipAtCaret(
  editor: Editor,
  chip: AiFieldInputSkillSegment | AiFieldInputMentionSegment,
  atEnd: boolean,
) {
  const node = segmentsToDoc([chip]).content?.[0]?.content?.[0];
  if (!node) return;

  const { state } = editor;
  const position = atEnd ? state.doc.content.size - 1 : state.selection.from;
  const charBefore = state.doc.textBetween(Math.max(0, position - 1), position, undefined, ' ');
  const content = charBefore && !/\s/.test(charBefore) ? [{ type: 'text', text: ' ' }, node] : [node];

  editor.chain().focus().insertContentAt(position, content).run();
}
