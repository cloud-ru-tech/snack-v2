import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  ACTIVATED_ALPHA_SUFFIX,
  BASE_BRAND_PALETTE,
  BRAND_ACTIVATED_VAR,
  BRAND_PRIMARY_TONES,
  BRAND_PRIMARY_VAR_PREFIX,
  buildBrandPaletteVars,
  TRANSPARENT_ALPHA_SUFFIX,
} from '../src';

// Контракт между генератором кастомной палитры и пакетом токенов.
//
// Зачем отдельно от customTheme.test.ts: тот проверяет ЗНАЧЕНИЯ по захардкоженным именам, то есть
// утверждает, что код пишет то, что код пишет. Такой тест остаётся зелёным, если имя переменной
// разошлось с токенами, — и ровно так прожил баг с activated-заливками: тема писала
// `--sn-brand-color-activated-*-background`, а компоненты читали
// `--sn-brand-color-state-activated-*-background` (сегмент `state-`), и выбранная строка таблицы
// не следовала за кастомным бренд-цветом.
//
// Здесь имена НЕ перечисляются руками: берём фактический вывод `buildBrandPaletteVars` и требуем,
// чтобы каждое имя было объявлено в бренд-токенах. Переименование с любой стороны роняет тест.

const TOKENS_RELATIVE = 'packages/figma-variables/build/css/brand/brandA.css';

/** Ищет файл токенов вверх от cwd — тест не зависит от того, из какого каталога запущен vitest. */
function resolveBrandTokensCss(): string {
  let dir = resolve(process.cwd());

  for (;;) {
    const candidate = join(dir, TOKENS_RELATIVE);

    if (existsSync(candidate)) {
      return candidate;
    }

    const parent = dirname(dir);

    if (parent === dir) {
      throw new Error(`не найден ${TOKENS_RELATIVE} вверх от ${process.cwd()}`);
    }

    dir = parent;
  }
}

const BRAND_TOKENS_CSS = resolveBrandTokensCss();

const BRAND_TOKENS_SOURCE = readFileSync(BRAND_TOKENS_CSS, 'utf8');

/** Имена кастомных свойств, ОБЪЯВЛЕННЫХ в файле токенов (левая часть `--x: …`). */
function declaredCustomProperties(css: string): Set<string> {
  return new Set([...css.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map(match => match[1]));
}

/**
 * Значение токена как hex. В токенах правая часть — цепочка `var(--fallback-chain, #rrggbb[aa])`,
 * поэтому берём ПОСЛЕДНИЙ hex: он и есть буквальное значение бренда.
 */
function tokenHex(css: string, name: string): string | null {
  const declaration = css.match(new RegExp(`^\\s*${name}\\s*:\\s*([^;]+);`, 'm'));
  const hexes = [...(declaration?.[1] ?? '').matchAll(/#[0-9a-fA-F]{6,8}/g)];

  return hexes.length ? hexes[hexes.length - 1][0].toLowerCase() : null;
}

/** Alpha-суффикс (последние два символа) из 8-значного hex токена. */
function tokenAlpha(css: string, name: string): string | null {
  const hex = tokenHex(css, name);

  return hex && hex.length === 9 ? hex.slice(-2) : null;
}

describe('кастомная палитра ↔ бренд-токены', () => {
  const declared = declaredCustomProperties(BRAND_TOKENS_SOURCE);
  const produced = buildBrandPaletteVars('#ff7a00');

  it('файл токенов прочитан и непустой', () => {
    expect(declared.size).toBeGreaterThan(0);
    expect(produced).not.toBeNull();
  });

  it('каждая переменная палитры объявлена в бренд-токенах', () => {
    const names = Object.keys(produced ?? {});
    const missing = names.filter(name => !declared.has(name));

    // Сообщение перечисляет расхождения: при переименовании токена сразу видно, какие именно.
    expect(missing, `нет в ${BRAND_TOKENS_CSS}:\n  ${missing.join('\n  ')}`).toEqual([]);
    expect(names.length).toBeGreaterThan(0);
  });

  it('activated-заливки покрыты — иначе выбранная строка не следует за брендом', () => {
    const activated = Object.keys(produced ?? {}).filter(name => name.includes('activated'));

    expect(activated).toHaveLength(3);
    activated.forEach(name => expect(declared.has(name)).toBe(true));
  });
});

// Вторая половина контракта: не только ИМЕНА, но и ЗНАЧЕНИЯ. Опорная палитра и alpha-суффиксы в
// `constants.ts` — копия дефолтов brandA, и разойтись они могут молча (так тон `80` разъехался с
// токенами). Значения тянутся из того же файла токенов, наизусть здесь ничего не записано.
describe('опорные значения ↔ бренд-токены', () => {
  it('BASE_BRAND_PALETTE совпадает с тонами brandA', () => {
    const drift = BRAND_PRIMARY_TONES.map(tone => ({
      tone,
      ours: BASE_BRAND_PALETTE[tone].toLowerCase(),
      token: tokenHex(BRAND_TOKENS_SOURCE, `${BRAND_PRIMARY_VAR_PREFIX}${tone}`),
    })).filter(row => row.ours !== row.token);

    expect(
      drift,
      `разошлись с ${BRAND_TOKENS_CSS}:\n  ${drift.map(r => `${r.tone}: ${r.ours} ≠ ${r.token}`).join('\n  ')}`,
    ).toEqual([]);
  });

  it('TRANSPARENT_ALPHA_SUFFIX совпадает с alpha токена transparent', () => {
    expect(TRANSPARENT_ALPHA_SUFFIX).toBe(tokenAlpha(BRAND_TOKENS_SOURCE, `${BRAND_PRIMARY_VAR_PREFIX}transparent`));
  });

  it('ACTIVATED_ALPHA_SUFFIX совпадает с alpha токенов activated', () => {
    (['default', 'hovered', 'pressed'] as const).forEach(state => {
      expect(ACTIVATED_ALPHA_SUFFIX[state], `состояние ${state}`).toBe(
        tokenAlpha(BRAND_TOKENS_SOURCE, BRAND_ACTIVATED_VAR[state]),
      );
    });
  });
});
