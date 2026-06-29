import { Tree } from '@ds/tree';
import { useEffect, useMemo, useState } from 'react';

import styles from './TocTree.module.scss';

// Тип выводим из значения `Tree` (см. NavTree).
type TreeData = Parameters<typeof Tree>[0]['data'];
type TreeNode = TreeData[number];

export type TocNode = {
  slug: string;
  text: string;
  children: TocNode[];
};

function toTreeData(nodes: TocNode[]): TreeData {
  return nodes.map<TreeNode>(n =>
    n.children.length
      ? { id: n.slug, title: n.text, href: `#${n.slug}`, nested: toTreeData(n.children) }
      : { id: n.slug, title: n.text, href: `#${n.slug}` },
  );
}

function collectParentIds(nodes: TocNode[], acc: string[] = []): string[] {
  for (const n of nodes) {
    if (n.children.length) {
      acc.push(n.slug);
      collectParentIds(n.children, acc);
    }
  }
  return acc;
}

function collectSlugs(nodes: TocNode[], acc: string[] = []): string[] {
  for (const n of nodes) {
    acc.push(n.slug);
    collectSlugs(n.children, acc);
  }
  return acc;
}

export function TocTree({ nodes }: { nodes: TocNode[] }) {
  const data = useMemo(() => toTreeData(nodes), [nodes]);
  const slugs = useMemo(() => collectSlugs(nodes), [nodes]);
  // Секции раскрыты по умолчанию; шеврон позволяет свернуть.
  const [expanded, setExpanded] = useState<string[]>(() => collectParentIds(nodes));
  const [active, setActive] = useState<string | undefined>(undefined);

  // Scroll-spy: подсвечиваем заголовок, верх которого пересёк верхнюю зону вьюпорта.
  useEffect(() => {
    const targets = slugs.map(s => document.getElementById(s)).filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-56px 0px -60% 0px', threshold: 0 },
    );
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, [slugs]);

  return (
    <Tree
      className={styles.toc}
      data={data}
      selectionMode='single'
      selected={active}
      expandedNodes={expanded}
      onExpand={setExpanded}
      showIcons={false}
      showLines={false}
      size='s'
      titleMaxLines={3}
    />
  );
}
