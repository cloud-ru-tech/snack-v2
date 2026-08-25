import { describe, expect, it } from 'vitest';

import { defineColumns } from '../src/columnUtils';
import { toInfiniteTableProps } from '../src/presets/infiniteTable/toInfiniteTableProps';

type Row = { id: string };

describe('toInfiniteTableProps', () => {
  it('enables row virtualization by default', () => {
    const result = toInfiniteTableProps(
      {
        data: [{ id: '1' }],
        columns: defineColumns<Row>([{ key: 'id', header: 'ID' }]),
      },
      null,
    );

    expect(result.enableRowVirtualization).toBe(true);
  });

  it('respects explicit enableRowVirtualization=false', () => {
    const result = toInfiniteTableProps(
      {
        data: [{ id: '1' }],
        columns: defineColumns<Row>([{ key: 'id', header: 'ID' }]),
        enableRowVirtualization: false,
      },
      null,
    );

    expect(result.enableRowVirtualization).toBe(false);
  });
});
