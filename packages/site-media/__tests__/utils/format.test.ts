import { expect, it } from 'vitest';

import { formatRate, formatTime } from '../../src/utils';

it('formats time and playback rates', () => {
  expect(formatTime(-1)).toBe('0:00');
  expect(formatTime(65.9)).toBe('1:05');
  expect(formatTime(3661)).toBe('1:01:01');
  expect(formatRate(1.25)).toBe('1,25x');
});
