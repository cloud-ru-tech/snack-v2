import type { ThemeObject } from '@tokens-studio/types';

import type { TokenSet } from '../types.js';

export type TokenAdapter = {
  /**
   * Читает токены из источника
   */
  readTokens(): Promise<TokenSet[]>;

  /**
   * Читает метаданные ($metadata.json)
   */
  readMetadata(): Promise<{ tokenSetOrder?: string[] } | null>;

  /**
   * Читает темы ($themes.json)
   */
  readThemes(): Promise<ThemeObject[] | null>;

  /**
   * Записывает результаты генерации
   */
  writeResults(results: {
    css: Record<string, string>;
    scss: Record<string, string>;
    ts: Record<string, string>;
  }): Promise<void>;

  /**
   * Проверяет существование файла/токена
   */
  exists(path: string): Promise<boolean>;
};
