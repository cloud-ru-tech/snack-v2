import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, join, normalize, relative } from 'path';
import { fileURLToPath } from 'url';

import type { AstroIntegration } from 'astro';
import chokidar from 'chokidar';
import { consola } from 'consola';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
 * - Generates README.md from docs/index.mdx (stripped version)
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

          // Transform imports: '../src' -> '@packages/<packageName>/src'
          // Also handle '../../../astro/src/components/mdx' -> '../../../../components/mdx'
          content = content.replace(/from\s+['"]\.\.\/src['"]/g, `from '@packages/${packageName}/src'`);

          // Transform new Astro paths
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/astro\/src\/components\/mdx['"]/g,
            `from '../../../../components/mdx'`,
          );
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/astro\/src\/components\/mdx['"]/g,
            `from '../../../../components/mdx'`,
          );

          // Transform old apps/docs paths (for backward compatibility)
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/mdx['"]/g,
            `from '../../../../components/mdx'`,
          );
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/mdx['"]/g,
            `from '../../../../components/mdx'`,
          );

          // Transform Astro component imports (new paths)
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/astro\/src\/components\/astro\/([^'"]+)['"]/g,
            `from '../../../../components/astro/$1'`,
          );

          // Transform Astro component imports (old apps/docs paths)
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/astro\/([^'"]+)['"]/g,
            `from '../../../../components/astro/$1'`,
          );

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

    // Generate README.md from docs/index.mdx (stripped version)
    const indexMdxPath = join(docsPath, 'index.mdx');
    if (existsSync(indexMdxPath)) {
      let readmeContent = readFileSync(indexMdxPath, 'utf-8');

      // Remove frontmatter
      readmeContent = readmeContent.replace(/^---\n[\s\S]*?\n---\n/, '');

      // STEP 1: Extract and preserve code blocks first
      const codeBlockRegex = /```[\s\S]*?```/g;
      const codeBlocks: string[] = [];

      readmeContent = readmeContent.replace(codeBlockRegex, match => {
        const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
        codeBlocks.push(match);
        return placeholder;
      });

      // STEP 2: Now safely remove content outside code blocks
      // Remove import statements (outside code blocks)
      readmeContent = readmeContent.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\s*$/gm, '');

      // Remove interactive components (but preserve their content if possible)
      const componentPatterns = [
        /<ExampleContainer[^>]*>[\s\S]*?<\/ExampleContainer>/g,
        /<ExampleRow[^>]*>[\s\S]*?<\/ExampleRow>/g,
        /<ExampleGrid[^>]*>[\s\S]*?<\/ExampleGrid>/g,
        /<ExampleItem[^>]*>[\s\S]*?<\/ExampleItem>/g,
        /<StorybookIframe[^>]*\/?>/g,
        /<Changelog[^>]*\/?>/g,
        /<LlmLink[^>]*\/?>/g,
        /<LocaleProvider[^>]*>/g,
        /<\/LocaleProvider>/g,
        /<LocaleSwitch[^>]*\/?>/g,
        /<LocaleCase[^>]*>/g,
        /<\/LocaleCase>/g,
      ];

      for (const pattern of componentPatterns) {
        readmeContent = readmeContent.replace(pattern, '');
      }

      // Remove JSX expressions outside code blocks
      readmeContent = readmeContent.replace(/\{[^}]*\}/g, '');
      readmeContent = readmeContent.replace(/export const t = translations;/g, '');

      // Remove version line (it contains JSX expression that gets removed, leaving empty backticks)
      readmeContent = readmeContent.replace(/^\*\*Version:\*\*.*$/gm, '');

      // STEP 3: Clean up before restoring code blocks
      // Remove empty headings and sections
      readmeContent = readmeContent.replace(/^#{1,6}\s*\{[^}]+\}\s*$/gm, '');
      readmeContent = readmeContent.replace(/^#{1,6}\s*$/gm, '');

      // Remove lines that only contain JSX expressions or are empty (but keep code block placeholders)
      readmeContent = readmeContent
        .split('\n')
        .filter(line => {
          const trimmed = line.trim();
          // Keep code block placeholders
          if (trimmed.startsWith('___CODE_BLOCK_')) {
            return true;
          }
          return trimmed.length > 0 && !trimmed.match(/^[{} ]*$/);
        })
        .join('\n');

      // STEP 4: Restore code blocks (after all cleanup is done)
      readmeContent = readmeContent.replace(/___CODE_BLOCK_(\d+)___/g, (_, index) => codeBlocks[parseInt(index, 10)]);

      // Clean up multiple empty lines
      readmeContent = readmeContent.replace(/\n{3,}/g, '\n\n');
      readmeContent = readmeContent.trim();

      // Add links to CHANGELOG and MIGRATION
      const additionalResources = `\n\n---\n\n## Additional Resources\n\n`;
      const changelogLink = existsSync(changelogPath)
        ? `- **Changelog:** See [CHANGELOG.md](./CHANGELOG.md) for version history\n`
        : '';
      const migrationLink = existsSync(migrationPath)
        ? `- **Migration Guide:** See [MIGRATION.md](./MIGRATION.md) for migration instructions between versions\n`
        : '';

      readmeContent += additionalResources + changelogLink + migrationLink;

      writeFileSync(join(packagePath, 'README.md'), readmeContent, 'utf-8');
      consola.success(`[sync-package-docs] Generated ${packageName}/README.md`);
    }
  };

  const syncAllPackages = () => {
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

    consola.success('[sync-package-docs] Sync completed');
  };

  return {
    name: 'sync-package-docs',
    hooks: {
      'astro:config:setup': async ({ command }) => {
        // Initial sync
        syncAllPackages();

        // Watch mode for dev — автосинхронизация docs пакетов в astro content при изменениях
        if (command === 'dev') {
          consola.info('[sync-package-docs] Watching packages/*/docs for changes...');

          const watchPaths = [
            join(packagesPath, '*/docs/**/*.mdx'),
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
