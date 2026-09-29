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

import { devices } from '@playwright/test';

import { UIKIT_URL } from '../constants/common';
import { expect, test } from '../fixtures';

const BASE = UIKIT_URL.replace(/\/+$/, '');
const COVERAGE_ENABLED = process.env.COVERAGE === 'true';
const FILTER = process.env.STORIES_FILTER || '';
const FILTER_RE = FILTER ? new RegExp(FILTER) : null;

/**
 * Сколько ждём `storyFinished`. Ожидание анимаций в фазе `completing` снято маркером тест-раннера
 * (см. `test.use` ниже), остаётся рендер и play: тяжёлые story (table, tree) на раннере CI занимают 15–25s,
 * локально 1–5s.
 */
const STORY_FINISHED_TIMEOUT = 30000;

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
  // Маркер тест-раннера: Storybook тогда ставит анимации на паузу, а не ждёт их до 5s. Scroll-driven анимации
  // ручки overlayscrollbars не завершаются никогда, и каждая story со скроллом теряла на этом 5s.
  test.use({ userAgent: `${devices['Desktop Chrome'].userAgent} StorybookTestRunner` });

  test.skip(!COVERAGE_ENABLED, 'Set COVERAGE=true to harvest coverage from stories');

  for (const story of stories) {
    test(`harvest ${story.id}`, async ({ page }) => {
      // Сверх STORY_FINISHED_TIMEOUT нужен запас на teardown `collectCoverage`
      // (stopJSCoverage + маппинг тяжёлых чанков по sourcemaps).
      test.setTimeout(60000);

      // Слушателя вешаем до загрузки превью: события рендера приходят по одному разу,
      // опросом `currentRender.phase` их не поймать. `storyFinished` — терминальный сигнал
      // рендера, он же несёт статус: рендер-исключение и unhandled error в нём видно.
      await page.addInitScript(() => {
        type Channel = { on(event: string, listener: (payload: unknown) => void): void };
        const state = window as unknown as { __HARVEST__?: { done: boolean; failure?: string; phase?: string } };
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
            next?.on('storyRenderPhaseChanged', payload => {
              if (state.__HARVEST__) state.__HARVEST__.phase = (payload as { newPhase?: string } | undefined)?.newPhase;
            });
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

      let crashed = false;
      page.on('crash', () => {
        crashed = true;
      });

      await page.goto(`${BASE}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'domcontentloaded' });

      const result = await page
        .waitForFunction(
          () => {
            const state = (window as unknown as { __HARVEST__?: { done: boolean; failure?: string } }).__HARVEST__;
            return state?.done || state?.failure ? state : null;
          },
          // Второй аргумент — `arg` функции; без него опции уходят туда, и работает actionTimeout (10s).
          undefined,
          { timeout: STORY_FINISHED_TIMEOUT },
        )
        .then(handle => handle.jsonValue())
        // Причину обрыва не глотаем: таймаут, упавшая вкладка и закрытая страница лечатся по-разному.
        .catch(async (error: Error) => {
          if (crashed) return { done: false, failure: 'вкладка упала (page crash)' };
          if (error.name !== 'TimeoutError')
            return { done: false, failure: `ожидание оборвалось: ${error.message.split('\n')[0]}` };
          const phase = await page
            .evaluate(() => (window as unknown as { __HARVEST__?: { phase?: string } }).__HARVEST__?.phase)
            .catch(() => undefined);
          return {
            done: false,
            failure: `story не дорендерилась за ${STORY_FINISHED_TIMEOUT / 1000}s (фаза: ${phase ?? '—'})`,
          };
        });
      await page.waitForLoadState('networkidle', { timeout: 1500 }).catch(() => {});

      // Ассерт держит две вещи: story дорендерилась и не упала на рендере. Провалившуюся
      // play он не ловит — аддон interactions ставит `throwPlayFunctionExceptions: false`,
      // и упавшая play доводит рендер до `finished` со статусом `success`. Гейт для play —
      // `pnpm test:stories` (vitest browser), дублировать его тут нечем: харвестер грузит
      // iframe напрямую, и часть сценариев на таймерах здесь просто не успевает.
      expect(result.failure ?? null, `story ${story.id}`).toBeNull();
    });
  }
});
