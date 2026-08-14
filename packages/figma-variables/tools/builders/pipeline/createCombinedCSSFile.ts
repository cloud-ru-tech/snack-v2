import fs from 'fs/promises';

import path from 'node:path';

import { AUTO_GENERATED_COMMENT, BaseConfig } from '../../types.js';
import { logger } from '../../utils/logger.js';
import { sortCssCustomProperties } from '../../utils/sortCssCustomProperties.js';

const CSS_SEGMENT_IN_PATH = /\/css\/([^/]+)\//;

/**
 * Создает объединенный CSS файл из уже сгенерированных CSS файлов.
 *
 * Цель:
 * - собрать все классы и переменные в один CSS
 * - обеспечить стабильный и предсказуемый порядок слоев,
 *   чтобы поведение не зависело от порядка подключения отдельных CSS файлов.
 *
 * Порядок слоёв задаётся segmentOrder (из пайплайна: системные слои уже отсортированы по номеру в имени папки 01..99).
 * Компоненты (без номера в префиксе) — в конце.
 *
 * Компоненты (build/css/components/*.css):
 *   - Файлы компонентов НЕ добавляются в tokens.css как отдельные классы
 *   - Из них извлекаются все CSS переменные
 *   - После всех слоев добавляется класс .sn-components со всеми переменными компонентов
 *
 * Результат:
 * - файл build/css/tokens.css (или tokens.module.css при cssModules = true)
 * - путь к файлу добавляется в список createdFiles
 */
export async function createCombinedCSSFile(
  buildPath: string,
  createdFiles: string[],
  config: BaseConfig,
  segmentOrder: string[],
): Promise<string | null> {
  // В браузерном режиме файлы не пишутся на диск – комбинировать нечего
  if (!buildPath || createdFiles.length === 0) {
    return null;
  }

  const cssExtension = config.cssModules ? 'module.css' : 'css';

  // Нормализуем пути для дальнейшей фильтрации
  const normalizedFiles = createdFiles.map(file => file.replace(/\\/g, '/'));

  // Собираем уникальные сегменты из путей (build/.../css/SEGMENT/...)
  const segmentsInFiles = new Set<string>();
  for (const file of normalizedFiles) {
    const match = file.match(CSS_SEGMENT_IN_PATH);
    if (match?.[1]) {
      segmentsInFiles.add(match[1]);
    }
  }

  // Сортируем по переданному порядку (системные слои уже в порядке по номеру 01..99); неизвестные сегменты — перед components
  const orderIndex = new Map(segmentOrder.map((name, i) => [name, i]));
  const sortedSegments = Array.from(segmentsInFiles).sort((a, b) => {
    const idxA = orderIndex.get(a) ?? (a === 'components' ? Infinity : orderIndex.size);
    const idxB = orderIndex.get(b) ?? (b === 'components' ? Infinity : orderIndex.size);
    return idxA - idxB;
  });

  const orderedFiles: string[] = [];

  for (const segment of sortedSegments) {
    const segmentPath = `/css/${segment}/`;
    const layerFiles = normalizedFiles
      .filter(
        file =>
          file.includes(segmentPath) &&
          (file.endsWith(`.${cssExtension}`) || file.endsWith(`.module.${cssExtension}`) || file.endsWith('.css')),
      )
      .sort();

    orderedFiles.push(...layerFiles);
  }

  if (orderedFiles.length === 0) {
    logger.debug('No CSS files found for combined CSS file.');
    return null;
  }

  const combinedFileName = `tokens.${cssExtension}`;
  const combinedFilePath = path.join(buildPath, 'css', combinedFileName);

  logger.subsection(`Building combined CSS file: ${path.join('build', 'css', combinedFileName)}`);

  let combinedContent = `${AUTO_GENERATED_COMMENT}\n\n`;

  // Собираем все CSS переменные из компонентов для класса .sn-components
  const componentVariables = new Map<string, string>();

  for (const filePath of orderedFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');

      // Удаляем стандартный автогенерируемый комментарий из исходных файлов,
      // чтобы не дублировать его внутри объединенного файла.
      const withoutHeader = content.replace(AUTO_GENERATED_COMMENT, '').trim();

      if (!withoutHeader) {
        continue;
      }

      const relativeFromBuild = filePath.replace(/^[./]*/, '');

      // Если это файл компонента, извлекаем переменные для .sn-components и пропускаем добавление в combinedContent
      if (filePath.includes('/css/components/')) {
        // Извлекаем все CSS переменные из класса компонента
        // Формат: .sn-componentName { --variable: value; ... }
        // Используем более гибкое регулярное выражение для многострочных блоков
        const classMatch = withoutHeader.match(/\.sn-[\w-]+\s*\{([\s\S]+?)\}/);
        if (classMatch) {
          const variablesContent = classMatch[1];
          // Извлекаем все переменные вида --name: value; (с учетом переносов строк и пробелов)
          // Паттерн: --имя-переменной: значение; (значение может содержать var(), пробелы, переносы строк)
          const variableRegex = /(--[\w-]+:\s*[^;]+?;)/g;
          let match;
          while ((match = variableRegex.exec(variablesContent)) !== null) {
            const variableLine = match[1].trim();
            // Извлекаем имя переменной (до двоеточия)
            const varNameMatch = variableLine.match(/^--([\w-]+):/);
            if (varNameMatch) {
              const varName = `--${varNameMatch[1]}`;
              // Нормализуем значение (убираем лишние пробелы, но сохраняем структуру)
              const normalizedLine = variableLine.replace(/\s+/g, ' ').trim();
              // Сохраняем переменную, если она еще не была добавлена (приоритет у первой встреченной)
              if (!componentVariables.has(varName)) {
                componentVariables.set(varName, normalizedLine);
              }
            }
          }
        }
        // Пропускаем добавление файла компонента в combinedContent
        continue;
      }

      combinedContent += `/* Source: ${relativeFromBuild} */\n`;
      combinedContent += `${withoutHeader}\n\n`;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger.warn(`Failed to read CSS file for combination (${filePath}): ${message}`);
    }
  }

  // Добавляем класс .sn-components со всеми переменными компонентов
  if (componentVariables.size > 0) {
    const prefix = config.cssClassPrefix || 'sn';
    // Используем топологическую сортировку для сохранения правильного порядка зависимостей
    const variableLines = Array.from(componentVariables.values());
    const sortedVariables = sortCssCustomProperties(variableLines);

    const componentVariablesContent = sortedVariables.join('\n  ');

    combinedContent += `/* Combined component variables */\n`;
    combinedContent += `.${prefix}-components {\n  ${componentVariablesContent}\n}\n\n`;
  }

  // Если после обработки всех файлов у нас остался только заголовок – ничего не пишем
  const hasContentBeyondHeader = combinedContent.replace(AUTO_GENERATED_COMMENT, '').trim().length > 0;

  if (!hasContentBeyondHeader) {
    logger.warn('Combined CSS file is empty, skipping write.');
    return null;
  }

  // Гарантируем существование директории build/css
  const cssDir = path.dirname(combinedFilePath);
  await fs.mkdir(cssDir, { recursive: true });

  await fs.writeFile(combinedFilePath, combinedContent, 'utf-8');

  logger.success(`Combined CSS file generated: ${path.join('build', 'css', combinedFileName)}`);

  // Добавляем файл в список созданных, чтобы он попал в валидацию и логирование выше по пайплайну
  createdFiles.push(combinedFilePath.replace(/\\/g, '/'));

  return combinedFilePath;
}
