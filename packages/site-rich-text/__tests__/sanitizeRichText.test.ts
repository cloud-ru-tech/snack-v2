import { describe, expect, it } from 'vitest';

import { sanitizeRichText } from '../src/utils';

describe('sanitizeRichText', () => {
  it('keeps formatting markup', () => {
    const html =
      '<p>Текст <strong>жирный</strong> <em>курсив</em></p><ol><li>Пункт</li></ol><img src="/a.png" alt="Схема">';

    expect(sanitizeRichText(html)).toBe(html);
  });

  it('keeps links with target', () => {
    const html = '<a href="https://cloud.ru" target="_blank" rel="noopener noreferrer">cloud.ru</a>';

    expect(sanitizeRichText(html)).toBe(html);
  });

  it('adds rel="noopener noreferrer" to links with any target', () => {
    expect(sanitizeRichText('<a href="https://cloud.ru" target="cms">cloud.ru</a>')).toBe(
      '<a href="https://cloud.ru" target="cms" rel="noopener noreferrer">cloud.ru</a>',
    );
    expect(sanitizeRichText('<a href="https://cloud.ru">cloud.ru</a>')).toBe('<a href="https://cloud.ru">cloud.ru</a>');
  });

  it('removes scripts and event handlers', () => {
    const result = sanitizeRichText('<p>Текст</p><script>alert(1)</script><img src="x" onerror="alert(1)">');

    expect(result).toBe('<p>Текст</p><img src="x">');
  });

  it('removes javascript: urls', () => {
    expect(sanitizeRichText('<a href="javascript:alert(1)">ссылка</a>')).toBe('<a>ссылка</a>');
  });

  it('removes styles, form controls and svg', () => {
    const result = sanitizeRichText(
      '<style>body{display:none}</style><p style="color:red">Текст</p><form><input></form><svg><circle r="1"></circle></svg>',
    );

    expect(result).toBe('<p>Текст</p>');
  });
});
