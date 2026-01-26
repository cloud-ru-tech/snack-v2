import { defineConfig, Options } from 'tsup';

export default defineConfig((options): Options => {
  const isESM = options.format?.includes('esm');
  
  return {
    entry: ['src/index.ts'],
    format: options.format || ['esm'],
    outDir: options.outDir || 'dist/esm',
    dts: {
      resolve: true,
    },
    sourcemap: true,
    clean: isESM, // Only clean on ESM build (first build)
    treeshake: true,
    target: 'es2022',
    external: ['react', 'react-dom', 'classnames'],
    // CSS modules support
    loader: {
      '.scss': 'local-css',
      '.css': 'local-css',
    },
    esbuildOptions(opts) {
      opts.platform = isESM ? 'browser' : 'node';
      if (process.env.NODE_ENV === 'production') {
        opts.minify = true;
        opts.legalComments = 'none';
      }
    },
    minify: process.env.NODE_ENV === 'production',
  };
});
