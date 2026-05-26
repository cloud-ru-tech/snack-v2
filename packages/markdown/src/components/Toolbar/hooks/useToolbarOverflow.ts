import { useLayoutEffect } from '@ds/utils';
import { useRef, useState } from 'react';

import { ToolbarItemId } from '../../../types';

/**
 * Считает, сколько кнопок тулбара помещается по ширине, остальные — в overflow («Ещё»).
 * Возвращает `rootRef` (корень тулбара, под ResizeObserver), `moreButtonRef` (для измерения
 * «веса» overflow-группы) и `visibleCount` (число видимых кнопок).
 *
 * Края слотов кэшируются в полной раскладке (все кнопки, без More) и переиспользуются при
 * пересчёте — поэтому не нужно арифметически приближать гэпы/дивайдеры.
 */
export function useToolbarOverflow(items: ToolbarItemId[]) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLElement>(null);
  // Правый край каждого слота (отн. левого края тулбара), измеренный в ПОЛНОЙ раскладке.
  const slotEdgesRef = useRef<Map<string, number>>(new Map());
  // Реальная ширина группы «дивайдер + More» — измеряется, когда More присутствует в DOM.
  const moreReserveRef = useRef(48);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const edges = slotEdgesRef.current;
    edges.clear();

    let rafId = 0;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const padRight = parseFloat(getComputedStyle(root).paddingRight) || 0;
      // Правая граница контентной области тулбара (отн. левого края root).
      const limit = root.clientWidth - padRight;
      const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-toolbar-slot]'));

      // Кэшируем края только в полной раскладке (все items, без More) — иначе край
      // зависел бы от текущего visibleCount/набора дивайдеров и был бы неверным для пересчёта.
      if (slots.length === items.length) {
        for (const slot of slots) {
          const id = slot.dataset.toolbarItem;
          if (id) {
            edges.set(id, slot.getBoundingClientRect().right - rootRect.left);
          }
        }
      }

      // Реальный «вес» More-группы (дивайдер + гэпы + кнопка): от правого края последнего
      // видимого слота до правого края More-кнопки. Уточняется, как только More появляется.
      const moreEl = moreButtonRef.current;
      if (moreEl && slots.length > 0) {
        const lastRight =
          slots[slots.length - 1].getBoundingClientRect().right - rootRect.left - moreReserveRef.current;
        moreReserveRef.current = moreEl.getBoundingClientRect().right - rootRect.left - lastRight;
      }

      // Края ещё не собраны (нет полного рендера, напр. items только что изменились) —
      // показываем всё и перезамеряем на следующем кадре, когда все слоты окажутся в DOM.
      if (!items.every(id => edges.has(id))) {
        setVisibleCount(items.length);
        rafId = requestAnimationFrame(measure);
        return;
      }

      // Всё помещается без overflow — показываем все кнопки, без More.
      const fullRight = edges.get(items[items.length - 1]) ?? 0;
      if (fullRight <= limit) {
        setVisibleCount(items.length);
        return;
      }

      // Иначе — максимум k кнопок, после которых ещё влезает группа «│ More».
      const reserve = moreReserveRef.current;
      let fits = 0;
      for (const id of items) {
        if ((edges.get(id) ?? 0) + reserve > limit) {
          break;
        }

        fits += 1;
      }
      setVisibleCount(Math.max(fits, 1));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items]);

  return { rootRef, moreButtonRef, visibleCount };
}
