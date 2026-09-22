import { transformDimension } from '@tokens-studio/sd-transforms';

/** sd-transforms оставляет ноль без единиц, а `calc(100% - 0)` в CSS невалиден — ноль тоже в px. */
export function transformDimensionToPx(
  token: Parameters<typeof transformDimension>[0],
): ReturnType<typeof transformDimension> {
  const value = transformDimension(token);
  return value === '0' ? '0px' : value;
}
