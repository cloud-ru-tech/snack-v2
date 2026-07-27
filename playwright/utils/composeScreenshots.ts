import { Locator, Page, PageScreenshotOptions } from '@playwright/test';
import sharp, { OverlayOptions } from 'sharp';

export type ScreenshotCell = {
  /** Подпись над cell. Пустая строка = без подписи (но `labelHeight` зарезервирует место). */
  label: string;
  /** Сырой PNG, например из `await locator.screenshot(opts)` или `screenshotWithPadding`. */
  png: Buffer;
};

export type ComposeLayout = { type: 'row' } | { type: 'col' } | { type: 'grid'; columns?: number };

export type ComposeOptions = {
  /** Раскладка ячеек. По дефолту `{ type: 'col' }`. Можно передать сокращением: `'row' | 'col' | 'grid'`. */
  layout?: ComposeLayout | ComposeLayout['type'];
  /** Количество колонок для `layout: 'grid'`. Перекрывает `layout.columns`. */
  columns?: number;
  /** Зазор между ячейками в пикселях. По дефолту 16. */
  gap?: number;
  /** Padding по краям композита. По дефолту 16. */
  padding?: number;
  /** Высота полосы лейбла над ячейкой. `0` = не рисовать. По дефолту 24. */
  labelHeight?: number;
  /** Цвет фона композита. По дефолту белый. */
  background?: string;
};

const LABEL_FONT_PX = 12;
const LABEL_PADDING_X = 8;
const LABEL_BG = '#f1f3f5';
const LABEL_COLOR = '#212529';

const DEFAULTS = {
  gap: 16,
  padding: 16,
  labelHeight: 24,
  background: '#ffffff',
} as const;

type Size = { width: number; height: number };

type LayoutPlan = {
  cols: number;
  rows: number;
  colWidths: number[];
  rowHeights: number[];
  totalWidth: number;
  totalHeight: number;
  positions: Array<{ left: number; top: number }>;
};

const XML_ESCAPES: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, ch => XML_ESCAPES[ch] ?? ch);
}

function prefixSum(values: number[]): number[] {
  const result = new Array(values.length + 1).fill(0);
  for (let i = 0; i < values.length; i += 1) result[i + 1] = result[i] + values[i];
  return result;
}

function estimateLabelWidth(label: string, labelHeight: number): number {
  if (labelHeight <= 0 || label.length === 0) return 0;
  // Грубая оценка ширины: ~0.6em на символ для system-ui font-size 12px + горизонтальный padding.
  return Math.ceil(label.length * LABEL_FONT_PX * 0.6 + LABEL_PADDING_X * 2);
}

function buildLabelSvg(label: string, width: number, height: number): Buffer {
  const baseline = Math.round(height * 0.65);
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="100%" height="100%" fill="${LABEL_BG}"/>` +
      `<text x="${LABEL_PADDING_X}" y="${baseline}" font-family="system-ui,sans-serif" font-size="${LABEL_FONT_PX}" fill="${LABEL_COLOR}">${escapeXml(label)}</text>` +
      `</svg>`,
  );
}

function normalizeLayout(layout: ComposeOptions['layout'], columnsOverride?: number): ComposeLayout {
  let resolved: ComposeLayout;
  if (!layout) {
    resolved = { type: 'col' };
  } else if (typeof layout === 'string') {
    resolved = { type: layout };
  } else {
    resolved = layout;
  }
  if (resolved.type === 'grid' && columnsOverride != null) {
    return { type: 'grid', columns: columnsOverride };
  }
  return resolved;
}

function resolveCols(layout: ComposeLayout, total: number): number {
  if (layout.type === 'col') return 1;
  if (layout.type === 'row') return total;
  return layout.columns ?? Math.ceil(Math.sqrt(total));
}

async function measureCells(cells: ScreenshotCell[]): Promise<Size[]> {
  return Promise.all(
    cells.map(async (cell, i) => {
      const meta = await sharp(cell.png).metadata();
      if (!meta.width || !meta.height) {
        throw new Error(`composeScreenshots: cell #${i} (${cell.label}) has no dimensions`);
      }
      return { width: meta.width, height: meta.height };
    }),
  );
}

function computeLayout(
  sizes: Size[],
  cells: ScreenshotCell[],
  cfg: { layout: ComposeLayout; gap: number; padding: number; labelHeight: number },
): LayoutPlan {
  const cols = resolveCols(cfg.layout, cells.length);
  const rows = Math.ceil(cells.length / cols);

  const colWidths = new Array(cols).fill(0);
  const rowHeights = new Array(rows).fill(0);

  sizes.forEach((size, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellWidth = Math.max(size.width, estimateLabelWidth(cells[i].label, cfg.labelHeight));
    const cellHeight = size.height + cfg.labelHeight;
    if (cellWidth > colWidths[col]) colWidths[col] = cellWidth;
    if (cellHeight > rowHeights[row]) rowHeights[row] = cellHeight;
  });

  const colOffsets = prefixSum(colWidths);
  const rowOffsets = prefixSum(rowHeights);

  const positions = cells.map((_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      left: cfg.padding + colOffsets[col] + cfg.gap * col,
      top: cfg.padding + rowOffsets[row] + cfg.gap * row,
    };
  });

  return {
    cols,
    rows,
    colWidths,
    rowHeights,
    totalWidth: cfg.padding * 2 + colOffsets[cols] + cfg.gap * (cols - 1),
    totalHeight: cfg.padding * 2 + rowOffsets[rows] + cfg.gap * (rows - 1),
    positions,
  };
}

/**
 * Снимок локатора с расширенным padding по периметру, чтобы захватить визуальные
 * эффекты, выходящие за пределы bounding-box: `:focus-visible` outline, `box-shadow`,
 * `outline-offset`, decoration overflow.
 *
 * Playwright `locator.screenshot()` режет точно по box, поэтому outline снаружи
 * не попадает. Используем `page.screenshot({ clip })` с расширенной областью,
 * клиппинг ограничивается viewport'ом.
 */
export async function screenshotWithPadding(
  page: Page,
  locator: Locator,
  padding: number,
  opts?: PageScreenshotOptions,
): Promise<Buffer> {
  const box = await locator.boundingBox();
  if (!box) throw new Error('screenshotWithPadding: locator has no boundingBox');

  const viewport = page.viewportSize();
  const clip = {
    x: Math.max(0, Math.floor(box.x - padding)),
    y: Math.max(0, Math.floor(box.y - padding)),
    width: 0,
    height: 0,
  };
  clip.width = clamp(Math.ceil(box.width + padding * 2), 1, (viewport?.width ?? Infinity) - clip.x);
  clip.height = clamp(Math.ceil(box.height + padding * 2), 1, (viewport?.height ?? Infinity) - clip.y);

  return page.screenshot({ ...opts, clip });
}

/**
 * Склеивает несколько PNG-снимков в один композит с подписями над каждой ячейкой.
 *
 * Используется для сжатия per-axis snapshot'ов в один файл — например, 4 отдельных
 * `hover.png` / `focus.png` / `pressed.png` / `default.png` → один
 * `interaction-states.png`. Сравнение через `expect(composed).toMatchSnapshot('...')`.
 */
export async function composeScreenshots(cells: ScreenshotCell[], options: ComposeOptions = {}): Promise<Buffer> {
  if (cells.length === 0) throw new Error('composeScreenshots: no cells provided');

  const cfg = {
    layout: normalizeLayout(options.layout, options.columns),
    gap: options.gap ?? DEFAULTS.gap,
    padding: options.padding ?? DEFAULTS.padding,
    labelHeight: options.labelHeight ?? DEFAULTS.labelHeight,
    background: options.background ?? DEFAULTS.background,
  };

  const cellSizes = await measureCells(cells);
  const layout = computeLayout(cellSizes, cells, cfg);

  const overlays: OverlayOptions[] = [];
  for (let i = 0; i < cells.length; i += 1) {
    const { left, top } = layout.positions[i];
    if (cfg.labelHeight > 0) {
      overlays.push({
        input: buildLabelSvg(cells[i].label, layout.colWidths[i % layout.cols], cfg.labelHeight),
        left,
        top,
      });
    }
    overlays.push({ input: cells[i].png, left, top: top + cfg.labelHeight });
  }

  return sharp({
    create: { width: layout.totalWidth, height: layout.totalHeight, channels: 4, background: cfg.background },
  })
    .composite(overlays)
    .png()
    .toBuffer();
}
