import type { AstroComponentFactory, MarkdownInstance } from 'astro';

type DocFrontmatter = {
  title: string;
  description?: string;
  order?: number;
};

type DocModule = {
  default: AstroComponentFactory;
  frontmatter: DocFrontmatter;
};

export type DocEntry = {
  route: string;
  packageName: string;
  slugParts: string[];
  title: string;
  description?: string;
  order: number;
  module: DocModule;
};

const modules = import.meta.glob<MarkdownInstance<DocFrontmatter>>(
  '../../../../packages/*/docs/**/*.mdx',
  { eager: true }
);

function normalize(path: string): DocEntry {
  // Works for absolute or relative paths returned by import.meta.glob
  const parts = path.split('/'); // .../packages/<pkg>/docs/.../<file>.mdx
  const pkgIndex = parts.lastIndexOf('packages');
  if (pkgIndex === -1 || pkgIndex + 2 >= parts.length) {
    throw new Error(`Unexpected docs path: ${path}`);
  }

  const pkg = parts[pkgIndex + 1];
  const docPathWithExt = parts.slice(pkgIndex + 3).join('/'); // after "packages/<pkg>/docs/"
  const docPath = docPathWithExt.replace(/\.mdx$/, '');
  const docParts = docPath ? docPath.split('/') : [];

  const slugParts = docParts.length ? docParts : ['index'];
  const slugSegments = [pkg, ...slugParts.filter((p) => p !== 'index')];
  const route = `/components/${slugSegments.join('/')}`;

  const module = modules[path] as unknown as DocModule;
  const frontmatter = module?.frontmatter || {};

  if (!frontmatter.title) {
    throw new Error(`Doc file "${path}" is missing required frontmatter "title"`);
  }

  return {
    route,
    packageName: pkg,
    slugParts: slugSegments,
    title: frontmatter.title,
    description: frontmatter.description,
    order: typeof frontmatter.order === 'number' ? frontmatter.order : 0,
    module
  };
}

const docs = Object.keys(modules).map(normalize);

export function getDocsList(): DocEntry[] {
  return [...docs].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function findDocBySlug(slug: string[]): DocEntry | undefined {
  const key = slug.join('/').replace(/\/+$/, '');
  return docs.find((doc) => doc.slugParts.join('/') === key);
}

