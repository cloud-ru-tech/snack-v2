/* eslint-disable vitest/no-conditional-expect, @typescript-eslint/no-non-null-assertion */
import { sync as glob } from 'glob';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const root = resolve(__dirname, '../..');

function readAllPropsJson(): Map<string, string> {
  // packages/icons is excluded from gen:props (see glob ignore in scripts/gen-props.mts).
  const files = glob('packages/*/docs/props.json', {
    cwd: root,
    absolute: true,
    ignore: ['**/packages/icons/**'],
  });
  const m = new Map<string, string>();
  for (const f of files) m.set(f.replace(root + '/', ''), readFileSync(f, 'utf8'));
  return m;
}

describe('gen-props', () => {
  let firstRun: Map<string, string>;
  let secondRun: Map<string, string>;

  beforeAll(() => {
    execSync('pnpm gen:props', { cwd: root, stdio: 'pipe' });
    firstRun = readAllPropsJson();
    execSync('pnpm gen:props', { cwd: root, stdio: 'pipe' });
    secondRun = readAllPropsJson();
  }, 240_000);

  it('produces identical output on re-run (idempotent / deterministic order)', () => {
    expect([...secondRun.keys()].sort()).toEqual([...firstRun.keys()].sort());
    for (const [path, content] of firstRun) {
      expect(secondRun.get(path), `${path} differs between runs`).toBe(content);
    }
  });

  it('keys and union values are alphabetically sorted in every props.json', () => {
    type Prop = { values?: string[] };
    type Related =
      | { kind: 'union'; values: string[] }
      | { kind: 'interface'; props: Record<string, Prop> }
      | { kind: 'alias' };
    type Comp = { props: Record<string, Prop>; relatedTypes: Record<string, Related> };

    for (const [path, content] of firstRun) {
      const json = JSON.parse(content) as Record<string, Comp>;
      const compKeys = Object.keys(json);
      expect(compKeys, `${path}: components`).toEqual([...compKeys].sort());

      for (const compName of compKeys) {
        const comp = json[compName];

        const propKeys = Object.keys(comp.props);
        expect(propKeys, `${path}: ${compName}.props`).toEqual([...propKeys].sort());
        for (const [pname, p] of Object.entries(comp.props)) {
          if (p.values) {
            expect(p.values, `${path}: ${compName}.props.${pname}.values`).toEqual([...p.values].sort());
          }
        }

        const relKeys = Object.keys(comp.relatedTypes);
        expect(relKeys, `${path}: ${compName}.relatedTypes`).toEqual([...relKeys].sort());
        for (const [rname, r] of Object.entries(comp.relatedTypes)) {
          if (r.kind === 'union') {
            expect(r.values, `${path}: ${compName}.relatedTypes.${rname}.values`).toEqual([...r.values].sort());
          }
          if (r.kind === 'interface') {
            const ipropKeys = Object.keys(r.props);
            expect(ipropKeys, `${path}: ${compName}.relatedTypes.${rname}.props`).toEqual([...ipropKeys].sort());
            for (const [pname, p] of Object.entries(r.props)) {
              if (p.values) {
                expect(p.values, `${path}: ${compName}.relatedTypes.${rname}.props.${pname}.values`).toEqual(
                  [...p.values].sort(),
                );
              }
            }
          }
        }
      }
    }
  });

  it('resolves @ds/* workspace types (Counter exposes its real props)', () => {
    // Regression guard: when @ds/* paths are not mapped to src, react-docgen-typescript
    // collapses CounterProps (uses WithSupportProps from @ds/utils) and emits zero props.
    const content = firstRun.get('packages/counter/docs/props.json');
    expect(content, 'packages/counter/docs/props.json missing').toBeDefined();
    const counter = (JSON.parse(content!) as { Counter?: { propsTypeName: string; props: Record<string, unknown> } })
      .Counter;
    expect(counter, 'Counter component missing').toBeDefined();
    expect(counter!.propsTypeName).toBe('CounterProps');
    for (const expected of ['value', 'appearance', 'variant', 'size', 'plusLimit', 'color', 'className']) {
      expect(counter!.props, `Counter.props.${expected}`).toHaveProperty(expected);
    }
  });
});
