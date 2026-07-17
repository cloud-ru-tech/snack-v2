import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

import type { TokenAdapter } from './adapters/types.js';
import { buildCSSFiles, buildSCSSFiles, buildTSFiles } from './builders/index.js';
import { validateTokenNamesStep } from './builders/pipeline/validateTokenNames.js';
import { SourceTokensFilter } from './filters/index.js';
import {
  CSSBaseStylesFormat,
  CSSComponentFormat,
  CSSFigmaStylesFormat,
  SCSSBaseStylesFormat,
  SCSSComponentFormat,
  TSBaseStylesFormat,
} from './formats/index.js';
import { ToCSSVariableTransform, ToPXTransform } from './transforms/index.js';
import type { BaseConfig, BuildResult } from './types.js';
import { logger } from './utils/logger.js';

export type BuildSource = {
  type: 'config' | 'cli';
  configPath?: string;
};

let registered = false;

function registerFormatsAndTransforms(): void {
  if (registered) {
    return;
  }

  register(StyleDictionary, {});

  StyleDictionary.registerTransform(ToPXTransform);
  StyleDictionary.registerTransform(ToCSSVariableTransform);

  StyleDictionary.registerFilter(SourceTokensFilter);

  StyleDictionary.registerFormat(CSSBaseStylesFormat);
  StyleDictionary.registerFormat(CSSComponentFormat);
  StyleDictionary.registerFormat(CSSFigmaStylesFormat);
  StyleDictionary.registerFormat(SCSSBaseStylesFormat);
  StyleDictionary.registerFormat(SCSSComponentFormat);
  StyleDictionary.registerFormat(TSBaseStylesFormat);

  registered = true;
}

export async function buildTokens(
  adapter: TokenAdapter,
  config: BaseConfig,
  buildPath: string,
  getFilePath: (path: string) => Promise<string | null>,
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
  source?: BuildSource,
): Promise<BuildResult> {
  registerFormatsAndTransforms();

  logger.section('Building Design Tokens');

  if (source) {
    if (source.type === 'config' && source.configPath) {
      logger.info(`Source: Config file (${source.configPath})`);
    } else if (source.type === 'cli') {
      logger.info('Source: CLI with parameters');
    }
  }

  logger.info(`Formats: ${config.formats.join(', ').toUpperCase()}`);
  logger.info(`CSS Modules: ${config.cssModules ? 'enabled' : 'disabled'}`);
  logger.info(`SCSS Modules: ${config.scssModules ? 'enabled' : 'disabled'}`);
  logger.info(`CSS Class Prefix: ${config.cssClassPrefix}`);
  logger.info(`Validation: ${config.validate}`);
  logger.info(`Log Level: ${config.logLevel}`);
  if (config.excludeGroups && config.excludeGroups.length > 0) {
    logger.info(`Excluded Groups: ${config.excludeGroups.join(', ')}`);
  }

  logger.separator();

  if (config.formats.length > 0) {
    await validateTokenNamesStep(adapter, config);
  }

  const result: BuildResult = {
    css: {},
    scss: {},
    ts: {},
  };

  const buildErrors: string[] = [];
  const buildWarnings: string[] = [];

  async function runFormatBuild(
    formatKey: 'css' | 'scss' | 'ts',
    sectionTitle: string,
    build: () => Promise<void>,
  ): Promise<void> {
    try {
      logger.section(sectionTitle);
      await build();
      logger.separator();
    } catch (error) {
      const errorMessage = `${formatKey.toUpperCase()} build failed: ${error instanceof Error ? error.message : String(error)}`;
      buildErrors.push(errorMessage);
      logger.separator();

      if (config.validate === 'strict') {
        throw new Error(errorMessage);
      }
    }
  }

  if (config.formats.includes('css')) {
    await runFormatBuild('css', 'Building CSS files', () =>
      buildCSSFiles(adapter, config, buildPath, getFilePath, collectResults),
    );
  }

  if (config.formats.includes('scss')) {
    await runFormatBuild('scss', 'Building SCSS files', () =>
      buildSCSSFiles(adapter, config, buildPath, getFilePath, collectResults),
    );
  }

  if (config.formats.includes('ts')) {
    await runFormatBuild('ts', 'Building TypeScript files', () =>
      buildTSFiles(adapter, config, buildPath, collectResults),
    );
  }

  if (buildErrors.length > 0) {
    result.errors = buildErrors;
  }
  if (buildWarnings.length > 0) {
    result.warnings = buildWarnings;
  }

  return result;
}
