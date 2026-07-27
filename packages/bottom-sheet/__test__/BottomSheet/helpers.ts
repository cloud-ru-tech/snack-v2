import { test } from '#playwright-tooling/fixtures';
import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// BottomSheet — чисто мобильный компонент (Figma-мастер только под mobile-вьюпорт). Desktop-движки
// (chrome / firefox / safari) для него не запускаем — там нет ни сценария, ни визуального паритета.
// `mobile` исключён намеренно: он байт-в-байт совпадает с `mobile-android` (тот же Pixel 7 / Chromium),
// поэтому поведенческие спеки гоняем на mobile-android (Chromium) + mobile-ios (WebKit), без дубля.
export const MOBILE_PROJECTS = new Set<string>(['mobile-android', 'mobile-ios']);

export function skipOnDesktop() {
  test.skip(
    !MOBILE_PROJECTS.has(test.info().project.name),
    'BottomSheet is a mobile-only component; desktop projects are skipped',
  );
}

// Слот-id, которые ставит сам компонент (root / backdrop / handle / header / body / footer / …).
// Импорт из CSS-free leaf `@ds/popup-private`, а не через `../../src/constants` → entry `@ds/popup-private`:
// entry тянет дерево компонентов со `styles.module.scss`, что ломает playwright-compile спека.
export { TEST_IDS } from '../../../popup-private/src/constants';
// Story-level id'ы (триггеры, контент-маркеры, nested-сценарий). Один источник со stories.
export { TEST_IDS as STORY_TEST_IDS } from '../../stories/BottomSheet/testIds';

export const BOTTOM_SHEET_STORIES = {
  playground: { name: 'bottomsheet', story: 'playground' },
  visualMatrix: { name: 'bottomsheet', story: 'visual-matrix' },
  expandable: { name: 'bottomsheet-examples-expandable', story: 'expandable' },
  controlledSnap: { name: 'bottomsheet-examples-controlledsnap', story: 'controlled-snap' },
  footerActions: { name: 'bottomsheet-examples-footeractions', story: 'footer-actions' },
  withMedia: { name: 'bottomsheet-examples-withmedia', story: 'with-media' },
  withSubtitle: { name: 'bottomsheet-examples-withsubtitle', story: 'with-subtitle' },
  withActionButton: { name: 'bottomsheet-examples-withactionbutton', story: 'with-action-button' },
  scrollable: { name: 'bottomsheet-examples-scrollable', story: 'scrollable' },
  customComposition: { name: 'bottomsheet-examples-customcomposition', story: 'custom-composition' },
  nested: { name: 'bottomsheet-examples-nested', story: 'nested' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = BOTTOM_SHEET_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
  };
}
