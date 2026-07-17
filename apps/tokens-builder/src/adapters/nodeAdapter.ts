import fs from 'fs/promises';

import type { ThemeObject } from '@tokens-studio/types';
import path from 'node:path';

import { BUILD_DIRECTORIES, FILE_EXTENSIONS, SPECIAL_FILES } from '../constants/index.js';
import type { TokenSet } from '../types.js';
import { logger } from '../utils/logger.js';
import { normalizeTokenReferences } from '../utils/normalizeTokenReferences.js';
import { hasExtension, isSpecialFile } from '../utils/pathUtils.js';
import { toTokenSet } from '../utils/tokenSets.js';
import type { TokenAdapter } from './types.js';

export class NodeAdapter implements TokenAdapter {
  private tokensDirectory: string;
  private outputDirectory: string;

  constructor(tokensDirectory: string, outputDirectory: string) {
    this.tokensDirectory = tokensDirectory;
    this.outputDirectory = outputDirectory;
  }

  async readTokens(): Promise<TokenSet[]> {
    const tokenSets: TokenSet[] = [];

    try {
      const entries = await fs.readdir(this.tokensDirectory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        if (!entry.isDirectory() || isSpecialFile(entry.name)) {
          continue;
        }

        const dirPath = path.join(this.tokensDirectory, entry.name);
        const dirEntries = await fs.readdir(dirPath, { withFileTypes: true });

        for (const dirEntry of dirEntries) {
          if (!dirEntry.isFile() || !hasExtension(dirEntry.name, FILE_EXTENSIONS.JSON)) {
            continue;
          }

          const name = dirEntry.name.replace(FILE_EXTENSIONS.JSON, '');
          const tokenSetPath = `${entry.name}/${name}`;
          const tokenSet = toTokenSet(tokenSetPath, this.tokensDirectory);

          if (tokenSet) {
            try {
              const filePath = path.join(this.tokensDirectory, `${tokenSetPath}${FILE_EXTENSIONS.JSON}`);
              tokenSet.filePath = filePath;
              const content = await fs.readFile(filePath, 'utf-8');
              const parsedContent = JSON.parse(content);
              // Normalize token references (fix common issues from Figma exports)
              const normalizedContent = normalizeTokenReferences(parsedContent);

              // Write normalized content back to file if it changed
              // Style Dictionary reads files directly, so we need to persist changes
              const normalizedJSON = JSON.stringify(normalizedContent, null, 2);
              const originalJSON = JSON.stringify(parsedContent, null, 2);
              if (normalizedJSON !== originalJSON) {
                await fs.writeFile(filePath, normalizedJSON, 'utf-8');
                logger.debug(`Normalized token references in ${tokenSetPath}`);
              }

              tokenSet.content = normalizedContent;
              tokenSets.push(tokenSet);
            } catch (error) {
              logger.warn(`Failed to read token file: ${tokenSetPath}`, error);
            }
          }
        }
      }
    } catch (error) {
      logger.warn(`Failed to read tokens directory: ${this.tokensDirectory}`, error);
    }

    return tokenSets;
  }

  async readMetadata(): Promise<{ tokenSetOrder?: string[] } | null> {
    const metadataPath = path.join(this.tokensDirectory, SPECIAL_FILES.METADATA);

    try {
      const content = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(content) as { tokenSetOrder?: string[] };
    } catch {
      return null;
    }
  }

  async readThemes(): Promise<ThemeObject[] | null> {
    const themesPath = path.join(this.tokensDirectory, SPECIAL_FILES.THEMES);

    try {
      const content = await fs.readFile(themesPath, 'utf-8');
      return JSON.parse(content) as ThemeObject[];
    } catch {
      return null;
    }
  }

  async writeResults(results: {
    css: Record<string, string>;
    scss: Record<string, string>;
    ts: Record<string, string>;
  }): Promise<void> {
    await fs.mkdir(this.outputDirectory, { recursive: true });
    await this.writeFormatFiles(results.css, BUILD_DIRECTORIES.CSS);
    await this.writeFormatFiles(results.scss, BUILD_DIRECTORIES.SCSS);
    await this.writeFormatFiles(results.ts, BUILD_DIRECTORIES.TS);
  }

  private async writeFormatFiles(files: Record<string, string>, formatDir: string): Promise<void> {
    if (Object.keys(files).length === 0) {
      return;
    }

    const formatPath = path.join(this.outputDirectory, formatDir);
    await fs.mkdir(formatPath, { recursive: true });

    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(formatPath, filePath);
      const dir = path.dirname(fullPath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, String(content), 'utf-8');
    }
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
