import { describe, expect, it } from 'vitest';

import { AiFieldInputValue } from '../src/types';
import { docToSegments, isValueEmpty, segmentsToDoc, serializeSegments } from '../src/utils/segments';

describe('segments ⇄ doc', () => {
  it('round-trips text, line breaks, skill, mention and search', () => {
    const value: AiFieldInputValue = [
      { type: 'text', text: 'Первая строка\nВторая ' },
      { type: 'skill', id: 'summarize', label: 'summarize', paramsPlaceholder: '<период>' },
      { type: 'text', text: ' за квартал и ' },
      { type: 'skill', id: 'review', label: 'review' },
      { type: 'text', text: ' ' },
      { type: 'mention', id: 'team', label: 'команде' },
      { type: 'text', text: ' ' },
      { type: 'search', trigger: '/', query: 'tr' },
    ];

    expect(docToSegments(segmentsToDoc(value))).toEqual(value);
  });

  it('merges adjacent text', () => {
    const value: AiFieldInputValue = [
      { type: 'skill', id: 'a', label: 'a' },
      { type: 'text', text: 'x' },
      { type: 'text', text: 'y' },
    ];

    expect(docToSegments(segmentsToDoc(value))).toEqual([
      { type: 'skill', id: 'a', label: 'a' },
      { type: 'text', text: 'xy' },
    ]);
  });

  it('keeps an empty paramsPlaceholder: it means the locale default', () => {
    const value: AiFieldInputValue = [{ type: 'skill', id: 'a', label: 'a', paramsPlaceholder: '' }];

    expect(docToSegments(segmentsToDoc(value))).toEqual(value);
  });

  it('builds a single empty paragraph for an empty value', () => {
    expect(segmentsToDoc([])).toEqual({ type: 'doc', content: [{ type: 'paragraph', content: [] }] });
    expect(docToSegments(segmentsToDoc([]))).toEqual([]);
  });

  it('serializes without ReactNode fields', () => {
    expect(serializeSegments([{ type: 'mention', id: 'a', label: 'A', tooltip: 'x' }])).toBe(
      serializeSegments([{ type: 'mention', id: 'a', label: 'A' }]),
    );
  });

  it('treats whitespace-only text as empty', () => {
    expect(isValueEmpty([{ type: 'text', text: '  \n ' }])).toBe(true);
    expect(isValueEmpty([{ type: 'mention', id: 'a', label: 'A' }])).toBe(false);
  });
});
