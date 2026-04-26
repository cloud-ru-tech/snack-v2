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
