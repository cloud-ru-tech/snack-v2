import type { ThemeObject } from '@tokens-studio/types';

import { FILE_EXTENSIONS } from '../constants/index.js';
import type { TokenSet } from '../types.js';
import { ensureExtension } from './pathUtils.js';

export async function collectThemeIncludes(
  tokenSets: TokenSet[],
  themes: ThemeObject[],
  getFilePath: (path: string) => Promise<string | null>,
): Promise<string[]> {
  const results = await Promise.all(
    tokenSets.map(async ({ group, name }) => {
      const theme = themes.find(themeObject => themeObject.group === group && themeObject.name === name);

      if (!theme) {
        return [];
      }

      const paths = await Promise.all(
        Object.entries(theme.selectedTokenSets ?? {})
          .filter(([, value]) => value === 'source')
          .map(([tokenSetPath]) => getFilePath(ensureExtension(tokenSetPath, FILE_EXTENSIONS.JSON))),
      );
      return paths.filter((path): path is string => path !== null);
    }),
  );
  return results.flat();
}
