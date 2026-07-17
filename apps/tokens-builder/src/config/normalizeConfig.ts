import type { BrowserConfig, NodeConfig } from '../types.js';
import { defaultBrowserConfig, defaultNodeConfig } from './defaultConfig.js';

export function normalizeNodeConfig(partial?: Partial<NodeConfig>): NodeConfig {
  return {
    ...defaultNodeConfig,
    ...partial,
  };
}

export function normalizeBrowserConfig(partial?: Partial<BrowserConfig>): BrowserConfig {
  return {
    ...defaultBrowserConfig,
    ...partial,
  };
}
