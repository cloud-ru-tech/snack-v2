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

        // Read package.json to get version
        const pkgJsonPath = path.join(pkgPath, 'package.json');
        let pkgVersion = '0.0.0';
        try {
          const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, 'utf-8'));
          pkgVersion = pkgJson.version || '0.0.0';
          logger.debug(`[sync-package-docs] Package ${pkg.name} version: ${pkgVersion}`);
        } catch (error) {
          logger.warn(
            `[sync-package-docs] Failed to read package.json for ${pkg.name}: ${error.message}`
          );
        }

        // Create target directory for this package
        const targetPkgDir = path.join(contentDocsDir, pkg.name);
        await fs.mkdir(targetPkgDir, { recursive: true });

        // Sync CHANGELOG.md if it exists
        const changelogPath = path.join(pkgPath, 'CHANGELOG.md');
        const changelogExists = await fs
          .access(changelogPath)
          .then(() => true)
          .catch(() => false);

        if (changelogExists) {
          const targetChangelogPath = path.join(targetPkgDir, 'CHANGELOG.mdx');
          let changelogContent = await fs.readFile(changelogPath, 'utf-8');

          // Check if changelog already has frontmatter
          const hasFrontmatter = changelogContent.match(/^---\s*\n/);

          if (!hasFrontmatter) {
            // Add frontmatter with package info
            const changelogHeader = `---
title: Changelog
description: Version history for ${pkg.name}
version: "${pkgVersion}"
order: 999
---

# Changelog

**Package:** \`${pkg.name}\`  
**Current version:** \`${pkgVersion}\`

`;

            changelogContent = changelogHeader + changelogContent;
          } else {
            // Update version in existing frontmatter
            changelogContent = updateFrontmatterVersion(changelogContent, pkgVersion);

            // Ensure title and description exist
            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
            const match = changelogContent.match(frontmatterRegex);
            if (match) {
              let frontmatter = match[1];
              if (!/^title:\s*/m.test(frontmatter)) {
                frontmatter = `title: Changelog\n${frontmatter}`;
              }
              if (!/^description:\s*/m.test(frontmatter)) {
                frontmatter = `${frontmatter}\ndescription: Version history for ${pkg.name}`;
              }
              changelogContent = changelogContent.replace(
                frontmatterRegex,
                `---\n${frontmatter}\n---\n`
              );
            }
          }

          await fs.writeFile(targetChangelogPath, changelogContent, 'utf-8');
          logger.debug(`[sync-package-docs] Synced CHANGELOG.md for ${pkg.name}`);

          if (addWatchFile) {
            addWatchFile(changelogPath);
          }
        }

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
            // Also watch package.json for version changes
            addWatchFile(pkgJsonPath);
          }

          // Ensure target directory exists
          await fs.mkdir(path.dirname(targetPath), { recursive: true });

          // Read source file
          let content = await fs.readFile(docFile, 'utf-8');

          // Add or update version in frontmatter
          content = updateFrontmatterVersion(content, pkgVersion);

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

          // Transform Example components imports
          // From packages/*/docs/../../../../apps/docs/src/components/ExampleComponents
          // To apps/docs/src/content/docs/components/*/../../../../components/ExampleComponents
          const exampleComponentPatterns = [
            {
              from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/ExampleComponents['"]/g,
              to: "from '../../../../components/ExampleComponents'",
            },
          ];

          for (const { from, to } of exampleComponentPatterns) {
            content = content.replace(from, to);
          }

          // Transform component imports to correct path after sync
          // From packages/*/docs/../../../../apps/docs/src/components/*.astro
          // To apps/docs/src/content/docs/components/*/../../../../components/*.astro
          // Path calculation: from components/button/ to src/components/
          // ../ -> components/, ../../ -> docs/, ../../../ -> content/, ../../../../ -> src/
          const componentImportPatterns = [
            {
              from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/StorybookIframe\.astro['"]/g,
              to: "from '../../../../components/StorybookIframe.astro'",
            },
            {
              from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/Changelog\.astro['"]/g,
              to: "from '../../../../components/Changelog.astro'",
            },
            {
              from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/VersionSwitcher\.astro['"]/g,
              to: "from '../../../../components/VersionSwitcher.astro'",
            },
          ];

          for (const { from, to } of componentImportPatterns) {
            content = content.replace(from, to);
          }

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

/**
 * Updates or adds version field in frontmatter
 * @param {string} content - MDX file content
 * @param {string} version - Package version to set
 * @returns {string} - Updated content with version in frontmatter
 */
function updateFrontmatterVersion(content, version) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // No frontmatter exists, add it
    return `---\nversion: "${version}"\n---\n\n${content}`;
  }

  const existingFrontmatter = match[1];
  const hasVersion = /^version:\s*/m.test(existingFrontmatter);

  if (hasVersion) {
    // Update existing version
    const updatedFrontmatter = existingFrontmatter.replace(
      /^version:\s*["']?[\d.]+["']?/m,
      `version: "${version}"`
    );
    return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---\n`);
  } else {
    // Add version to existing frontmatter
    const updatedFrontmatter = `${existingFrontmatter}\nversion: "${version}"`;
    return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---\n`);
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
