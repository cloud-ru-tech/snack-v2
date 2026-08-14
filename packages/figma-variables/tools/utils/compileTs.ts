import { execSync } from 'child_process';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { cwd } from 'process';

import { resolve } from 'node:path';

import { logger } from './logger.js';

export const compileTs = async (path: string): Promise<void> => {
  try {
    // Check if file exists first
    try {
      await fs.access(path);
    } catch {
      throw new Error(`TypeScript file not found: ${path}`);
    }

    // Try to find tsc in the project's node_modules (where the package is used)
    // First, try node_modules/.bin/tsc in the current working directory
    const projectRoot = cwd();
    const tscPath = resolve(projectRoot, 'node_modules/.bin/tsc');

    // Use npx tsc if local tsc is not found, or use the found path
    const tscCommand = existsSync(tscPath) ? `"${tscPath}"` : 'npx tsc';

    // Только .d.ts: JS-выхлоп tsc здесь не нужен и вреден. При явной передаче файла
    // tsc игнорирует tsconfig.json и берёт дефолты (target ES5 → module CommonJS),
    // а пакет объявлен как "type": "module" — CJS ломал потребителей
    // (`exports is not defined`). Сам styles.js пишется из сгенерированного
    // исходника в buildTSFiles: он уже валидный ESM.
    execSync(`${tscCommand} "${path}" --declaration --emitDeclarationOnly --skipLibCheck`, {
      stdio: 'inherit',
    });
    logger.info(`  ✓ ${path.replace(/\.ts$/, '.d.ts')}`);
  } catch (error) {
    logger.error('Failed to compile TypeScript:', error);
    throw error;
  }
};
