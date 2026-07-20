import fs from 'fs/promises';

import path from 'node:path';

import type { NodeConfig } from '../types.js';
import { logger } from '../utils/logger.js';

export async function loadConfigFromFile(configPath: string): Promise<Partial<NodeConfig> | null> {
  try {
    const fullPath = path.resolve(configPath);
    const content = await fs.readFile(fullPath, 'utf-8');

    // Try to parse as JSON first
    try {
      return JSON.parse(content) as Partial<NodeConfig>;
    } catch {
      // If not JSON, try to require as JS/TS module
      // For now, we'll only support JSON
      return null;
    }
  } catch (error) {
    logger.warn(`Failed to load config from ${configPath}:`, error);
    return null;
  }
}

export async function findConfigFile(cwd: string = process.cwd()): Promise<string | null> {
  const possibleNames = [
    'tokens-builder.config.json',
    'tokens-builder.config.js',
    'tokens-builder.config.ts',
    '.tokens-builder.json',
  ];

  for (const name of possibleNames) {
    const configPath = path.join(cwd, name);
    try {
      await fs.access(configPath);
      return configPath;
    } catch {
      // File doesn't exist, try next
    }
  }

  return null;
}
