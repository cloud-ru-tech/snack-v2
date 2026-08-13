import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Ждёт, пока все `<img>` страницы догрузятся и раскодируются. Без этого снимок
 * успевает сняться на пустых картинках: `waitForFonts` про растр ничего не знает.
 * Битый или пустой `src` роняет ожидание по таймауту — снимок с broken-иконкой
 * не должен молча уехать в baseline. Пустой набор картинок — валидный случай.
 */
export async function waitForImages(page: Page, timeout = DEFAULT_TIMEOUT_MS): Promise<void> {
  /* eslint-disable @cloud-ru/ssr-safe-react/domApi -- evaluated in browser context via page.evaluate */
  await page.waitForFunction(
    () => Array.from(document.images).every(image => image.complete && image.naturalWidth > 0),
    undefined,
    { timeout },
  );
  await page.evaluate(() =>
    Promise.all(Array.from(document.images).map(image => image.decode().catch(() => undefined))).then(() => undefined),
  );
  /* eslint-enable @cloud-ru/ssr-safe-react/domApi */
}
