import { Locator } from '@playwright/test';

/**
 * Опрашивает `boundingBox` локатора, пока два последовательных замера не
 * совпадут — гарантия, что layout перестал двигаться (анимация дорисовалась,
 * subpixel-rounding устаканилось).
 *
 * `waitForFonts.getAnimations().finished` ловит завершение CSS-анимации, но
 * между «animation finished» и финальным flush layout'а в Chromium может
 * остаться один frame, на котором высота округляется к +1px / -1px. Без
 * стабильного bbox screenshot ловит это как 1px-diff в высоте.
 */
export async function waitForStableBbox(
  locator: Locator,
  { pollMs = 50, timeoutMs = 1500 }: { pollMs?: number; timeoutMs?: number } = {},
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let prev = await locator.boundingBox();
  while (Date.now() < deadline) {
    await locator.page().waitForTimeout(pollMs);
    const next = await locator.boundingBox();
    if (
      prev != null &&
      next != null &&
      prev.x === next.x &&
      prev.y === next.y &&
      prev.width === next.width &&
      prev.height === next.height
    ) {
      return;
    }
    prev = next;
  }
}
