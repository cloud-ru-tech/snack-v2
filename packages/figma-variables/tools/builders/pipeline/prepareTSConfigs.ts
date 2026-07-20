import type { Config } from 'style-dictionary';

import { getTSConfig } from '../../configs/index.js';
import type { BaseConfig, TokenSet } from '../../types.js';
import { dedupeTokenSets, getFirstTokenSetByGroup, getStyleTokenSets } from '../../utils/tokenSets.js';

type PreparedTokenData = {
  tokenSets: TokenSet[];
  systemLayers: TokenSet[];
};

/**
 * Этап 2: Подготовка конфигураций для TypeScript
 *
 * Создает конфигурацию Style Dictionary для генерации TS файлов.
 *
 * Что происходит:
 * 1. Подготавливаем базовые слои (первые 2 системных слоя)
 * 2. Собираем все источники токенов (базовые слои + первый токен из каждого системного слоя + стили)
 * 3. Создаем конфиг для TypeScript (ts/styles.ts)
 *
 * Результат: массив конфигураций Style Dictionary для генерации TS файлов
 */
export function prepareTSConfigs(data: PreparedTokenData, config: BaseConfig, buildPath: string): Config[] {
  const { tokenSets, systemLayers } = data;
  const excludeGroups = config.excludeGroups ?? [];

  // Шаг 2.1: Подготавливаем базовые слои (первые 2 системных слоя)
  const baseLayers = systemLayers.slice(0, 2);

  // Шаг 2.2: Собираем все источники токенов
  const sources = dedupeTokenSets([
    ...baseLayers,
    ...systemLayers.slice(2).flatMap(layer => getFirstTokenSetByGroup(tokenSets, layer.group)),
    ...getStyleTokenSets(tokenSets),
  ]);

  // Шаг 2.3: Создаем конфиг для TypeScript
  const tsBuildPath = `${buildPath}ts/`;
  const tsConfig = getTSConfig(sources, tsBuildPath, excludeGroups);

  return tsConfig ? [tsConfig] : [];
}
