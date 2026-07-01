import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, OVERLAY_SELECTOR, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

// Behavioral assertions (click to open, close button, controlled state) live in
// stories/Drawer/tests/Drawer.InteractionTest.stories.tsx::play and Drawer.Controlled.
// Playwright keeps only render/state checks. Position×Width axis sweep
// покрывается визуально (visual.spec.ts placements/widths composites).

async function openDrawer(getByTestId: (id: string) => { click: () => Promise<void> }) {
  await getByTestId(TEST_IDS.drawer.triggerOpen).click();
}

test.describe('Drawer — rendering', () => {
  test.describe('content slots', () => {
    test('opens with title, subtitle and body text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          title: 'E2E title',
          subtitle: 'E2E subtitle',
          content: 'E2E body line',
          longBodyContent: false,
          showMedia: false,
          showAfterHeadline: false,
        }),
      );
      await openDrawer(getByTestId);

      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
      await expect(getByTestId(TEST_IDS.title)).toHaveText('E2E title');
      await expect(getByTestId(TEST_IDS.subtitle)).toHaveText('E2E subtitle');
      await expect(getByTestId(TEST_IDS.body)).toContainText('E2E body line');
    });

    test('hides subtitle when empty', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          subtitle: '',
          showAfterHeadline: false,
          showMedia: false,
        }),
      );
      await openDrawer(getByTestId);

      // m5: not.toBeAttached() точнее, чем not.toBeVisible() для несуществующего узла.
      await expect(getByTestId(TEST_IDS.subtitle)).not.toBeAttached();
    });

    test('renders media when enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showMedia: true, showAfterHeadline: false }));
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.image)).toBeVisible();
    });

    test('renders footer back-button slot and close-button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterHeadline: false, showBackButton: true }));
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.footer)).toBeVisible();
      await expect(getByTestId(TEST_IDS.closeButton)).toBeVisible();
    });

    test('renders question-tooltip trigger when slot enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showAfterHeadline: true,
          customTooltipText: 'E2E tooltip',
        }),
      );
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.tooltip)).toBeVisible();
    });
  });

  test.describe('overlay state', () => {
    test('overlay attached by default', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterHeadline: false }));
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
      // TODO(FF-8488): использовать TEST_IDS.overlay, когда rc-drawer/замена начнёт
      // поддерживать прокидывание data-test-id на mask. Сейчас mask недоступен по нашему атрибуту.
      await expect(page.locator(OVERLAY_SELECTOR)).toBeAttached();
    });

    test('overlay detached when showBlackout=false', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showBlackout: false, showAfterHeadline: false }));
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
      await expect(page.locator(OVERLAY_SELECTOR)).not.toBeAttached();
    });
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → боковой rc-drawer (нет BottomSheet-handle); mobile → BottomSheet (handle есть).
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens side drawer (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterHeadline: false }, undefined, { layoutType: 'desktop' }));
      await openDrawer(getByTestId);
      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions({ showAfterHeadline: false }, undefined, { layoutType: 'mobile' }));
      await openDrawer(getByTestId);
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
