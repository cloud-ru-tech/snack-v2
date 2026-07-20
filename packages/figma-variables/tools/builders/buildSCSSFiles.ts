import type { TokenAdapter } from '../adapters/types.js';
import type { BaseConfig } from '../types.js';
import { logger } from '../utils/logger.js';
import {
  generateFiles,
  prepareSCSSConfigs,
  prepareTokenData,
  runTokenReferenceValidation,
  validateGeneratedFilesStep,
} from './pipeline/index.js';

export async function buildSCSSFiles(
  adapter: TokenAdapter,
  config: BaseConfig,
  buildPath: string,
  getFilePath: (path: string) => Promise<string | null>,
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<void> {
  await runTokenReferenceValidation(adapter, config);

  const tokenData = await prepareTokenData(adapter, config);
  const configs = await prepareSCSSConfigs(tokenData, config, buildPath, getFilePath);

  logger.subsection('Generating files...');
  const createdFiles = await generateFiles(configs, collectResults);

  if (createdFiles.length > 0) {
    logger.fileList(createdFiles, 'scss');
  }

  logger.success('SCSS files generated successfully');

  await validateGeneratedFilesStep(createdFiles, 'scss', config, collectResults);
}
