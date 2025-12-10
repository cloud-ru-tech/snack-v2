import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  integrations: [react(), mdx(), llmTxt()],
  srcDir: 'src',
  vite: {
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
