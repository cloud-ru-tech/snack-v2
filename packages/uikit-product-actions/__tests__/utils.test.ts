import { describe, expect, it } from 'vitest';

import { disableItems, getActionKey, hasVisibleActions } from '../src/utils';

describe('action identity', () => {
  it('keeps explicit ids independent from fallback indices', () => {
    expect(getActionKey({ id: '1', label: 'Первое' }, 0)).not.toBe(getActionKey({ label: 'Второе' }, 1));
    expect(getActionKey({ id: 'fixed', label: 'Действие' }, 0)).toBe(
      getActionKey({ id: 'fixed', label: 'Действие' }, 2),
    );
  });
  it('does not show an empty or hidden-only list', () => {
    expect(hasVisibleActions([])).toBe(false);
    expect(hasVisibleActions([{ hidden: true, label: 'Скрытое' }])).toBe(false);
    expect(hasVisibleActions([{ label: 'Видимое' }])).toBe(true);
  });
});

it('disables nested menu entries without mutating the source', () => {
  const leaf = { content: { label: 'Недоступно' } };
  const result = disableItems([
    { type: 'group', items: [{ type: 'next-list', content: { label: 'Вложенное' }, items: [leaf] }] },
  ]);
  expect(result).toEqual([
    {
      type: 'group',
      items: [
        { type: 'next-list', content: { label: 'Вложенное' }, disabled: true, items: [{ ...leaf, disabled: true }] },
      ],
    },
  ]);
  expect(leaf).not.toHaveProperty('disabled');
});
