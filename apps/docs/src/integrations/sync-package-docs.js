import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateReadmeFromMdx } from './generate-readme.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../..');
const packagesDir = path.join(rootDir, 'packages');
const contentDocsDir = path.join(__dirname, '../content/docs');
const SUPPORTED_LOCALES = ['en', 'ru'];

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

        // Check if this is an i18n template (single index.mdx with i18n imports)
        const isI18nTemplate = await checkI18nTemplate(docsPath);

        if (isI18nTemplate) {
          // Process i18n template - generate locale versions
          logger.info(`[sync-package-docs] Detected i18n template for ${pkg.name}`);
          await syncI18nTemplate(
            pkg.name,
            pkgPath,
            pkgJsonPath,
            docsPath,
            pkgVersion,
            logger,
            addWatchFile
          );
        } else {
          // Check if docs have locale structure (packages/*/docs/{locale}/)
          const hasLocaleStructure = await checkLocaleStructure(docsPath);

          if (hasLocaleStructure) {
            // Process each locale
            for (const locale of SUPPORTED_LOCALES) {
              const localeDocsPath = path.join(docsPath, locale);
              const localeExists = await fs
                .access(localeDocsPath)
                .then(() => true)
                .catch(() => false);

              if (!localeExists) {
                logger.debug(
                  `[sync-package-docs] No ${locale} locale in packages/${pkg.name}/docs`
                );
                continue;
              }

              await syncPackageLocale(
                pkg.name,
                pkgPath,
                pkgJsonPath,
                localeDocsPath,
                locale,
                pkgVersion,
                logger,
                addWatchFile
              );
            }
          } else {
            // Legacy structure: packages/*/docs/*.mdx (treat as 'en')
            logger.info(
              `[sync-package-docs] Using legacy structure for ${pkg.name} (treating as 'en')`
            );
            await syncPackageLocale(
              pkg.name,
              pkgPath,
              pkgJsonPath,
              docsPath,
              'en',
              pkgVersion,
              logger,
              addWatchFile
            );
          }
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
 * Check if this is an i18n template (single index.mdx with i18n imports)
 * @param {string} docsPath - Path to docs directory
 * @returns {Promise<boolean>} - True if i18n template exists
 */
async function checkI18nTemplate(docsPath) {
  try {
    const indexPath = path.join(docsPath, 'index.mdx');
    const indexExists = await fs
      .access(indexPath)
      .then(() => true)
      .catch(() => false);

    if (!indexExists) {
      return false;
    }

    // Check if i18n directory exists
    const i18nPath = path.join(docsPath, 'i18n');
    const i18nExists = await fs
      .access(i18nPath)
      .then(() => true)
      .catch(() => false);

    if (!i18nExists) {
      return false;
    }

    // Read index.mdx to check for i18n imports
    const content = await fs.readFile(indexPath, 'utf-8');
    return content.includes("from './i18n'") || content.includes('from "./i18n"');
  } catch (error) {
    return false;
  }
}

/**
 * Sync i18n template - generate locale-specific versions
 * @param {string} pkgName - Package name
 * @param {string} pkgPath - Package root path
 * @param {string} pkgJsonPath - Path to package.json
 * @param {string} docsPath - Path to docs directory
 * @param {string} pkgVersion - Package version
 * @param {object} logger - Logger instance
 * @param {function} addWatchFile - Function to add file to watch list
 */
async function syncI18nTemplate(
  pkgName,
  pkgPath,
  pkgJsonPath,
  docsPath,
  pkgVersion,
  logger,
  addWatchFile
) {
  const indexPath = path.join(docsPath, 'index.mdx');
  const i18nPath = path.join(docsPath, 'i18n');

  // Add files to watch list
  if (addWatchFile) {
    addWatchFile(indexPath);
    addWatchFile(pkgJsonPath);

    // Watch all i18n files
    try {
      const i18nFiles = await fs.readdir(i18nPath);
      for (const file of i18nFiles) {
        addWatchFile(path.join(i18nPath, file));
      }
    } catch (error) {
      // Ignore if i18n directory doesn't exist
    }
  }

  // Read template
  let template = await fs.readFile(indexPath, 'utf-8');

  // Update version in frontmatter
  template = updateFrontmatterVersion(template, pkgVersion);

  // Copy i18n directory to shared location (components/{pkg}/i18n)
  const sharedI18nTarget = path.join(contentDocsDir, 'components', pkgName, 'i18n');
  await fs.mkdir(path.dirname(sharedI18nTarget), { recursive: true });

  try {
    // Copy i18n directory
    const i18nFiles = await fs.readdir(i18nPath);
    await fs.mkdir(sharedI18nTarget, { recursive: true });

    for (const file of i18nFiles) {
      const sourcePath = path.join(i18nPath, file);
      const targetPath = path.join(sharedI18nTarget, file);
      await fs.copyFile(sourcePath, targetPath);
    }
  } catch (error) {
    logger.warn(`[sync-package-docs] Failed to copy i18n directory: ${error.message}`);
  }

  // Load translations for processing
  const translations = await loadTranslations(i18nPath);

  // Generate locale-specific versions
  for (const locale of SUPPORTED_LOCALES) {
    const targetPkgDir = path.join(contentDocsDir, locale, 'components', pkgName);
    await fs.mkdir(targetPkgDir, { recursive: true });

    // Create locale-specific version
    let localeContent = injectLocaleIntoFrontmatter(template, locale);

    // Transform import paths
    localeContent = transformImportPaths(localeContent, pkgName);

    // Replace translation keys with actual translations
    if (translations[locale]) {
      localeContent = replaceTranslationKeys(localeContent, translations[locale], locale);
    }

    // Write locale version
    const targetPath = path.join(targetPkgDir, 'index.mdx');
    await fs.writeFile(targetPath, localeContent, 'utf-8');

    logger.debug(`[sync-package-docs] Generated ${locale} version for ${pkgName}`);
  }

  // Sync CHANGELOG and MIGRATION for 'en' only
  if (SUPPORTED_LOCALES.includes('en')) {
    const targetPkgDir = path.join(contentDocsDir, 'en', 'components', pkgName);

    // Sync CHANGELOG.md
    await syncChangelogForPackage(pkgPath, targetPkgDir, pkgName, pkgVersion, logger, addWatchFile);

    // Sync MIGRATION.md
    await syncMigrationForPackage(pkgPath, targetPkgDir, pkgName, pkgVersion, logger, addWatchFile);

    // Generate README.md from template
    const readmePath = path.join(pkgPath, 'README.md');
    const readmeContent = generateReadmeFromMdx(template, pkgName, pkgVersion);
    await fs.writeFile(readmePath, readmeContent, 'utf-8');
    logger.debug(`[sync-package-docs] Generated README.md for ${pkgName}`);
  }

  logger.info(`[sync-package-docs] Synced i18n template for ${pkgName}`);
}

/**
 * Inject locale into frontmatter
 * @param {string} content - MDX content
 * @param {string} locale - Locale code
 * @returns {string} - Content with locale in frontmatter
 */
function injectLocaleIntoFrontmatter(content, locale) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // No frontmatter, add it
    return `---\nlocale: ${locale}\n---\n\n${content}`;
  }

  const existingFrontmatter = match[1];
  const hasLocale = /^locale:\s*/m.test(existingFrontmatter);

  if (hasLocale) {
    // Update existing locale
    const updatedFrontmatter = existingFrontmatter.replace(
      /^locale:\s*["']?[\w-]+["']?/m,
      `locale: ${locale}`
    );
    return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---\n`);
  } else {
    // Add locale to existing frontmatter
    const updatedFrontmatter = `${existingFrontmatter}\nlocale: ${locale}`;
    return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---\n`);
  }
}

/**
 * Transform import paths for synced content
 * @param {string} content - MDX content
 * @param {string} pkgName - Package name
 * @returns {string} - Content with transformed paths
 */
function transformImportPaths(content, pkgName) {
  // Transform package imports: '../src' -> '@packages/pkg/src'
  content = content.replace(/from\s+['"]\.\.\/src['"]/g, `from '@packages/${pkgName}/src'`);
  content = content.replace(/from\s+['"]\.\.\/\.\.\/src['"]/g, `from '@packages/${pkgName}/src'`);

  // Transform component imports from apps/docs
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\//g,
    "from '../../../../../components/"
  );

  return content;
}

/**
 * Load translations from i18n directory (JSON format)
 * @param {string} i18nPath - Path to i18n directory
 * @returns {Promise<Object>} - Translations object { locale: translations }
 */
async function loadTranslations(i18nPath) {
  const translations = {};

  try {
    for (const locale of SUPPORTED_LOCALES) {
      const jsonPath = path.join(i18nPath, `${locale}.json`);
      const jsonExists = await fs
        .access(jsonPath)
        .then(() => true)
        .catch(() => false);

      if (jsonExists) {
        const content = await fs.readFile(jsonPath, 'utf-8');
        translations[locale] = JSON.parse(content);
      }
    }
  } catch (error) {
    console.warn(`Failed to load translations: ${error.message}`);
  }

  return translations;
}

/**
 * Replace translation keys in content with actual translations
 * @param {string} content - MDX content
 * @param {Object} translations - Translations object
 * @param {string} locale - Current locale
 * @returns {string} - Content with translations replaced
 */
function replaceTranslationKeys(content, translations, locale) {
  // Remove imports related to translations
  content = content.replace(/import\s+{[^}]*}\s+from\s+['"][^'"]*\/i18n['"];?\s*/g, '');
  content = content.replace(/import\s+{[^}]*LocaleProvider[^}]*}\s+from\s+['"][^'"]*Trans['"];?\s*/g, '');
  content = content.replace(/import\s+{[^}]*LocaleSwitch[^}]*}\s+from\s+['"][^'"]*Trans['"];?\s*/g, '');
  content = content.replace(/export const t = translations;?\s*/g, '');

  // Remove LocaleProvider wrapper
  content = content.replace(/<LocaleProvider[^>]*>/g, '');
  content = content.replace(/<\/LocaleProvider>/g, '');

  // Helper function to get nested value
  function getTranslationValue(keyPath) {
    const keys = keyPath.split('.');
    let value = translations;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }

    return typeof value === 'string' ? value : null;
  }

  // Replace translation expressions in JSX attributes: label={t[...].key}
  content = content.replace(
    /(\w+)=\{t\[frontmatter\.locale \|\| ['"]en['"]\]\.([^}]+)\}/g,
    (match, attrName, keyPath) => {
      const value = getTranslationValue(keyPath);
      if (value !== null) {
        // Return with proper quotes for JSX attributes
        return `${attrName}="${value}"`;
      }
      return match;
    }
  );

  // Replace translation expressions in text: {t[frontmatter.locale || 'en'].key.subkey}
  content = content.replace(/\{t\[frontmatter\.locale \|\| ['"]en['"]\]\.([^}]+)\}/g, (match, keyPath) => {
    const value = getTranslationValue(keyPath);
    return value !== null ? value : match;
  });

  // Handle LocaleSwitch blocks - extract content for current locale
  content = content.replace(
    /<LocaleSwitch>\s*([\s\S]*?)\s*<\/LocaleSwitch>/g,
    (match, switchContent) => {
      // Find the LocaleCase for current locale
      const localePattern = new RegExp(
        `<LocaleCase\\s+locale=["']${locale}["']>([\\s\\S]*?)<\\/LocaleCase>`,
        'i'
      );
      const localeMatch = switchContent.match(localePattern);

      if (localeMatch) {
        return localeMatch[1].trim();
      }

      // Fallback to 'en' if current locale not found
      const enPattern = /<LocaleCase\s+locale=["']en["']>([\s\S]*?)<\/LocaleCase>/i;
      const enMatch = switchContent.match(enPattern);

      return enMatch ? enMatch[1].trim() : '';
    }
  );

  return content;
}

/**
 * Check if docs directory has locale structure (packages slash star slash docs slash locale)
 * @param {string} docsPath - Path to docs directory
 * @returns {Promise<boolean>} - True if locale structure exists
 */
async function checkLocaleStructure(docsPath) {
  try {
    const entries = await fs.readdir(docsPath, { withFileTypes: true });
    // Check if any of the supported locales exist as directories
    for (const locale of SUPPORTED_LOCALES) {
      const localeEntry = entries.find((e) => e.isDirectory() && e.name === locale);
      if (localeEntry) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Sync CHANGELOG.md for a package
 * @param {string} pkgPath - Package root path
 * @param {string} targetPkgDir - Target directory
 * @param {string} pkgName - Package name
 * @param {string} pkgVersion - Package version
 * @param {object} logger - Logger instance
 * @param {function} addWatchFile - Function to add file to watch list
 */
async function syncChangelogForPackage(
  pkgPath,
  targetPkgDir,
  pkgName,
  pkgVersion,
  logger,
  addWatchFile
) {
  const changelogPath = path.join(pkgPath, 'CHANGELOG.md');
  const changelogExists = await fs
    .access(changelogPath)
    .then(() => true)
    .catch(() => false);

  if (!changelogExists) {
    return;
  }

  const targetChangelogPath = path.join(targetPkgDir, 'CHANGELOG.mdx');
  let changelogContent = await fs.readFile(changelogPath, 'utf-8');

  // Check if changelog already has frontmatter
  const hasFrontmatter = changelogContent.match(/^---\s*\n/);

  if (!hasFrontmatter) {
    // Add frontmatter with package info
    const changelogHeader = `---
title: Changelog
description: Version history for ${pkgName}
version: "${pkgVersion}"
order: 999
---

# Changelog

**Package:** \`${pkgName}\`  
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
        frontmatter = `${frontmatter}\ndescription: Version history for ${pkgName}`;
      }
      changelogContent = changelogContent.replace(frontmatterRegex, `---\n${frontmatter}\n---\n`);
    }
  }

  await fs.writeFile(targetChangelogPath, changelogContent, 'utf-8');
  logger.debug(`[sync-package-docs] Synced CHANGELOG.md for ${pkgName}`);

  if (addWatchFile) {
    addWatchFile(changelogPath);
  }
}

/**
 * Sync MIGRATION.md for a package
 * @param {string} pkgPath - Package root path
 * @param {string} targetPkgDir - Target directory
 * @param {string} pkgName - Package name
 * @param {string} pkgVersion - Package version
 * @param {object} logger - Logger instance
 * @param {function} addWatchFile - Function to add file to watch list
 */
async function syncMigrationForPackage(
  pkgPath,
  targetPkgDir,
  pkgName,
  pkgVersion,
  logger,
  addWatchFile
) {
  const migrationPath = path.join(pkgPath, 'MIGRATION.md');
  const migrationExists = await fs
    .access(migrationPath)
    .then(() => true)
    .catch(() => false);

  if (!migrationExists) {
    return;
  }

  const targetMigrationPath = path.join(targetPkgDir, 'MIGRATION.mdx');
  let migrationContent = await fs.readFile(migrationPath, 'utf-8');

  // Check if migration already has frontmatter
  const hasFrontmatter = migrationContent.match(/^---\s*\n/);

  if (!hasFrontmatter) {
    // Add frontmatter with package info
    const migrationHeader = `---
title: Migration Guide
description: Migration instructions for ${pkgName} package versions
version: "${pkgVersion}"
order: 998
---

# Migration Guide

**Package:** \`${pkgName}\`  
**Current version:** \`${pkgVersion}\`

This guide provides instructions for LLM agents to migrate between versions of the \`${pkgName}\` package.

`;

    migrationContent = migrationHeader + migrationContent;
  } else {
    // Update version in existing frontmatter
    migrationContent = updateFrontmatterVersion(migrationContent, pkgVersion);

    // Ensure title and description exist
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = migrationContent.match(frontmatterRegex);
    if (match) {
      let frontmatter = match[1];
      if (!/^title:\s*/m.test(frontmatter)) {
        frontmatter = `title: Migration Guide\n${frontmatter}`;
      }
      if (!/^description:\s*/m.test(frontmatter)) {
        frontmatter = `${frontmatter}\ndescription: Migration instructions for ${pkgName} package versions`;
      }
      migrationContent = migrationContent.replace(frontmatterRegex, `---\n${frontmatter}\n---\n`);
    }
  }

  await fs.writeFile(targetMigrationPath, migrationContent, 'utf-8');
  logger.debug(`[sync-package-docs] Synced MIGRATION.md for ${pkgName}`);

  if (addWatchFile) {
    addWatchFile(migrationPath);
  }
}

/**
 * Sync package documentation for a specific locale
 * @param {string} pkgName - Package name
 * @param {string} pkgPath - Package root path
 * @param {string} pkgJsonPath - Path to package.json
 * @param {string} localeDocsPath - Path to locale docs
 * @param {string} locale - Locale code (en, ru)
 * @param {string} pkgVersion - Package version
 * @param {object} logger - Logger instance
 * @param {function} addWatchFile - Function to add file to watch list
 */
async function syncPackageLocale(
  pkgName,
  pkgPath,
  pkgJsonPath,
  localeDocsPath,
  locale,
  pkgVersion,
  logger,
  addWatchFile
) {
  // Create target directory for this package and locale
  const targetPkgDir = path.join(contentDocsDir, locale, 'components', pkgName);
  await fs.mkdir(targetPkgDir, { recursive: true });

  // Sync CHANGELOG and MIGRATION for 'en' only
  if (locale === 'en') {
    await syncChangelogForPackage(pkgPath, targetPkgDir, pkgName, pkgVersion, logger, addWatchFile);
    await syncMigrationForPackage(pkgPath, targetPkgDir, pkgName, pkgVersion, logger, addWatchFile);

    // Generate README.md from index.mdx if it exists (only for default locale 'en')
    const indexMdxPath = path.join(localeDocsPath, 'index.mdx');
    const indexMdxExists = await fs
      .access(indexMdxPath)
      .then(() => true)
      .catch(() => false);

    if (indexMdxExists) {
      const readmePath = path.join(pkgPath, 'README.md');
      const mdxContent = await fs.readFile(indexMdxPath, 'utf-8');
      const readmeContent = generateReadmeFromMdx(mdxContent, pkgName, pkgVersion);

      await fs.writeFile(readmePath, readmeContent, 'utf-8');
      logger.debug(`[sync-package-docs] Generated README.md for ${pkgName}`);

      if (addWatchFile) {
        addWatchFile(indexMdxPath);
      }
    }
  }

  // Find all .mdx files in locale docs
  const docFiles = await findMdxFiles(localeDocsPath);
  logger.info(
    `[sync-package-docs] Found ${docFiles.length} doc files for ${pkgName} (${locale})`
  );

  for (const docFile of docFiles) {
    const relativePath = path.relative(localeDocsPath, docFile);
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

    // Transform imports: '../src' or '../../src' -> '@packages/<pkg>/src'
    const importPatterns = [
      { from: /from\s+['"]\.\.\/src['"]/g, to: `from '@packages/${pkgName}/src'` },
      { from: /from\s+['"]\.\.\/\.\.\/src['"]/g, to: `from '@packages/${pkgName}/src'` },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/src['"]/g,
        to: `from '@packages/${pkgName}/src'`,
      },
    ];

    for (const { from, to } of importPatterns) {
      content = content.replace(from, to);
    }

    // Transform Example components imports
    // For locale structure: packages/*/docs/{locale}/../../../../apps/docs/src/components/
    // For legacy structure: packages/*/docs/../../../../apps/docs/src/components/
    // Both should point to: ../../../../../components/
    const exampleComponentPatterns = [
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/ExampleComponents['"]/g,
        to: "from '../../../../../components/ExampleComponents'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/ExampleComponents['"]/g,
        to: "from '../../../../../components/ExampleComponents'",
      },
    ];

    for (const { from, to } of exampleComponentPatterns) {
      content = content.replace(from, to);
    }

    // Transform component imports to correct path after sync
    const componentImportPatterns = [
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/StorybookIframe\.astro['"]/g,
        to: "from '../../../../../components/StorybookIframe.astro'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/StorybookIframe\.astro['"]/g,
        to: "from '../../../../../components/StorybookIframe.astro'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/Changelog\.astro['"]/g,
        to: "from '../../../../../components/Changelog.astro'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/Changelog\.astro['"]/g,
        to: "from '../../../../../components/Changelog.astro'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/VersionSwitcher\.astro['"]/g,
        to: "from '../../../../../components/VersionSwitcher.astro'",
      },
      {
        from: /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/apps\/docs\/src\/components\/VersionSwitcher\.astro['"]/g,
        to: "from '../../../../../components/VersionSwitcher.astro'",
      },
    ];

    for (const { from, to } of componentImportPatterns) {
      content = content.replace(from, to);
    }

    // Write transformed content
    await fs.writeFile(targetPath, content, 'utf-8');
    logger.debug(`[sync-package-docs] Synced ${docFile} -> ${targetPath}`);
  }

  logger.info(`[sync-package-docs] Completed sync for ${pkgName} (${locale})`);
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
