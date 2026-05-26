import { expect, test } from '#playwright-tooling/fixtures';

import { TOOLBAR_ITEM } from '../../src/constants';
import { buildStoryOptions, TEST_IDS, toolbarButtonTestId } from './helpers';

// Behavioral assertions (clear button, preview toggle) live in
// stories/MarkdownEditor/tests/MarkdownEditor.InteractionTest.stories.tsx::play.
// All visual axes live in MarkdownEditor.VisualMatrix snapshot.

test.describe('MarkdownEditor — rendering', () => {
  test('preview off renders raw textarea; WYSIWYG hidden', async ({ gotoStory, getByTestId }) => {
    // preview явно выключен (Playground-стори по умолчанию показывает WYSIWYG).
    await gotoStory(buildStoryOptions({ defaultPreview: false }));
    await expect(getByTestId(TEST_IDS.editor)).toBeVisible();
    await expect(getByTestId(TEST_IDS.editorHeader)).toBeVisible();
    await expect(getByTestId(TEST_IDS.editorPreviewToggle)).toBeVisible();
    await expect(getByTestId(TEST_IDS.editorLabel)).toBeVisible();
    await expect(getByTestId(TEST_IDS.toolbar)).toBeVisible();
    // preview=false (дефолт): редактирование «сырого» markdown в textarea,
    // WYSIWYG (EditorContent) не смонтирован.
    await expect(getByTestId(TEST_IDS.editorRawInput)).toBeVisible();
    await expect(getByTestId(TEST_IDS.editorContent)).toBeHidden();
    // Тулбар работает и в raw-режиме (вставляет markdown-разметку) — кнопки активны.
    await expect(getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Bold))).toBeEnabled();
  });

  test('toolbar=false hides toolbar but keeps header', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ toolbar: false }));
    await expect(getByTestId(TEST_IDS.editorHeader)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.toolbar)).toHaveCount(0);
  });

  test('hideHeader removes the header row', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ hideHeader: true }));
    await expect(getByTestId(TEST_IDS.editor)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.editorHeader)).toHaveCount(0);
  });

  test('label=false hides the right-side label but keeps the toggle', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ label: false }));
    await expect(getByTestId(TEST_IDS.editorPreviewToggle)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.editorLabel)).toHaveCount(0);
  });

  test('preview=true shows editable WYSIWYG with active toolbar and sets data-preview', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ preview: true }));
    await expect(getByTestId(TEST_IDS.editor)).toHaveAttribute('data-preview', 'true');
    // preview=true: форматированный WYSIWYG, тулбар активен (кнопки enabled).
    await expect(getByTestId(TEST_IDS.toolbar)).toBeVisible();
    await expect(getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Bold))).toBeEnabled();
    await expect(getByTestId(TEST_IDS.editorContent)).toBeVisible();
    // raw textarea не смонтирована в preview-режиме (рендерится EditorContent).
    await expect(getByTestId(TEST_IDS.editorRawInput)).toBeHidden();
  });

  test('clear button hidden when value is empty', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ defaultValue: '' }));
    await expect(page.getByTestId(TEST_IDS.editorClear)).toHaveCount(0);
  });
});
