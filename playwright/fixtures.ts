import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import v8toIstanbul from 'v8-to-istanbul';

import { expect as playwrightExpect, Locator, test as base } from '@playwright/test';

import { FIXED_TEST_TIME } from './constants/common';
import { dataTestIdSelector, getStorybookUrl, getStorybookUrlById, StorybookUrlOptions, waitForFonts } from './utils';

const COVERAGE_ENABLED = process.env.COVERAGE === 'true';
/** Сколько раз пытаемся доставить URL-args в стори через канал preview (см. gotoStory). */
const ARGS_APPLY_ATTEMPTS = 3;
const REPO_ROOT = resolve(process.cwd());
const COVERAGE_DIR = resolve(REPO_ROOT, 'coverage', 'raw', 'playwright');
// Тесты бегут против собранного storybook-static (его поднимает http-server на
// :6006). Served URL `/<p>` → файл на диске `apps/storybook/storybook-static/<p>` —
// нужен, чтобы v8-to-istanbul нашёл соседний `.map` для исходного маппинга.
const STORYBOOK_STATIC_DIR = resolve(REPO_ROOT, 'apps', 'storybook', 'storybook-static');
if (COVERAGE_ENABLED) {
  mkdirSync(COVERAGE_DIR, { recursive: true });
}

// Какие original-источники учитываем в coverage: только `packages/<pkg>/src`,
// без барелей (`index.ts`), type-only (`types.ts`), `.d.ts`, stories и тестов.
// Паритет с прежними istanbul include/exclude — см. coverage-standard.md.
function isCoverableSource(file: string): boolean {
  if (!file.includes('/packages/') || !file.includes('/src/')) return false;
  if (file.includes('/node_modules/') || file.includes('/__test__/')) return false;
  if (/\.d\.ts$/.test(file) || /\.(stories|test)\.[jt]sx?$/.test(file)) return false;
  const basename = file.slice(file.lastIndexOf('/') + 1);
  return basename !== 'index.ts' && basename !== 'types.ts';
}

type DragOptions = {
  targetPosition?: { x: number; y: number };
  target?: Locator;
  steps?: number;
};

type GotoStoryFn = {
  (options: StorybookUrlOptions): Promise<void>;
  (storyId: string, args?: Record<string, unknown>): Promise<void>;
};

type PlaywrightFixtures = {
  gotoStory: GotoStoryFn;
  getByTestId(testId: string): Locator;
  /** Fixture-форма `waitForFonts` — без аргумента, использует `page` из контекста. См. `visual-regression-standard.md`. */
  waitForFonts(): Promise<void>;
  scrollBy(locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }): Promise<void>;
  getScrollTop(locator: Locator): Promise<number>;
  waitForNavigation(expectedPath: string, options?: { timeout?: number }): Promise<void>;
  dragTo(locator: Locator, options?: DragOptions): Promise<void>;
  collectCoverage: void;
  fixedClockEnabled: boolean;
  fixedClock: void;
};

export const test = base.extend<PlaywrightFixtures>({
  collectCoverage: [
    async ({ page }, customUse) => {
      // Runtime V8 coverage через CDP — без пред-инструментации бандла. Поэтому
      // storybook собирается чистым (один билд и для деплоя, и для тестов),
      // а INSTRUMENT/istanbul-плагин больше не нужны. resetOnNavigation: false —
      // gotoStory навигирует, покрытие должно копиться сквозь переход.
      // page.coverage есть только в chromium; coverage-прогон идёт на --project=chrome.
      const collecting = COVERAGE_ENABLED && typeof page.coverage?.startJSCoverage === 'function';
      if (collecting) {
        await page.coverage.startJSCoverage({ resetOnNavigation: false });
      }

      await customUse();

      if (!collecting) return;
      let entries: Awaited<ReturnType<typeof page.coverage.stopJSCoverage>>;
      try {
        entries = await page.coverage.stopJSCoverage();
      } catch {
        return; // page may already be closed
      }

      const merged: Record<string, unknown> = {};
      for (const entry of entries) {
        if (!entry.url || !entry.source) continue;
        let pathname: string;
        try {
          pathname = new URL(entry.url).pathname;
        } catch {
          continue; // anonymous / data: scripts
        }
        // Файл на диске рядом с .map — нужен v8-to-istanbul для резолва sourcemap.
        const diskPath = resolve(STORYBOOK_STATIC_DIR, `.${pathname}`);
        if (!existsSync(diskPath)) continue; // не ассет собранного storybook
        const converter = v8toIstanbul(diskPath, 0, { source: entry.source }, path => !isCoverableSource(path));
        try {
          await converter.load();
          converter.applyCoverage(entry.functions);
        } catch {
          continue; // нет/битый sourcemap у чанка — пропускаем
        }
        for (const [key, data] of Object.entries(converter.toIstanbul())) {
          if (!isCoverableSource(key)) continue;
          // Нормализуем ключ к `<repoRoot>/packages/<pkg>/src/...` независимо от
          // того, как vite-sourcemap разрешил относительный путь источника —
          // gate/merge матчат пакет по подстроке `/packages/`.
          const normalized = resolve(REPO_ROOT, `.${key.slice(key.indexOf('/packages/'))}`);
          (data as { path: string }).path = normalized;
          merged[normalized] = data;
        }
      }

      if (Object.keys(merged).length > 0) {
        writeFileSync(resolve(COVERAGE_DIR, `${randomUUID()}.json`), JSON.stringify(merged));
      }
    },
    { auto: true },
  ],
  // `setFixedTime` подменяет только `Date`/`Date.now` — таймеры и анимации продолжают идти.
  // Компоненты на debounce/throttle из lodash сверяются с `Date.now()`: при замороженном
  // времени отложенный вызов никогда не «созревает» и состояние не наступает. Такие спеки
  // отключают фиксацию через `test.use({ fixedClockEnabled: false })`.
  fixedClockEnabled: [true, { option: true }],
  fixedClock: [
    async ({ page, fixedClockEnabled }, customUse) => {
      if (fixedClockEnabled) {
        await page.clock.setFixedTime(FIXED_TEST_TIME);
      }

      await customUse();
    },
    { auto: true },
  ],
  gotoStory: async ({ page }, customUse) => {
    const navigate: GotoStoryFn = (async (first: StorybookUrlOptions | string, second?: Record<string, unknown>) => {
      const url = typeof first === 'string' ? getStorybookUrlById({ id: first, args: second }) : getStorybookUrl(first);
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      await page.waitForLoadState('load');

      const storybookLoaderLocator = page.locator('.sb-preparing-story .sb-loader');
      await playwrightExpect(storybookLoaderLocator).toBeHidden({ timeout: 15000 });

      const errorMessage = page.locator("text=/Couldn't find story|Unable to find story|Story not found/i");
      const errorVisible = await errorMessage.isVisible().catch(() => false);
      if (errorVisible) {
        throw new Error(`Story not found: ${url}`);
      }

      // Ожидание рендера storybook-root (в Storybook 10+ используется #storybook-root)
      await playwrightExpect(page.locator('#storybook-root')).toBeAttached({ timeout: 15000 });

      // Apply URL args via the preview channel. Storybook 10's iframe.html parses
      // selectionSpecifier.args from the URL but only applies them when the
      // manager app sends them back via channel — which never happens when we
      // load iframe.html directly. We emit updateStoryArgs manually so URL args
      // passed through getStorybookUrl actually reach the rendered story.
      await page
        .waitForFunction(
          () => {
            const api = (
              window as unknown as { __STORYBOOK_PREVIEW__?: { channel?: unknown; selectionStore?: unknown } }
            ).__STORYBOOK_PREVIEW__;
            return Boolean(api?.channel && api?.selectionStore);
          },
          { timeout: 15000 },
        )
        .catch(() => {});

      // Emit + verify: под нагрузкой (несколько воркеров на одном dev-сервере) канал
      // успевает доставить событие не всегда, и стори остаётся на дефолтных args. Поэтому
      // после emit'а сверяемся со store и при расхождении повторяем — молчаливый пропуск
      // args ловится не тестом на args, а флейком в произвольном месте спека.
      let requestedArgs: Record<string, unknown> | null = null;
      let verifiableArgNames: string[] = [];
      let applied = false;

      for (let attempt = 0; attempt < ARGS_APPLY_ATTEMPTS; attempt += 1) {
        requestedArgs = await page.evaluate(() => {
          const api = (
            window as unknown as {
              __STORYBOOK_PREVIEW__?: {
                channel?: { emit: (event: string, payload: unknown) => void };
                selectionStore?: {
                  selection?: { storyId?: string };
                  selectionSpecifier?: { args?: Record<string, unknown> };
                };
              };
            }
          ).__STORYBOOK_PREVIEW__;
          const storyId = api?.selectionStore?.selection?.storyId;
          const args = api?.selectionStore?.selectionSpecifier?.args;
          if (!api?.channel || !storyId || !args || Object.keys(args).length === 0) {
            return null;
          }
          api.channel.emit('updateStoryArgs', { storyId, updatedArgs: args });
          return args;
        });

        if (!requestedArgs) break; // стори без URL-args — сверять нечего

        // Args со значением `undefined` Storybook применяет как удаление ключа из store,
        // поэтому сверяем только те, что должны в нём появиться.
        verifiableArgNames = Object.entries(requestedArgs)
          .filter(([, value]) => value !== undefined)
          .map(([name]) => name);

        if (verifiableArgNames.length === 0) {
          applied = true;
          break;
        }

        applied = await page
          .waitForFunction(
            argNames => {
              const api = (
                window as unknown as {
                  __STORYBOOK_PREVIEW__?: {
                    storyStoreValue?: { args?: { argsByStoryId?: Record<string, Record<string, unknown>> } };
                    selectionStore?: { selection?: { storyId?: string } };
                  };
                }
              ).__STORYBOOK_PREVIEW__;
              const storyId = api?.selectionStore?.selection?.storyId ?? '';
              const storyArgs = api?.storyStoreValue?.args?.argsByStoryId?.[storyId];

              return Boolean(storyArgs) && argNames.every(name => name in (storyArgs as Record<string, unknown>));
            },
            verifiableArgNames,
            { timeout: 2000 },
          )
          .then(() => true)
          .catch(() => false);

        if (applied) {
          // Store обновлён, но React коммитит рендер следующим кадром — ждём его,
          // иначе тест кликает по стори, ещё отрисованной с дефолтными args.
          await page
            .evaluate(
              () =>
                new Promise<void>(resolve => {
                  // Тело page.evaluate сериализуется и исполняется в браузере — до
                  // SSR-рантайма этот код не доходит, ssr-safe-react тут ложно срабатывает.
                  // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
                  requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
                }),
            )
            .catch(() => {});
          break;
        }
      }

      // Попытки исчерпаны, а args так и не доехали. Молча продолжать нельзя: спек
      // пойдёт по дефолтным args и упадёт где-то дальше — ровно тот флейк, от которого
      // защищает цикл. Падаем здесь, с перечислением неподъехавших ключей.
      if (requestedArgs && !applied) {
        throw new Error(
          `gotoStory: URL-args не доехали до стори за ${ARGS_APPLY_ATTEMPTS} попыток: ${verifiableArgNames.join(', ')}`,
        );
      }

      // Ждём конца play: иначе спек конкурирует с ней за DOM и фокус. `completing`, а не
      // `finished` — между ними preview-api висит все 5s в `waitForAnimations` из-за вечно
      // `running` scroll-driven анимации ручки overlayscrollbars.
      await page
        .waitForFunction(
          () => {
            const preview = (window as unknown as { __STORYBOOK_PREVIEW__?: { currentRender?: { phase?: string } } })
              .__STORYBOOK_PREVIEW__;
            if (!preview) return true;

            return ['completing', 'completed', 'afterEach', 'finished', 'aborted', 'errored'].includes(
              preview.currentRender?.phase ?? '',
            );
          },
          { timeout: 30000 },
        )
        .catch(() => {});
    }) as GotoStoryFn;
    await customUse(navigate);
  },
  getByTestId: async ({ page }, customUse) => {
    await customUse((testId: string) => page.locator(dataTestIdSelector(testId)));
  },
  waitForFonts: async ({ page }, customUse) => {
    await customUse(() => waitForFonts(page));
  },
  // eslint-disable-next-line no-empty-pattern
  scrollBy: async ({}, customUse) => {
    await customUse(async (locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
      const isScrollable = await locator.evaluate(el => el.scrollHeight > el.clientHeight);

      if (!isScrollable) {
        throw new Error('Content is not scrollable - scrollHeight should be greater than clientHeight');
      }

      await locator.evaluate((el, opts) => {
        el.scrollBy({
          top: opts?.top ?? 0,
          left: opts?.left ?? 0,
          behavior: opts?.behavior ?? 'auto',
        });
      }, options);
    });
  },
  // eslint-disable-next-line no-empty-pattern
  getScrollTop: async ({}, customUse) => {
    await customUse(async (locator: Locator) => await locator.evaluate(el => el.scrollTop));
  },
  waitForNavigation: async ({ page }, customUse) => {
    await customUse(async (expectedPath: string, options?: { timeout?: number }) => {
      await page
        .waitForFunction(
          (path: string) => {
            // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
            const url = window.location.pathname + window.location.search + window.location.hash;
            return url.includes(path);
          },
          expectedPath,
          { timeout: options?.timeout ?? 5000 },
        )
        .catch(() => {});
    });
  },
  dragTo: async ({ page }, customUse) => {
    await customUse(async (locator: Locator, options?: DragOptions) => {
      const elementBox = await locator.boundingBox();
      if (!elementBox) {
        throw new Error('Element is not visible or has no bounding box');
      }

      const startX = elementBox.x + elementBox.width / 2;
      const startY = elementBox.y + elementBox.height / 2;

      let endX: number;
      let endY: number;

      if (options?.target) {
        const targetBox = await options.target.boundingBox();
        if (!targetBox) {
          throw new Error('Target element is not visible or has no bounding box');
        }
        endX = targetBox.x + targetBox.width / 2;
        endY = targetBox.y + targetBox.height / 2;
      } else if (options?.targetPosition) {
        endX = startX + options.targetPosition.x;
        endY = startY + options.targetPosition.y;
      } else {
        throw new Error('Either target or targetPosition must be provided');
      }

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: options?.steps ?? 10 });
      // dnd-kit коммитит `over` кадром позже последнего mousemove — без паузы drop «в никуда».
      await page.evaluate(
        () =>
          new Promise<void>(resolve => {
            // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- исполняется в браузере
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          }),
      );
      await page.mouse.up();
    });
  },
});

export { expect } from '@playwright/test';
// `Locator` / `Page` — type-only re-export. TS-флаг `isolatedModules` требует
// явный `export type` для re-export'а типов из внешних пакетов; без него TS1205.
// Это исключение к [imports-exports.md](../.claude/rules/imports-exports.md).
export type { Locator, Page } from '@playwright/test';
