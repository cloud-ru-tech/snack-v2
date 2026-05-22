import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CODE_EDITOR_STORIES, TEST_IDS } from './helpers';

test.describe('CodeEditor — rendering', () => {
  test.describe('render', () => {
    test(`story ${CODE_EDITOR_STORIES.playground.story} renders`, async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, CODE_EDITOR_STORIES.playground));
      await expect(page.getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test(`story ${CODE_EDITOR_STORIES.interactionTest.story} renders`, async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, CODE_EDITOR_STORIES.interactionTest));
      await expect(page.getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test(`story ${CODE_EDITOR_STORIES.visualMatrix.story} renders`, async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, CODE_EDITOR_STORIES.visualMatrix));
      await expect(page.getByTestId('code-editor-json-h0-b0')).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('hasHeader=false → header is not rendered', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hasHeader: false }));
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.header)).toHaveCount(0);
    });

    test('loading=true → монтируется spinner overlay вместо Monaco', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(TEST_IDS.loading)).toBeVisible();
      await expect(page.locator('.monaco-editor textarea')).toHaveCount(0);
    });

    test('showRowNumber=false → колонка номеров строк скрыта', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ showRowNumber: false, value: 'a\nb\nc', language: 'json' }));
      await expect(page.locator('.monaco-editor').first()).toBeVisible();
      await expect(page.locator('.monaco-editor .line-numbers')).toHaveCount(0);
    });

    test('showRowNumber=true (default) → колонка номеров строк видна', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ value: 'a\nb\nc', language: 'json' }));
      await expect(page.locator('.monaco-editor').first()).toBeVisible();
      await expect(page.locator('.monaco-editor .line-numbers').first()).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const language of ['json', 'yaml', 'typescript'] as const) {
      test(`language=${language} → data-language`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ language }));
        await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-language', language);
      });
    }
  });
});
