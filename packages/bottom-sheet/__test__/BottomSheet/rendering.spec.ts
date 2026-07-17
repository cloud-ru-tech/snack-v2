import { expect, test } from '#playwright-tooling/fixtures';

import { BOTTOM_SHEET_STORIES, buildStoryOptions, skipOnDesktop, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('BottomSheet — rendering & props propagation', () => {
  test.beforeEach(skipOnDesktop);

  // —————————————————————————— Smoke / open ——————————————————————————

  test('opens on trigger click and renders headline', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test('renders body content when opened', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.body)).toBeVisible();
  });

  // —————————————————————————— ARIA ——————————————————————————

  test('root exposes dialog ARIA semantics', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('role', 'dialog');
    await expect(root).toHaveAttribute('aria-modal', 'true');
  });

  test('dialog accessible name: aria-labelledby points at the title', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const titleId = await getByTestId(TEST_IDS.title).getAttribute('id');
    expect(titleId).toBeTruthy();
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('aria-labelledby', titleId as string);
  });

  test('non-modal sheet omits aria-modal (background stays available to AT)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showBackdrop: false, lockScroll: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).not.toHaveAttribute('aria-modal');
  });

  test('low-level BottomSheetCustom: consumer aria-label reaches the dialog, not clobbered (no title-wiring)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.customComposition));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('aria-label', 'Custom composition');
    // Низкоуровневый dialog не авто-связывает title → aria-labelledby не выставляется (нет clobber'а).
    await expect(root).not.toHaveAttribute('aria-labelledby');
  });

  // —————————————————————————— Slot toggles via props ————————————————

  test('handle is rendered by default and hidden when swipeEnabled=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.handle)).toBeVisible();

    // Handle привязан к свайпу: нет жеста — нет индикатора.
    await gotoStory(buildStoryOptions({ swipeEnabled: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.handle)).toHaveCount(0);
  });

  test('backdrop is rendered by default and removed with showBackdrop=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.backdrop)).toBeVisible();

    await gotoStory(buildStoryOptions({ showBackdrop: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.backdrop)).toHaveCount(0);
  });

  // —————————————————————————— Swipe flag → data-attr ————————————————

  test('data-swipe-enabled reflects swipeEnabled prop', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-swipe-enabled', 'true');

    await gotoStory(buildStoryOptions({ swipeEnabled: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('data-swipe-enabled');
  });

  // —————————————————————————— Snap-points → data-attrs ———————————————

  test('expandable variant exposes snap-points data attributes', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.expandable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('data-snap-points', '2');
    await expect(root).toHaveAttribute('data-snap-index', '0');
  });

  test('defaultSnapIndex selects the initial snap', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', defaultSnapIndex: 1 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('data-snap-index', '1');
  });

  test('data-full-height is set only when the active snap is full viewport', async ({ gotoStory, getByTestId }) => {
    // snap=1 (full) → data-full-height (включает safeAreaTop notch-компенсацию)
    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', defaultSnapIndex: 1 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-full-height', 'true');

    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', defaultSnapIndex: 0 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.root)).not.toHaveAttribute('data-full-height');
  });

  test('bodyPadding=false removes horizontal padding only (vertical survives)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ bodyPadding: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const body = getByTestId(TEST_IDS.body);
    await expect(body).toHaveAttribute('data-no-padding', 'true');
    // Контракт Figma-оси `padding=false`: убираются ТОЛЬКО горизонтальные паддинги; вертикальные
    // (top=interval-m, bottom=interval-l) сохраняются.
    const pad = await body.evaluate(el => {
      const s = getComputedStyle(el);
      return { left: s.paddingLeft, right: s.paddingRight, top: s.paddingTop, bottom: s.paddingBottom };
    });
    expect(pad.left).toBe('0px');
    expect(pad.right).toBe('0px');
    expect(pad.top).not.toBe('0px');
    expect(pad.bottom).not.toBe('0px');
  });

  // —————————————————————————— Anatomy slots (per example story) ———————

  test('renders media slot with data-media-kind (WithMedia)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withMedia));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const media = getByTestId(TEST_IDS.media);
    await expect(media).toBeVisible();
    // Публичный атрибут media-слота: props-media → 'image' | 'icon'.
    await expect(media).toHaveAttribute('data-media-kind', 'image');
  });

  test('renders subtitle slot (WithSubtitle)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withSubtitle));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.subtitle)).toBeVisible();
  });

  test('renders back-button and action-button in header (WithActionButton)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.withActionButton));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.backButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.actionButton)).toBeVisible();
  });

  test('renders dividers around body for scrollable content (Scrollable)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.scrollable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.body)).toBeVisible();
    // withDividers=true + header + footer → оба разделителя (topBar↔body и body↔footer), каждый
    // с собственным id (без strict-mode-коллизии).
    await expect(getByTestId(TEST_IDS.dividerTop)).toBeVisible();
    await expect(getByTestId(TEST_IDS.dividerBottom)).toBeVisible();
  });

  test('renders the full legacy footer (approve/cancel/additional + disclaimer)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.footerActions));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.footerApprove)).toBeVisible();
    await expect(getByTestId(TEST_IDS.footerCancel)).toBeVisible();
    await expect(getByTestId(TEST_IDS.footerAdditional)).toBeVisible();
    await expect(getByTestId(TEST_IDS.footerDisclaimer)).toBeVisible();
  });

  test('low-level BottomSheetCustom composition renders (CustomComposition)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.customComposition));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.body)).toBeVisible();
  });
});
