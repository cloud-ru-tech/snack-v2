import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function managerEntries(entry: string[] = []): string[] {
  return [...entry, path.resolve(__dirname, 'manager.tsx')];
}
