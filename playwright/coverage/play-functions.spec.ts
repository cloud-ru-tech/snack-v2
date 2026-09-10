/**
 * Coverage harvester: для каждой story с тегом `test` создаётся отдельный
 * playwright-тест, который грузит iframe.html?id=<storyId>, ждёт события
 * `storyFinished` (терминальный сигнал рендера — приходит после play-функции и
 * несёт её итог), и fixture `collectCoverage` снимает runtime V8-coverage (CDP)
 * и маппит его на packages/*\/src по sourcemaps (см. playwright/fixtures.ts).
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
import { expect, test } from '../fixtures';

const BASE = UIKIT_URL.replace(/\/+$/, '');
const COVERAGE_ENABLED = process.env.COVERAGE === 'true';
const FILTER = process.env.STORIES_FILTER || '';
const FILTER_RE = FILTER ? new RegExp(FILTER) : null;

/**
 * Сколько ждём `storyFinished`. Прежние 5s гонялись наперегонки с самим storybook:
 * после play он уходит в фазу `completing`, где `waitForAnimations` ждёт живые анимации
 * и отпускает только по своему внутреннему 5s-таймауту (у table/markdown анимация ручки
 * overlayscrollbars не завершается никогда) — то есть бюджет был меньше нижней границы.
 * 20s — с запасом от замеров: самый долгий тест целиком (goto + ожидание + teardown
 * coverage) занимал 7.5s локально на статике и 19.2s на раннере CI.
 */
const STORY_FINISHED_TIMEOUT = 20000;

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
      // Дефолтных 30s не хватает: на них ушёл бы весь STORY_FINISHED_TIMEOUT, а teardown
      // fixture'ы `collectCoverage` (stopJSCoverage + маппинг тяжёлых чанков по sourcemaps)
      // уже вылетал за них в CI. 45s — вдвое больше самого долгого теста на раннере.
      test.setTimeout(45000);

      // Слушателя вешаем до загрузки превью: события рендера приходят по одному разу,
      // опросом `currentRender.phase` их не поймать. `storyFinished` — терминальный сигнал
      // рендера, он же несёт статус: рендер-исключение и unhandled error в нём видно.
      await page.addInitScript(() => {
        type Channel = { on(event: string, listener: (payload: unknown) => void): void };
        const state = window as unknown as { __HARVEST__?: { done: boolean; failure?: string } };
        state.__HARVEST__ = { done: false };

        function firstLine(payload: unknown): string {
          const first = Array.isArray(payload) ? payload[0] : payload;
          const message = (first as { message?: string } | undefined)?.message ?? String(first);
          return message.split('\n')[0].slice(0, 200);
        }

        const fail = (reason: string) => {
          if (state.__HARVEST__ && !state.__HARVEST__.failure) state.__HARVEST__.failure = reason;
        };

        let channel: Channel | undefined;
        Object.defineProperty(window, '__STORYBOOK_ADDONS_CHANNEL__', {
          configurable: true,
          get: () => channel,
          set(next: Channel | undefined) {
            channel = next;
            next?.on('storyThrewException', payload => fail(`story threw: ${firstLine(payload)}`));
            next?.on('storyErrored', payload => fail(`story errored: ${firstLine(payload)}`));
            next?.on('storyFinished', payload => {
              const status = (payload as { status?: string } | undefined)?.status;
              if (status && status !== 'success') fail(`storyFinished status=${status}`);
              if (state.__HARVEST__) state.__HARVEST__.done = true;
            });
          },
        });
      });

      await page.goto(`${BASE}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'domcontentloaded' });

      const result = await page
        .waitForFunction(
          () => {
            const state = (window as unknown as { __HARVEST__?: { done: boolean; failure?: string } }).__HARVEST__;
            return state?.done || state?.failure ? state : null;
          },
          { timeout: STORY_FINISHED_TIMEOUT },
        )
        .then(handle => handle.jsonValue())
        .catch(() => null);
      await page.waitForLoadState('networkidle', { timeout: 1500 }).catch(() => {});

      // Ассерт держит две вещи: story дорендерилась и не упала на рендере. Провалившуюся
      // play он не ловит — аддон interactions ставит `throwPlayFunctionExceptions: false`,
      // и упавшая play доводит рендер до `finished` со статусом `success`. Гейт для play —
      // `pnpm test:stories` (vitest browser), дублировать его тут нечем: харвестер грузит
      // iframe напрямую, и часть сценариев на таймерах здесь просто не успевает.
      expect(
        result?.failure ?? (result ? null : `story не дорендерилась за ${STORY_FINISHED_TIMEOUT / 1000}s`),
        `story ${story.id}`,
      ).toBeNull();
    });
  }
});
