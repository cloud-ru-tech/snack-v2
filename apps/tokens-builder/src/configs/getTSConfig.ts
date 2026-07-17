import StyleDictionary, { type Config } from 'style-dictionary';

import { getStyleDictionaryLogConfig } from '../config/getStyleDictionaryLogConfig.js';
import { createExcludeGroupsFilter } from '../filters/ExcludeGroupsFilter.js';
import { FilterName, FormatName, type TokenSet } from '../types.js';
import { toFilePaths } from '../utils/tokenSets.js';

export function getTSConfig(tokenSets: TokenSet[], buildPath: string, excludeGroups: string[] = []): Config | null {
  const source = toFilePaths(tokenSets);

  if (!source.length) {
    return null;
  }

  // Регистрируем фильтр для исключения групп, если указаны
  let filterName: string | undefined;
  if (excludeGroups.length > 0) {
    const excludeGroupsFilter = createExcludeGroupsFilter(excludeGroups);
    StyleDictionary.registerFilter(excludeGroupsFilter);
    filterName = FilterName.ExcludeGroups;
  }

  return {
    source,
    preprocessors: ['tokens-studio'],
    log: getStyleDictionaryLogConfig(),
    platforms: {
      css: {
        buildPath,
        files: [
          {
            destination: 'styles.ts',
            format: FormatName.TSBaseStyles,
            filter: filterName,
          },
        ],
      },
    },
  };
}
