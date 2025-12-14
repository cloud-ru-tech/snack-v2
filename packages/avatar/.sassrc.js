/**
 * Конфигурация Sass для оптимизации компиляции
 * Уменьшает размер итогового CSS
 * 
 * Примечание: esbuild использует sass-embedded, который может не использовать этот файл
 * Настройки применяются через esbuildOptions в tsup.config.ts
 */
module.exports = {
  // Стиль вывода: compressed - максимальная минификация
  outputStyle: 'compressed',
  // Удаляем комментарии
  omitSourceMapUrl: true,
  // Не генерируем source map для CSS (уменьшает размер)
  sourceMap: false,
  // Оптимизируем импорты
  precision: 10,
  // Удаляем неиспользуемые импорты (если поддерживается)
  quietDeps: true,
  // Оптимизируем селекторы
  sourceComments: false,
};

