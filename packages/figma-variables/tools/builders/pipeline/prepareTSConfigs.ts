import type { Config } from 'style-dictionary';

import { getTSConfig } from '../../configs/index.js';
import type { BaseConfig, TokenSet } from '../../types.js';
import { getBaseLayers, getNonBaseLayers } from '../../utils/groupUtils.js';
import {
  dedupeTokenSets,
  getFirstTokenSetByGroup,
  getStyleTokenSets,
  getSystemLayerGroups,
  getTokenSetsByGroup,
} from '../../utils/tokenSets.js';

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
 * 1. Подготавливаем базовые слои (BASE_LAYERS_CONFIG — те же, что идут в base.css)
 * 2. Собираем все источники токенов (базовые слои целиком + первый набор из каждого остального слоя + стили)
 * 3. Создаем конфиг для TypeScript (ts/styles.ts)
 *
 * Результат: массив конфигураций Style Dictionary для генерации TS файлов
 */
export function prepareTSConfigs(data: PreparedTokenData, config: BaseConfig, buildPath: string): Config[] {
  const { tokenSets, systemLayers } = data;
  const excludeGroups = config.excludeGroups ?? [];

  // Шаг 2.1: Подготавливаем базовые слои — тот же слайс по BASE_LAYERS_CONFIG, что и в CSS-ветке
  const systemLayerGroups = getSystemLayerGroups(systemLayers);
  const baseLayerGroups = getBaseLayers(systemLayerGroups);

  // Шаг 2.2: Собираем все источники токенов
  const sources = dedupeTokenSets([
    ...baseLayerGroups.flatMap(group => getTokenSetsByGroup(tokenSets, group)),
    ...getNonBaseLayers(systemLayerGroups).flatMap(group => getFirstTokenSetByGroup(tokenSets, group)),
    ...getStyleTokenSets(tokenSets),
  ]);

  // Шаг 2.3: Создаем конфиг для TypeScript
  const tsBuildPath = `${buildPath}ts/`;
  const tsConfig = getTSConfig(sources, tsBuildPath, excludeGroups);

  return tsConfig ? [tsConfig] : [];
}
