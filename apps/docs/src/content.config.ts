import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const baseFrontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional().default(100),
});

// Component docs co-located with packages: packages/*/docs/*.mdx
// ID rules:
//   button/docs/index.mdx       → "button"          (/components/button)
//   button/docs/button.mdx      → "button/button"   (/components/button/button)
//   button/docs/button-icon.mdx → "button/button-icon"
const components = defineCollection({
  loader: glob({
    pattern: '*/docs/*.mdx',
    base: '../../packages',
    generateId: ({ entry }: { entry: string }) =>
      entry
        .replace(/\/docs\//, '/') // strip /docs/ segment
        .replace(/\.mdx$/, '') // strip extension
        .replace(/\/index$/, ''), // button/index → button (package root)
  }),
  schema: baseFrontmatter.extend({
    package: z.string().optional(),
  }),
});

// Standalone editorial docs not tied to any package
// Entry IDs will be: "composition-patterns", "form-patterns", etc.
const patterns = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/patterns',
  }),
  schema: baseFrontmatter,
});

export const collections = { components, patterns };
