import { describe, expect, it } from 'vitest';

import {
  collectExternallyImportedNames,
  type ComponentDoc,
  formatPropsJson,
  isRicher,
  preferOwnRelatedNames,
  type RelatedEntry,
  relatedKeyFor,
  type RelatedRegistry,
  sortOutput,
} from '../gen-props-output.mts';
import counterContract from './fixtures/counter-props.contract.json';
import unsortedFixture from './fixtures/gen-props-unsorted.json';

const unsorted = unsortedFixture as Record<string, ComponentDoc>;

function expectAlphabeticallySorted(json: Record<string, ComponentDoc>, label: string): void {
  const compKeys = Object.keys(json);
  expect(compKeys, `${label}: components`).toEqual([...compKeys].sort());

  for (const compName of compKeys) {
    const comp = json[compName];

    const propKeys = Object.keys(comp.props);
    expect(propKeys, `${label}: ${compName}.props`).toEqual([...propKeys].sort());
    for (const [pname, p] of Object.entries(comp.props)) {
      if (p.values) {
        expect(p.values, `${label}: ${compName}.props.${pname}.values`).toEqual([...p.values].sort());
      }
      if (p.typeRefs) {
        expect(p.typeRefs, `${label}: ${compName}.props.${pname}.typeRefs`).toEqual([...p.typeRefs].sort());
      }
    }

    const relKeys = Object.keys(comp.relatedTypes);
    expect(relKeys, `${label}: ${compName}.relatedTypes`).toEqual([...relKeys].sort());
    for (const [rname, r] of Object.entries(comp.relatedTypes)) {
      if (r.kind === 'union') {
        expect(r.values, `${label}: ${compName}.relatedTypes.${rname}.values`).toEqual([...r.values].sort());
      }
      if (r.kind === 'interface') {
        const ipropKeys = Object.keys(r.props);
        expect(ipropKeys, `${label}: ${compName}.relatedTypes.${rname}.props`).toEqual([...ipropKeys].sort());
        for (const [pname, p] of Object.entries(r.props)) {
          if (p.values) {
            expect(p.values, `${label}: ${compName}.relatedTypes.${rname}.props.${pname}.values`).toEqual(
              [...p.values].sort(),
            );
          }
        }
      }
    }
  }
}

describe('gen-props output', () => {
  it('sortOutput is idempotent', () => {
    const once = sortOutput(unsorted);
    expect(sortOutput(once)).toEqual(once);
  });

  it('formatPropsJson is deterministic on re-run', () => {
    expect(formatPropsJson(unsorted)).toBe(formatPropsJson(unsorted));
  });

  // eslint-disable-next-line vitest/expect-expect
  it('sorts keys and union values alphabetically', () => {
    expectAlphabeticallySorted(sortOutput(unsorted), 'fixture');
  });

  it('isRicher prefers docs with more resolved props', () => {
    const sparse: ComponentDoc = {
      displayName: 'Counter',
      propsTypeName: null,
      props: {},
      relatedTypes: {},
    };
    const rich: ComponentDoc = {
      displayName: 'Counter',
      propsTypeName: 'CounterProps',
      props: {
        value: { type: 'number', required: true },
        appearance: { type: 'enum', required: false, values: ['primary'] },
      },
      relatedTypes: {},
    };

    expect(isRicher(rich, sparse)).toBe(true);
    expect(isRicher(sparse, rich)).toBe(false);
  });

  it('counter contract exposes workspace-resolved props shape', () => {
    // Regression guard: when @ds/* paths are not mapped to src, react-docgen-typescript
    // collapses CounterProps (uses WithSupportProps from @ds/utils) and emits zero props.
    const counter = (counterContract as { Counter: ComponentDoc }).Counter;
    expect(counter.propsTypeName).toBe('CounterProps');
    for (const expected of ['value', 'appearance', 'variant', 'size', 'plusLimit', 'color', 'className']) {
      expect(counter.props, `Counter.props.${expected}`).toHaveProperty(expected);
    }
  });
});

describe('related type name collisions', () => {
  // `Variant` объявлен и в @ds/ai-field-banner, и в @ds/ai-field-notice. Ключ в `relatedTypes` —
  // строка, поэтому разные объявления обязаны получать разные ключи.
  const bannerVariant: RelatedEntry = {
    declId: '/repo/packages/ai-field-banner/src/types.ts:120',
    base: 'Variant',
    own: false,
    pkgName: '@ds/ai-field-banner',
  };
  const noticeVariant: RelatedEntry = {
    declId: '/repo/packages/ai-field-notice/src/types.ts:200',
    base: 'Variant',
    own: true,
    pkgName: '@ds/ai-field-notice',
  };

  it('gives the bare name to the first declaration that claims it', () => {
    expect(relatedKeyFor('Variant', bannerVariant, new Map())).toBe('Variant');
  });

  it('returns the same key for a repeat visit of the same declaration', () => {
    const registry: RelatedRegistry = new Map([['Variant', bannerVariant]]);

    expect(relatedKeyFor('Variant', bannerVariant, registry)).toBe('Variant');
  });

  it('qualifies a foreign declaration when the name is already taken', () => {
    const registry: RelatedRegistry = new Map([['Variant', bannerVariant]]);

    expect(relatedKeyFor('Variant', noticeVariant, registry)).toBe('Variant (@ds/ai-field-notice)');
  });

  it('reuses the existing key when the same declaration arrives under an import alias', () => {
    const segment: RelatedEntry = {
      declId: '/repo/packages/segment-control/src/types.ts:40',
      base: 'Segment',
      own: true,
      pkgName: '@ds/segment-control',
    };
    const registry: RelatedRegistry = new Map([['Segment', segment]]);

    // `import { Segment as SegmentType }` — то же объявление, другое имя в месте ссылки.
    expect(relatedKeyFor('SegmentType', segment, registry)).toBe('Segment');
  });

  it("hands the bare name to the package's own type and rewrites every ref", () => {
    const registry: RelatedRegistry = new Map([
      ['Variant', bannerVariant],
      ['Variant (@ds/ai-field-notice)', { ...noticeVariant }],
    ]);
    const doc: Pick<ComponentDoc, 'props' | 'relatedTypes'> = {
      props: {
        variant: { type: 'Variant', required: true, typeRefs: ['Variant (@ds/ai-field-notice)'] },
        banner: { type: 'AiFieldBannerProps', required: false, typeRefs: ['AiFieldBannerProps'] },
      },
      relatedTypes: {
        Variant: { kind: 'union', values: ['agentic', 'critical'], own: false },
        'Variant (@ds/ai-field-notice)': { kind: 'union', values: ['password', 'ssh'], own: true },
        AiFieldBannerProps: {
          kind: 'interface',
          own: false,
          props: { variant: { type: 'Variant', required: false, typeRefs: ['Variant'] } },
        },
      },
    };

    preferOwnRelatedNames(doc, registry);

    expect(Object.keys(doc.relatedTypes).sort()).toEqual([
      'AiFieldBannerProps',
      'Variant',
      'Variant (@ds/ai-field-banner)',
    ]);
    // Свой union забрал голое имя, чужой получил пометку пакета.
    expect(doc.relatedTypes.Variant).toMatchObject({ values: ['password', 'ssh'], own: true });
    expect(doc.relatedTypes['Variant (@ds/ai-field-banner)']).toMatchObject({ values: ['agentic', 'critical'] });
    // Ссылки на обоих концах указывают на новые ключи, а не на прежние.
    expect(doc.props.variant.typeRefs).toEqual(['Variant']);
    const nested = doc.relatedTypes.AiFieldBannerProps;
    expect(nested.kind === 'interface' && nested.props.variant.typeRefs).toEqual(['Variant (@ds/ai-field-banner)']);
  });

  it('renames nothing when there is no collision', () => {
    const registry: RelatedRegistry = new Map([['Variant', noticeVariant]]);
    const doc: Pick<ComponentDoc, 'props' | 'relatedTypes'> = {
      props: { variant: { type: 'Variant', required: true, typeRefs: ['Variant'] } },
      relatedTypes: { Variant: { kind: 'union', values: ['password', 'ssh'], own: true } },
    };

    preferOwnRelatedNames(doc, registry);

    expect(Object.keys(doc.relatedTypes)).toEqual(['Variant']);
    expect(doc.props.variant.typeRefs).toEqual(['Variant']);
  });
});

describe('collectExternallyImportedNames', () => {
  it('collects named, default and namespace imports from other packages', () => {
    const names = collectExternallyImportedNames(`
      import { AbkhaziaSVG, RussiaSVG } from '@ds/icons/flags';
      import Button from '@ds/button';
      import * as utils from '@ds/utils';
    `);

    expect([...names].sort()).toEqual(['AbkhaziaSVG', 'Button', 'RussiaSVG', 'utils']);
  });

  it("ignores relative imports — the package's own code", () => {
    const names = collectExternallyImportedNames(`
      import { FieldPhone } from './FieldPhone';
      import { COUNTRIES } from '../constants';
    `);

    expect(names.size).toBe(0);
  });

  it('uses the local alias name, not the exported one', () => {
    const names = collectExternallyImportedNames(`import { RussiaSVG as Flag } from '@ds/icons/flags';`);

    expect(names.has('Flag')).toBe(true);
    expect(names.has('RussiaSVG')).toBe(false);
  });

  it('ignores side-effect imports and export-from statements', () => {
    const names = collectExternallyImportedNames(`
      import '@ds/icons/flags';
      export { RussiaSVG } from '@ds/icons/flags';
    `);

    expect(names.size).toBe(0);
  });

  it('skips components a package only references — regression guard for FieldPhone flags', () => {
    // countries.tsx раскладывает флаги по экспортируемым константам, из-за чего docgen
    // документировал 158 иконок как компоненты uikit-product-fields-predefined.
    const names = collectExternallyImportedNames(`
      import { RussiaSVG } from '@ds/icons/flags';

      export const RUSSIA_COUNTRY_CODE = { icon: RussiaSVG, code: '+7' };
    `);

    expect(names.has('RussiaSVG')).toBe(true);
  });
});
