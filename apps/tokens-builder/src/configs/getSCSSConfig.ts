import type { ThemeObject } from '@tokens-studio/types';
import StyleDictionary, { type Config } from 'style-dictionary';

import { getStyleDictionaryLogConfig } from '../config/getStyleDictionaryLogConfig.js';
import { createExcludeGroupsFilter } from '../filters/ExcludeGroupsFilter.js';
import { createGroupFilter } from '../filters/GroupFilter.js';
import { FilterName, FormatName, type TokenSet } from '../types.js';
import { collectThemeIncludes } from '../utils/themeIncludes.js';
import { toFilePaths } from '../utils/tokenSets.js';

export async function getSCSSConfig({
  tokenSets,
  fileName,
  directory,
  includeFunctions = false,
  isComponent = false,
  themes = [],
  fallbackIncludePaths = [],
  buildPath,
  scssModules,
  getFilePath,
  skipThemeIncludes = false, // Новый параметр для пропуска themeIncludes
  filterByGroup, // Новый параметр для фильтрации по группе
  excludeGroups = [], // Параметр для исключения групп
  includeFallbackValues = true, // Параметр для включения fallback значений
  componentNames = [],
}: {
  tokenSets: TokenSet[];
  fileName: string;
  directory?: string;
  includeFunctions?: boolean;
  isComponent?: boolean;
  themes?: ThemeObject[];
  fallbackIncludePaths?: string[];
  buildPath: string;
  scssModules: boolean;
  getFilePath: (path: string) => Promise<string | null>;
  skipThemeIncludes?: boolean; // Новый параметр
  filterByGroup?: string; // Новый параметр для фильтрации по группе
  excludeGroups?: string[]; // Параметр для исключения групп
  includeFallbackValues?: boolean; // Параметр для включения fallback значений
  componentNames?: string[];
}): Promise<Config | null> {
  const source = toFilePaths(tokenSets);

  if (!source.length) {
    return null;
  }

  const themeIncludes = skipThemeIncludes ? [] : await collectThemeIncludes(tokenSets, themes, getFilePath);
  const include = Array.from(new Set([...themeIncludes, ...(fallbackIncludePaths ?? [])].filter(Boolean)));

  // Регистрируем фильтр для исключения групп, если указаны
  if (excludeGroups.length > 0) {
    const excludeGroupsFilter = createExcludeGroupsFilter(excludeGroups);
    StyleDictionary.registerFilter(excludeGroupsFilter);
  }

  // Регистрируем фильтр по группе, если указан
  let filterName: string | undefined;
  if (filterByGroup) {
    // Для отдельных файлов стилей используем имя файла как имя токен-сета
    const tokenSetName = directory === 'styles' ? fileName : undefined;
    const groupFilter = createGroupFilter(filterByGroup, tokenSetName);
    filterName = groupFilter.name;
    StyleDictionary.registerFilter(groupFilter);
  } else if (isComponent) {
    // Для компонентов используем фильтр SourceTokens, чтобы включить все source токены из файла компонента
    // Это гарантирует, что все токены, определенные в файле компонента (включая те, что без ссылок),
    // попадут в dictionary.allTokens
    filterName = FilterName.SourceTokens;
  } else if (excludeGroups.length > 0) {
    // Если нет специфического фильтра, используем фильтр исключения групп
    filterName = FilterName.ExcludeGroups;
  }

  const extension = scssModules ? 'module.scss' : 'scss';

  return {
    source,
    include,
    preprocessors: ['tokens-studio'],
    log: getStyleDictionaryLogConfig(),
    platforms: {
      css: {
        buildPath,
        files: [
          {
            destination: directory ? `${directory}/${fileName}.${extension}` : `${fileName}.${extension}`,
            format: isComponent ? FormatName.SCSSComponent : FormatName.SCSSBaseStyles,
            filter: filterName,
            options: {
              includeFunctions,
              componentName: isComponent ? fileName : undefined,
              componentNames,
              includeFallbackValues: includeFallbackValues ?? true,
            },
          },
        ],
      },
    },
  };
}
