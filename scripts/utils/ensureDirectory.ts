import * as fs from 'fs';
import * as path from 'path';

/**
 * Ensures that the directory exists. If the directory structure does not exist, it is created.
 */
export function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Ensures that the parent directory of a file exists.
 */
export function ensureParentDirectory(filePath: string): void {
  const dir = path.dirname(filePath);
  ensureDirectory(dir);
}
