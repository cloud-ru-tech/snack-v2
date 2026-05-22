import { describe, expect, it } from 'vitest';

import { buildAcceptAttribute, FILE_REJECTION_REASON, normalizeAccept, partitionFiles } from '../src/utils';

function makeFile(name: string, opts: { type?: string; size?: number } = {}): File {
  const blob = new Blob(['x'.repeat(opts.size ?? 1)], { type: opts.type ?? '' });
  return new File([blob], name, { type: opts.type ?? '' });
}

describe('normalizeAccept', () => {
  it('returns empty array for undefined / empty', () => {
    expect(normalizeAccept(undefined)).toEqual([]);
    expect(normalizeAccept('')).toEqual([]);
    expect(normalizeAccept([])).toEqual([]);
  });

  it('splits comma-separated string and lowercases / trims tokens', () => {
    expect(normalizeAccept(' Image/PNG, .PDF , application/json ')).toEqual(['image/png', '.pdf', 'application/json']);
  });

  it('accepts array input as-is (with normalization)', () => {
    expect(normalizeAccept(['Image/PNG', '  .Pdf  ', ''])).toEqual(['image/png', '.pdf']);
  });
});

describe('buildAcceptAttribute', () => {
  it('returns undefined when input is empty', () => {
    expect(buildAcceptAttribute(undefined)).toBeUndefined();
    expect(buildAcceptAttribute('')).toBeUndefined();
    expect(buildAcceptAttribute([])).toBeUndefined();
  });

  it('joins normalized tokens with comma', () => {
    expect(buildAcceptAttribute(' Image/PNG , .pdf')).toBe('image/png,.pdf');
  });
});

describe('partitionFiles', () => {
  it('accepts all when no constraints given', () => {
    const a = makeFile('a.png', { type: 'image/png' });
    const b = makeFile('b.txt', { type: 'text/plain' });
    expect(partitionFiles([a, b], {})).toEqual({ accepted: [a, b], rejected: [] });
  });

  it('rejects oversize files with reason MaxSize', () => {
    const small = makeFile('s.png', { type: 'image/png', size: 10 });
    const big = makeFile('b.png', { type: 'image/png', size: 1000 });
    const result = partitionFiles([small, big], { maxSize: 100 });
    expect(result.accepted).toEqual([small]);
    expect(result.rejected).toEqual([{ file: big, reason: FILE_REJECTION_REASON.MaxSize }]);
  });

  it('MaxSize takes priority over MIME mismatch', () => {
    const big = makeFile('b.txt', { type: 'text/plain', size: 1000 });
    const result = partitionFiles([big], { maxSize: 100, accept: 'image/png' });
    expect(result.rejected).toEqual([{ file: big, reason: FILE_REJECTION_REASON.MaxSize }]);
  });

  it('matches exact MIME token', () => {
    const png = makeFile('a.png', { type: 'image/png' });
    const jpg = makeFile('b.jpg', { type: 'image/jpeg' });
    const result = partitionFiles([png, jpg], { accept: 'image/png' });
    expect(result.accepted).toEqual([png]);
    expect(result.rejected).toEqual([{ file: jpg, reason: FILE_REJECTION_REASON.Mime }]);
  });

  it('matches MIME wildcard "image/*"', () => {
    const png = makeFile('a.png', { type: 'image/png' });
    const pdf = makeFile('b.pdf', { type: 'application/pdf' });
    const result = partitionFiles([png, pdf], { accept: 'image/*' });
    expect(result.accepted).toEqual([png]);
    expect(result.rejected).toEqual([{ file: pdf, reason: FILE_REJECTION_REASON.Mime }]);
  });

  it('matches extension token starting with "."', () => {
    const pdf = makeFile('report.pdf');
    const txt = makeFile('readme.txt');
    const result = partitionFiles([pdf, txt], { accept: '.pdf' });
    expect(result.accepted).toEqual([pdf]);
    expect(result.rejected).toEqual([{ file: txt, reason: FILE_REJECTION_REASON.Mime }]);
  });

  it('extension match is case-insensitive', () => {
    const pdf = makeFile('REPORT.PDF');
    const result = partitionFiles([pdf], { accept: '.pdf' });
    expect(result.accepted).toEqual([pdf]);
  });

  it('combines multiple accept tokens (any-match)', () => {
    const png = makeFile('a.png', { type: 'image/png' });
    const pdf = makeFile('b.pdf', { type: 'application/pdf' });
    const txt = makeFile('c.txt', { type: 'text/plain' });
    const result = partitionFiles([png, pdf, txt], { accept: 'image/png,.pdf' });
    expect(result.accepted).toEqual([png, pdf]);
    expect(result.rejected).toEqual([{ file: txt, reason: FILE_REJECTION_REASON.Mime }]);
  });

  it('files with empty MIME but matching extension are accepted', () => {
    const pdf = makeFile('a.pdf', { type: '' });
    const result = partitionFiles([pdf], { accept: '.pdf' });
    expect(result.accepted).toEqual([pdf]);
  });
});
