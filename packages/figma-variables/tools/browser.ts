import { BrowserAdapter } from './adapters/browserAdapter.js';
import { normalizeBrowserConfig } from './config/normalizeConfig.js';
import { FILE_EXTENSIONS } from './constants/index.js';
import { buildTokens } from './core.js';
import type { BrowserConfig, BuildResult } from './types.js';
import { logger } from './utils/logger.js';
import { removeExtension } from './utils/pathUtils.js';

export async function buildTokensFromBrowser(config: BrowserConfig): Promise<BuildResult> {
  const normalizedConfig = normalizeBrowserConfig(config);

  // Инициализируем логгер с уровнем из конфига
  logger.init(normalizedConfig.logLevel);

  const adapter = new BrowserAdapter(
    normalizedConfig.tokens,
    await Promise.resolve(null), // metadata - can be extended later
    await Promise.resolve(null), // themes - can be extended later
  );

  // For browser mode, we use a temporary build path
  // Results are collected via collectResults callback
  const buildPath = '/tmp/';

  const getFilePath = async (path: string): Promise<string | null> => {
    // In browser mode, we check if token exists in the tokens object
    const tokenPath = removeExtension(path, FILE_EXTENSIONS.JSON);
    return normalizedConfig.tokens[tokenPath] ? path : null;
  };

  const collectResults = (type: 'css' | 'scss' | 'ts', path: string, content: string) => {
    adapter.setResult(type, path, content);
  };

  await buildTokens(adapter, normalizedConfig, buildPath, getFilePath, collectResults);

  // Get results from adapter
  return adapter.getResults();
}
