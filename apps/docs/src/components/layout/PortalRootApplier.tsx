import { getGlobalPortalRoot } from '@ds/portal-context';
import { useEffect } from 'react';

const PORTAL_ROOT_ID = 'ds-portal-root';

// Находит выделенный контейнер порталов (#ds-portal-root, объявлен в DocsLayout последним
// ребёнком body с высоким z-index) и на крайний случай создаёт его. Возвращает узел либо body.
function resolvePortalRoot(): HTMLElement {
  let root = document.getElementById(PORTAL_ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = PORTAL_ROOT_ID;
    document.body.appendChild(root);
  }
  return root;
}

// Инициализация на уровне модуля — глобальный корень порталов задан ДО того, как островки демо
// откроют свой первый портал.
if (typeof document !== 'undefined') {
  getGlobalPortalRoot().current = resolvePortalRoot();
}

/**
 * Невидимый остров: объявляет `#ds-portal-root` глобальным корнем порталов на весь портал доков, как
 * это делает оболочка реального прод-приложения (`getGlobalPortalRoot().current = …`). Контейнер
 * лежит последним ребёнком body с z-index выше хрома доков, поэтому оверлеи (Modal/Drawer/Popover)
 * рисуются над хедером и сайдбаром. Внутри контейнера порядок по DOM сохраняется — тултип, открытый
 * из модалки, остаётся над ней (как и задумано в DS, где у оверлеев z-index 0).
 *
 * Благодаря `Symbol.for`-синглтону из `@ds/portal-context` значение общее для всех независимых
 * React-островков Astro — поэтому демо с Tooltip / Popover / Modal / Drawer / Select больше не нужно
 * оборачивать в свой `PortalContextProvider`. Тема `sn-*` живёт на `<html>`, контейнер её наследует.
 */
export function PortalRootApplier() {
  useEffect(() => {
    const apply = () => {
      getGlobalPortalRoot().current = resolvePortalRoot();
    };
    apply();
    // После SPA-перехода Astro заменяет содержимое body; контейнер помечен transition:persist и
    // переживает swap, но переустанавливаем ссылку на случай его пересоздания.
    document.addEventListener('astro:after-swap', apply);
    return () => document.removeEventListener('astro:after-swap', apply);
  }, []);

  return null;
}
