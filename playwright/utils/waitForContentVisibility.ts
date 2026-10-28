import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT_MS = 5_000;

/**
 * Ждёт, пока элементы с `content-visibility: auto`, попавшие во вьюпорт, отрисуют содержимое.
 *
 * Браузер решает, рисовать ли такой элемент, на следующем кадре после того, как тот въехал
 * в экран; до этого вместо содержимого пустой прямоугольник размера `contain-intrinsic-size`.
 * Bbox при этом уже стабилен, поэтому `waitForStableBbox` пропуск не замечает, и снимок
 * ловит пустые блоки. Пропущенное содержимое отличает `checkVisibility({ contentVisibilityAuto: true })`
 * на потомке: для него он возвращает `false`.
 */
export async function waitForContentVisibility(page: Page, timeout = DEFAULT_TIMEOUT_MS): Promise<void> {
  /* eslint-disable @cloud-ru/ssr-safe-react/domApi -- evaluated in browser context via page.waitForFunction */
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll('body *')).every(element => {
        if (getComputedStyle(element).contentVisibility !== 'auto') return true;

        const rect = element.getBoundingClientRect();
        const inViewport =
          rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
        const child = element.firstElementChild;

        return !inViewport || child == null || child.checkVisibility({ contentVisibilityAuto: true });
      }),
    undefined,
    { timeout },
  );
  /* eslint-enable @cloud-ru/ssr-safe-react/domApi */
}
