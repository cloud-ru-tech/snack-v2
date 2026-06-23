import { Fragment, isValidElement, ReactNode } from 'react';

/**
 * Рендерит ли slot хоть какой-то видимый контент. В отличие от простой проверки
 * на `null` / `undefined`, отсекает «пустые» узлы, которые React не отрисовывает:
 * `false`, `''`, `0`, пустой массив, пустой `<></>`, а также массивы и фрагменты,
 * состоящие только из таких пустых узлов.
 */
export function isSlotFilled(node: ReactNode): boolean {
  if (node == null || typeof node === 'boolean' || node === '' || node === 0) {
    return false;
  }

  if (Array.isArray(node)) {
    return node.some(isSlotFilled);
  }

  if (isValidElement(node) && node.type === Fragment) {
    return isSlotFilled((node.props as { children?: ReactNode }).children);
  }

  return true;
}
