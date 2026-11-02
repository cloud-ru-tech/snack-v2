/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- jsdom component regression test. */
import { AdaptiveProvider } from '@ds/adaptive';
import { DroplistProps } from '@ds/list';
import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { FieldSelect } from '../src/components/FieldSelect/FieldSelect';
import { FieldSelectProps } from '../src/components/FieldSelect/types';

const { listProps } = vi.hoisted(() => ({ listProps: vi.fn<(props: DroplistProps) => void>() }));

vi.mock('@ds/list', async importOriginal => ({
  ...(await importOriginal<typeof import('@ds/list')>()),
  Droplist: (props: DroplistProps) => {
    listProps(props);
    return props.children;
  },
}));

const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

async function renderField(layoutType: 'mobile' | 'desktop', options: Partial<FieldSelectProps> = {}) {
  actEnv.IS_REACT_ACT_ENVIRONMENT = true;
  listProps.mockClear();
  const onSearch = vi.fn();
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);

  function Scenario() {
    const [query, setQuery] = useState('initial');
    return (
      <AdaptiveProvider layoutType={layoutType}>
        <FieldSelect
          {...options}
          items={options.items ?? []}
          placeholder='Company search'
          search={{
            value: query,
            onChange: next => {
              setQuery(next);
              onSearch(next);
            },
          }}
        />
      </AdaptiveProvider>
    );
  }

  await act(async () => root.render(<Scenario />));
  return {
    onSearch,
    async cleanup() {
      await act(async () => root.unmount());
      container.remove();
    },
  };
}

describe('FieldSelect mobile search', () => {
  it('should synchronize sheet search with the controlled query and server search callback', async () => {
    const field = await renderField('mobile', { autocomplete: true });
    try {
      const search = listProps.mock.lastCall?.[0].search;
      expect(search).toMatchObject({ value: 'initial', placeholder: 'Company search' });
      await act(async () => search?.onChange('new company'));
      expect(field.onSearch).toHaveBeenCalledExactlyOnceWith('new company');
      expect(listProps.mock.lastCall?.[0].search?.value).toBe('new company');
    } finally {
      await field.cleanup();
    }
  });

  it.each([
    ['desktop', { autocomplete: true }, false],
    ['mobile', { searchable: true, items: [] }, true],
    ['mobile', { searchable: true, items: [{ id: 'one', content: { label: 'One' } }] }, true],
    [
      'mobile',
      { searchable: true, items: Array.from({ length: 5 }, (_, id) => ({ id, content: { label: String(id) } })) },
      true,
    ],
    [
      'mobile',
      { searchable: true, items: Array.from({ length: 6 }, (_, id) => ({ id, content: { label: String(id) } })) },
      true,
    ],
    [
      'mobile',
      { searchable: false, items: Array.from({ length: 6 }, (_, id) => ({ id, content: { label: String(id) } })) },
      false,
    ],
    ['mobile', { searchable: false, autocomplete: true }, true],
    ['mobile', { searchable: false, allowCustomOption: true }, true],
    ['mobile', { searchable: false, allowCustomOption: true, addCustomOptionTriggers: ['blur'] }, false],
  ] as const)(
    'should show mobile search independently of the item count (%s, %j)',
    async (layoutType, options, expected) => {
      const field = await renderField(layoutType, options as Partial<FieldSelectProps>);
      try {
        expect(Boolean(listProps.mock.lastCall?.[0].search)).toBe(expected);
      } finally {
        await field.cleanup();
      }
    },
  );
});
