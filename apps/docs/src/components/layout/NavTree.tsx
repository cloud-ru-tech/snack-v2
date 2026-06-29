import { Counter } from '@ds/counter';
import { QuestionTooltip } from '@ds/tooltip';
import { Tree } from '@ds/tree';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './NavTree.module.scss';

// Тип выводим из значения `Tree`, а не импортом типа из @ds/*: vite SSR docs ломает value-импорт чистого типа.
type TreeData = Parameters<typeof Tree>[0]['data'];
type TreeNode = TreeData[number];

export type NavItemData = {
  title: string;
  href: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  id: string;
  label: string;
  items: NavItemData[];
};

type NavTreeProps = {
  nav: NavGroupData[];
  /** Описание группы (для QuestionTooltip), ключ — id группы. */
  descriptions: Record<string, string>;
  /** Текущий путь (Astro.url.pathname) для корректного SSR-выделения до гидрации. */
  currentPath: string;
};

const GROUP_PREFIX = 'group:';

function normPath(p: string): string {
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
}

// Якорь @ds/tree вызывает stopPropagation, и клик не доходит до ClientRouter → полная перезагрузка.
// Навигируем сами; динамический импорт безопасен при SSR. Модификаторы (новая вкладка) @ds/tree отсекает до onClick.
function spaNavigate(href: string) {
  import('astro:transitions/client')
    .then(m => m.navigate(href))
    .catch(() => {
      window.location.href = href;
    });
}

function handleLinkClick(href: string) {
  return (e: { preventDefault(): void }) => {
    e.preventDefault();
    spaNavigate(href);
  };
}

/** Плоская карта: нормализованный href узла → путь раскрытия [groupId, packageId?]. */
function buildExpandIndex(nav: NavGroupData[]): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const group of nav) {
    const groupNodeId = GROUP_PREFIX + group.id;
    for (const item of group.items) {
      // На корневой странице пакета раскрываем и сам пакет — показать суб-страницы.
      index.set(normPath(item.href), item.children?.length ? [groupNodeId, item.href] : [groupNodeId]);
      if (item.children) {
        for (const child of item.children) {
          index.set(normPath(child.href), [groupNodeId, item.href]);
        }
      }
    }
  }
  return index;
}

type GroupLabelProps = { label: string; count: number; desc: string | undefined };

function GroupLabel({ label, count, desc }: GroupLabelProps) {
  return (
    <span className={styles.groupTitle}>
      <span className={styles.groupLabel}>{label}</span>
      {desc && (
        <span className={styles.groupInfo}>
          <QuestionTooltip tip={desc} triggerLabel={`О группе ${label}`} placement='right' />
        </span>
      )}
      <span className={styles.groupCount}>
        <Counter value={count} appearance='neutral' size='xs' color='decor' />
      </span>
    </span>
  );
}

function buildTreeData(nav: NavGroupData[], descriptions: Record<string, string>): TreeData {
  return nav.map<TreeNode>(group => ({
    id: GROUP_PREFIX + group.id,
    title: () => <GroupLabel label={group.label} count={group.items.length} desc={descriptions[group.id]} />,
    nested: group.items.map<TreeNode>(item =>
      item.children?.length
        ? {
            id: item.href,
            title: item.title,
            href: item.href,
            onClick: handleLinkClick(item.href),
            nested: item.children.map<TreeNode>(child => ({
              id: child.href,
              title: child.title,
              href: child.href,
              onClick: handleLinkClick(child.href),
            })),
          }
        : { id: item.href, title: item.title, href: item.href, onClick: handleLinkClick(item.href) },
    ),
  }));
}

export function NavTree({ nav, descriptions, currentPath }: NavTreeProps) {
  const data = useMemo(() => buildTreeData(nav, descriptions), [nav, descriptions]);
  const expandIndex = useMemo(() => buildExpandIndex(nav), [nav]);
  // Нормализованный href → id узла (href со слешем) для `selected`.
  const idByNorm = useMemo(() => {
    const m = new Map<string, string>();
    for (const [norm] of expandIndex) m.set(norm, norm);
    for (const group of nav) {
      for (const item of group.items) {
        m.set(normPath(item.href), item.href);
        item.children?.forEach(c => m.set(normPath(c.href), c.href));
      }
    }
    return m;
  }, [nav, expandIndex]);

  const [current, setCurrent] = useState(currentPath);

  const selectedId = idByNorm.get(normPath(current));
  const activePath = expandIndex.get(normPath(current)) ?? [];

  const [expanded, setExpanded] = useState<string[]>(() => activePath);

  // Остров transition:persist переживает SPA-переходы — обновляем активный путь на astro:page-load.
  useEffect(() => {
    const onLoad = () => setCurrent(window.location.pathname);
    document.addEventListener('astro:page-load', onLoad);
    return () => document.removeEventListener('astro:page-load', onLoad);
  }, []);

  // Раскрываем путь к активной странице; без активного узла (home) — оставляем состояние как есть.
  useEffect(() => {
    const path = expandIndex.get(normPath(current));
    if (path) setExpanded(prev => Array.from(new Set([...path, ...prev.filter(id => !id.startsWith(GROUP_PREFIX))])));
  }, [current, expandIndex]);

  // Скролл к активному пункту — только при смене страницы, не при ручном раскрытии групп.
  // Зависимость от `expanded` нужна, чтобы доскроллить после авто-раскрытия пути на
  // навигации; ref-гард не даёт скроллить, когда пользователь сам разворачивает чужую группу.
  const lastScrolledId = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!selectedId || selectedId === lastScrolledId.current) return;
    const scroller = document.getElementById('sidebar');
    const active = document.querySelector<HTMLElement>(`[data-node-id="${selectedId}"]`);
    if (!scroller || !active) return;
    const rect = active.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const offset = rect.top - scrollerRect.top + scroller.scrollTop;
    const viewTop = scroller.scrollTop;
    const viewBottom = viewTop + scroller.clientHeight;
    if (offset < viewTop + 24 || offset > viewBottom - 48) {
      scroller.scrollTop = Math.max(0, offset - scroller.clientHeight * 0.25);
    }
    lastScrolledId.current = selectedId;
  }, [selectedId, expanded]);

  const handleExpand = useCallback((keys: string[]) => setExpanded(keys), []);

  // Клик по строке домен-группы (без href) сворачивает/раскрывает её; пакеты навигируют по ссылке.
  const handleNodeClick = useCallback((node: TreeNode) => {
    if (node.nested && !node.href) {
      setExpanded(prev => (prev.includes(node.id) ? prev.filter(id => id !== node.id) : [...prev, node.id]));
    }
  }, []);

  return (
    <nav className={styles.nav} aria-label='Documentation'>
      <Tree
        className={styles.tree}
        data={data}
        selectionMode='single'
        selected={selectedId}
        expandedNodes={expanded}
        onExpand={handleExpand}
        onNodeClick={handleNodeClick}
        showIcons={false}
        showLines
        size='s'
        titleMaxLines={3}
      />
    </nav>
  );
}
