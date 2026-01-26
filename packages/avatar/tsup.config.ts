import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  tsconfig: './tsconfig.json',
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'classnames'],
  loader: {
    '.css': 'css',
    '.scss': 'css',
  },
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'css',
      '.scss': 'css',
    };

    if (process.env.NODE_ENV === 'production') {
      options.minify = true;
      options.legalComments = 'none';
    }
  },
  minify: process.env.NODE_ENV === 'production',
});
