/**
 * Coverage harvester: для каждой story с тегом `test` создаётся отдельный
 * playwright-тест, который грузит iframe.html?id=<storyId>, ждёт
 * `currentRender.phase === 'finished'` (момент после play-функции), и
 * fixture `collectCoverage` дампит window.__coverage__.
 *
 * Параллелится через playwright workers + --shard в CI (см. test-harvester
 * в gitlab-ci-uikit-snack-v2.yml).
 *
 * Discovery: на старте читает .stories.json, который создаёт coverage-prefetch
 * прямо в before_script test-job'а (см. scripts/coverage-prefetch-stories.mts).
 *
 * Запускается только при COVERAGE=true.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { UIKIT_URL } from '../constants/common';
import { test } from '../fixtures';

const BASE = UIKIT_URL.replace(/\/+$/, '');
const COVERAGE_ENABLED = process.env.COVERAGE === 'true';
const FILTER = process.env.STORIES_FILTER || '';
const FILTER_RE = FILTER ? new RegExp(FILTER) : null;

type StoryEntry = { id: string; type: 'story' | 'docs'; tags?: string[]; importPath: string };

const cachePath = resolve(process.cwd(), 'playwright', 'coverage', '.stories.json');

function loadStories(): StoryEntry[] {
  if (!existsSync(cachePath)) {
    // Без COVERAGE=true тестов не должно быть — но если файл отсутствует
    // и coverage всё-таки включён, явно сигналим о ломке pipeline'а.
    if (COVERAGE_ENABLED) {
      throw new Error(
        `harvester: ${cachePath} not found. Run "pnpm exec tsx scripts/coverage-prefetch-stories.mts" before playwright.`,
      );
    }
    return [];
  }
  const raw = JSON.parse(readFileSync(cachePath, 'utf8')) as { entries: Record<string, StoryEntry> };
  return Object.values(raw.entries).filter(
    e =>
      e.type === 'story' &&
      (e.tags ?? []).includes('test') &&
      (!FILTER_RE || FILTER_RE.test(e.importPath) || FILTER_RE.test(e.id)),
  );
}

const stories = loadStories();

test.describe.parallel('story coverage harvest', () => {
  test.skip(!COVERAGE_ENABLED, 'Set COVERAGE=true to harvest coverage from stories');

  for (const story of stories) {
    test(`harvest ${story.id}`, async ({ page }) => {
      await page.goto(`${BASE}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'domcontentloaded' });
      // Ждём окончания play (phase=finished) или ошибки рендера (errored).
      await page
        .waitForFunction(
          () => {
            const api = (
              window as unknown as {
                __STORYBOOK_PREVIEW__?: {
                  currentRender?: { phase?: string; state?: { phase?: string } };
                };
              }
            ).__STORYBOOK_PREVIEW__;
            const phase = api?.currentRender?.phase ?? api?.currentRender?.state?.phase;
            return phase === 'finished' || phase === 'errored';
          },
          { timeout: 5000 },
        )
        .catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 1500 }).catch(() => {});
    });
  }
});
