import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import syncPackageDocs from './src/integrations/sync-package-docs.js';

const llmTxt = () => ({
  name: 'llm-txt',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      const outDir = typeof dir === 'string' ? dir : fileURLToPath(dir);
      const base = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:4321';
      const lines = pages.map((p) => `${base}${p.pathname}`).sort((a, b) => a.localeCompare(b));
      await fs.writeFile(path.join(outDir, 'llm.txt'), lines.join('\n'), 'utf8');
    },
  },
});

export default defineConfig({
  // For GitLab Pages, use CI_PAGES_URL if available, otherwise default
  site:
    process.env.CI_PAGES_URL ||
    process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
    'http://localhost:4321',
  base: '/', // Docs are served from root
  srcDir: 'src',
  integrations: [
    syncPackageDocs(),
    react(),
    expressiveCode(),
    mdx(),
    starlight({
      title: 'Design System',
      description: 'React components and documentation',
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
      components: {
        // Переопределяем Content для добавления стилей дизайн-системы
        Content: './src/components/DesignSystemContent.astro',
      },
      head: [
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
          },
          content: `(function(){if(typeof document!=='undefined'){const b=document.body;b.classList.add('sn-base-styles','sn-figmaStyles','sn-desktop','sn-light','sn-brandA');}})();`,
        },
      ],
    }),
    llmTxt(),
  ],
  vite: {
    css: {
      // Подключение глобальных стилей дизайн-системы
      preprocessorOptions: {
        scss: {
          // Дополнительные опции для SCSS если нужно
        },
      },
    },
    resolve: {
      alias: {
        '@packages': new URL('../../packages/', import.meta.url).pathname,
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
  },
});
