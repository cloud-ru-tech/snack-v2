import { MouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Item, NextListItem } from '../src/components/Items';
import { buildLevelItems, nextListOption, resolveItemByPath } from '../src/helperComponents/MobileDroplist/utils';

const click = {} as MouseEvent<HTMLElement>;

const nested: NextListItem = { type: 'next-list', id: 'zone', content: { label: 'Зона' }, items: [{ id: 'a' }] };
const tree: Item[] = [{ id: 'first' }, { type: 'group', label: 'Группа', items: [{ id: 'inner' }, nested] }];

describe('MobileDroplist utils', () => {
  it('resolveItemByPath находит айтем по индексному пути', () => {
    expect(resolveItemByPath(tree, [1, 1])).toBe(nested);
    expect(resolveItemByPath(tree, [0, 3])).toBeUndefined();
  });

  it('nextListOption берёт label из content', () => {
    expect(nextListOption(nested)).toBe('Зона');
    expect(nextListOption({ type: 'next-list', items: [], content: 'text' })).toBeUndefined();
  });

  it('next-list становится базовым айтемом, клик уводит на уровень по пути', () => {
    const onDrill = vi.fn();
    const onClick = vi.fn();
    const [group] = buildLevelItems([{ type: 'group', items: [{ ...nested, onClick }] }], onDrill, vi.fn(), false);
    const [item] = (group as { items: Item[] }).items;

    expect(item).not.toHaveProperty('type');
    expect(item).not.toHaveProperty('items');
    (item as { onClick(e: MouseEvent<HTMLElement>): void }).onClick(click);
    expect(onClick).toHaveBeenCalledOnce();
    expect(onDrill).toHaveBeenCalledWith([0, 0]);
  });

  it('группа без items не роняет построение уровня', () => {
    const items = [{ type: 'group', divider: true }] as unknown as Item[];
    expect(buildLevelItems(items, vi.fn(), vi.fn(), false)).toEqual([{ type: 'group', divider: true, items: [] }]);
  });

  it('closeOnClick закрывает sheet после клика по базовому айтему', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    const [item] = buildLevelItems([{ id: 'x', onClick }], vi.fn(), onClose, true);

    (item as { onClick(e: MouseEvent<HTMLElement>): void }).onClick(click);
    expect(onClick).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();

    const plain = { id: 'y', onClick };
    expect(buildLevelItems([plain], vi.fn(), onClose, false)[0]).toBe(plain);
  });
});
