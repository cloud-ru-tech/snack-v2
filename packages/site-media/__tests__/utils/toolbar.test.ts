import { describe, expect, it } from 'vitest';

import { getTimeByKey, getTimeByPointer } from '../../src/helperComponents/Toolbar/utils';

describe('timeline seeking', () => {
  it('converts pointer coordinates and clamps positions outside the track', () => {
    const rect = { left: 100, width: 200 };

    expect(getTimeByPointer(150, rect, 60)).toEqual({ time: 15, offset: 50, width: 200 });
    expect(getTimeByPointer(0, rect, 60).time).toBe(0);
    expect(getTimeByPointer(500, rect, 60).time).toBe(60);
    expect(getTimeByPointer(150, { left: 100, width: 0 }, 60).time).toBe(0);
  });

  it('keeps keyboard seeking within the video and ignores unrelated keys', () => {
    expect(getTimeByKey('ArrowLeft', 5, 60)).toBe(0);
    expect(getTimeByKey('ArrowDown', 25, 60)).toBe(15);
    expect(getTimeByKey('ArrowRight', 55, 60)).toBe(60);
    expect(getTimeByKey('ArrowUp', 25, 60)).toBe(35);
    expect(getTimeByKey('Home', 25, 60)).toBe(0);
    expect(getTimeByKey('End', 25, 60)).toBe(60);
    expect(getTimeByKey('Tab', 25, 60)).toBeUndefined();
  });
});
