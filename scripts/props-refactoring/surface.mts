import { sync as globSync } from 'glob';
import { basename } from 'node:path';

export type ComponentSurface = 'consumer' | 'exported-helper';

export function buildComponentPathMap(pkgDir: string): Map<string, string> {
  const map = new Map<string, string>();
  const files = globSync('src/**/*.tsx', { cwd: pkgDir, absolute: true });
  for (const file of files) {
    map.set(basename(file, '.tsx'), file);
  }
  return map;
}

export function inferSurface(filePath: string | undefined, displayName: string): ComponentSurface {
  if (displayName.includes('Private')) return 'exported-helper';
  if (!filePath) return 'consumer';
  if (
    filePath.includes('/helperComponents/')
    || filePath.includes('-private/')
    || /Private/.test(filePath)
  ) {
    return 'exported-helper';
  }
  return 'consumer';
}
