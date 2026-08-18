import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { buildRenames } from '../transform-scope-core.mts';
import {
  collectWorkspacePackageNames,
  replaceKnownScope,
  transformStaticScope,
} from '../transform-static-scope-core.mts';

const RENAMES = buildRenames(['@ds/button', '@ds/figma-variables'], '@ds', '@cloud-ru', 'ds-');

describe('replaceKnownScope', () => {
  it('renames known packages and keeps their subpath', () => {
    const { count, next } = replaceKnownScope(
      "@use '@ds/figma-variables/build/scss/styles/styles.module' as base;",
      RENAMES,
      '@ds',
    );
    expect(next).toBe("@use '@cloud-ru/ds-figma-variables/build/scss/styles/styles.module' as base;");
    expect(count).toBe(1);
  });

  it('leaves slugs that are not workspace packages untouched', () => {
    const { count, next } = replaceKnownScope('пакеты `@ds/*`, флаг `--keep-scope`, `@ds/unknown`', RENAMES, '@ds');
    expect(next).toBe('пакеты `@ds/*`, флаг `--keep-scope`, `@ds/unknown`');
    expect(count).toBe(0);
  });

  it('renames a package that closes a sentence', () => {
    const { count, next } = replaceKnownScope('Обёртка над @ds/button. И @ds/button, и текст.', RENAMES, '@ds');
    expect(next).toBe('Обёртка над @cloud-ru/ds-button. И @cloud-ru/ds-button, и текст.');
    expect(count).toBe(2);
  });

  it('leaves scoped runtime identifiers that are not packages', () => {
    const { count, next } = replaceKnownScope("Symbol.for('@ds/supports-inner-ref')", RENAMES, '@ds');
    expect(next).toBe("Symbol.for('@ds/supports-inner-ref')");
    expect(count).toBe(0);
  });

  it('counts every occurrence in the text', () => {
    const { count, next } = replaceKnownScope(
      "pnpm add @ds/button\nimport { Button } from '@ds/button'",
      RENAMES,
      '@ds',
    );
    expect(next).toContain('pnpm add @cloud-ru/ds-button');
    expect(count).toBe(2);
  });
});

describe('transformStaticScope', () => {
  let dir: string;

  const write = (rel: string, content: string): void => {
    const full = join(dir, rel);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  };
  const read = (rel: string): string => readFileSync(join(dir, rel), 'utf8');

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'static-scope-'));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('patches built pages and leaves the contribution guide alone', () => {
    write('static/components/button/index.html', '<code>pnpm add @ds/button</code>');
    write('static/components/button/llms.txt', '# @ds/button');
    write('static/patterns/contribution-guide/index.html', '<code>@ds/button</code>');
    write('static/storybook/assets/story.js', "import{Button}from'@ds/button';");
    write('static/assets/logo.svg', '<svg data-pkg="@ds/button" />');

    const summary = transformStaticScope({
      staticDir: join(dir, 'static'),
      packageNames: ['@ds/button'],
      fromScope: '@ds',
      toScope: '@cloud-ru',
      namePrefix: 'ds-',
    });

    expect(read('static/components/button/index.html')).toContain('pnpm add @cloud-ru/ds-button');
    expect(read('static/components/button/llms.txt')).toBe('# @cloud-ru/ds-button');
    expect(read('static/storybook/assets/story.js')).toContain("'@cloud-ru/ds-button'");
    // Contributor-facing page and non-text assets stay as they were built.
    expect(read('static/patterns/contribution-guide/index.html')).toContain('@ds/button');
    expect(read('static/assets/logo.svg')).toContain('@ds/button');
    expect(summary.filesPatched).toBe(3);
    expect(summary.occurrencesReplaced).toBe(3);
  });

  it('rebuilds the compressed siblings left by the docs precompress step', () => {
    write('static/index.html', 'pnpm add @ds/button');
    writeFileSync(join(dir, 'static/index.html.gz'), gzipSync(Buffer.from('pnpm add @ds/button')));

    const summary = transformStaticScope({
      staticDir: join(dir, 'static'),
      packageNames: ['@ds/button'],
      fromScope: '@ds',
      toScope: '@cloud-ru',
      namePrefix: 'ds-',
    });

    const unpacked = gunzipSync(readFileSync(join(dir, 'static/index.html.gz'))).toString();
    expect(unpacked).toBe('pnpm add @cloud-ru/ds-button');
    // The build writes .gz and .br together, so both are rewritten as a pair.
    expect(summary.precompressedRefreshed).toBe(2);
    expect(existsSync(join(dir, 'static/index.html.br'))).toBe(true);
  });

  it('is idempotent', () => {
    write('static/index.html', 'pnpm add @ds/button');
    const opts = {
      staticDir: join(dir, 'static'),
      packageNames: ['@ds/button'],
      fromScope: '@ds',
      toScope: '@cloud-ru',
      namePrefix: 'ds-',
    };
    transformStaticScope(opts);
    const second = transformStaticScope(opts);
    expect(read('static/index.html')).toBe('pnpm add @cloud-ru/ds-button');
    expect(second.occurrencesReplaced).toBe(0);
  });
});

describe('collectWorkspacePackageNames', () => {
  it('reads names from the real packages directory', () => {
    const names = collectWorkspacePackageNames(join(process.cwd(), 'packages'));
    expect(names).toContain('@ds/button');
    expect(names).toContain('@ds/drag-and-drop');
  });
});
