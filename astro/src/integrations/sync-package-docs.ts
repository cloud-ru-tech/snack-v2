import { spawnSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, join, normalize, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

import type { AstroIntegration } from 'astro';
import chokidar from 'chokidar';
import { consola } from 'consola';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findMonorepoRoot(): string | null {
  let d = resolve(__dirname, '../..');
  for (;;) {
    const pkgPath = join(d, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (pkg?.scripts?.['docgen:readme']) return d;
      } catch {
        // ignore
      }
    }
    const parent = join(d, '..');
    if (parent === d) return null;
    d = parent;
  }
}

type SyncOptions = {
  packagesRoot?: string;
  contentDir?: string;
};

/**
 * Sync documentation from packages to astro content components directory
 *
 * Features:
 * - Syncs all .mdx files from packages to components directory
 * - Updates version in frontmatter from package.json
 * - Transforms imports from relative to package aliases
 * - Syncs CHANGELOG.md to CHANGELOG.mdx
 * - Syncs MIGRATION.md to MIGRATION.mdx
 * - Generates README.md via docgen:readme (тот же результат, что и pnpm run docgen:readme)
 */
// eslint-disable-next-line import/no-default-export
export default function syncPackageDocs(options: SyncOptions = {}): AstroIntegration {
  const { contentDir = 'src/content/docs' } = options;
  // __dirname points to astro/src/integrations, so we need to go up 3 levels to get to project root
  const projectRoot = join(__dirname, '../../..');
  const packagesPath = join(projectRoot, 'packages');
  const componentsPath = join(__dirname, '../..', contentDir, 'components');

  const syncPackage = (packageName: string) => {
    const packagePath = join(packagesPath, packageName);
    const packageJsonPath = join(packagePath, 'package.json');
    const docsPath = join(packagePath, 'docs');
    const targetPath = join(componentsPath, packageName);

    if (!existsSync(packageJsonPath) || !existsSync(docsPath)) {
      return;
    }

    // Read version from package.json
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const version = packageJson.version || '0.1.0';

    // Create target directory
    mkdirSync(targetPath, { recursive: true });

    // Sync all .mdx files from docs/
    const syncMdxFiles = (sourceDir: string, targetDir: string, relativePath = '') => {
      if (!existsSync(sourceDir)) {
        return;
      }

      const items = readdirSync(sourceDir);
      for (const item of items) {
        const sourcePath = join(sourceDir, item);
        const stat = statSync(sourcePath);

        if (stat.isDirectory()) {
          // Recursively sync subdirectories
          const newRelativePath = relativePath ? `${relativePath}/${item}` : item;
          const newTargetDir = join(targetDir, item);
          mkdirSync(newTargetDir, { recursive: true });
          syncMdxFiles(sourcePath, newTargetDir, newRelativePath);
        } else if (item.endsWith('.mdx')) {
          // Sync .mdx file
          const targetFilePath = join(targetDir, item);
          let content = readFileSync(sourcePath, 'utf-8');

          // Update version in frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            let frontmatter = frontmatterMatch[1];

            // Update or add version
            if (frontmatter.includes('version:')) {
              frontmatter = frontmatter.replace(/version:\s*['"]?[^'"]*['"]?/g, `version: "${version}"`);
            } else {
              // Add version after title or description
              const titleMatch = frontmatter.match(/^(title:.*)$/m);
              if (titleMatch) {
                frontmatter = frontmatter.replace(/^(title:.*)$/m, `$1\nversion: "${version}"`);
              } else {
                frontmatter = `version: "${version}"\n${frontmatter}`;
              }
            }

            content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${frontmatter}\n---`);
          } else {
            // Add frontmatter if missing
            content = `---\ntitle: ${packageName}\nversion: "${version}"\n---\n\n${content}`;
          }

          // Transform imports: '../src' или '../../src' (вложенные docs/components/) -> '@packages/<packageName>/src'
          content = content.replace(/from\s+['"](\.\.\/)+src['"]/g, `from '@packages/${packageName}/src'`);

          // Короткие импорты Astro: .../astro/src/... -> #astro/... (алиас в Vite)
          content = content.replace(/from\s+['"](?:\.\.\/)+astro\/src\/([^'"]+)['"]/g, "from '#astro/$1'");
          content = content.replace(/from\s+['"](?:\.\.\/)+apps\/docs\/src\/([^'"]+)['"]/g, "from '#astro/$1'");

          writeFileSync(targetFilePath, content, 'utf-8');
          // File synced successfully
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          // Process TypeScript files - convert require to import
          const targetFilePath = join(targetDir, item);
          let tsContent = readFileSync(sourcePath, 'utf-8');

          // Find all require statements for JSON files
          const requireMatches: Array<{ match: string; filename: string; varName: string }> = [];
          const requireRegex = /require\(['"]\.\/([^'"]+)\.json['"]\)/g;
          let match;

          while ((match = requireRegex.exec(tsContent)) !== null) {
            const filename = match[1];
            const varName = `${filename}Translations`;
            requireMatches.push({ match: match[0], filename, varName });
          }

          // Replace require with variable names
          for (const { match, varName } of requireMatches) {
            tsContent = tsContent.replace(match, varName);
          }

          // Add imports at the beginning
          if (requireMatches.length > 0) {
            const imports = requireMatches
              .map(({ filename, varName }) => `import ${varName} from './${filename}.json';`)
              .join('\n');
            tsContent = `${imports}\n${tsContent}`;
          }

          writeFileSync(targetFilePath, tsContent, 'utf-8');
        } else if (stat.isFile() && !item.endsWith('.mdx')) {
          // Copy other files (like JSON files)
          const targetFilePath = join(targetDir, item);
          copyFileSync(sourcePath, targetFilePath);
        }
      }
    };

    // Sync docs directory
    syncMdxFiles(docsPath, targetPath);

    // Sync CHANGELOG.md -> CHANGELOG.mdx
    const changelogPath = join(packagePath, 'CHANGELOG.md');
    if (existsSync(changelogPath)) {
      const changelogContent = readFileSync(changelogPath, 'utf-8');
      const changelogMdx = `---
title: Changelog
description: Version history for ${packageName}
version: "${version}"
---

${changelogContent}`;
      writeFileSync(join(targetPath, 'CHANGELOG.mdx'), changelogMdx, 'utf-8');
      consola.success(`[sync-package-docs] Synced ${packageName}/CHANGELOG.mdx`);
    }

    // Sync MIGRATION.md -> MIGRATION.mdx
    const migrationPath = join(packagePath, 'MIGRATION.md');
    if (existsSync(migrationPath)) {
      const migrationContent = readFileSync(migrationPath, 'utf-8');
      const migrationMdx = `---
title: Migration Guide
description: Migration instructions for ${packageName}
version: "${version}"
---

${migrationContent}`;
      writeFileSync(join(targetPath, 'MIGRATION.mdx'), migrationMdx, 'utf-8');
      consola.success(`[sync-package-docs] Synced ${packageName}/MIGRATION.mdx`);
    }

    // README.md генерируется единообразно через docgen:readme в syncAllPackages()
  };

  const syncAllPackages = (command?: string) => {
    if (!existsSync(packagesPath)) {
      consola.warn(`[sync-package-docs] Packages directory not found: ${packagesPath}`);
      return;
    }

    consola.info('[sync-package-docs] Starting sync...');
    const packages = readdirSync(packagesPath).filter(item => {
      const itemPath = join(packagesPath, item);
      return statSync(itemPath).isDirectory() && existsSync(join(itemPath, 'package.json'));
    });

    for (const packageName of packages) {
      syncPackage(packageName);
    }

    // README.md — только в dev, чтобы при build (в т.ч. генерация llm txt) не вызывать docgen:readme
    if (command === 'dev') {
      const monorepoRoot = findMonorepoRoot();
      if (monorepoRoot) {
        const result = spawnSync('pnpm', ['run', 'docgen:readme'], {
          cwd: monorepoRoot,
          stdio: 'inherit',
          shell: true,
        });
        if (result.status !== 0) {
          consola.warn('[sync-package-docs] docgen:readme finished with non-zero exit code');
        }
      } else {
        consola.warn(
          '[sync-package-docs] Monorepo root (package.json with docgen:readme) not found, skipping README generation',
        );
      }
    }

    consola.success('[sync-package-docs] Sync completed');
  };

  return {
    name: 'sync-package-docs',
    hooks: {
      'astro:config:setup': async ({ command }) => {
        // Initial sync (docgen:readme только при command === 'dev')
        syncAllPackages(command);

        // Watch mode for dev — автосинхронизация docs пакетов в astro content при изменениях
        if (command === 'dev') {
          consola.info('[sync-package-docs] Watching packages/*/docs for changes...');

          const watchPaths = [
            join(packagesPath, '*/docs/**/*.mdx'),
            join(packagesPath, '*/docs/**/*.tsx'),
            join(packagesPath, '*/docs/**/*.md'),
            join(packagesPath, '*/CHANGELOG.md'),
            join(packagesPath, '*/MIGRATION.md'),
            join(packagesPath, '*/package.json'),
          ];

          const watcher = chokidar.watch(watchPaths, {
            ignored: /node_modules/,
            persistent: true,
            ignoreInitial: true,
          });

          const getPackageName = (eventPath: string): string | null => {
            const normalized = normalize(eventPath);
            const rel = relative(packagesPath, normalized);
            const firstSegment = rel.split(/[/\\]/)[0];
            return firstSegment && !firstSegment.startsWith('..') ? firstSegment : null;
          };

          const handleSync = (event: string, eventPath: string) => {
            const packageName = getPackageName(eventPath);
            if (packageName) {
              consola.info(`[sync-package-docs] ${event} in ${packageName}, re-syncing...`);
              syncPackage(packageName);
            }
          };

          watcher.on('change', eventPath => handleSync('Change', eventPath));
          watcher.on('add', eventPath => handleSync('New file', eventPath));
          watcher.on('unlink', eventPath => handleSync('File removed', eventPath));
        }
      },
    },
  };
}
