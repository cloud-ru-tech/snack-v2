import { describe, expect, it } from 'vitest';

import {
  getFavoriteInsertIndex,
  getInsertIndexByRects,
  getServiceFavoriteDragId,
  getServiceSourceDragId,
  resolveFavoriteOrderOnDragEnd,
} from '../src/components/MainMenu/utils/dnd';

describe('getInsertIndexByRects', () => {
  const overRect = { top: 100, height: 40 };

  it('inserts before when referenceY is above the over center', () => {
    expect(getInsertIndexByRects(3, 110, overRect)).toBe(3);
  });

  it('inserts after when referenceY is below the over center', () => {
    expect(getInsertIndexByRects(3, 130, overRect)).toBe(4);
  });

  it('falls back to overIndex when referenceY or overRect is missing', () => {
    expect(getInsertIndexByRects(2, null, overRect)).toBe(2);
    expect(getInsertIndexByRects(2, 130, null)).toBe(2);
  });
});

describe('getFavoriteInsertIndex', () => {
  const favoriteIds = ['a', 'b', 'c', 'd', 'e'];
  const overRect = { top: 200, height: 40 };

  it('returns 0 when over the drop zone and favorites are empty', () => {
    expect(
      getFavoriteInsertIndex({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: 'favorites-drop-zone',
        favoriteIds: [],
      }),
    ).toBe(0);
  });

  it('ignores the drop zone when favorites already have cards', () => {
    expect(
      getFavoriteInsertIndex({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: 'favorites-drop-zone',
        favoriteIds,
      }),
    ).toBeNull();
  });

  it('uses referenceY against the over card (not a large active card center)', () => {
    expect(
      getFavoriteInsertIndex({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: getServiceFavoriteDragId('d'),
        favoriteIds,
        referenceY: 210,
        overRect,
      }),
    ).toBe(3);

    expect(
      getFavoriteInsertIndex({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: getServiceFavoriteDragId('d'),
        favoriteIds,
        referenceY: 230,
        overRect,
      }),
    ).toBe(4);
  });

  it('returns null when dragging an already favorite source card', () => {
    expect(
      getFavoriteInsertIndex({
        activeId: getServiceSourceDragId('group', 'a'),
        overId: getServiceFavoriteDragId('b'),
        favoriteIds,
        referenceY: 230,
        overRect,
      }),
    ).toBeNull();
  });
});

describe('resolveFavoriteOrderOnDragEnd', () => {
  const favoriteIds = ['a', 'b', 'c', 'd', 'e'];
  const overRect = { top: 200, height: 40 };

  it('inserts a new service before the over card when pointer is in the upper half', () => {
    expect(
      resolveFavoriteOrderOnDragEnd({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: getServiceFavoriteDragId('e'),
        favoriteIds,
        referenceY: 210,
        overRect,
      }),
    ).toEqual(['a', 'b', 'c', 'd', 'new', 'e']);
  });

  it('inserts a new service after the over card when pointer is in the lower half', () => {
    expect(
      resolveFavoriteOrderOnDragEnd({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: getServiceFavoriteDragId('e'),
        favoriteIds,
        referenceY: 230,
        overRect,
      }),
    ).toEqual(['a', 'b', 'c', 'd', 'e', 'new']);
  });

  it('appends via drop zone only when favorites are empty', () => {
    expect(
      resolveFavoriteOrderOnDragEnd({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: 'favorites-drop-zone',
        favoriteIds: [],
      }),
    ).toEqual(['new']);
  });

  it('does not insert via drop zone when favorites already have cards', () => {
    expect(
      resolveFavoriteOrderOnDragEnd({
        activeId: getServiceSourceDragId('group', 'new'),
        overId: 'favorites-drop-zone',
        favoriteIds,
      }),
    ).toBeNull();
  });
});
