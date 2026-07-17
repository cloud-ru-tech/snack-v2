import type { Config } from 'style-dictionary';

/**
 * Общая конфигурация логирования Style Dictionary для генерации файлов.
 * Позволяет генерировать файлы даже при неразрешённых ссылках (broken references выводятся в консоль).
 */
export function getStyleDictionaryLogConfig(): Config['log'] {
  return {
    verbosity: 'silent',
    warnings: 'disabled',
    errors: {
      brokenReferences: 'console',
    },
  };
}
