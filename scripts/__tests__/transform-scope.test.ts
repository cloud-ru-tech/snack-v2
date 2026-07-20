import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  basename,
  buildRenames,
  collectShippedFiles,
  getExt,
  makeReplaceRegex,
  normalizeScope,
  replaceScopeInText,
  rewriteDeps,
  transformScope,
} from '../transform-scope-core.mts';

describe('normalizeScope', () => {
  it('adds a leading @ when missing', () => {
    expect(normalizeScope('ds', '@x')).toBe('@ds');
    expect(normalizeScope('cloud-ru', '@x')).toBe('@cloud-ru');
  });

  it('keeps an existing @ and trims whitespace', () => {
    expect(normalizeScope('@ds', '@x')).toBe('@ds');
    expect(normalizeScope('  @cloud-ru  ', '@x')).toBe('@cloud-ru');
  });

  it('falls back when raw is undefined', () => {
    expect(normalizeScope(undefined, '@ds')).toBe('@ds');
  });
});

describe('buildRenames', () => {
  it('maps only names under the from-scope, applying the prefix', () => {
    const renames = buildRenames(['@ds/button', '@ds/utils', 'classnames', '@other/x'], '@ds', '@cloud-ru', 'ds-');
    expect([...renames]).toEqual([
      ['@ds/button', '@cloud-ru/ds-button'],
      ['@ds/utils', '@cloud-ru/ds-utils'],
    ]);
  });

  it('works without a prefix', () => {
    const renames = buildRenames(['@ds/button'], '@ds', '@cloud-ru');
    expect(renames.get('@ds/button')).toBe('@cloud-ru/button');
  });

  it('preserves slugs that themselves contain the scope segment', () => {
    // A slug like `snack-button` must stay intact under the prefix.
    const renames = buildRenames(['@ds/snack-button'], '@ds', '@cloud-ru', 'ds-');
    expect(renames.get('@ds/snack-button')).toBe('@cloud-ru/ds-snack-button');
  });
});

describe('rewriteDeps', () => {
  const renames = new Map([['@ds/utils', '@cloud-ru/ds-utils']]);

  it('renames matching KEYS and preserves their VALUES', () => {
    const { changed, next } = rewriteDeps({ '@ds/utils': 'workspace:^', classnames: 'catalog:' }, renames);
    expect(changed).toBe(true);
    expect(next).toEqual({
      '@cloud-ru/ds-utils': 'workspace:^',
      classnames: 'catalog:',
    });
  });

  it('reports no change when nothing matches', () => {
    const { changed, next } = rewriteDeps({ classnames: 'catalog:' }, renames);
    expect(changed).toBe(false);
    expect(next).toEqual({ classnames: 'catalog:' });
  });

  it('handles an undefined deps field', () => {
    expect(rewriteDeps(undefined, renames)).toEqual({ changed: false, next: undefined });
  });
});

describe('makeReplaceRegex + replaceScopeInText', () => {
  const regex = makeReplaceRegex('@ds');

  it('rewrites the scope while preserving the subpath after the slug', () => {
    const { count, next } = replaceScopeInText(
      "@use '@ds/figma-variables/build/scss/tokens' as base;",
      regex,
      '@cloud-ru/ds-',
    );
    expect(count).toBe(1);
    expect(next).toBe("@use '@cloud-ru/ds-figma-variables/build/scss/tokens' as base;");
  });

  it('rewrites every occurrence in the string', () => {
    const { count, next } = replaceScopeInText(
      "import { Button } from '@ds/button'\nimport { x } from '@ds/utils'",
      regex,
      '@cloud-ru/ds-',
    );
    expect(count).toBe(2);
    expect(next).toContain('@cloud-ru/ds-button');
    expect(next).toContain('@cloud-ru/ds-utils');
  });

  it('leaves unrelated scopes untouched', () => {
    const { count, next } = replaceScopeInText("from '@cloud-ru/uikit-product-x'", regex, '@cloud-ru/ds-');
    expect(count).toBe(0);
    expect(next).toBe("from '@cloud-ru/uikit-product-x'");
  });
});

describe('getExt / basename', () => {
  it('treats declaration extensions as single units', () => {
    expect(getExt('index.d.ts')).toBe('.d.ts');
    expect(getExt('index.d.mts')).toBe('.d.mts');
    expect(getExt('styles.module.scss')).toBe('.scss');
    expect(getExt('README.md')).toBe('.md');
    expect(getExt('LICENSE')).toBe('');
  });

  it('returns the last path segment', () => {
    expect(basename('/a/b/c.ts')).toBe('c.ts');
    expect(basename('c.ts')).toBe('c.ts');
  });
});

// --- Filesystem-backed tests over a throwaway fixture -----------------------

function write(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

describe('collectShippedFiles', () => {
  let root: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'ship-'));
  });
  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('walks `files` dirs, adds implicit README, skips package.json/CHANGELOG', () => {
    write(join(root, 'src/index.ts'), '');
    write(join(root, 'src/styles.module.scss'), '');
    write(join(root, 'dist/esm/index.js'), '');
    write(join(root, 'README.md'), '');
    write(join(root, 'CHANGELOG.md'), '');
    write(join(root, 'package.json'), '{}');

    const shipped = collectShippedFiles(root, ['dist', 'src']).map(f => f.slice(root.length + 1));
    expect(new Set(shipped)).toEqual(
      new Set(['src/index.ts', 'src/styles.module.scss', 'dist/esm/index.js', 'README.md']),
    );
  });

  it('collects explicit root file entries (e.g. materials/index.scss)', () => {
    write(join(root, 'index.scss'), '');
    write(join(root, 'README.md'), '');
    const shipped = collectShippedFiles(root, ['index.scss', 'README.md']).map(f => f.slice(root.length + 1));
    expect(new Set(shipped)).toEqual(new Set(['index.scss', 'README.md']));
  });
});

describe('transformScope (integration)', () => {
  let root: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'scope-'));

    // packages/button — ships dist + src, deps to another workspace pkg.
    write(
      join(root, 'packages/button/package.json'),
      JSON.stringify({
        name: '@ds/button',
        version: '1.0.0',
        files: ['dist', 'src'],
        exports: { '.': { source: './src/index.ts', import: './dist/esm/index.js' } },
        dependencies: { '@ds/utils': 'workspace:^', classnames: 'catalog:' },
        peerDependencies: { react: '^19.0.0' },
      }),
    );
    write(join(root, 'packages/button/src/index.ts'), "import { x } from '@ds/utils'\nexport const b = x\n");
    write(
      join(root, 'packages/button/src/styles.module.scss'),
      "@use '@ds/figma-variables/build/scss/tokens' as base;\n",
    );
    write(join(root, 'packages/button/README.md'), 'Install: pnpm add @ds/button\n');
    write(join(root, 'packages/button/CHANGELOG.md'), '- @ds/button 1.0.0\n');
    write(join(root, 'packages/button/dist/esm/index.js'), "require('@ds/utils');\n");

    // packages/utils — target of button's dependency.
    write(
      join(root, 'packages/utils/package.json'),
      JSON.stringify({ name: '@ds/utils', version: '1.0.0', files: ['dist', 'src'] }),
    );
    write(join(root, 'packages/utils/src/index.ts'), 'export const x = 1\n');

    // packages/materials — ships a package-root scss + README listed in files.
    write(
      join(root, 'packages/materials/package.json'),
      JSON.stringify({
        name: '@ds/materials',
        version: '1.0.0',
        files: ['index.scss', 'src', 'README.md'],
      }),
    );
    write(join(root, 'packages/materials/index.scss'), "@use '@ds/figma-variables/build/scss/x';\n");
    write(join(root, 'packages/materials/README.md'), "@use '@ds/materials'\n");

    // packages/figma-variables — scope-clean build/**.
    write(
      join(root, 'packages/figma-variables/package.json'),
      JSON.stringify({ name: '@ds/figma-variables', version: '3.1.2', files: ['build/scss'] }),
    );
    write(join(root, 'packages/figma-variables/build/scss/tokens.scss'), ':root { --sn-c: #fff; }\n');

    // apps/storybook — private, renamed but sources never patched.
    write(
      join(root, 'apps/storybook/package.json'),
      JSON.stringify({
        name: '@ds/storybook',
        version: '1.0.0',
        private: true,
        dependencies: { '@ds/button': 'workspace:*' },
      }),
    );
    write(join(root, 'apps/storybook/src/preview.tsx'), "import { Button } from '@ds/button'\n");
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  const read = (rel: string): string => readFileSync(join(root, rel), 'utf8');

  it('renames package.json name and dep KEYS but preserves dep VALUES', () => {
    transformScope({ rootDir: root, fromScope: '@ds', toScope: '@cloud-ru', namePrefix: 'ds-' });
    const button = JSON.parse(read('packages/button/package.json'));
    expect(button.name).toBe('@cloud-ru/ds-button');
    expect(button.dependencies).toEqual({
      '@cloud-ru/ds-utils': 'workspace:^',
      classnames: 'catalog:',
    });
    expect(button.peerDependencies).toEqual({ react: '^19.0.0' });
  });

  it('also renames private apps/* package.json (for pnpm install relink)', () => {
    transformScope({ rootDir: root, fromScope: '@ds', toScope: '@cloud-ru', namePrefix: 'ds-' });
    const app = JSON.parse(read('apps/storybook/package.json'));
    expect(app.name).toBe('@cloud-ru/ds-storybook');
    expect(app.dependencies).toEqual({ '@cloud-ru/ds-button': 'workspace:*' });
  });

  it('patches shipped src (.ts/.scss), root scss and README', () => {
    transformScope({ rootDir: root, fromScope: '@ds', toScope: '@cloud-ru', namePrefix: 'ds-' });
    expect(read('packages/button/src/index.ts')).toContain("from '@cloud-ru/ds-utils'");
    expect(read('packages/button/src/styles.module.scss')).toContain(
      "@use '@cloud-ru/ds-figma-variables/build/scss/tokens'",
    );
    expect(read('packages/button/README.md')).toContain('pnpm add @cloud-ru/ds-button');
    expect(read('packages/button/dist/esm/index.js')).toContain("require('@cloud-ru/ds-utils')");
    expect(read('packages/materials/index.scss')).toContain("@use '@cloud-ru/ds-figma-variables/build/scss/x'");
    expect(read('packages/materials/README.md')).toContain("@use '@cloud-ru/ds-materials'");
  });

  it('does NOT patch CHANGELOG, apps sources, or scope-clean builds', () => {
    transformScope({ rootDir: root, fromScope: '@ds', toScope: '@cloud-ru', namePrefix: 'ds-' });
    expect(read('packages/button/CHANGELOG.md')).toContain('@ds/button');
    expect(read('apps/storybook/src/preview.tsx')).toContain("from '@ds/button'");
    expect(read('packages/figma-variables/build/scss/tokens.scss')).toBe(':root { --sn-c: #fff; }\n');
  });

  it('reports an accurate summary', () => {
    const summary = transformScope({
      rootDir: root,
      fromScope: '@ds',
      toScope: '@cloud-ru',
      namePrefix: 'ds-',
    });
    // button, utils, materials, figma-variables, storybook.
    expect(summary.renames.size).toBe(5);
    // button (name+dep), utils (name), materials (name), figma-variables (name), storybook (name+dep).
    expect(summary.pkgJsonUpdated).toBe(5);
    // button src/index.ts, src/styles.scss, README, dist/index.js; materials index.scss, README.
    expect(summary.shippedFilesPatched).toBe(6);
    expect(summary.shippedOccurrencesReplaced).toBe(6);
  });

  it('is idempotent: a second run is a clean no-op', () => {
    transformScope({ rootDir: root, fromScope: '@ds', toScope: '@cloud-ru', namePrefix: 'ds-' });
    const second = transformScope({
      rootDir: root,
      fromScope: '@ds',
      toScope: '@cloud-ru',
      namePrefix: 'ds-',
    });
    // Nothing under @ds/* remains, so buildRenames is empty → short-circuit.
    expect(second.renames.size).toBe(0);
    expect(second.pkgJsonUpdated).toBe(0);
    expect(second.shippedFilesPatched).toBe(0);
  });
});
