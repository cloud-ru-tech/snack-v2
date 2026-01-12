import { defineConfig } from 'tsup';

/**
 * Конфигурация tsup с оптимизацией CSS
 *
 * Оптимизации:
 * 1. Tree-shaking для JS кода
 * 2. Минификация CSS через esbuild
 * 3. Оптимизированные SCSS импорты (через оптимизированные модули)
 * 4. Удаление комментариев из CSS
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  tsconfig: './tsconfig.json',
  sourcemap: true,
  clean: true,
  treeshake: true, // Удаляет неиспользуемый JS код
  target: 'es2022',
  external: ['react', 'react-dom', 'classnames'],

  // Настройка для обработки CSS/SCSS
  loader: {
    '.css': 'css',
    '.scss': 'css', // esbuild обработает SCSS через sass-embedded
  },

  // Оптимизация CSS через esbuild
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'css',
      '.scss': 'css',
    };

    // Минифицируем CSS в production
    if (process.env.NODE_ENV === 'production') {
      options.minify = true;
      options.legalComments = 'none'; // Удаляем комментарии
    }
  },

  // Включаем минификацию в production
  minify: process.env.NODE_ENV === 'production',
});
















