/**
 * Скачивает /index.json инструментированного storybook и сохраняет в
 * playwright/coverage/.stories.json. Нужен harvester'у на этапе test discovery:
 * playwright must знать список story ДО declarative test() — иначе нельзя
 * сгенерить N независимых тестов для шардинга/параллелизации.
 *
 * Usage:
 *   pnpm exec tsx scripts/coverage-prefetch-stories.mts              # http://localhost:6006
 *   STORYBOOK_PORT=7000 pnpm exec tsx scripts/coverage-prefetch-stories.mts
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const PORT = Number(process.env.STORYBOOK_PORT || 6006);
const url = `http://localhost:${PORT}/index.json`;
const target = resolve(process.cwd(), 'playwright', 'coverage', '.stories.json');

try {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[prefetch-stories] ${url} returned ${res.status}`);
    process.exit(1);
  }
  const body = await res.text();
  writeFileSync(target, body);
  const count = Object.keys(JSON.parse(body).entries ?? {}).length;
  console.log(`[prefetch-stories] wrote ${count} entries → ${target}`);
} catch (e) {
  console.error('[prefetch-stories] failed:', (e as Error).message);
  process.exit(1);
}
