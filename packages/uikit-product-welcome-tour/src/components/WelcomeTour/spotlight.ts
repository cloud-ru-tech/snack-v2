import { isBrowser } from '@ds/utils';

const UNION_ELEMENT_ID = 'ds-welcome-tour-spotlight-union';

/**
 * Узел, растянутый на общую область нескольких целей. Движок подсвечивает ровно один
 * элемент, поэтому список целей приходится сводить к такому «зеркалу»: своего DOM-узла,
 * покрывающего кнопку вместе с раскрытым списком, на странице нет.
 */
export function getUnionElement() {
  if (isBrowser()) return document.getElementById(UNION_ELEMENT_ID);

  return null;
}

export function removeUnionElement() {
  getUnionElement()?.remove();
}

function createUnionElement() {
  if (isBrowser()) {
    const union = document.createElement('div');

    union.id = UNION_ELEMENT_ID;
    union.setAttribute('aria-hidden', 'true');
    union.style.position = 'fixed';
    union.style.pointerEvents = 'none';
    document.body.append(union);

    return union;
  }

  return null;
}

export function syncUnionElement(elements: HTMLElement[]) {
  const rects = elements.map(element => element.getBoundingClientRect()).filter(rect => rect.width && rect.height);

  if (!rects.length || !isBrowser()) return null;

  // Пересоздаём: движок кеширует позицию цели и не следит за инлайн-стилями — на новом
  // шаге он должен получить другой элемент, иначе вырез останется от прошлого.
  removeUnionElement();

  const union = createUnionElement();

  if (!union) return null;

  const top = Math.min(...rects.map(rect => rect.top));
  const left = Math.min(...rects.map(rect => rect.left));

  union.style.top = `${top}px`;
  union.style.left = `${left}px`;
  union.style.width = `${Math.max(...rects.map(rect => rect.right)) - left}px`;
  union.style.height = `${Math.max(...rects.map(rect => rect.bottom)) - top}px`;

  return union;
}
