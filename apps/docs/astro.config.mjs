import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import starlightLlmsTxt from 'starlight-llms-txt';
import fixLlmsEncoding from './src/integrations/fixLlmsEncoding.js';
import generateComponentLlms from './src/integrations/generate-component-llms.js';
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
    generateComponentLlms(),
    fixLlmsEncoding(),
    react(),
    expressiveCode(),
    mdx(),
    starlight({
      title: 'Design System',
      description: 'React components and documentation',
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
        ru: {
          label: 'Русский',
          lang: 'ru',
        },
      },
      sidebar: [
        {
          label: 'Guides',
          translations: {
            ru: 'Руководства',
          },
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Components',
          translations: {
            ru: 'Компоненты',
          },
          autogenerate: { directory: 'components' },
        },
      ],
      components: {
        // Переопределяем Content для добавления стилей дизайн-системы
        Content: './src/components/DesignSystemContent.astro',
        // Переопределяем Head для подключения theme-manager
        Head: './src/components/DesignSystemHead.astro',
        // Переопределяем ThemeSelect для добавления переключателя темы в toolbar
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      customCss: [
        // Подключаем глобальные стили дизайн-системы
        './src/styles/global.css',
        // Переопределение стилей Starlight для использования цветов дизайн-системы
        './src/styles/starlight-overrides.css',
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
        '@sbercloud/figma-variables': new URL(
          '../../node_modules/@sbercloud/figma-variables',
          import.meta.url
        ).pathname,
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
  },
});
