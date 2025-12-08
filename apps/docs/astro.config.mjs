import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), mdx()],
  srcDir: 'src',
  vite: {
    resolve: {
      alias: {
        '@packages': new URL('../../packages/', import.meta.url).pathname
      }
    }
  },
  markdown: {
    syntaxHighlight: false
  }
});

