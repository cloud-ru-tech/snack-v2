import { Locator } from '@playwright/test';

import { waitForStableBbox } from './waitForStableBbox';

/**
 * Ждёт, пока элемент въедет во вьюпорт и перестанет двигаться.
 *
 * Для выезжающих поверхностей (bottom-sheet, drawer) одного `waitForStableBbox`
 * мало: между монтированием и стартом выезда есть фаза покоя — элемент уже
 * `visible`, но стоит за нижней границей экрана. Два подряд идущих замера bbox
 * попадают в эту паузу, «стабильность» срабатывает раньше времени, и снимок
 * ловит пустой экран (на медленной машине воспроизводится стабильно).
 *
 * Поэтому сначала дожидаемся, что элемент реально попал во вьюпорт, и только
 * потом отдаём управление стандартной проверке стабильности bbox.
 */
export async function waitForSettledInViewport(
  locator: Locator,
  { pollMs = 50, timeoutMs = 5000 }: { pollMs?: number; timeoutMs?: number } = {},
): Promise<void> {
  const page = locator.page();
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const box = await locator.boundingBox();
    const viewport = page.viewportSize();

    if (box != null && viewport != null && box.y < viewport.height && box.y + box.height > 0) {
      break;
    }

    await page.waitForTimeout(pollMs);
  }

  await waitForStableBbox(locator, { pollMs });
}
