type TokenLike = { path?: string[]; $value?: unknown; value?: unknown };

/**
 * Временно: нулевое `sn.acrylic.blurBackground*` остаётся `0` без единицы.
 * Старые `@cloud-ru/ds-materials` (до `--sn-acrylic-backdropFilter*`) пишут `blur(calc(var(--sn-acrylic-blurBackground*) / 2))`
 * и полагаются на невалидный `calc(0 / 2)` → `backdrop-filter: none`; с `0px` получается `blur(0px)` и артефакты отрисовки.
 * Удалить, когда потребители обновятся на materials с `backdropFilter*`-токенами.
 */
export function isLegacyAcrylicZeroBlur(token: TokenLike): boolean {
  const [root, group, key] = token.path ?? [];
  const value = token.$value ?? token.value;
  return (
    root === 'sn' && group === 'acrylic' && String(key).startsWith('blurBackground') && /^0(px)?$/.test(String(value))
  );
}
