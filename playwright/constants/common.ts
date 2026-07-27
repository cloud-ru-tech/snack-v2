/**
 * Общие константы и env-переменные для Playwright-туллинга.
 *
 * URL Storybook можно переопределить через `STORYBOOK_URL`, в остальных
 * случаях используется локальный dev-сервер (`pnpm dev:storybook`).
 */

const { STORYBOOK_URL, CI, PW_CI_WORKERS, TEST_LOCAL, UIKIT_SNACK_URL } = process.env;

export const IS_CI = Boolean(CI);

export const STORYBOOK_BASE_URL = STORYBOOK_URL ?? 'http://localhost:6006/';

export const TEST_ID_ATTRIBUTE = 'data-test-id';

export const PLAYWRIGHT_ROOT_DIR = `${process.cwd()}/playwright`;

export const CI_WORKERS = PW_CI_WORKERS;
export const IS_LOCAL = TEST_LOCAL === 'true' || !IS_CI;
export const UIKIT_URL = TEST_LOCAL === 'true' || !UIKIT_SNACK_URL ? 'http://localhost:6006/' : UIKIT_SNACK_URL;

export const STORYBOOK_ROOT_SELECTOR = '#storybook-root';

/**
 * `data-test-id` shared-обёртки `StoryTable` (#storybook/components). Используется в
 * visual.spec для VM-снимков, которые рендерятся через StoryTable: позволяет обрезать
 * кадр по фактическому контенту, без пустого viewport-а.
 */
export const STORY_TABLE_TEST_ID = 'story-table';

/**
 * Вьюпорт телефона для mobile-baseline'ов адаптивных компонентов. Mobile-снимок требует двух вещей
 * одновременно: переключить toolbar-global `layoutType='mobile'` (в e2e — через URL-globals, его
 * раздаёт единый `AdaptiveProvider` в `preview.tsx`) И `setViewportSize` (иначе BottomSheet на
 * desktop-ширине рендерится не как на телефоне). См. `adaptive-components.md`.
 */
export const MOBILE_VIEWPORT = { width: 390, height: 844 } as const;

/** Часы страницы во всех e2e: без фиксации снимки с «сегодня» протухают через сутки. */
export const FIXED_TEST_TIME = new Date('2026-07-09T12:00:00Z');

export const SCREENSHOT_DEFAULT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
  // Threshold-параметры толерантны к суб-пиксельной разнице рендера: даже на
  // одной ОС FreeType/Skia дают ~edge-шум на каждом глифе Inter. Baseline'ы
  // сняты на Linux (CI-паритет), поэтому широкий macOS-vs-Linux коридор больше
  // не нужен — пороги сужены до рабочих значений: реальные регрессии
  // (изменения цвета/раскладки/появление-исчезновение элементов) их пробивают,
  // а subpixel-antialiasing — нет.
  //
  // Точечный override остаётся доступным через
  // `expect(...).toHaveScreenshot(name, { ...SCREENSHOT_DEFAULT_OPTS, maxDiffPixelRatio: ... })`.
  //
  // `maxDiffPixels` — абсолютный потолок поверх ratio: на мелких снимках 1% от
  // площади может не превысить порог, и точечные правки проходят незамеченными.
  // Абсолютный кап ловит их независимо от размера кадра.
  maxDiffPixelRatio: 0.01,
  maxDiffPixels: 100,
  threshold: 0.25,
} as const;

/**
 * Tolerance-опции для `expect(buffer).toMatchSnapshot(name, opts)` — composite
 * PNG-буферы из `composeScreenshots` / `screenshotWithPadding`. По умолчанию
 * `toMatchSnapshot` сравнивает буфер байт-в-байт, без visual tolerance, поэтому
 * subpixel-antialiasing меняет несколько байт PNG и тест фейлится при идентичной
 * геометрии. Threshold те же, что в `SCREENSHOT_DEFAULT_OPTS`.
 */
export const MATCH_SNAPSHOT_DEFAULT_OPTS = {
  maxDiffPixelRatio: 0.01,
  maxDiffPixels: 100,
  threshold: 0.25,
} as const;
