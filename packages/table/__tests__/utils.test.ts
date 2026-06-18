import { RankingInfo } from '@tanstack/match-sorter-utils';
import { Row } from '@tanstack/react-table';
import { describe, expect, it } from 'vitest';

import { fuzzyFilter } from '../src/utils';

// Узкий каст: fuzzyFilter читает из row только getValue(columnId),
// полный Row-инстанс tanstack для этого не нужен.
const makeRow = (value: unknown) => ({ getValue: () => value }) as unknown as Row<unknown>;

function runFilter(value: unknown, query: string) {
  const metas: { itemRank: RankingInfo }[] = [];
  const passed = fuzzyFilter(makeRow(value), 'name', query, meta => {
    metas.push(meta as { itemRank: RankingInfo });
  });

  return { passed, metas };
}

describe('fuzzyFilter', () => {
  it('passes for an exact match', () => {
    expect(runFilter('Apple', 'Apple').passed).toBe(true);
  });

  it('passes for a case-insensitive substring match', () => {
    expect(runFilter('Apple Pie', 'apple').passed).toBe(true);
    expect(runFilter('Apple Pie', 'pie').passed).toBe(true);
  });

  it('fails when there is no match', () => {
    expect(runFilter('Apple Pie', 'zzz').passed).toBe(false);
  });

  it('always reports itemRank through addMeta', () => {
    const matched = runFilter('Apple', 'Apple');
    const unmatched = runFilter('Apple', 'zzz');

    expect(matched.metas).toHaveLength(1);
    expect(matched.metas[0]?.itemRank.passed).toBe(true);

    expect(unmatched.metas).toHaveLength(1);
    expect(unmatched.metas[0]?.itemRank.passed).toBe(false);
  });

  it('handles non-string cell values', () => {
    expect(runFilter(42, '42').passed).toBe(true);
    expect(runFilter(null, 'a').passed).toBe(false);
  });
});
