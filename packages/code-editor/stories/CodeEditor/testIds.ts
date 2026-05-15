import { TEST_IDS } from '@ds/code-editor';

export const CODE_EDITOR_TEST_ID = TEST_IDS.root;
export const CODE_EDITOR_HEADER_TEST_ID = TEST_IDS.header;
export const CODE_EDITOR_LANGUAGE_TEST_ID = TEST_IDS.language;
export const CODE_EDITOR_COPY_BUTTON_TEST_ID = TEST_IDS.copyButton;

// Поддерживаемые языки для контролов Playground/VisualMatrix. Список общий, чтобы spec'и
// и stories не разъезжались по порядку/составу значений.
export const KNOWN_LANGUAGES = ['typescript', 'json', 'yaml', 'javascript', 'markdown', 'shell'] as const;

export type KnownLanguage = (typeof KNOWN_LANGUAGES)[number];

/**
 * data-test-id для ячейки VisualMatrix. Используется в stories и в e2e — не
 * перебивай формат, иначе rendering.spec.ts не найдёт элемент.
 */
export function matrixCellTestId(language: string, hasHeader: boolean, hasBackground?: boolean) {
  const header = `h${hasHeader ? '1' : '0'}`;
  const bg = hasBackground === undefined ? '' : `-b${hasBackground ? '1' : '0'}`;
  return `${TEST_IDS.root}-${language}-${header}${bg}`;
}
