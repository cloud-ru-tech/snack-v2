import { Locator } from '@playwright/test';

function readRenderSignature(locator: Locator): Promise<string> {
  return locator.evaluate(root => {
    const round = (value: number) => Math.round(value * 10) / 10;

    const nodes = [root, ...Array.from(root.querySelectorAll('*'))];
    const states = nodes.map(node => {
      const { opacity, transform, visibility } = getComputedStyle(node);
      const { x, y, width, height } = node.getBoundingClientRect();
      // Инлайновый style ловит прогресс, прокинутый CSS-переменной (ProgressBar пишет
      // `--snack-progress-bar-value`), — в computed-стилях узла его не видно.
      const inlineStyle = node.getAttribute('style') ?? '';

      return [opacity, transform, visibility, inlineStyle, round(x), round(y), round(width), round(height)].join('|');
    });

    return `${root.textContent ?? ''}::${states.join(';')}`;
  });
}

/**
 * Ждёт, пока поддерево локатора перестанет меняться визуально.
 *
 * `waitForStableBbox` ловит только движение layout'а. Компонент, который меняет содержимое
 * на месте (AiFieldNotice прокручивает пункты описания абсолютно спозиционированными слоями),
 * для bbox неподвижен — снимок ловит произвольный кадр прокрутки, и diff гуляет между
 * прогонами. Здесь сигнатурой служит текст поддерева плюс `opacity` / `transform` /
 * `visibility` каждого узла: пока щёлкает таймер или играет transition, она меняется.
 *
 * `stableForMs` подбирается под шаг источника изменений — интервал таймера плюс длительность
 * transition. Меньшее значение примет паузу между шагами за покой.
 */
export async function waitForStableRender(
  locator: Locator,
  { stableForMs, pollMs = 100, timeoutMs = 15000 }: { stableForMs: number; pollMs?: number; timeoutMs?: number },
): Promise<void> {
  const page = locator.page();
  const deadline = Date.now() + timeoutMs;

  let signature = await readRenderSignature(locator);
  let stableSince = Date.now();

  while (Date.now() < deadline) {
    await page.waitForTimeout(pollMs);
    const next = await readRenderSignature(locator);

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
