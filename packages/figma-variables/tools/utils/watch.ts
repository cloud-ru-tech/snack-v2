import { watch } from 'chokidar';

import type { BuildSource } from '../core.js';
import { buildTokensFromNode } from '../index.js';
import type { NodeConfig } from '../types.js';
import { logger } from './logger.js';

export async function watchTokens(config: NodeConfig, source?: BuildSource): Promise<void> {
  const watcher = watch(config.input, {
    ignored: /(^|[\\/])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });

  let buildTimeout: NodeJS.Timeout | null = null;

  const debouncedBuild = () => {
    if (buildTimeout) {
      clearTimeout(buildTimeout);
    }
    buildTimeout = setTimeout(async () => {
      try {
        logger.info('Tokens changed, rebuilding...');
        await buildTokensFromNode(config, source);
        logger.success('Rebuild complete');
      } catch (error) {
        logger.error('Error rebuilding tokens:', error);
      }
    }, 300);
  };

  watcher
    .on('add', path => {
      logger.debug(`File ${path} has been added`);
      debouncedBuild();
    })
    .on('change', path => {
      logger.debug(`File ${path} has been changed`);
      debouncedBuild();
    })
    .on('unlink', path => {
      logger.debug(`File ${path} has been removed`);
      debouncedBuild();
    });

  logger.info(`Watching ${config.input} for changes...`);
  logger.info('Press Ctrl+C to stop watching');
}
