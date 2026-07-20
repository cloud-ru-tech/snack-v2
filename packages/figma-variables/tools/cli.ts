#!/usr/bin/env node

import { Command } from 'commander';

import { findConfigFile, loadConfigFromFile } from './config/loadConfig.js';
import { normalizeNodeConfig } from './config/normalizeConfig.js';
import { buildTokensFromNode } from './index.js';
import type { NodeConfig } from './types.js';
import { logger } from './utils/logger.js';
import { watchTokens } from './utils/watch.js';

const program = new Command();

program
  .name('tokens-builder')
  .description('CLI tool for generating CSS, SCSS and TypeScript files from Figma tokens')
  .version('0.1.0');

program
  .option('-i, --input <path>', 'Path to tokens directory', './tokens')
  .option('-o, --output <path>', 'Path to output directory', './build')
  .option('-c, --config <path>', 'Path to config file')
  .option('--formats <formats...>', 'Formats to generate (css, scss, ts)', ['css', 'scss', 'ts'])
  .option('--css-modules', 'Generate CSS modules')
  .option('--scss-modules', 'Generate SCSS modules', true)
  .option('--no-scss-modules', 'Disable SCSS modules')
  .option('--css-class-prefix <prefix>', 'CSS class prefix', 'sn')
  .option('--validate <mode>', 'Validation mode (strict, warning, off)')
  .option('-w, --watch', 'Watch mode')
  .option('--log-level <level>', 'Log level (error, warning, info, debug)', 'info')
  .option('--log-file <path>', 'Path to log file for saving logs')
  .option('--exclude-groups <groups...>', 'Groups to exclude from build (e.g., 06_languageMode 07_acrylicMode)')
  .action(async options => {
    try {
      let fileConfig: Partial<NodeConfig> | null = null;
      let configPath: string | null = null;

      if (options.config) {
        configPath = options.config;
        fileConfig = await loadConfigFromFile(options.config);
      } else {
        const foundConfig = await findConfigFile();
        if (foundConfig) {
          configPath = foundConfig;
          fileConfig = await loadConfigFromFile(foundConfig);
        }
      }

      // Определяем, есть ли CLI параметры, которые переопределяют конфиг
      // Проверяем, был ли параметр явно передан через CLI (не дефолтное значение)
      const hasCliOverrides =
        options.input ||
        options.output ||
        options.formats ||
        options.cssModules !== undefined ||
        options.scssModules !== undefined ||
        options.cssClassPrefix ||
        options.validate !== undefined ||
        options.watch !== undefined ||
        options.logLevel ||
        options.logFile ||
        options.excludeGroups;

      const config: Partial<NodeConfig> = {
        ...fileConfig,
        ...(options.input && { input: options.input }),
        ...(options.output && { output: options.output }),
        ...(options.formats && { formats: options.formats }),
        ...(options.cssModules !== undefined && {
          cssModules: options.cssModules,
        }),
        ...(options.scssModules !== undefined && {
          scssModules: options.scssModules,
        }),
        ...(options.cssClassPrefix && {
          cssClassPrefix: options.cssClassPrefix,
        }),
        ...(options.validate !== undefined && { validate: options.validate }),
        ...(options.watch !== undefined && { watch: options.watch }),
        ...(options.logLevel && { logLevel: options.logLevel }),
        ...(options.logFile && { logFile: options.logFile }),
        ...(options.excludeGroups && { excludeGroups: options.excludeGroups }),
      };

      const normalizedConfig = normalizeNodeConfig(config);

      // Инициализируем логгер с уровнем и путем к файлу из конфига
      logger.init(normalizedConfig.logLevel, normalizedConfig.logFile);

      // Определяем источник запуска
      const buildSource: { type: 'config' | 'cli'; configPath?: string } = configPath
        ? { type: hasCliOverrides ? 'cli' : 'config', configPath }
        : { type: 'cli' };

      if (normalizedConfig.watch) {
        await watchTokens(normalizedConfig, buildSource);
      } else {
        const result = await buildTokensFromNode(normalizedConfig, buildSource);
        logger.separator();
        logger.section('Build results');

        // Проверяем результат сборки
        const hasErrors = result.errors && result.errors.length > 0;
        const hasWarnings = result.warnings && result.warnings.length > 0;

        // Выводим информацию о том, что удалось собрать
        const completedFormats: string[] = [];
        if (Object.keys(result.css).length > 0) completedFormats.push('CSS');
        if (Object.keys(result.scss).length > 0) completedFormats.push('SCSS');
        if (Object.keys(result.ts).length > 0) completedFormats.push('TypeScript');

        if (completedFormats.length > 0) {
          logger.info(`Completed formats: ${completedFormats.join(', ')}`);
        }

        // Выводим ошибки, если они есть
        if (hasErrors && result.errors) {
          logger.error(`Build failed with ${result.errors.length} error(s):`);
          result.errors.forEach((error, index) => {
            logger.error(`  ${index + 1}. ${error}`);
          });
          process.exit(1);
        }

        // Выводим предупреждения, если они есть
        if (hasWarnings && result.warnings) {
          logger.warn(`Build completed with ${result.warnings.length} warning(s):`);
          result.warnings.forEach((warning, index) => {
            logger.warn(`  ${index + 1}. ${warning}`);
          });
        }

        if (!hasErrors) {
          logger.success('Tokens built successfully');
        }

        // Закрываем файл логов
        logger.closeLogFile();
      }
    } catch (error) {
      logger.separator();
      logger.section('Build results');
      logger.error('Build failed with error:');
      logger.error(`  ${error instanceof Error ? error.message : String(error)}`);
      if (error instanceof Error && error.stack) {
        logger.debug(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
