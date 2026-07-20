import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';

import { collectPackages, generateLlmsFiles, renderIndex, renderPackage } from './src/lib/llms.ts';
import { patchAstroReactCheck } from './src/lib/patchAstroReactCheck.mjs';
import { remarkExampleCode } from './src/plugins/remark-example-code.mjs';
import { remarkExampleHeadings } from './src/plugins/remark-example-headings.mjs';
import { remarkInternalBaseUrl } from './src/plugins/remark-internal-base-url.mjs';
import { remarkMermaid } from './src/plugins/remark-mermaid.mjs';
import { remarkPropsTableHeadings } from './src/plugins/remark-props-table-headings.mjs';
import { remarkSectionOrder } from './src/plugins/remark-section-order.mjs';

const dir = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(dir, '../..');

/**
 * Serves `llms.txt` (root index + per-package /components/<pkg>/llms.txt): written to
 * the build output at build, and served live by a dev middleware so it's viewable in
 * `astro dev` too. A middleware rather than an endpoint because `trailingSlash: 'always'`
 * forces a slash on parameterized routes and the /components/[...slug] catch-all would
 * shadow one. Content from src/lib/llms.ts.
 */
function llmsTxtIntegration() {
  let base = '/';
  const packagesDir = resolve(root, 'packages');
  const baseSlash = () => (base.endsWith('/') ? base : `${base}/`);

  return {
    name: 'llms-txt',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base;
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const path = (req.url || '').split('?')[0];
          const b = baseSlash();
          const rel = path.startsWith(b) ? path.slice(b.length) : path.replace(/^\//, '');
          const send = text => {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(text);
          };
          if (rel === 'llms.txt') return send(renderIndex(collectPackages(packagesDir), b));
          const m = rel.match(/^components\/([^/]+)\/llms\.txt$/);
          if (m) {
            const pkg = collectPackages(packagesDir).find(p => p.slug === m[1]);
            if (pkg) return send(renderPackage(pkg, b));
          }
          return next();
        });
      },
      'astro:build:done': ({ dir: outDir }) => {
        const count = generateLlmsFiles({ outDir: fileURLToPath(outDir), base, root });
        // eslint-disable-next-line no-console
        console.log(`[llms-txt] wrote /llms.txt + ${count} package files`);
      },
    },
  };
}

/**
 * Vite aliases: @ds/* (и все его подпути из package.json::exports, например
 * @ds/icons/interface/system) → исходники, чтобы SCSS-модули резолвились в docs dev/build.
 * Источник истины — `exports` пакета: любая запись с полем `source` получает алиас
 * `<pkgName><subpath>` → этот `source`-файл.
 */
function dsWorkspaceSourceAliases() {
  const packagesDir = resolve(root, 'packages');
  const aliases = {};
  for (const folder of fs.readdirSync(packagesDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const pkgDir = resolve(packagesDir, folder.name);
    const manifestPath = resolve(pkgDir, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const pkg = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (typeof pkg.name !== 'string' || !pkg.name.startsWith('@ds/')) continue;

    if (pkg.exports) {
      // Vite matches string aliases by prefix ('@ds/icons' also matches '@ds/icons/foo'), so the
      // more specific subpath entries must be inserted before the root '.' entry — otherwise the
      // root alias would be tried first and silently swallow every subpath import (same reasoning
      // as the '@ds/theme/ssr' vs '@ds/theme' ordering below).
      const entries = Object.entries(pkg.exports).sort(([a], [b]) => Number(a === '.') - Number(b === '.'));
      for (const [subpath, condition] of entries) {
        if (subpath === './package.json' || typeof condition === 'string') continue;
        const source = condition.source;
        if (typeof source !== 'string') continue;
        const specifier = subpath === '.' ? pkg.name : `${pkg.name}/${subpath.replace(/^\.\//, '')}`;
        aliases[specifier] = resolve(pkgDir, source);
      }
      continue;
    }

    const entry = resolve(pkgDir, 'src/index.ts');
    if (fs.existsSync(entry)) aliases[pkg.name] = entry;
  }
  return aliases;
}

export default defineConfig({
  // Support deployment on subpaths via BASE_PATH env variable
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  // remark-плагины задаются на markdown-уровне: в Astro 7 @astrojs/mdx наследует их отсюда
  // (задавать `remarkPlugins` прямо на `mdx({...})` устарело). remark-gfm идёт первым — GFM-таблицы
  // (и strikethrough/task-list/autolink) должны быть распарсены до работы остальных плагинов.
  // Astro 7 помечает и `markdown.remarkPlugins` как deprecated в пользу `markdown.processor`
  // (unified-процессор), но @astrojs/markdown-remark@7.1.2 ещё не экспортирует нужный `unified`-
  // хелпер — мигрируем, когда он появится. Предупреждение при билде безвредно (removal — не раньше
  // следующего мажора). .md-контента в доке нет (только .mdx), так что scope плагинов не меняется.
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkExampleCode,
      remarkInternalBaseUrl,
      remarkExampleHeadings,
      remarkPropsTableHeadings,
      remarkMermaid,
      remarkSectionOrder,
    ],
  },
  integrations: [
    react(),
    mdx(),
    // Pagefind index is expensive (~2-4s). Skip it for local fast builds via SKIP_PAGEFIND=1.
    ...(process.env.SKIP_PAGEFIND ? [] : [pagefind()]),
    llmsTxtIntegration(),
  ],
  vite: {
    // @snack-uikit/* ESM пакеты re-exports `./components` (директория без extensions).
    // Node native ESM этого не любит, vite SSR должен пребандлить весь скоуп.
    // На astro build prerender ssr.noExternal не применяется (астра грузит модули через
    // Node native loader) — там компоненты с legacy-deps помечаются `client:only='react'`.
    plugins: [patchAstroReactCheck()],
    ssr: {
      noExternal: [
        // Workspace-пакеты резолвятся в src через alias — бандлим с тем же React, что и острова.
        /^@ds\//,
        // Toolbar persist → @cloud-ru/ft-request-payload-transform.
        /^@cloud-ru\/ft-/,
        'uncontrollable',
        // CJS (UMD main) with named exports (cancelable) — tree hooks; bundle for SSR interop.
        'cancelable-promise',
      ],
    },
    resolve: {
      // Один экземпляр React для Astro SSR и @ds/* (иначе — Invalid hook call в островах).
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      alias: [
        ...Object.entries({
          '#docs': resolve(dir, 'src'),
          // RSC-safe субпуть @ds/theme — должен идти ДО общего '@ds/theme' из
          // dsWorkspaceSourceAliases(), иначе тот перехватит префикс.
          '@ds/theme/ssr': resolve(root, 'packages/theme/src/ssr.ts'),
          // Barrel dist/esm/index.js re-exports ./formatters/* without .js — SSR/prebundle fail.
          '@cloud-ru/ft-formatters': resolve(
            root,
            'node_modules/@cloud-ru/ft-formatters/dist/esm/formatters/formatNumber.js',
          ),
          // Same legacy pattern: dist/esm/index.js imports ./constants, ./helpers without .js.
          // Under Vite 8 (Astro 7) SSR prerender the bare package id gets externalized and
          // Node native ESM can't resolve extensionless. Aliasing to the concrete index.js
          // forces Vite to bundle it and resolve the internal imports itself.
          '@cloud-ru/ft-request-payload-transform': resolve(
            root,
            'node_modules/@cloud-ru/ft-request-payload-transform/dist/esm/index.js',
          ),
          ...dsWorkspaceSourceAliases(),
        }).map(([find, replacement]) => ({ find, replacement })),
      ],
    },
    optimizeDeps: {
      // Alias points at a single .js file; prebundling under package id breaks client hydration.
      exclude: ['@cloud-ru/ft-formatters', '@cloud-ru/ft-request-payload-transform'],
    },
    css: {
      modules: { localsConvention: 'camelCaseOnly' },
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [resolve(root, 'node_modules')],
        },
      },
    },
    build: {
      // Disable CSS code-splitting so every module's CSS ends up in a single
      // stylesheet per-entry; fixes CSS-modules from @ds/* packages vanishing
      // from React island chunks due to aggressive Rollup tree-shaking.
      cssCodeSplit: false,
      sourcemap: false,
      rollupOptions: {
        // Подавляем circular-chunk warning между barrel'ами @ds/tag
        // (export * через несколько уровней index.ts) — на рантайм не влияет.
        onwarn(warning, defaultHandler) {
          const msg = String(warning.message || '');
          if (msg.includes('reexported through module') && msg.includes('different chunks')) return;
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          defaultHandler(warning);
        },
      },
    },
  },
});
