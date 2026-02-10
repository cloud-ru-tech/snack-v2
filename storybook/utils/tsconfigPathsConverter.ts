import fs from 'fs';
import { resolve } from 'path';

type TsconfigFile = {
  compilerOptions: {
    baseUrl: string;
    paths?: {
      [aliasName: string]: string[];
    };
  };
};

type WebpackAliases = {
  [aliasName: string]: string;
};

const replaceGlobs = (path: string): string => path.replace(/(\/\*\*)*\/\*$/, '');

/**
 * Разворачивает path-шаблон с одним звёздочка по подпапкам baseDir.
 * Например: "./packages/<star>/src" и baseDir "packages" даёт для каждой подпапки
 * resolve(dirname, baseUrl, "packages/<name>/src").
 */
function expandPathGlob(
  dirname: string,
  baseUrl: string,
  pathTemplate: string,
  baseDirSegment: string,
): WebpackAliases {
  const aliases: WebpackAliases = {};
  const baseDir = resolve(dirname, baseUrl, baseDirSegment);
  if (!fs.existsSync(baseDir) || !fs.statSync(baseDir).isDirectory()) {
    return aliases;
  }
  const segmentNames = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name);

  const starIndex = pathTemplate.indexOf('*');
  if (starIndex === -1) return aliases;
  const beforeStar = pathTemplate.slice(0, starIndex);
  const afterStar = pathTemplate.slice(starIndex + 1);

  for (const name of segmentNames) {
    const pathValue = beforeStar + name + afterStar;
    aliases[pathValue] = resolve(dirname, baseUrl, pathValue);
  }
  return aliases;
}

export function tsconfigPathsConverter(tsConfigPath: string, dirname = '.'): WebpackAliases {
  const tsConfig: TsconfigFile = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
  const { baseUrl, paths = {} } = tsConfig.compilerOptions;

  return Object.keys(paths).reduce((aliases: WebpackAliases, pathName) => {
    const pathTemplate = paths[pathName][0];
    const hasGlob = pathTemplate.includes('*');

    if (hasGlob) {
      const aliasPrefix = replaceGlobs(pathName);
      const match = pathTemplate.match(/^\.?\/([^*]+)\*\/(.*)$/);
      if (match) {
        const [, baseDirSegment, afterStar] = match;
        const beforeStar = pathTemplate.slice(0, pathTemplate.indexOf('*'));
        const expanded = expandPathGlob(dirname, baseUrl, pathTemplate, baseDirSegment);
        for (const [pathKey, resolvedPath] of Object.entries(expanded)) {
          const segment = pathKey
            .replace(beforeStar, '')
            .replace(afterStar, '')
            .replace(/^\/|\/$/g, '');
          if (segment) {
            aliases[`${aliasPrefix}/${segment}`] = resolvedPath;
          }
        }
      } else {
        const alias = replaceGlobs(pathName);
        const path = replaceGlobs(pathTemplate);
        aliases[alias] = resolve(dirname, baseUrl, path);
      }
    } else {
      const alias = replaceGlobs(pathName);
      const path = replaceGlobs(pathTemplate);
      aliases[alias] = resolve(dirname, baseUrl, path);
    }

    return aliases;
  }, {});
}
