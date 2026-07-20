import type { BaseConfig, BrowserConfig, NodeConfig } from '../types.js';

export const defaultBaseConfig: BaseConfig = {
  formats: ['css', 'scss', 'ts'],
  cssModules: false,
  scssModules: true,
  cssClassPrefix: 'sn',
  validate: 'warning',
  logLevel: 'info',
  excludeGroups: [],
  includeFallbackValues: true,
};

export const defaultNodeConfig: NodeConfig = {
  ...defaultBaseConfig,
  input: './tokens',
  output: './build',
  watch: false,
};

export const defaultBrowserConfig: BrowserConfig = {
  ...defaultBaseConfig,
  tokens: {},
};
