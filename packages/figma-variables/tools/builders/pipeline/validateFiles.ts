import type { BaseConfig } from '../../types.js';
import { validateGeneratedFiles } from '../../utils/index.js';
import { logger } from '../../utils/logger.js';

/**
 * Этап 4: Валидация файлов
 *
 * Проверяет сгенерированные файлы на ошибки.
 *
 * Что происходит:
 * 1. Пропускаем валидацию в браузерном режиме или если она отключена
 * 2. Фильтруем файлы по расширению (css, scss)
 * 3. Валидируем файлы (проверка синтаксиса, незакрытые скобки, и т.д.)
 * 4. Обрабатываем ошибки (выбрасываем в strict режиме или логируем в warn режиме)
 * 5. Обрабатываем предупреждения
 *
 * Результат: валидация завершена (или ошибка в strict режиме)
 */
export async function validateGeneratedFilesStep(
  files: string[],
  fileExtension: string,
  config: BaseConfig,
  collectResults?: (type: 'css' | 'scss' | 'ts', path: string, content: string) => void,
): Promise<void> {
  // Шаг 4.1: Пропускаем валидацию в браузерном режиме или если она отключена
  if (collectResults || config.validate === 'off') {
    return;
  }

  // Шаг 4.2: Фильтруем файлы по расширению
  const filesToValidate = files.filter(
    file => file.endsWith(`.${fileExtension}`) || file.endsWith(`.module.${fileExtension}`),
  );

  if (filesToValidate.length === 0) {
    return;
  }

  // Шаг 4.2.5: Выводим сообщение о начале валидации
  if (fileExtension === 'scss' || fileExtension === 'css') {
    logger.section(`${fileExtension.toUpperCase()} validation results`);
    logger.subsection(`Validating ${fileExtension.toUpperCase()} files...`);
  } else {
    logger.subsection(`Validating ${fileExtension.toUpperCase()} files...`);
  }

  // Шаг 4.3: Валидируем файлы с выводом результатов по мере валидации
  const shouldLogPerFile = fileExtension === 'scss' || fileExtension === 'css';

  const validationResult = await validateGeneratedFiles(
    filesToValidate,
    config.validate,
    shouldLogPerFile
      ? (file, hasErrors, hasWarnings, errors, warnings) => {
          // Для SCSS и CSS выводим статус и ошибки сразу после валидации каждого файла
          logger.fileValidationStatus(file, hasErrors, hasWarnings, errors, warnings, config.validate);
        }
      : undefined,
  );

  // Шаг 4.4: Обрабатываем ошибки и предупреждения
  // Для SCSS и CSS результаты уже выведены по мере валидации, только проверяем на ошибки в strict режиме
  if (fileExtension === 'scss' || fileExtension === 'css') {
    // В strict режиме выбрасываем ошибку, если есть ошибки
    if (validationResult.errors.length > 0 && config.validate === 'strict') {
      throw new Error(`${fileExtension.toUpperCase()} validation failed`);
    }
  } else {
    // Для других форматов используем стандартный вывод
    if (validationResult.errors.length > 0) {
      logger.error(`${fileExtension.toUpperCase()} validation errors (${validationResult.errors.length}):`);
      validationResult.errors.forEach(err => logger.error(`  • ${err}`));
      if (config.validate === 'strict') {
        throw new Error(`${fileExtension.toUpperCase()} validation failed`);
      }
    }

    if (validationResult.warnings.length > 0) {
      logger.warn(`${fileExtension.toUpperCase()} validation warnings (${validationResult.warnings.length}):`);
      validationResult.warnings.forEach(warn => logger.warn(`  • ${warn}`));
    }
  }
}
