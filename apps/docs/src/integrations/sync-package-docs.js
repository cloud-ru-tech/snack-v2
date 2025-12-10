import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../..');
const packagesDir = path.join(rootDir, 'packages');
const contentDocsDir = path.join(__dirname, '../content/docs/components');

// Astro integration that syncs documentation from packages/*/docs/**/*.mdx
// to apps/docs/src/content/docs/components/ for Starlight
export default function syncPackageDocs() {
  return {
    name: 'sync-package-docs',
    hooks: {
      'astro:config:setup': async ({ logger, addWatchFile }) => {
        logger.info('[sync-package-docs] Hook astro:config:setup called');
        await syncDocs(logger, addWatchFile);
      },
      'astro:server:setup': async ({ logger }) => {
        logger.info('[sync-package-docs] Hook astro:server:setup called');
        // Watch for changes in packages/*/docs
        await syncDocs(logger);
      },
    },
  };
}

async function syncDocs(logger, addWatchFile = null) {
  try {
    logger.info(`[sync-package-docs] Starting sync from ${packagesDir} to ${contentDocsDir}`);

    // Ensure target directory exists
    await fs.mkdir(contentDocsDir, { recursive: true });

    // Find all package docs
    const packages = await fs.readdir(packagesDir, { withFileTypes: true });
    logger.info(`[sync-package-docs] Found ${packages.length} packages`);

    for (const pkg of packages) {
      if (!pkg.isDirectory()) continue;

      const pkgPath = path.join(packagesDir, pkg.name);
      const docsPath = path.join(pkgPath, 'docs');

      try {
        const docsExists = await fs
          .access(docsPath)
          .then(() => true)
          .catch(() => false);
        if (!docsExists) {
          logger.debug(`[sync-package-docs] No docs directory in packages/${pkg.name}`);
          continue;
        }

        // Create target directory for this package
        const targetPkgDir = path.join(contentDocsDir, pkg.name);
        await fs.mkdir(targetPkgDir, { recursive: true });

        // Find all .mdx files in docs
        const docFiles = await findMdxFiles(docsPath);
        logger.info(
          `[sync-package-docs] Found ${docFiles.length} doc files in packages/${pkg.name}/docs`
        );

        for (const docFile of docFiles) {
          const relativePath = path.relative(docsPath, docFile);
          const targetPath = path.join(targetPkgDir, relativePath);

          // Add source file to watch list
          if (addWatchFile) {
            addWatchFile(docFile);
          }

          // Ensure target directory exists
          await fs.mkdir(path.dirname(targetPath), { recursive: true });

          // Read source file
          let content = await fs.readFile(docFile, 'utf-8');

          // Transform imports: '../src' -> '@packages/<pkg>/src'
          // Handle both '../src' and '../../src' patterns
          const importPatterns = [
            { from: /from\s+['"]\.\.\/src['"]/g, to: `from '@packages/${pkg.name}/src'` },
            { from: /from\s+['"]\.\.\/\.\.\/src['"]/g, to: `from '@packages/${pkg.name}/src'` },
            {
              from: /from\s+['"]\.\.\/\.\.\/\.\.\/src['"]/g,
              to: `from '@packages/${pkg.name}/src'`,
            },
          ];

          for (const { from, to } of importPatterns) {
            content = content.replace(from, to);
          }

          // Transform StorybookIframe imports to correct path after sync
          // From packages/*/docs/../../../../apps/docs/src/components/StorybookIframe.astro
          // To apps/docs/src/content/docs/components/*/../../../../components/StorybookIframe.astro
          // Path calculation: from components/button/ to src/components/
          // ../ -> components/, ../../ -> docs/, ../../../ -> content/, ../../../../ -> src/
          const storybookIframePattern =
            /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/StorybookIframe\.astro['"]/g;
          content = content.replace(
            storybookIframePattern,
            "from '../../../../components/StorybookIframe.astro'"
          );

          // Keep HTML comments as-is - MDX/Astro supports HTML comments
          // JSX comments outside JSX blocks cause parsing errors

          // Write transformed content
          await fs.writeFile(targetPath, content, 'utf-8');
          logger.debug(`[sync-package-docs] Synced ${docFile} -> ${targetPath}`);
        }

        logger.info(`[sync-package-docs] Synced docs from packages/${pkg.name}/docs`);
      } catch (error) {
        logger.warn(
          `[sync-package-docs] Failed to sync docs from packages/${pkg.name}: ${error.message}`
        );
      }
    }
  } catch (error) {
    logger.error(`[sync-package-docs] Failed to sync package docs: ${error.message}`);
    logger.error(error.stack);
  }
}

async function findMdxFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(fullPath)));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}
