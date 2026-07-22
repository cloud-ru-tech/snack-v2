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
 * Признак готовности: внутри `.view-lines` встречается больше одного класса
 * `mtk<N>`. До токенизации весь текст лежит в одном классе (`mtk1`).
 */
export async function waitForMonacoTokenization(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const editors = Array.from(document.querySelectorAll('.monaco-editor'));
    if (editors.length === 0) return false;

    return editors.every(editor => {
      const lines = editor.querySelector('.view-lines');
      if (!lines?.textContent?.trim()) return false;

      const tokenClasses = new Set<string>();
      lines.querySelectorAll('span').forEach(span => {
        span.classList.forEach(className => {
          if (/^mtk\d+$/.test(className)) tokenClasses.add(className);
        });
      });

      return tokenClasses.size > 1;
    });
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
