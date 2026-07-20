import type { TokenAdapter } from '../adapters/types.js';
import type { BaseConfig } from '../types.js';
import { getBaseLayers, getDirectoryName, getNonBaseLayers } from '../utils/groupUtils.js';
import { logger } from '../utils/logger.js';
import { createCombinedCSSFile } from './pipeline/createCombinedCSSFile.js';
import {
  generateFiles,
  prepareCSSConfigs,
  prepareTokenData,
  runTokenReferenceValidation,
  validateGeneratedFilesStep,
} from './pipeline/index.js';

export async function buildCSSFiles(
  adapter: TokenAdapter,
  config: BaseConfig,
  buildPath: string,
  getFilePath: (path: string) => Promise<string | null>,
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<void> {
  await runTokenReferenceValidation(adapter, config);

  const tokenData = await prepareTokenData(adapter, config);
  const configs = await prepareCSSConfigs(tokenData, config, buildPath, getFilePath);

  logger.subsection('Generating files...');
  const createdFiles = await generateFiles(configs, collectResults);

  if (createdFiles.length > 0) {
    logger.fileList(createdFiles, 'css');
  }

  if (!collectResults) {
    const systemLayerGroups = tokenData.systemLayers.map(l => l.group);
    const hasBase = getBaseLayers(systemLayerGroups).length > 0;
    const nonBaseGroups = hasBase ? getNonBaseLayers(systemLayerGroups) : systemLayerGroups;
    const segmentOrder = (hasBase ? ['base'] : []).concat(nonBaseGroups.map(getDirectoryName), 'styles', 'components');
    await createCombinedCSSFile(buildPath, createdFiles, config, segmentOrder);
  }

  logger.success('CSS files generated successfully');

  await validateGeneratedFilesStep(createdFiles, 'css', config, collectResults);
}
