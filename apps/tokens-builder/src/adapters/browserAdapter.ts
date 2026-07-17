import type { ThemeObject } from '@tokens-studio/types';

import type { AnyRecord, BuildResult, TokenSet } from '../types.js';
import { normalizeTokenReferences } from '../utils/normalizeTokenReferences.js';
import { discoverTokenSetsFromObject } from '../utils/tokenSets.js';
import type { TokenAdapter } from './types.js';

export class BrowserAdapter implements TokenAdapter {
  private tokens: Record<string, AnyRecord>;
  private metadata: { tokenSetOrder?: string[] } | null;
  private themes: ThemeObject[] | null;
  private results: BuildResult = {
    css: {},
    scss: {},
    ts: {},
  };

  setResult(type: 'css' | 'scss' | 'ts', path: string, content: string): void {
    this.results[type][path] = content;
  }

  constructor(
    tokens: Record<string, AnyRecord>,
    metadata?: { tokenSetOrder?: string[] } | null,
    themes?: ThemeObject[] | null,
  ) {
    this.tokens = tokens;
    this.metadata = metadata ?? null;
    this.themes = themes ?? null;
  }

  async readTokens(): Promise<TokenSet[]> {
    const tokenSets = discoverTokenSetsFromObject(this.tokens);
    // Normalize token references (fix common issues from Figma exports)
    return tokenSets.map(tokenSet => ({
      ...tokenSet,
      content: tokenSet.content ? normalizeTokenReferences(tokenSet.content) : tokenSet.content,
    }));
  }

  async readMetadata(): Promise<{ tokenSetOrder?: string[] } | null> {
    return this.metadata;
  }

  async readThemes(): Promise<ThemeObject[] | null> {
    return this.themes;
  }

  async writeResults(results: BuildResult): Promise<void> {
    this.results = results;
  }

  async exists(path: string): Promise<boolean> {
    return path in this.tokens;
  }

  getResults(): BuildResult {
    return this.results;
  }
}
