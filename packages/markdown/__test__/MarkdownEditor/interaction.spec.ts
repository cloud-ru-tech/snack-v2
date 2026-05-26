import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Только browser-specific сценарии, не покрываемые storybook-play:
// outside-click по порталу и пересчёт overflow тулбара через ResizeObserver.
test.describe('MarkdownEditor — interaction (browser-specific)', () => {
  test('heading dropdown closes on outside click', async ({ page, gotoStory, getByTestId }) => {
    // preview=true — форматированный WYSIWYG с активным тулбаром (в raw-режиме кнопки disabled).
    await gotoStory(buildStoryOptions({ preview: true }));
    await getByTestId(TEST_IDS.toolbarHeading).click();
    await expect(getByTestId(TEST_IDS.headingDropdown)).toBeVisible();

    // Клик вне портала и вне триггера — дроплист должен закрыться.
    await page.mouse.click(4, 4);
    await expect(page.getByTestId(TEST_IDS.headingDropdown)).toHaveCount(0);
  });

  test('toolbar overflow collapses on shrink and restores on expand', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.toolbar)).toBeVisible();

    // Ширину задаём прямо контейнеру редактора (DemoPanel в story фиксирован и от viewport не зависит).
    const setEditorWidth = (width: number) =>
      page.evaluate(
        ({ id, w }) => {
          const el = document.querySelector<HTMLElement>(`[data-test-id="${id}"]`);
          if (el) el.style.width = `${w}px`;
        },
        { id: TEST_IDS.editor, w: width },
      );

    await setEditorWidth(220);
    // ResizeObserver пересчитал доступную ширину → часть кнопок ушла в overflow «Ещё».
    await expect(getByTestId(TEST_IDS.toolbarMore)).toBeVisible();

    await setEditorWidth(900);
    // При растяжении кнопки возвращаются из overflow — More-кнопка исчезает (ключевой баг-кейс).
    await expect(page.getByTestId(TEST_IDS.toolbarMore)).toHaveCount(0);
  });
});
