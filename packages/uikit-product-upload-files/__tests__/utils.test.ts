import { PdfSVG, TxtSVG } from '@ds/icons/interface/product';
import { describe, expect, it } from 'vitest';

import { FileSizeUnits, UploadFilesAcceptItem } from '../src/types';
import { formatFileDescription, formatFileSize, joinWithConjunction, makeId, resolveFileIcon } from '../src/utils';

const units: FileSizeUnits = { b: 'Б', kb: 'Кб', mb: 'Мб', gb: 'Гб' };

function makeFile(name: string, size = 1, type = ''): File {
  return new File([new Uint8Array(size)], name, { type });
}

describe('formatFileSize', () => {
  it('renders raw bytes below 1 КБ', () => {
    expect(formatFileSize(0, units)).toBe('0 Б');
    expect(formatFileSize(512, units)).toBe('512 Б');
    expect(formatFileSize(1023, units)).toBe('1023 Б');
  });

  it('renders КБ with one decimal below 10 and integer at/above 10', () => {
    expect(formatFileSize(1024, units)).toBe('1 Кб');
    expect(formatFileSize(1536, units)).toBe('1.5 Кб');
    expect(formatFileSize(10 * 1024, units)).toBe('10 Кб');
    expect(formatFileSize(10.4 * 1024, units)).toBe('10 Кб');
  });

  it('renders МБ with one decimal below 10 and integer at/above 10', () => {
    expect(formatFileSize(1024 * 1024, units)).toBe('1 Мб');
    expect(formatFileSize(1.5 * 1024 * 1024, units)).toBe('1.5 Мб');
    expect(formatFileSize(12 * 1024 * 1024, units)).toBe('12 Мб');
  });

  it('renders ГБ with one decimal below 10 and integer at/above 10', () => {
    expect(formatFileSize(1024 * 1024 * 1024, units)).toBe('1 Гб');
    expect(formatFileSize(1.5 * 1024 * 1024 * 1024, units)).toBe('1.5 Гб');
    expect(formatFileSize(12 * 1024 * 1024 * 1024, units)).toBe('12 Гб');
  });
});

describe('formatFileDescription', () => {
  it('returns the override verbatim when provided', () => {
    const file = makeFile('report.pdf', 2048);
    expect(formatFileDescription(file, units, 'Загружается…')).toBe('Загружается…');
  });

  it('combines uppercased extension and size', () => {
    const file = makeFile('report.pdf', 2048);
    expect(formatFileDescription(file, units)).toBe('PDF, 2 Кб');
  });

  it('falls back to size only when the name has no extension', () => {
    const file = makeFile('', 512);
    expect(formatFileDescription(file, units)).toBe('512 Б');
  });
});

describe('joinWithConjunction', () => {
  it('returns an empty string for an empty list', () => {
    expect(joinWithConjunction([], 'и')).toBe('');
  });

  it('returns the single item unchanged', () => {
    expect(joinWithConjunction(['PDF'], 'и')).toBe('PDF');
  });

  it('joins two items with the conjunction', () => {
    expect(joinWithConjunction(['PDF', 'TXT'], 'и')).toBe('PDF и TXT');
  });

  it('comma-separates the head and joins the tail with the conjunction', () => {
    expect(joinWithConjunction(['PDF', 'TXT', 'DOCX'], 'и')).toBe('PDF, TXT и DOCX');
  });
});

describe('resolveFileIcon', () => {
  const accept: UploadFilesAcceptItem[] = [
    { extention: '.pdf', icon: PdfSVG, displayExtension: 'PDF' },
    { extention: 'txt', icon: TxtSVG, displayExtension: 'TXT' },
  ];

  it('resolves an icon by extension regardless of leading dot or case', () => {
    expect(resolveFileIcon(makeFile('a.PDF'), accept)).toBe(PdfSVG);
    expect(resolveFileIcon(makeFile('notes.txt'), accept)).toBe(TxtSVG);
  });

  it('returns undefined for an unknown extension', () => {
    expect(resolveFileIcon(makeFile('photo.png'), accept)).toBeUndefined();
    expect(resolveFileIcon(makeFile('LICENSE'), accept)).toBeUndefined();
  });

  it('returns undefined when the file name is empty', () => {
    expect(resolveFileIcon(makeFile(''), accept)).toBeUndefined();
  });
});

describe('makeId', () => {
  it('returns a prefixed, unique identifier', () => {
    const a = makeId();
    const b = makeId();
    expect(a).toMatch(/^upload-file-/);
    expect(a).not.toBe(b);
  });
});
