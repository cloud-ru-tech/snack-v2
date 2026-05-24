/**
 * CI helper: собирает инструментированный storybook static и поднимает http-server.
 * Возвращается после того, как :6006/index.json отвечает 200.
 *
 * Usage (CI):
 *   pnpm exec tsx scripts/coverage-serve.mts &
 *   pnpm exec tsx scripts/coverage-serve.mts --wait-only   # пропустить билд
 *
 * Локально предпочитать `pnpm --filter @ds/storybook dev:coverage`.
 */
import { spawn, spawnSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const PORT = Number(process.env.STORYBOOK_PORT || 6006);
const STATIC_DIR = resolve(process.cwd(), 'apps/storybook/storybook-static');
const waitOnly = process.argv.includes('--wait-only');

async function waitReady(): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < 180_000) {
    try {
      const res = await fetch(`http://localhost:${PORT}/index.json`);
      if (res.ok) return;
    } catch {/* not yet */}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error(`storybook :${PORT}/index.json did not become ready within 180s`);
}

if (!waitOnly) {
  if (!existsSync(STATIC_DIR)) {
    console.log('[coverage-serve] building instrumented storybook static …');
    const build = spawnSync('pnpm', ['--filter', '@ds/storybook', 'exec', 'storybook', 'build'], {
      stdio: 'inherit',
      env: { ...process.env, INSTRUMENT: 'true' },
    });
    if (build.status !== 0) {
      console.error('[coverage-serve] storybook build failed');
      process.exit(build.status ?? 1);
    }
  } else {
    console.log('[coverage-serve] storybook-static already exists — reusing (delete to rebuild)');
  }

  console.log(`[coverage-serve] starting http-server on :${PORT}`);
  const server = spawn('pnpm', ['dlx', 'http-server', STATIC_DIR, '-p', String(PORT), '-s', '-c-1'], {
    stdio: ['ignore', 'inherit', 'inherit'],
    detached: false,
  });
  server.on('exit', code => {
    if (code !== null && code !== 0) {
      console.error(`[coverage-serve] http-server exited with code ${code}`);
      process.exit(code);
    }
  });
}

await waitReady();
console.log(`[coverage-serve] ready at http://localhost:${PORT}`);

// Prefetch /index.json в playwright/coverage/.stories.json — harvester
// читает его на этапе test-discovery (нужно для парраллелизации
// одна-story = один-test).
try {
  const res = await fetch(`http://localhost:${PORT}/index.json`);
  const body = await res.text();
  writeFileSync(resolve(process.cwd(), 'playwright', 'coverage', '.stories.json'), body);
  console.log(`[coverage-serve] prefetched stories index → playwright/coverage/.stories.json`);
} catch (e) {
  console.warn('[coverage-serve] stories prefetch failed (harvester won\'t run):', (e as Error).message);
}

if (waitOnly) process.exit(0);
// Иначе остаёмся в forground для CI.
