import type { TokenAdapter } from '../adapters/types.js';
import type { BaseConfig } from '../types.js';
import { compileTs, deleteFiles } from '../utils/index.js';
import { logger } from '../utils/logger.js';
import { generateFiles, prepareTokenData, prepareTSConfigs, runTokenReferenceValidation } from './pipeline/index.js';

export async function buildTSFiles(
  adapter: TokenAdapter,
  config: BaseConfig,
  buildPath: string,
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<void> {
  await runTokenReferenceValidation(adapter, config);

  const tokenData = await prepareTokenData(adapter, config);
  const configs = prepareTSConfigs(tokenData, config, buildPath);

  if (configs.length === 0) {
    const sources = [
      ...tokenData.systemLayers.slice(0, 2),
      ...tokenData.systemLayers.slice(2).flatMap(layer => tokenData.tokenSets.filter(ts => ts.group === layer.group)),
    ];
    logger.debug(
      'TS config is null. Sources:',
      sources.length,
      'File paths:',
      sources.map(s => s.filePath).filter(Boolean).length,
    );
    return;
  }

  logger.subsection('Generating files...');
  const createdFiles = await generateFiles(configs, collectResults);

  if (createdFiles.length > 0) {
    logger.fileList(createdFiles, 'ts');
  }

  if (!collectResults) {
    logger.subsection('Compiling TypeScript...');
    const file = `${buildPath}ts/styles.ts`;
    try {
      await compileTs(file);
      await deleteFiles(file);
      logger.success('TypeScript compilation completed');
    } catch (error) {
      logger.warn(`Failed to compile TS file ${file}:`, error);
    }
  }
}
