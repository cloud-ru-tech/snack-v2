import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import starlightLlmsTxt from 'starlight-llms-txt';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

import fixLlmsEncoding from './src/integrations/fixLlmsEncoding.js';
import generateComponentLlms from './src/integrations/generate-component-llms.js';
import syncPackageDocs from './src/integrations/sync-package-docs.js';

const llmTxt = () => ({
  name: 'llm-txt',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      const outDir = typeof dir === 'string' ? dir : fileURLToPath(dir);
      const base = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:4321';
      const lines = pages.map(p => `${base}${p.pathname}`).sort((a, b) => a.localeCompare(b));
      await fs.writeFile(path.join(outDir, 'llm.txt'), lines.join('\n'), 'utf8');
    },
  },
});

export default defineConfig({
  // For GitLab Pages, use CI_PAGES_URL if available, otherwise default
  site: process.env.CI_PAGES_URL || process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:4321',
  // Support deployment on subpaths via BASE_PATH env variable
  base: process.env.BASE_PATH || '/',
  // Ensure all URLs have trailing slashes for consistency
  trailingSlash: 'always',
  srcDir: 'src',
  integrations: [
    syncPackageDocs(),
    generateComponentLlms(),
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
        Content: './src/components/astro/DesignSystemContent.astro',
        // Спрайт иконок в MarkdownContent, чтобы был в том же DOM, что и контент страницы
        MarkdownContent: './src/components/astro/DesignSystemMarkdownContent.astro',
        // Переопределяем Head для подключения theme-manager
        Head: './src/components/astro/DesignSystemHead.astro',
        // Переопределяем ThemeSelect для добавления переключателя темы в toolbar
        ThemeSelect: './src/components/astro/ThemeSelect.astro',
      },
      customCss: [
        // Подключаем глобальные стили дизайн-системы
        './src/styles/global.css',
        // Переопределение стилей Starlight для использования цветов дизайн-системы
        './src/styles/starlight-overrides.scss',
      ],
      head: [],
      plugins: [
        starlightLlmsTxt({
          projectName: 'Design System',
          rawContent: true,
          customSets: [
            {
              label: 'components',
              paths: ['components/**'],
            },
            {
              label: 'guides',
              paths: ['guides/**'],
            },
          ],
        }),
      ],
    }),
    llmTxt(),
    fixLlmsEncoding(),
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
        '@packages': path.resolve(__dirname, '../packages'),
        '@sbercloud/figma-variables': path.resolve(__dirname, '../node_modules/@sbercloud/figma-variables'),
        // Короткие импорты в .mdx: #astro/components/mdx, #astro/components/astro/Changelog.astro
        '#astro': path.resolve(__dirname, 'src'),
      },
    },
    ssr: {
      noExternal: ['nanoid', 'starlight-llms-txt', '@snack-uikit/utils'],
    },
  },
  markdown: {
    syntaxHighlight: false,
  },
});
