import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForSettledInViewport } from '#playwright-tooling/utils';

import { BOTTOM_SHEET_STORIES, buildStoryOptions, STORY_TEST_IDS, TEST_IDS } from './helpers';

type OpenScenario = {
  ref: (typeof BOTTOM_SHEET_STORIES)[keyof typeof BOTTOM_SHEET_STORIES];
  snapshot: string;
  title: string;
  // URL-args для оси, выражаемой через Playground (footer-ориентация, swipeEnabled, …).
  props?: Record<string, unknown>;
};

// Один открытый sheet = full-viewport overlay → снимаем `page.screenshot()` (см. visual-regression-standard).
const OPEN_SCENARIOS: OpenScenario[] = [
  { ref: BOTTOM_SHEET_STORIES.playground, snapshot: 'open-default.png', title: 'open default' },
  { ref: BOTTOM_SHEET_STORIES.withMedia, snapshot: 'open-with-media.png', title: 'open with media' },
  {
    ref: BOTTOM_SHEET_STORIES.withSubtitle,
    snapshot: 'open-with-subtitle.png',
    title: 'open with subtitle',
  },
  {
    ref: BOTTOM_SHEET_STORIES.withActionButton,
    snapshot: 'open-with-action-button.png',
    title: 'open with action button',
  },
  {
    ref: BOTTOM_SHEET_STORIES.scrollable,
    snapshot: 'open-scrollable-with-dividers.png',
    title: 'open scrollable with dividers',
  },
  { ref: BOTTOM_SHEET_STORIES.expandable, snapshot: 'open-snap-half.png', title: 'open snap-half (expandable)' },
  // Full-height snap (snapIndex=1 / 100dvh): sheet занимает весь вьюпорт без верхнего зазора —
  // регрессионная защита фикса «Full ≠ full». Через Playground + URL-args (preset half-full, открыт на full).
  {
    ref: BOTTOM_SHEET_STORIES.playground,
    snapshot: 'open-snap-full.png',
    title: 'open snap-full (no top gap)',
    props: { snapPointsPreset: 'half-full', defaultSnapIndex: 1 },
  },
  {
    ref: BOTTOM_SHEET_STORIES.customComposition,
    snapshot: 'open-custom-composition.png',
    title: 'open custom composition',
  },
  // Вертикальный footer (3 действия approve/cancel/additional, auto-vertical).
  // Горизонтальная пара cancel/confirm покрыта `open-default.png` (Playground).
  {
    ref: BOTTOM_SHEET_STORIES.footerActions,
    snapshot: 'open-footer-actions.png',
    title: 'open footer actions (vertical, 3 buttons)',
  },
  // 2-кнопочный footer в ориентации vertical — единственная конфигурация, на которую влияет
  // footerActionsOrientation='vertical' (через URL-args Playground'а, где footer = пара approve+cancel).
  {
    ref: BOTTOM_SHEET_STORIES.playground,
    snapshot: 'open-footer-actions-vertical.png',
    title: 'open footer actions (vertical, 2-button pair)',
    props: { footerActionsOrientation: 'vertical' },
  },
  // swipeEnabled=false → handle скрыт (индикатор привязан к свайпу). Визуальная проверка связки.
  {
    ref: BOTTOM_SHEET_STORIES.playground,
    snapshot: 'open-no-handle.png',
    title: 'open without handle',
    props: { swipeEnabled: false },
  },
];

test.describe('BottomSheet — visual regression', () => {
  // Mobile-only компонент: baseline снимаем на одном mobile-движке (mobile-android). WebKit (mobile-ios)
  // рендерит те же сцены с точностью до subpixel-antialiasing и re-wrap при чуть иной ширине — это шум,
  // не сигнал (тот же принцип, что делает desktop-baselines chrome-only). Функциональные spec'и по-прежнему
  // гоняются на обоих движках через `skipOnDesktop()` — дублируется только визуал.
  const VISUAL_PROJECTS = new Set<string>(['mobile-android']);

  test.beforeEach(() => {
    test.skip(
      !VISUAL_PROJECTS.has(test.info().project.name),
      `Visual baselines are limited to: ${[...VISUAL_PROJECTS].join(', ')}`,
    );
  });

  // VisualMatrix-story рендерит только панель триггеров (overlay full-viewport нельзя рисовать в
  // StoryTable-ячейке, к тому же её wide-panel/StoryTable создаёт containing block для position:fixed
  // sheet'а и ловит его внутрь панели), поэтому оси снимаются ниже как открытые sheet'ы через
  // example-стори (или Playground + URL-args), у которых sheet корректно ложится поверх вьюпорта.

  for (const { ref, snapshot, title, props } of OPEN_SCENARIOS) {
    test(title, async ({ page, gotoStory, getByTestId, waitForFonts }) => {
      await gotoStory(buildStoryOptions(props, ref));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();
      const root = getByTestId(TEST_IDS.root);
      await expect(root).toBeVisible();
      // JS-motion (slide-up + height): ждём стабилизацию bbox вместо document.getAnimations.
      await waitForSettledInViewport(root);
      await waitForFonts();
      expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(snapshot, MATCH_SNAPSHOT_DEFAULT_OPTS);
    });
  }

  test('open nested action-sheet', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.nested));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await getByTestId(STORY_TEST_IDS.nestedOpen).click();
    const inner = getByTestId(STORY_TEST_IDS.nestedRoot);
    await expect(inner).toBeVisible();
    await waitForSettledInViewport(inner);
    await waitForFonts();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-nested.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
