import type { Config } from 'style-dictionary';

import { processStyleDictionary } from '../../utils/index.js';

/**
 * Этап 3: Генерация файлов
 *
 * Запускает Style Dictionary для генерации файлов по конфигурациям.
 *
 * Что происходит:
 * 1. Проверяем, что есть конфигурации для генерации
 * 2. Запускаем Style Dictionary для каждой конфигурации
 * 3. В браузерном режиме: собираем результаты через collectResults
 * 4. В Node.js режиме: записываем файлы на диск
 *
 * Результат: список созданных файлов
 */
export async function generateFiles(
  configs: Config[],
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<string[]> {
  if (configs.length === 0) {
    return [];
  }

  // Шаг 3.1: Генерируем файлы через Style Dictionary
  const createdFiles = await processStyleDictionary(configs, collectResults);

  return createdFiles;
}
