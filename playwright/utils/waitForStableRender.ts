import { Locator } from '@playwright/test';

function readRenderSignature(locator: Locator): Promise<string> {
  return locator.evaluate(root => {
    const round = (value: number) => Math.round(value * 10) / 10;

    // Узлы с бесконечной анимацией (skeleton-шиммер, спиннеры) исключаются: их transform и
    // bbox меняются каждый кадр, поэтому сигнатура не стабилизируется никогда. На снимке их
    // фризит `animations: 'disabled'`.
    const endlessTargets = new Set<Element>();
    // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- тело evaluate исполняется в браузере
    for (const animation of document.getAnimations()) {
      if (animation.effect?.getComputedTiming().iterations !== Infinity) continue;
      const target = (animation.effect as KeyframeEffect | null)?.target;
      if (!target) continue;
      // Вместе с поддеревом: transform на корне SVG-спиннера двигает bbox его `circle`
      // и `path`, хотя сами они не анимированы.
      endlessTargets.add(target);
      for (const descendant of target.querySelectorAll('*')) endlessTargets.add(descendant);
    }

    const nodes = [root, ...Array.from(root.querySelectorAll('*'))].filter(node => !endlessTargets.has(node));
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

  // Не устоявшееся поддерево означает, что снимок поймает произвольный кадр — тихий выход
  // по дедлайну выдал бы его за нормальный.
  throw new Error(
    `waitForStableRender: поддерево не стабилизировалось за ${timeoutMs}ms ` +
      `(stableForMs=${stableForMs}). Если источник изменений — бесконечная анимация, она ` +
      'должна исключаться из сигнатуры; если это живой таймер — сузь локатор или заморозь время.',
  );
}
