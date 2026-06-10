import { expect, Page, test } from '#playwright-tooling/fixtures';

import { BOTTOM_SHEET_STORIES, buildStoryOptions, skipOnDesktop, STORY_TEST_IDS, TEST_IDS } from './helpers';

// Playwright WebKit (mobile-ios) не симулирует hardware-клавиатуру: `page.keyboard.press(...)`
// не дотягивает до DOM-listener'ов. На реальном iOS клавиатуры тоже обычно нет — keyboard-сценарии
// валидируем на mobile-android (Chromium с keyboard).
const HAS_HW_KEYBOARD = (projectName: string) => projectName !== 'mobile-ios';

function focusWithin(page: Page, testId: string): Promise<boolean> {
  return page.evaluate(id => {
    const root = document.querySelector(`[data-test-id="${id}"]`);
    const active = document.activeElement;
    return Boolean(root && active && (root === active || root.contains(active)));
  }, testId);
}

// Фокус переносится внутрь sheet'а в useLayoutEffect на isActive — на пару кадров позже mount'а,
// поэтому ждём poll'ом, а не мгновенной проверкой.
function expectFocusWithin(page: Page, testId: string) {
  return expect.poll(() => focusWithin(page, testId)).toBe(true);
}

test.describe('BottomSheet — keyboard & focus', () => {
  test.beforeEach(() => {
    skipOnDesktop();
    test.skip(!HAS_HW_KEYBOARD(test.info().project.name), 'no hw keyboard on mobile-ios emulation');
  });

  test('moves focus into the sheet on open', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withActionButton));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();

    await expectFocusWithin(page, TEST_IDS.root);
  });

  test('Tab keeps focus trapped inside the sheet', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withActionButton));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expectFocusWithin(page, TEST_IDS.root);

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      expect(await focusWithin(page, TEST_IDS.root)).toBe(true);
    }
  });

  test('Shift+Tab keeps focus trapped inside the sheet', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withActionButton));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expectFocusWithin(page, TEST_IDS.root);

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab');
      expect(await focusWithin(page, TEST_IDS.root)).toBe(true);
    }
  });

  test('Escape closes the sheet', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(root).not.toBeVisible();
  });

  test('restores focus to the trigger after close', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click(); // реальный клик фокусирует триггер
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expectFocusWithin(page, TEST_IDS.root);

    await page.keyboard.press('Escape');
    await expect(root).not.toBeVisible();

    await expectFocusWithin(page, STORY_TEST_IDS.triggerOpen);
  });

  test('Escape closes via the keydown fallback when CloseWatcher is unavailable', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    // Эмулируем Safari/Firefox (нет глобального CloseWatcher) на Chromium: удаляем CloseWatcher до
    // загрузки стори → активируется keydown-fallback в BottomSheetCustom (а не CloseWatcher-путь).
    await page.addInitScript(() => {
      // @ts-expect-error — намеренно убираем CloseWatcher, чтобы пройти именно fallback-веткой.
      delete window.CloseWatcher;
    });
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expectFocusWithin(page, TEST_IDS.root);

    await page.keyboard.press('Escape');
    await expect(root).not.toBeVisible();
  });

  // —————————————————————————— Nested (layered) ——————————————————————

  test('focus moves into the nested sheet and stays trapped there', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.nested));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(STORY_TEST_IDS.nestedOpen).click();
    await expect(getByTestId(STORY_TEST_IDS.nestedRoot)).toBeVisible();

    // Фокус ушёл в верхний (вложенный) слой; внешний focus-trap его не перехватывает.
    await expectFocusWithin(page, STORY_TEST_IDS.nestedRoot);

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      expect(await focusWithin(page, STORY_TEST_IDS.nestedRoot)).toBe(true);
    }
  });

  test('Escape closes the nested sheet first, then the parent', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.nested));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(STORY_TEST_IDS.nestedOpen).click();

    const outer = getByTestId(TEST_IDS.root);
    const inner = getByTestId(STORY_TEST_IDS.nestedRoot);
    await expect(inner).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(inner).not.toBeVisible();
    await expect(outer).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(outer).not.toBeVisible();
  });
});
