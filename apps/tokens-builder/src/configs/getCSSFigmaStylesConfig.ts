import type { ThemeObject } from '@tokens-studio/types';
import StyleDictionary, { type Config } from 'style-dictionary';

import { getStyleDictionaryLogConfig } from '../config/getStyleDictionaryLogConfig.js';
import { createSourceTokensExcludeGroupsFilter } from '../filters/SourceTokensExcludeGroupsFilter.js';
import { FormatName, type TokenSet, TransformName } from '../types.js';
import { collectThemeIncludes } from '../utils/themeIncludes.js';
import { toFilePaths } from '../utils/tokenSets.js';

export async function getCSSFigmaStylesConfig({
  tokenSets,
  className,
  fileName,
  directory,
  themes = [],
  fallbackIncludePaths = [],
  buildPath,
  cssClassPrefix,
  cssModules,
  getFilePath,
  excludeGroups = [],
  filterByGroup,
  includeFallbackValues = true,
}: {
  tokenSets: TokenSet[];
  className: string;
  fileName: string;
  directory?: string;
  themes?: ThemeObject[];
  fallbackIncludePaths?: string[];
  buildPath: string;
  cssClassPrefix: string;
  cssModules: boolean;
  getFilePath: (path: string) => Promise<string | null>;
  excludeGroups?: string[];
  /**
   * Необязательный параметр для ограничения токенов по группе.
   * Используется для styles/styles.css, чтобы включать только токены из папки tokens/styles.
   */
  filterByGroup?: string;
  includeFallbackValues?: boolean;
}): Promise<Config | null> {
  const source = toFilePaths(tokenSets);

  if (!source.length) {
    return null;
  }

  const themeIncludes = await collectThemeIncludes(tokenSets, themes, getFilePath);
  const include = Array.from(new Set([...themeIncludes, ...(fallbackIncludePaths ?? [])].filter(Boolean)));

  const extension = cssModules ? 'module.css' : 'css';

  // Определяем фильтр:
  // - по умолчанию используем составной фильтр SourceTokens + ExcludeGroups (как и раньше)
  // - для styles/styles.css дополнительно ограничиваем токены только файлами из папки tokens/styles
  let filterName: string | undefined;
  if (filterByGroup) {
    const stylesOnlyFilter = {
      name: `styles-only-${filterByGroup}`,
      filter: (token: { filePath?: string | undefined }) => {
        if (!token.filePath) return false;
        const normalizedPath = token.filePath.replace(/\\/g, '/');
        return normalizedPath.includes(`/${filterByGroup}/`);
      },
    };
    StyleDictionary.registerFilter(stylesOnlyFilter);
    filterName = stylesOnlyFilter.name;
  } else {
    const compositeFilter = createSourceTokensExcludeGroupsFilter(excludeGroups);
    StyleDictionary.registerFilter(compositeFilter);
    filterName = compositeFilter.name;
  }

  return {
    source,
    include,
    preprocessors: ['tokens-studio'],
    log: getStyleDictionaryLogConfig(),
    platforms: {
      css: {
        transforms: [TransformName.CustomCssVariable],
        buildPath,
        files: [
          {
            destination: directory ? `${directory}/${fileName}.${extension}` : `${fileName}.${extension}`,
            format: FormatName.CSSFigmaStyles,
            filter: filterName,
            options: {
              prefix: cssClassPrefix,
              className,
              includeFallbackValues,
            },
          },
        ],
      },
    },
  };
}
