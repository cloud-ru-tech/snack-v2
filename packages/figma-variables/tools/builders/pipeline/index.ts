/**
 * Pipeline сборки токенов
 *
 * Четкая пошаговая структура процесса сборки:
 *
 * 0. validateTokenNames - Валидация названий свойств токенов
 * 1. validateTokenReferences - Валидация ссылок на исключенные токены
 * 2. prepareTokenData - Подготовка данных токенов
 * 3. prepare*Configs - Подготовка конфигураций для каждого формата
 * 4. generateFiles - Генерация файлов через Style Dictionary
 * 5. validateFiles - Валидация сгенерированных файлов
 */

export * from './generateFiles.js';
export * from './prepareCSSConfigs.js';
export * from './prepareSCSSConfigs.js';
export * from './prepareTokenData.js';
export * from './prepareTSConfigs.js';
export * from './runTokenReferenceValidation.js';
export * from './validateFiles.js';
export * from './validateTokenNames.js';
export * from './validateTokenReferences.js';
