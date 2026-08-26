import { expect, Locator, Page } from '@playwright/test';

import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  SCREENSHOT_DEFAULT_OPTS,
  STORY_TABLE_TEST_ID,
  STORYBOOK_ROOT_SELECTOR,
} from '#playwright-tooling/constants/common';

import { ComposeLayout, composeScreenshots, ScreenshotCell, screenshotWithPadding } from './composeScreenshots';
import { waitForStableBbox } from './waitForStableBbox';

const DEFAULT_PADDING = 8;
const DEFAULT_SNAPSHOT_NAME = 'interaction-states.png';
const VM_PADDING = 8;
const VM_SNAPSHOT_NAME = 'visual-matrix.png';

/**
 * Ждёт покоя bbox всех локаторов — один общий дедлайн на набор. Поштучный `waitForStableBbox`
 * в `Promise.all` конкурирует сам с собой на одной странице и молча сдаётся по дедлайну,
 * отдавая неустаканившийся элемент.
 */
async function waitForStableBoxes(
  page: Page,
  locators: Locator[],
  { stableForMs = 250, pollMs = 100, timeoutMs = 8000 } = {},
): Promise<void> {
  const readBoxes = async () => JSON.stringify(await Promise.all(locators.map(loc => loc.boundingBox())));

  const deadline = Date.now() + timeoutMs;
  let signature = await readBoxes();
  let stableSince = Date.now();

  while (Date.now() < deadline) {
    await page.waitForTimeout(pollMs);
    const next = await readBoxes();

    if (next !== signature) {
      signature = next;
      stableSince = Date.now();
      continue;
    }

    if (Date.now() - stableSince >= stableForMs) {
      return;
    }
  }
}

/**
 * Tolerance сравнения снимка с baseline'ом. Дефолт — `MATCH_SNAPSHOT_DEFAULT_OPTS`;
 * точечный override нужен, когда общий коридор для конкретного снимка либо слишком узкий
 * (снимок флейкует), либо слишком широкий (правка не пробивает порог, и
 * `--update-snapshots=changed` не считает baseline устаревшим).
 */
export type SnapshotMatchOptions = {
  maxDiffPixelRatio?: number;
  maxDiffPixels?: number;
  threshold?: number;
};

/**
 * Снимок VisualMatrix-стори с автоматическим кадрированием.
 *
 * - Если story использует shared `StoryTable` (#storybook/components) — кадр обрезается
 *   по union bounding-box всех `StoryTable`-секций + padding. Это исключает пустой viewport
 *   ниже маленьких таблиц (FileUpload, InfoBlock и т.п.).
 * - Иначе fallback на `#storybook-root` (стори со своей композицией, без StoryTable).
 */
export async function assertVisualMatrixSnapshot(
  page: Page,
  snapshotName = VM_SNAPSHOT_NAME,
  opts: Parameters<typeof page.screenshot>[0] = SCREENSHOT_DEFAULT_OPTS,
  matchOpts: SnapshotMatchOptions = MATCH_SNAPSHOT_DEFAULT_OPTS,
): Promise<void> {
  const tables = page.getByTestId(STORY_TABLE_TEST_ID);

  // Стабилизируем число tables до снятия. Без этого race-condition в монтировании
  // ловит то 1, то N — count==1 уходил в `tables.first().toHaveScreenshot()` (RGB
  // element-screenshot), count>1 — в composeScreenshots (RGBA composite). Формат
  // PNG менялся между прогонами без визуальных изменений. Ждём, пока count
  // перестанет расти два тика подряд.
  // Bounded poll: deadline 5s — иначе зависший story мог бы крутить тест
  // до timeout'а Playwright.
  const STABLE_POLL_INTERVAL_MS = 100;
  const STABLE_POLL_DEADLINE_MS = 5000;
  let prevCount = -1;
  let stableCount = await tables.count();
  const start = Date.now();
  while (stableCount !== prevCount && Date.now() - start < STABLE_POLL_DEADLINE_MS) {
    prevCount = stableCount;
    await page.waitForTimeout(STABLE_POLL_INTERVAL_MS);
    stableCount = await tables.count();
  }

  if (stableCount === 0) {
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(snapshotName, { ...opts, ...matchOpts });
    return;
  }

  // Единый путь для 1+ tables — всегда composeScreenshots. Раньше ветка count==1
  // снимала единичный locator (RGB), ветка count>1 — RGBA композит. Один формат
  // → детерминированный PNG.
  const all = await tables.all();
  // Стабилизируем bbox каждой StoryTable перед снятием: компоненты с
  // measure-based-rendering (TagRow с overflow, ResizeObserver-based layouts)
  // делают второй render-pass после первичного mount → высота прыгает на
  // десятки px между прогонами.
  await waitForStableBoxes(page, all);

  // По очереди: у параллельных element-screenshot'ов общий отсчёт `actionTimeout`, а снимает
  // Playwright всё равно последовательно — хвостовые секции падают по таймауту в очереди.
  const cells: ScreenshotCell[] = [];
  for (const [i, loc] of all.entries()) {
    cells.push({ label: `section-${i}`, png: await loc.screenshot(opts) });
  }
  const composite = await composeScreenshots(cells, { layout: 'col', labelHeight: 0, gap: 8, padding: VM_PADDING });
  expect(composite).toMatchSnapshot(snapshotName, matchOpts);
}

/**
 * Снимает page-скриншот, обрезанный по union bounding-box нескольких локаторов + padding.
 * Используется в portal-снимках (tooltip, popover, dropdown), где content рендерится в портале
 * далеко от триггера. Снимать `page` целиком — большой PNG с пустотой; снимать только content
 * — теряется триггер. Union-clip даёт компактный кадр с обоими.
 */
export async function screenshotRegion(
  page: Page,
  locators: Locator[],
  padding = 16,
  opts = SCREENSHOT_DEFAULT_OPTS,
): Promise<Buffer> {
  if (locators.length === 0) throw new Error('screenshotRegion: no locators');

  // Стабилизируем bbox каждого локатора перед измерением: floating-ui
  // (popover/dropdown/tooltip) дописывает position после открытия одним rAF,
  // и без ожидания union-clip берёт промежуточные координаты → 1px-jitter
  // в высоте/ширине composite-снимка.
  await waitForStableBoxes(page, locators);
  const boxes = await Promise.all(locators.map(l => l.boundingBox()));
  const valid = boxes.filter((b): b is NonNullable<typeof b> => Boolean(b));
  if (valid.length === 0) throw new Error('screenshotRegion: no visible locators');

  const minX = Math.min(...valid.map(b => b.x));
  const minY = Math.min(...valid.map(b => b.y));
  const maxX = Math.max(...valid.map(b => b.x + b.width));
  const maxY = Math.max(...valid.map(b => b.y + b.height));

  const viewport = page.viewportSize();
  const clip = {
    x: Math.max(0, Math.floor(minX - padding)),
    y: Math.max(0, Math.floor(minY - padding)),
    width: 0,
    height: 0,
  };
  clip.width = Math.min(Math.ceil(maxX - minX + padding * 2), (viewport?.width ?? Number.POSITIVE_INFINITY) - clip.x);
  clip.height = Math.min(Math.ceil(maxY - minY + padding * 2), (viewport?.height ?? Number.POSITIVE_INFINITY) - clip.y);

  return page.screenshot({ ...opts, clip });
}

export type InteractionStatesOptions = {
  /** Элемент, по которому hover/focus/pressed целятся по умолчанию. Также используется
   * как кадр снимка, если не задан `frame`. */
  target: Locator;
  /** Кадр снимка для каждой ячейки composite. По умолчанию — `target`. Передавай массив
   * локаторов, когда видимая часть компонента — подмножество target (Rating: bbox корня
   * растягивается на всю ширину родителя, реальный контент — только звёзды). Кадр
   * клипится по union bbox этих локаторов + `padding`. */
  frame?: Locator | Locator[];
  /** Элемент, по которому hover'им. По умолчанию — `target`. */
  hoverTarget?: Locator;
  /** Кастомное действие для фокуса. По умолчанию — `page.keyboard.press('Tab')` (первый focusable в DOM
   * получит `:focus-visible` — то, что мы хотим видеть). Для невыбранного segment'а / 2-го элемента
   * передавай свою функцию (`Tab` → `ArrowRight` и т.п.). */
  focusAction?: (page: Page) => Promise<void>;
  /** Элемент, по координатам которого делаем `mouse.down` для pressed. По умолчанию — `target`. */
  pressedTarget?: Locator;
  /** Снимать также pressed. По умолчанию false. */
  includePressed?: boolean;
  /** Padding вокруг `target` при снимке cell — чтобы влез outline / shadow. По умолчанию 8. */
  padding?: number;
  /** Имя композитного snapshot-файла. По умолчанию `interaction-states.png`. */
  snapshotName?: string;
  /** Tolerance сравнения с baseline'ом. По умолчанию `MATCH_SNAPSHOT_DEFAULT_OPTS`. */
  matchOpts?: SnapshotMatchOptions;
  /** Раскладка cell'ов в composite. По умолчанию `'row'`. Для широких component'ов (Alert, Breadcrumbs) — `'col'`. */
  layout?: 'row' | 'col';
  /** Дополнительное ожидание покоя перед снимком каждой ячейки. `waitForStableBbox` ловит
   * только движение layout'а; компоненту, который меняет содержимое внутри неподвижного bbox
   * (JS-таймер, transition на абсолютно спозиционированных слоях), нужен свой признак покоя —
   * обычно `waitForStableRender` на соответствующем слоте. */
  settle?: (page: Page) => Promise<void>;
  /** Дополнительные состояния сверх default/hover/focus/[pressed] в том же composite.
   * Каждое: `label` + `activate` (выставить состояние перед снимком). Перед каждым
   * — `resetState`; после снимка вызывается `deactivate` (если задан). Пример — drag-over
   * у Dropzone: `activate` диспатчит `dragover` с DataTransfer, `deactivate` — `dragleave`. */
  extraStates?: Array<{
    label: string;
    activate: (page: Page) => Promise<void>;
    deactivate?: (page: Page) => Promise<void>;
  }>;
};

async function resetState(page: Page): Promise<void> {
  // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- evaluated in browser context
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

async function defaultFocusAction(page: Page): Promise<void> {
  // Tab из неактивного состояния → первый focusable получает `:focus-visible` (в отличие от
  // программного `.focus()`, который ставит только `:focus` и не показывает outline на DS-компонентах).
  await page.keyboard.press('Tab');
}

function resolveFrame(frame: Locator | Locator[] | undefined): Locator[] | null {
  if (frame == null) return null;
  if (Array.isArray(frame)) return frame;
  return [frame];
}

/**
 * Снимает composite `default × hover × focus [× pressed]` одним PNG и сравнивает с baseline.
 * Заменяет per-state файлы — один файл, один проход, визуально все состояния рядом для diff'а.
 */
export async function assertInteractionStatesSnapshot(page: Page, options: InteractionStatesOptions): Promise<void> {
  const {
    target,
    frame,
    hoverTarget = target,
    focusAction = defaultFocusAction,
    pressedTarget = target,
    includePressed = false,
    padding = DEFAULT_PADDING,
    snapshotName = DEFAULT_SNAPSHOT_NAME,
    matchOpts = MATCH_SNAPSHOT_DEFAULT_OPTS,
    layout = 'row',
    settle,
    extraStates = [],
  } = options;

  const frameLocators = resolveFrame(frame);

  const snap = async (): Promise<Buffer> => {
    // Стабилизируем bbox target'а перед каждым snap: ResizeObserver-driven
    // компоненты (Breadcrumbs overflow, TagRow overflow) делают второй
    // measure-pass после первичного mount; между default/hover/focus снимками
    // hover может триггерить дополнительный re-layout. Без стабилизации
    // composite ловит target в промежуточном состоянии — ширина прыгает на
    // десятки/сотни px между прогонами.
    await waitForStableBbox(target);
    await settle?.(page);
    return frameLocators
      ? screenshotRegion(page, frameLocators, padding, SCREENSHOT_DEFAULT_OPTS)
      : screenshotWithPadding(page, target, padding, SCREENSHOT_DEFAULT_OPTS);
  };

  await resetState(page);
  const defaultPng = await snap();

  await hoverTarget.hover();
  const hoverPng = await snap();

  await resetState(page);
  await focusAction(page);
  const focusPng = await snap();

  const cells: ScreenshotCell[] = [
    { label: 'default', png: defaultPng },
    { label: 'hover', png: hoverPng },
    { label: 'focus', png: focusPng },
  ];

  if (includePressed) {
    await resetState(page);
    const box = await pressedTarget.boundingBox();
    if (!box) throw new Error('assertInteractionStatesSnapshot: pressedTarget has no boundingBox');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    try {
      const pressedPng = await snap();
      cells.push({ label: 'pressed', png: pressedPng });
    } finally {
      await page.mouse.up();
    }
  }

  for (const { label, activate, deactivate } of extraStates) {
    await resetState(page);
    await activate(page);
    cells.push({ label, png: await snap() });
    await deactivate?.(page);
  }

  const composeLayout: ComposeLayout = layout === 'col' ? { type: 'col' } : { type: 'row' };
  const composite = await composeScreenshots(cells, { layout: composeLayout });
  expect(composite).toMatchSnapshot(snapshotName, matchOpts);
}
