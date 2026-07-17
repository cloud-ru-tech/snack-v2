import StyleDictionary, { type Config } from 'style-dictionary';

import { getStyleDictionaryLogConfig } from '../config/getStyleDictionaryLogConfig.js';
import { FilterName, FormatName, type TokenSet, TransformName } from '../types.js';
import { toFilePaths } from '../utils/tokenSets.js';

export function getCSSBaseStylesConfig(
  tokenSets: TokenSet[],
  buildPath: string,
  cssClassPrefix: string,
  cssModules: boolean,
  fallbackIncludePaths: string[] = [],
  excludeGroups: string[] = [],
  /**
   * Ограничение групп исходных токенов, которые должны попасть в base.css.
   * Например: ['01_base', '02_primitive'].
   * Токены из других групп (03_adaptiveMode, 04_brandMode, и т.д.) будут исключены.
   */
  allowedSourceGroups: string[] = [],
  includeFallbackValues: boolean = true,
): Config | null {
  const source = toFilePaths(tokenSets);

  if (!source.length) {
    return null;
  }

  // Регистрируем фильтр для base.css:
  // - исключаем токены из групп excludeGroups (06_languageMode, 07_acrylicMode, ...)
  // - если указаны allowedSourceGroups, пропускаем только токены,
  //   чей файл лежит в одной из этих групп (01_base, 02_primitive и т.п.)
  let filterName: string | undefined;
  if (excludeGroups.length > 0 || allowedSourceGroups.length > 0) {
    const baseFilter = {
      name: `${FilterName.ExcludeGroups}-base-${allowedSourceGroups.join('_') || 'all'}`,
      filter: (token: { filePath?: string; path?: (string | number)[] }) => {
        const normalizedPath = token.filePath?.replace(/\\/g, '/') ?? '';
        const pathParts = normalizedPath ? normalizedPath.split('/') : [];

        // Вычисляем группы из пути к файлу: 01_base, 02_primitive, 03_adaptiveMode, ...
        const fileGroups = pathParts.filter(part => /^\d+_/.test(part));

        // Дополнительно пытаемся взять группу из token.path[1], если там что-то осмысленное
        const tokenPath = token.path ?? [];
        const tokenPathGroup =
          tokenPath.length >= 2 && typeof tokenPath[1] === 'string' ? (tokenPath[1] as string) : undefined;

        const allGroupsForToken = new Set<string>([...fileGroups, ...(tokenPathGroup ? [tokenPathGroup] : [])]);

        // 1. Сначала исключаем группы из excludeGroups
        if (excludeGroups.some(group => allGroupsForToken.has(group))) {
          return false;
        }

        // 2. Если нет ограничений по allowedSourceGroups – пропускаем токен
        if (allowedSourceGroups.length === 0) {
          return true;
        }

        // 3. Пропускаем только токены, у которых есть пересечение с allowedSourceGroups
        if (allowedSourceGroups.some(group => allGroupsForToken.has(group))) {
          return true;
        }

        // Остальные токены (например, из 03_adaptiveMode, 04_brandMode, styles и т.д.) отфильтровываем
        return false;
      },
    };

    StyleDictionary.registerFilter(baseFilter);
    filterName = baseFilter.name;
  }

  const extension = cssModules ? 'module.css' : 'css';

  const config = {
    source,
    include: fallbackIncludePaths,
    preprocessors: ['tokens-studio'],
    log: getStyleDictionaryLogConfig(),
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab', TransformName.CustomPx],
        buildPath,
        files: [
          {
            destination: `base/base.${extension}`,
            format: FormatName.CSSBaseStyles,
            filter: filterName,
            options: {
              prefix: cssClassPrefix,
              className: 'base-styles',
              includeFallbackValues,
            },
          },
        ],
      },
    },
  };

  return config;
}
