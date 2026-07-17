import path from 'node:path';

import { NodeAdapter } from './adapters/nodeAdapter.js';
import { normalizeNodeConfig } from './config/normalizeConfig.js';
import { type BuildSource, buildTokens } from './core.js';
import type { NodeConfig } from './types.js';

export async function buildTokensFromNode(
  config: NodeConfig,
  source?: BuildSource,
): Promise<import('./types.js').BuildResult> {
  const normalizedConfig = normalizeNodeConfig(config);
  const adapter = new NodeAdapter(normalizedConfig.input, normalizedConfig.output);

  const buildPath = path.join(normalizedConfig.output, '/');

  // For Node.js, we need to await the file check
  const getFilePath = async (filePath: string): Promise<string | null> => {
    const fullPath = path.join(normalizedConfig.input, filePath);
    const exists = await adapter.exists(fullPath);
    return exists ? fullPath : null;
  };

  return await buildTokens(adapter, normalizedConfig, buildPath, getFilePath, undefined, source);
  // Results are written to files by Style Dictionary in Node.js mode
}
