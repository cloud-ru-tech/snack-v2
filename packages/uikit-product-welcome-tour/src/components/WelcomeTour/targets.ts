import { isBrowser } from '@ds/utils';

import { TourTarget } from '../../types';
import { syncUnionElement } from './spotlight';

/** Предел ожидания целей, которые появляются после `onBeforeShow`, мс. */
const TARGETS_TIMEOUT = 1500;
/** Сколько одинаковых кадров подряд считаем признаком того, что цель встала на место. */
const STABLE_FRAMES = 3;
/** Предел ожидания стабильной позиции: бесконечная анимация внутри цели не должна вешать тур. */
const STABLE_TIMEOUT = 1000;

/** Приводит любой вид `TourTarget` к узлу. */
export function resolveTarget(target: TourTarget): HTMLElement | null {
  if (typeof target === 'string') return isBrowser() ? document.querySelector<HTMLElement>(target) : null;

  if (typeof target === 'function') return target();

  if (target && 'current' in target) return target.current;

  return target ?? null;
}

/**
 * Резолвит цель в набор узлов: строковый селектор берётся целиком (`querySelectorAll`),
 * потому что подсвечиваемый список состоит из отдельных пунктов без общей рамки.
 */
export function resolveTargets(target: TourTarget | TourTarget[]): HTMLElement[] {
  const targets = Array.isArray(target) ? target : [target];

  return targets.flatMap(item => {
    if (typeof item === 'string') {
      return isBrowser() ? [...document.querySelectorAll<HTMLElement>(item)] : [];
    }

    const element = resolveTarget(item);

    return element ? [element] : [];
  });
}

/**
 * Ждёт, пока найдутся все цели: списки и меню раскрываются асинхронно, и сразу после
 * `onBeforeShow` подсветка собралась бы по неполному набору узлов.
 */
async function waitForTargets(target: TourTarget | TourTarget[]) {
  const expected = Array.isArray(target) ? target.length : 1;
  const startedAt = performance.now();

  let elements = resolveTargets(target);

  while (elements.length < expected && performance.now() - startedAt < TARGETS_TIMEOUT) {
    await new Promise(resolve => {
      if (isBrowser()) requestAnimationFrame(resolve);
    });

    elements = resolveTargets(target);
  }

  return elements;
}

const rectKey = (element: HTMLElement) => {
  const { x, y, width, height } = element.getBoundingClientRect();

  return [x, y, width, height].map(Math.round).join(':');
};

/**
 * Ждёт, пока прямоугольник цели перестанет меняться. Меню и панели выезжают трансформацией:
 * ни `MutationObserver`, ни `ResizeObserver` её не видят, поэтому опрашиваем по кадрам.
 */
function waitForStableRect(element: HTMLElement) {
  return new Promise<void>(resolve => {
    if (isBrowser()) {
      const startedAt = performance.now();
      let previousKey = '';
      let stableFrames = 0;

      const tick = () => {
        const key = rectKey(element);

        stableFrames = key === previousKey ? stableFrames + 1 : 0;
        previousKey = key;

        if (stableFrames >= STABLE_FRAMES || performance.now() - startedAt > STABLE_TIMEOUT) {
          resolve();

          return;
        }

        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    } else {
      resolve();
    }
  });
}

function isFullyVisible(element: HTMLElement) {
  if (isBrowser()) {
    const { top, left, bottom, right, height, width } = element.getBoundingClientRect();
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;

    // Цель выше или шире экрана целиком показать нельзя — такую считаем видимой, если её
    // видно хоть сколько-нибудь.
    const fitsVertically = height <= viewportHeight ? top >= 0 && bottom <= viewportHeight : top <= 0 && bottom >= 0;
    const fitsHorizontally = width <= viewportWidth ? left >= 0 && right <= viewportWidth : left <= 0 && right >= 0;

    return fitsVertically && fitsHorizontally;
  }

  return true;
}

/**
 * Готовит шаг к показу: даёт отработать `onBeforeShow`, дожидается, пока цель встанет на
 * место, и подводит её в зону видимости. Скролл здесь свой, а не движка: тот считает
 * позицию от верха вьюпорта и во флекс-раскладках загоняет цель под шапку страницы.
 */
export async function prepareStep(target: TourTarget | TourTarget[], onBeforeShow?: () => Promise<void>) {
  await onBeforeShow?.();

  const elements = await waitForTargets(target);
  const [element] = elements;

  if (!element) return;

  await Promise.all(elements.map(waitForStableRect));

  if (!isFullyVisible(element)) {
    element.scrollIntoView({ block: 'center', inline: 'nearest' });

    await Promise.all(elements.map(waitForStableRect));
  }

  if (elements.length > 1) syncUnionElement(elements);
}
