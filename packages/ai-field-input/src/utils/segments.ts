import { JSONContent } from '@tiptap/react';

import { SEGMENT_TYPE } from '../constants';
import { AiFieldInputSegment, AiFieldInputValue, SearchTrigger } from '../types';

export const NODE_NAME = {
  Skill: 'aiSkill',
  Mention: 'aiMention',
  Search: 'aiSearch',
} as const;

function textNode(text: string): JSONContent[] {
  return text ? [{ type: 'text', text }] : [];
}

export function segmentsToDoc(value: AiFieldInputValue): JSONContent {
  const paragraphs: JSONContent[][] = [[]];
  const current = () => paragraphs[paragraphs.length - 1];

  value.forEach(segment => {
    switch (segment.type) {
      case SEGMENT_TYPE.Text: {
        segment.text.split('\n').forEach((line, index) => {
          if (index > 0) {
            paragraphs.push([]);
          }
          current().push(...textNode(line));
        });
        break;
      }
      case SEGMENT_TYPE.Skill: {
        current().push({
          type: NODE_NAME.Skill,
          attrs: { id: segment.id, label: segment.label, paramsPlaceholder: segment.paramsPlaceholder ?? null },
        });
        break;
      }
      case SEGMENT_TYPE.Mention: {
        current().push({ type: NODE_NAME.Mention, attrs: { id: segment.id, label: segment.label } });
        break;
      }
      case SEGMENT_TYPE.Search: {
        current().push({
          type: 'text',
          text: `${segment.trigger}${segment.query}`,
          marks: [{ type: NODE_NAME.Search }],
        });
        break;
      }
      default:
        break;
    }
  });

  return {
    type: 'doc',
    content: paragraphs.map(content => ({ type: 'paragraph', content })),
  };
}

function pushText(segments: AiFieldInputSegment[], text: string) {
  if (!text) {
    return;
  }

  const last = segments[segments.length - 1];

  if (last?.type === SEGMENT_TYPE.Text) {
    last.text += text;
    return;
  }

  segments.push({ type: SEGMENT_TYPE.Text, text });
}

export function docToSegments(doc: JSONContent): AiFieldInputValue {
  const segments: AiFieldInputSegment[] = [];

  (doc.content ?? []).forEach((paragraph, index) => {
    if (index > 0) {
      pushText(segments, '\n');
    }

    (paragraph.content ?? []).forEach(node => {
      switch (node.type) {
        case 'text': {
          const text = node.text ?? '';
          if (node.marks?.some(mark => mark.type === NODE_NAME.Search)) {
            segments.push({
              type: SEGMENT_TYPE.Search,
              trigger: text.charAt(0) as SearchTrigger,
              query: text.slice(1),
            });
          } else {
            pushText(segments, text);
          }
          break;
        }
        case NODE_NAME.Skill: {
          const paramsPlaceholder = node.attrs?.paramsPlaceholder;
          segments.push({
            type: SEGMENT_TYPE.Skill,
            id: String(node.attrs?.id ?? ''),
            label: String(node.attrs?.label ?? ''),
            ...(typeof paramsPlaceholder === 'string' ? { paramsPlaceholder } : {}),
          });
          break;
        }
        case NODE_NAME.Mention:
          segments.push({
            type: SEGMENT_TYPE.Mention,
            id: String(node.attrs?.id ?? ''),
            label: String(node.attrs?.label ?? ''),
          });
          break;
        default:
          break;
      }
    });
  });

  return segments;
}

/** Сравнение без ReactNode-полей (`icon`, `tooltip`): они не хранятся в документе редактора. */
export function serializeSegments(value: AiFieldInputValue): string {
  return JSON.stringify(
    value.map(segment => {
      switch (segment.type) {
        case SEGMENT_TYPE.Skill:
          return [segment.type, segment.id, segment.label, segment.paramsPlaceholder ?? null];
        case SEGMENT_TYPE.Mention:
          return [segment.type, segment.id, segment.label];
        case SEGMENT_TYPE.Search:
          return [segment.type, segment.trigger, segment.query];
        default:
          return [segment.type, segment.text];
      }
    }),
  );
}

export function isValueEmpty(value: AiFieldInputValue): boolean {
  return value.every(segment => segment.type === SEGMENT_TYPE.Text && segment.text.trim() === '');
}

export function getChipMetaKey(type: string, id: string): string {
  return `${type}:${id}`;
}
