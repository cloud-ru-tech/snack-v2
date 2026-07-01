import { expect, test } from '#playwright-tooling/fixtures';

import { BOTTOM_SHEET_HANDLE_TEST_ID, buildStoryOptions, KEY_COMBOS, MODAL_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

const MOCK = {
  title: 'test title',
  subtitle: 'test subtitle',
  content: 'test content',
};

const M = TEST_IDS.modal;

test.describe('Modal — rendering', () => {
  test.describe('render', () => {
    test('opens with proper header, footer and content', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          title: MOCK.title,
          subtitle: MOCK.subtitle,
          content: MOCK.content,
          showFooter: true,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();

      await expect(getByTestId(M.root)).toBeVisible();
      await expect(getByTestId(M.title)).toHaveText(MOCK.title);
      await expect(getByTestId(M.subtitle)).toHaveText(MOCK.subtitle);
      await expect(getByTestId(M.backButton)).toBeVisible();
      await expect(getByTestId(M.slotAfterHeadline)).toBeVisible();
      await expect(getByTestId(M.body)).toHaveText(MOCK.content);
      await expect(getByTestId(M.footer)).toBeVisible();
    });

    test('renders without header and footer when disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showHeader: false,
          showFooter: false,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();

      await expect(getByTestId(M.title)).not.toBeVisible();
      await expect(getByTestId(M.subtitle)).not.toBeVisible();
      await expect(getByTestId(M.backButton)).not.toBeVisible();
      await expect(getByTestId(M.slotAfterHeadline)).not.toBeVisible();
      await expect(getByTestId(M.body)).toBeVisible();
      await expect(getByTestId(M.footer)).not.toBeVisible();
    });
  });

  test.describe('states', () => {
    test('loading shows spinner and hides footer', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          loading: true,
          title: MOCK.title,
          content: MOCK.content,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();

      await expect(getByTestId(M.loadingSpinner)).toBeVisible();
      await expect(getByTestId(M.body)).not.toHaveText(MOCK.content);
      await expect(getByTestId(M.footer)).not.toBeVisible();
    });

    test('loading with custom loadingState replaces spinner with custom content', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(
        buildStoryOptions({
          loading: true,
          loadingState: 'Loading',
          title: MOCK.title,
          content: MOCK.content,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();

      await expect(getByTestId(M.loadingSpinner)).not.toBeVisible();
      await expect(getByTestId(M.body)).toHaveText('Loading');
      await expect(getByTestId(M.footer)).not.toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    // Один представитель на значение каждой оси (mode × width).
    // VisualMatrix покрывает полное декартово произведение.
    for (const { mode, width } of KEY_COMBOS) {
      test(`mode=${mode} width=${width} sets data-mode and data-width`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ mode, width }));
        await getByTestId(MODAL_TRIGGER_TEST_ID).click();
        const root = getByTestId(M.root);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-mode', mode);
        await expect(root).toHaveAttribute('data-width', width);
      });
    }

    test('exposes dialog ARIA role and aria-modal', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();
      const root = getByTestId(M.root);
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute('role', 'dialog');
      await expect(root).toHaveAttribute('aria-modal', 'true');
    });
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из
  // тулбар-глобала `layoutType`. На desktop рендерится DesktopModal (нет BottomSheet-handle),
  // на mobile — MobileModal поверх BottomSheet (handle присутствует).
  test.describe('adaptive surface swap', () => {
    test('desktop layout renders desktop modal (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'desktop' }));
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();
      await expect(getByTestId(M.root)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'mobile' }));
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();
      await expect(getByTestId(M.root)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
