import type { ThemeObject } from '@tokens-studio/types';
import StyleDictionary, { type Config } from 'style-dictionary';

import { getStyleDictionaryLogConfig } from '../config/getStyleDictionaryLogConfig.js';
import { createSourceTokensExcludeGroupsFilter } from '../filters/SourceTokensExcludeGroupsFilter.js';
import { FormatName, type TokenSet, TransformName } from '../types.js';
import { collectThemeIncludes } from '../utils/themeIncludes.js';
import { toFilePaths } from '../utils/tokenSets.js';

export async function getCSSComponentConfig({
  tokenSets,
  componentName,
  fileName,
  themes = [],
  fallbackIncludePaths = [],
  buildPath,
  cssClassPrefix,
  cssModules,
  getFilePath,
  excludeGroups = [],
  includeFallbackValues = true,
}: {
  tokenSets: TokenSet[];
  componentName: string;
  fileName: string;
  themes?: ThemeObject[];
  fallbackIncludePaths?: string[];
  buildPath: string;
  cssClassPrefix: string;
  cssModules: boolean;
  getFilePath: (path: string) => Promise<string | null>;
  excludeGroups?: string[];
  includeFallbackValues?: boolean;
}): Promise<Config | null> {
  const source = toFilePaths(tokenSets);

  if (!source.length) {
    return null;
  }

  const themeIncludes = await collectThemeIncludes(tokenSets, themes, getFilePath);
  const include = Array.from(new Set([...themeIncludes, ...(fallbackIncludePaths ?? [])].filter(Boolean)));

  const extension = cssModules ? 'module.css' : 'css';

  // Для компонентов используем фильтр SourceTokens, чтобы включить все source токены из файла компонента
  const compositeFilter = createSourceTokensExcludeGroupsFilter(excludeGroups);
  StyleDictionary.registerFilter(compositeFilter);

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
            destination: `components/${fileName}.${extension}`,
            format: FormatName.CSSComponent,
            filter: compositeFilter.name,
            options: {
              prefix: cssClassPrefix,
              componentName,
              includeFallbackValues,
            },
          },
        ],
      },
    },
  };
}
