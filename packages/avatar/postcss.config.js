/**
 * PostCSS конфигурация для оптимизации CSS
 * Удаляет неиспользуемый CSS и минифицирует результат
 */

module.exports = {
  plugins: [
    // Автоматически удаляет неиспользуемый CSS
    // Работает с CSS модулями и анализирует импорты
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{ts,tsx,js,jsx}', './src/**/*.module.scss'],
      // Сохраняем CSS переменные и классы, которые могут использоваться динамически
      safelist: {
        // Сохраняем все CSS переменные (начинаются с --)
        deep: [/^--/],
        // Сохраняем классы с data-атрибутами (используются в компонентах)
        standard: [/^data-/],
        // Сохраняем классы avatar с различными модификаторами
        greedy: [/^avatar/, /\[data-size/, /\[data-shape/, /\[data-appearance/],
      },
      // Используем CSS модули - классы уже имеют хеши
      defaultExtractor: (content) => {
        // Извлекаем классы из CSS модулей
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
        // Извлекаем классы из data-атрибутов
        const dataMatches = content.match(/data-[a-z-]+/g) || [];
        return broadMatches.concat(dataMatches);
      },
    }),
    // Минифицирует CSS
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          // Сохраняем CSS переменные
          normalizeWhitespace: true,
          // Оптимизируем calc()
          calc: true,
        },
      ],
    }),
  ],
};

















