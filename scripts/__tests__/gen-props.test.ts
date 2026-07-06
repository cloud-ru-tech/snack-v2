import { describe, expect, it } from 'vitest';

import { type ComponentDoc, formatPropsJson, isRicher, sortOutput } from '../gen-props-output.mts';
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
