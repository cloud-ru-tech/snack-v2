import { Page } from '@playwright/test';

import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

/**
 * Ждёт, пока monaco дорисует подсветку синтаксиса во всех редакторах на странице.
 *
 * Токенизация асинхронна и не связана с монтированием: `toBeVisible()` проходит
 * на ещё не раскрашенном тексте, и снимок фиксирует монохромный редактор. В матрице
 * это выглядит как «часть ячеек цветные, часть нет» — и такой кадр легко уезжает
 * в эталон.
 *
 * Признак готовности — два условия сразу: внутри `.view-lines` больше одного класса
 * `mtk<N>` (до токенизации весь текст лежит в `mtk1`) и разметка не изменилась с
 * предыдущей проверки. Без второго условия ожидание завершается на «раскраска
 * началась», monaco продолжает докрашивать, и два подряд снимка расходятся.
 */
export async function waitForMonacoTokenization(page: Page): Promise<void> {
  // Иначе повторный вызов без навигации сравнится с прошлой сигнатурой.
  await page.evaluate(() => {
    delete (window as unknown as { __dsMonacoSignature?: string }).__dsMonacoSignature;
  });

  await page.waitForFunction(() => {
    const editors = Array.from(document.querySelectorAll('.monaco-editor'));
    if (editors.length === 0) return false;

    const lineNodes = editors.map(editor => editor.querySelector('.view-lines'));
    if (lineNodes.some(lines => !lines?.textContent?.trim())) return false;

    const colorized = lineNodes.every(lines => {
      const tokenClasses = new Set<string>();
      lines?.querySelectorAll('span').forEach(span => {
        span.classList.forEach(className => {
          if (/^mtk\d+$/.test(className)) tokenClasses.add(className);
        });
      });

      return tokenClasses.size > 1;
    });
    if (!colorized) return false;

    // innerHTML несёт inline-стили строк — ловит и перекраску, и смену layout.
    const signature = lineNodes.map(lines => lines?.innerHTML ?? '').join(' ');
    const store = window as unknown as { __dsMonacoSignature?: string };
    const settled = store.__dsMonacoSignature === signature;
    store.__dsMonacoSignature = signature;

    return settled;
  });
}

export const CODE_EDITOR_STORIES = {
  playground: { name: 'codeeditor', story: 'playground' },
  visualMatrix: { name: 'codeeditor', story: 'visual-matrix' },
  interactionTest: { name: 'codeeditor-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type CodeEditorStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CodeEditorStoryProps,
  ref: StoryRef = CODE_EDITOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
