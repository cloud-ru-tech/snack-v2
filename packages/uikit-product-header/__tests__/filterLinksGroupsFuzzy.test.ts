import { describe, expect, it } from 'vitest';

import { InnerLink, LinksGroup } from '../src/components/MainMenu/types';
import { filterLinksGroupsFuzzy } from '../src/components/MainMenu/utils/filterLinksGroupsFuzzy';

const EMPTY_ON_CLICK = () => {};

function createItem(id: string, overrides: Partial<InnerLink> = {}): InnerLink {
  return {
    id,
    label: id,
    onClick: EMPTY_ON_CLICK,
    aliases: [],
    ...overrides,
  };
}

function createGroup(id: string, items: InnerLink[], overrides: Partial<LinksGroup> = {}): LinksGroup {
  return {
    id,
    label: { text: id },
    items,
    ...overrides,
  };
}

function resultItemIds(groups: LinksGroup[]): string[] {
  return groups.flatMap(group => group.items.map(item => item.id));
}

function nestedItemIds(groups: LinksGroup[]): string[] {
  return groups.flatMap(group => group.items.flatMap(item => item.items?.map(child => child.id) ?? []));
}

describe('filterLinksGroupsFuzzy', () => {
  it('returns the original groups when the query is empty', () => {
    const groups = [createGroup('infra', [createItem('compute')])];

    expect(filterLinksGroupsFuzzy('', groups)).toBe(groups);
  });

  it.each([
    {
      accessor: 'label',
      query: 'Infrastructure',
      create: () =>
        createGroup('infrastructure', [createItem('invoices', { label: 'Invoices' })], {
          label: { text: 'Infrastructure' },
        }),
    },
    {
      accessor: 'id',
      query: 'platformBilling',
      create: () => createGroup('platformBilling', [createItem('invoices', { label: 'Invoices' })]),
    },
    {
      accessor: 'alias',
      query: 'virtual private cloud catalog',
      create: () =>
        createGroup('network', [createItem('vpc', { label: 'VPC' })], {
          aliases: ['virtual private cloud catalog'],
        }),
    },
  ])('returns the whole group when the query matches the group $accessor', ({ query, create }) => {
    const group = create();
    const other = createGroup('ml', [createItem('notebooks', { label: 'Notebooks' })]);
    const result = filterLinksGroupsFuzzy(query, [group, other]);

    expect(result).toEqual([group]);
    expect(result[0]).toBe(group);
  });

  it.each([
    {
      accessor: 'label',
      query: 'Object storage',
      expectedId: 'storage',
      items: [createItem('compute', { label: 'Virtual machines' }), createItem('storage', { label: 'Object storage' })],
    },
    {
      accessor: 'id',
      query: 'bareMetalNodes',
      expectedId: 'bareMetalNodes',
      items: [
        createItem('bareMetalNodes', { label: 'Dedicated servers' }),
        createItem('sshKeys', { label: 'SSH keys' }),
      ],
    },
    {
      accessor: 'alias',
      query: 'jupyter lab workspace',
      expectedId: 'notebooks',
      items: [
        createItem('notebooks', { label: 'Notebooks', aliases: ['jupyter lab workspace'] }),
        createItem('inference', { label: 'ML Inference' }),
      ],
    },
  ])('keeps only the matching top-level item by $accessor', ({ query, expectedId, items }) => {
    const group = createGroup('infra', items);
    const other = createGroup('ml', [createItem('unrelated', { label: 'Unrelated card' })]);
    const result = filterLinksGroupsFuzzy(query, [group, other]);

    expect(result.map(matched => matched.id)).toEqual(['infra']);
    expect(resultItemIds(result)).toEqual([expectedId]);
  });

  it('keeps a top-level item on a fuzzy (typo) label match', () => {
    const group = createGroup('infra', [
      createItem('compute', { label: 'Virtual machines' }),
      createItem('storage', { label: 'Object storage' }),
    ]);

    const result = filterLinksGroupsFuzzy('objct storage', [group]);

    expect(resultItemIds(result)).toEqual(['storage']);
  });

  it('wraps a nested leaf match into a copied parent with only that child', () => {
    const reports = createItem('costReports', { label: 'Cost reports' });
    const alerts = createItem('costAlerts', { label: 'Budget alerts' });
    const parent = createItem('costControl', {
      label: 'Cost Control',
      items: [reports, alerts],
    });
    const group = createGroup('billing', [parent, createItem('invoices', { label: 'Invoices' })]);

    const result = filterLinksGroupsFuzzy('Budget alerts', [group]);

    expect(resultItemIds(result)).toEqual(['costControl']);
    expect(nestedItemIds(result)).toEqual(['costAlerts']);
    expect(result[0].items[0]).not.toBe(parent);
  });

  it.each([
    {
      accessor: 'id',
      query: 'agreementDetails',
      expectedParentId: 'agreements',
      expectedChildId: 'agreementDetails',
      parent: createItem('agreements', {
        label: 'Agreements',
        items: [createItem('agreementDetails', { label: 'Details' })],
      }),
    },
    {
      accessor: 'alias',
      query: 'peft adapter training',
      expectedParentId: 'finetuning',
      expectedChildId: 'lora',
      parent: createItem('finetuning', {
        label: 'Finetuning',
        items: [
          createItem('lora', {
            label: 'Low-rank adaptation',
            aliases: ['peft adapter training'],
          }),
        ],
      }),
    },
  ])('keeps a nested item matched by $accessor', ({ query, expectedParentId, expectedChildId, parent }) => {
    const result = filterLinksGroupsFuzzy(query, [createGroup('billing', [parent])]);

    expect(resultItemIds(result)).toEqual([expectedParentId]);
    expect(nestedItemIds(result)).toEqual([expectedChildId]);
  });

  it('collects several nested leaves under one parent without mutating the input group', () => {
    const alpha = createItem('leafAlpha', { label: 'UniqueAlphaLeaf' });
    const beta = createItem('leafBeta', { label: 'UniqueBetaLeaf' });
    const parent = createItem('nestedParent', {
      label: 'UniqueNestParent',
      items: [alpha, beta],
    });
    const group = createGroup('catalog', [parent]);
    const originalParentItems = parent.items;

    const result = filterLinksGroupsFuzzy('Leaf', [group]);

    expect(parent.items).toBe(originalParentItems);
    expect(parent.items?.map(item => item.id)).toEqual(['leafAlpha', 'leafBeta']);
    expect(result[0].items[0]).not.toBe(parent);
    expect(new Set(nestedItemIds(result))).toEqual(new Set(['leafAlpha', 'leafBeta']));
  });

  it('does not mutate or duplicate children when a full nested card is later matched by a child', () => {
    const disks = createItem('computeDisks', { label: 'Compute disks' });
    const images = createItem('computeImages', { label: 'Images' });
    const parent = createItem('computeFamily', {
      label: 'Compute',
      items: [disks, images],
    });
    const group = createGroup('infra', [parent]);
    const originalParentItems = parent.items;

    const result = filterLinksGroupsFuzzy('Compute', [group]);

    expect(parent.items).toBe(originalParentItems);
    expect(parent.items).toEqual([disks, images]);
    expect(resultItemIds(result)).toEqual(['computeFamily']);
    expect(nestedItemIds(result)).toEqual(['computeDisks', 'computeImages']);
  });

  it('skips hidden top-level items even when the query matches their label', () => {
    const group = createGroup('infra', [
      createItem('legacyVpn', { label: 'Legacy VPN gateway', hidden: true }),
      createItem('vpc', { label: 'VPC' }),
    ]);

    expect(filterLinksGroupsFuzzy('Legacy VPN gateway', [group])).toEqual([]);
  });

  it('skips hidden nested items even when the query matches their label', () => {
    const hiddenChild = createItem('deprecatedMeter', {
      label: 'Deprecated meter',
      hidden: true,
    });
    const parent = createItem('meters', {
      label: 'Meters',
      items: [hiddenChild],
    });
    const group = createGroup('billing', [parent]);

    expect(filterLinksGroupsFuzzy('Deprecated meter', [group])).toEqual([]);
  });

  it('retries the query with the opposite keyboard layout when the original layout has no hits', () => {
    const group = createGroup('ml', [createItem('notebooks', { label: 'Notebooks' })]);

    const result = filterLinksGroupsFuzzy('тщеуищщлы', [group]);

    expect(resultItemIds(result)).toEqual(['notebooks']);
  });

  it('returns an empty list when nothing matches in either keyboard layout', () => {
    const group = createGroup('ml', [createItem('notebooks', { label: 'Notebooks' })]);

    expect(filterLinksGroupsFuzzy('zzzz-no-such-service-qqqq', [group])).toEqual([]);
  });
});
