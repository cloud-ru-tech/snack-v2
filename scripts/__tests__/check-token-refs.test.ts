import { describe, expect, it } from 'vitest';

import {
  findMissing,
  formatStaleReport,
  hasMissing,
  parseSlugList,
  scanText,
  scanTexts,
  simplifyIgnoreGlobs,
  toPublishedName,
} from '../check-token-refs-core.mts';

describe('scanText', () => {
  it('splits a var() chain into primary and fallback refs', () => {
    const { refs } = scanText('.a{font-weight:var(--sn-a, var(--sn-b, var(--sn-c, 400)))}');

    expect(refs.get('--sn-a')).toBe('primary');
    expect(refs.get('--sn-b')).toBe('fallback');
    expect(refs.get('--sn-c')).toBe('fallback');
  });

  it('treats a ref after a comma with line breaks as fallback', () => {
    const { refs } = scanText('.a{color:var(--sn-a,\n    var(--sn-b))}');

    expect(refs.get('--sn-b')).toBe('fallback');
  });

  it('keeps primary when the same token is also used as fallback elsewhere', () => {
    const { refs } = scanText('.a{color:var(--sn-x, var(--sn-y))} .b{color:var(--sn-y)}');

    expect(refs.get('--sn-y')).toBe('primary');
  });

  it('does not treat function arguments as fallbacks', () => {
    const { refs } = scanText('.a{width:calc(var(--sn-a) + var(--sn-b))}');

    expect(refs.get('--sn-a')).toBe('primary');
    expect(refs.get('--sn-b')).toBe('primary');
  });

  it('collects CSS declarations, JS style-object keys and setProperty calls', () => {
    const { declared, refs } = scanText(
      [
        '.sn-dark{--sn-a: 1px;}',
        'const s = { "--sn-b": value };',
        "el.style.setProperty('--sn-c', v);",
        '.x{color:var(--sn-d)}',
      ].join('\n'),
    );

    expect([...declared].sort()).toEqual(['--sn-a', '--sn-b', '--sn-c']);
    expect(declared.has('--sn-d')).toBe(false);
    expect(refs.has('--sn-d')).toBe(true);
  });

  it('ignores custom properties outside the --sn- namespace', () => {
    const { declared, refs } = scanText('.a{--local: 1px; color: var(--other, var(--local))}');

    expect(declared.size).toBe(0);
    expect(refs.size).toBe(0);
  });
});

describe('findMissing', () => {
  const known = new Set(['--sn-a', '--sn-b']);

  it('returns nothing when every ref is a known token', () => {
    const missing = findMissing(scanText('.a{color:var(--sn-a, var(--sn-b))}'), known);

    expect(hasMissing(missing)).toBe(false);
  });

  it('reports unknown refs split by kind, sorted', () => {
    const missing = findMissing(scanText('.a{color:var(--sn-z, var(--sn-a, var(--sn-y)))} .b{gap:var(--sn-x)}'), known);

    expect(missing).toEqual({ primary: ['--sn-x', '--sn-z'], fallback: ['--sn-y'] });
    expect(hasMissing(missing)).toBe(true);
  });

  it('does not report tokens the package declares itself', () => {
    const missing = findMissing(scanText('.a{--sn-local: 4px; padding:var(--sn-local)}'), known);

    expect(hasMissing(missing)).toBe(false);
  });

  it('merges several files of one package', () => {
    const scan = scanTexts(['.a{--sn-local: 4px}', '.b{padding:var(--sn-local)}']);

    expect(hasMissing(findMissing(scan, known))).toBe(false);
  });
});

describe('toPublishedName', () => {
  it('renames the scope and adds the prefix', () => {
    expect(toPublishedName('@ds/button', '@ds', '@cloud-ru', 'ds-')).toBe('@cloud-ru/ds-button');
  });

  it('leaves names from other scopes as is', () => {
    expect(toPublishedName('@other/button', '@ds', '@cloud-ru', 'ds-')).toBe('@other/button');
  });
});

describe('parseSlugList', () => {
  it('parses the changed-packages output', () => {
    expect([...parseSlugList('button,typography\n')]).toEqual(['button', 'typography']);
  });

  it('returns an empty set for empty output', () => {
    expect(parseSlugList('').size).toBe(0);
  });
});

describe('simplifyIgnoreGlobs', () => {
  it('shortens package globs, drops globs outside packages and merges case variants', () => {
    expect(
      simplifyIgnoreGlobs([
        '**/*.md',
        '**/*.MD',
        '**/CHANGELOG.md',
        './scripts/**/*',
        'packages/*/stories/**/*.*',
        'packages/*/docs/**/*.*',
      ]),
    ).toEqual(['*.md', 'CHANGELOG.md', 'stories/', 'docs/']);
  });
});

describe('formatStaleReport', () => {
  const typography = {
    slug: 'typography',
    label: '@cloud-ru/ds-typography',
    version: '1.0.0',
    missing: { primary: [], fallback: ['--sn-a', '--sn-b', '--sn-c', '--sn-d'] },
  };

  it('describes each package on its own lines with the kind of refs inline', () => {
    const text = formatStaleReport([typography], { mode: 'registry', ignoreChanges: [], verbose: false }).join('\n');

    expect(text).toContain('Нужно выпустить пакеты: 1');
    expect(text).toContain('@cloud-ru/ds-typography@1.0.0 (packages/typography)');
    expect(text).toContain('устарело в fallback, на отрисовку не влияет, 4: --sn-a, --sn-b, --sn-c и ещё 1');
    expect(text).toContain('--verbose');
    expect(text).not.toContain('сломано');
  });

  it('gives the fix-commit hint with short ignored paths in registry mode', () => {
    const text = formatStaleReport([typography], {
      mode: 'registry',
      ignoreChanges: ['**/*.md', 'packages/*/docs/**/*.*'],
      verbose: false,
    }).join('\n');

    expect(text).toContain('git commit -m "fix');
    expect(text).toContain('Правки в *.md, docs/ не подходят');
  });

  it('suggests rebuilding in local mode', () => {
    const text = formatStaleReport([typography], { mode: 'local', ignoreChanges: [], verbose: true }).join('\n');

    expect(text).toContain('Нужно пересобрать пакеты: 1');
    expect(text).toContain('pnpm build:pkg');
    expect(text).not.toContain('git commit');
    expect(text).not.toContain('--verbose');
  });

  it('warns that a rebuild is not enough for broken primary refs', () => {
    const broken = { ...typography, missing: { primary: ['--sn-x'], fallback: [] } };
    const text = formatStaleReport([broken], { mode: 'registry', ignoreChanges: [], verbose: false }).join('\n');

    expect(text).toContain('сломано, стиль уже не работает, 1: --sn-x');
    expect(text).toContain('сначала замени токен в исходниках');
  });

  it('never breaks a sentence across lines', () => {
    const lines = formatStaleReport([typography], { mode: 'registry', ignoreChanges: [], verbose: false });

    for (const line of lines.filter(Boolean)) expect(line).not.toMatch(/[—,]$/);
  });
});
